import { deepMerge } from '@/_utils'
import { dateUtil } from '@/_utils/dateUtil'
import {
  isArray,
  isDef,
  isFunction,
  isNullOrUnDef,
  isObject,
  isString
} from '@/_utils/is'
import { error } from '@/_utils/log'
import { FormItemProp } from 'element-plus'
import { cloneDeep, uniqBy } from 'lodash-es'
import type { ComputedRef, Ref } from 'vue'
import { nextTick, toRaw, unref } from 'vue'
import {
  dateItemType,
  defaultValueComponents,
  handleInputNumberValue
} from '../helper'
import type {
  Callback,
  EmitType,
  Fn,
  IFormActionType,
  IFormProps,
  IFormSchema
} from '../types'
interface UseFormActionContext {
  emit: EmitType
  getProps: ComputedRef<IFormProps>
  getSchema: ComputedRef<IFormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
  formElRef: Ref<IFormActionType>
  schemaRef: Ref<IFormSchema[]>
  handleFormValues: Fn
}
export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  defaultValueRef,
  formElRef,
  schemaRef,
  handleFormValues
}: UseFormActionContext) {
  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getProps)
    resetFunc && isFunction(resetFunc) && (await resetFunc())

    const formEl = unref(formElRef)
    if (!formEl) return

    Object.keys(formModel).forEach((key) => {
      const schema = unref(getSchema).find((item: any) => item.field === key)
      const isInput =
        schema?.component && defaultValueComponents.includes(schema.component)
      const defaultValue = cloneDeep(defaultValueRef.value[key])
      formModel[key] = isInput ? defaultValue || '' : defaultValue
    })
    nextTick(() => clearValidate())

    emit('reset', toRaw(formModel))
    submitOnReset && handleSubmit()
  }

  /**
   * @description: Set form value
   */
  async function setFieldsValue(values: Recordable): Promise<void> {
    const fields = unref(getSchema)
      .map((item: any) => item.field)
      .filter(Boolean)

    // key 支持 a.b.c 的嵌套写法
    const delimiter = '.'
    const nestKeyArray = fields.filter(
      (item: any) => item.indexOf(delimiter) >= 0
    )

    const validKeys: string[] = []
    Object.keys(values).forEach((key) => {
      const schema = unref(getSchema).find((item: any) => item.field === key)
      let value = values[key]

      const hasKey = Reflect.has(values, key)

      value = handleInputNumberValue(schema?.component, value)
      // 0| '' is allow
      if (hasKey && fields.includes(key)) {
        // time type
        if (itemIsDateType(key)) {
          if (Array.isArray(value)) {
            const arr: any[] = []
            for (const ele of value) {
              arr.push(ele ? dateUtil(ele) : null)
            }
            formModel[key] = arr
          } else {
            const { componentProps } = schema || {}
            let _props = componentProps as any
            if (typeof componentProps === 'function') {
              _props = _props({ formModel })
            }
            formModel[key] = value
              ? _props?.valueFormat
                ? value
                : dateUtil(value)
              : null
          }
        } else {
          formModel[key] = value
        }
        validKeys.push(key)
      } else {
        nestKeyArray.forEach((nestKey: string) => {
          try {
            const value = eval('values' + delimiter + nestKey)
            if (isDef(value)) {
              formModel[nestKey] = value
              validKeys.push(nestKey)
            }
          } catch (e) {
            // key not exist
            if (isDef(defaultValueRef.value[nestKey])) {
              formModel[nestKey] = cloneDeep(defaultValueRef.value[nestKey])
            }
          }
        })
      }
    })
    validateFields(validKeys).catch((_) => {})
  }
  /**
   * @description: Delete based on field name
   */
  async function removeSchemaByFiled(fields: string | string[]): Promise<void> {
    const schemaList: IFormSchema[] = cloneDeep(unref(getSchema))
    if (!fields) {
      return
    }

    let fieldList: string[] = isString(fields) ? [fields] : fields
    if (isString(fields)) {
      fieldList = [fields]
    }
    for (const field of fieldList) {
      _removeSchemaByFiled(field, schemaList)
    }
    schemaRef.value = schemaList
  }

  /**
   * @description: Delete based on field name
   */
  function _removeSchemaByFiled(
    field: string,
    schemaList: IFormSchema[]
  ): void {
    if (isString(field)) {
      const index = schemaList.findIndex((schema) => schema.field === field)
      if (index !== -1) {
        delete formModel[field]
        schemaList.splice(index, 1)
      }
    }
  }

  /**
   * @description: Insert after a certain field, if not insert the last
   */
  async function appendSchemaByField(
    schema: IFormSchema,
    prefixField?: string,
    first = false
  ) {
    const schemaList: IFormSchema[] = cloneDeep(unref(getSchema))

    const index = schemaList.findIndex((schema) => schema.field === prefixField)

    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(schema) : schemaList.push(schema)
      schemaRef.value = schemaList
      _setDefaultValue(schema)
      return
    }
    if (index !== -1) {
      schemaList.splice(index + 1, 0, schema)
    }
    _setDefaultValue(schema)

    schemaRef.value = schemaList
  }

  async function resetSchema(
    data: Partial<IFormSchema> | Partial<IFormSchema>[]
  ) {
    let updateData: Partial<IFormSchema>[] = []
    if (isObject(data)) {
      updateData.push(data as IFormSchema)
    }
    if (isArray(data)) {
      updateData = [...data]
    }

    const hasField = updateData.every(
      (item) =>
        item.component === 'Divider' ||
        (Reflect.has(item, 'field') && item.field)
    )

    if (!hasField) {
      error(
        'All children of the form Schema array that need to be updated must contain the `field` field'
      )
      return
    }
    schemaRef.value = updateData as IFormSchema[]
  }

  async function updateSchema(
    data: Partial<IFormSchema> | Partial<IFormSchema>[]
  ) {
    let updateData: Partial<IFormSchema>[] = []
    if (isObject(data)) {
      updateData.push(data as IFormSchema)
    }
    if (isArray(data)) {
      updateData = [...data]
    }

    const hasField = updateData.every(
      (item) =>
        item.component === 'Divider' ||
        (Reflect.has(item, 'field') && item.field)
    )

    if (!hasField) {
      error(
        'All children of the form Schema array that need to be updated must contain the `field` field'
      )
      return
    }
    const schema: IFormSchema[] = []
    updateData.forEach((item) => {
      unref(getSchema).forEach((val: any) => {
        if (val.field === item.field) {
          const newSchema = deepMerge(val, item)
          schema.push(newSchema as IFormSchema)
        } else {
          schema.push(val)
        }
      })
    })
    _setDefaultValue(schema)

    schemaRef.value = uniqBy(schema, 'field')
  }

  function _setDefaultValue(data: IFormSchema | IFormSchema[]) {
    let schemas: IFormSchema[] = []
    if (isObject(data)) {
      schemas.push(data as IFormSchema)
    }
    if (isArray(data)) {
      schemas = [...data]
    }

    const obj: Recordable = {}
    const currentFieldsValue = getFieldsValue()
    schemas.forEach((item) => {
      if (
        item.component != 'Divider' &&
        Reflect.has(item, 'field') &&
        item.field &&
        !isNullOrUnDef(item.defaultValue) &&
        !(item.field in currentFieldsValue)
      ) {
        obj[item.field] = item.defaultValue
      }
    })
    setFieldsValue(obj)
  }

  function getFieldsValue(): Recordable {
    const formEl = unref(formElRef)
    if (!formEl) return {}
    return handleFormValues(toRaw(unref(formModel)))
  }

  /**
   * @description: Is it time
   */
  function itemIsDateType(key: string) {
    return unref(getSchema).some((item: any) => {
      return item.field === key ? dateItemType.includes(item.component) : false
    })
  }

  async function validateFields(
    props?: FormItemProp[] | undefined,
    callback?: Callback | undefined
  ) {
    return unref(formElRef)?.validateFields(props, callback)
  }

  async function validate(cb?: Callback) {
    return await unref(formElRef)?.validate(cb as any)
  }

  async function clearValidate(name?: string | string[]) {
    await unref(formElRef)?.clearValidate(name)
  }

  async function scrollToField(
    name: string,
    options?: ScrollOptions | undefined
  ) {
    await unref(formElRef)?.scrollToField(name, options)
  }

  /**
   * @description: Form submission
   */
  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault()
    const { submitFunc } = unref(getProps)
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc()
      return
    }
    const formEl = unref(formElRef)
    if (!formEl) return
    await validate(function (valid, fields) {
      if (valid) {
        console.log('submit!')
        const res = handleFormValues(toRaw(unref(formModel)))
        emit('submit', res)
      } else {
        console.error('error submit!', fields)
      }
    })
  }

  return {
    handleSubmit,
    clearValidate,
    validate,
    validateFields,
    getFieldsValue,
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByFiled,
    resetFields,
    setFieldsValue,
    scrollToField
  }
}
