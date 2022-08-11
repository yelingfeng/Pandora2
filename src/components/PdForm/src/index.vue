<script lang="tsx">
import {
  defineComponent,
  reactive,
  watch,
  ref,
  Ref,
  computed,
  unref,
  onMounted
} from 'vue'
import type { IFormActionType, IFormSchema, IFormProps } from './types/form'
import type { AdvanceState } from './types/hooks';
import { ElForm, ElRow } from 'element-plus'
import FormItem from './components/FormItem.vue'
import FormAction from './components/FormAction.vue'
import { createNamespace } from '@/_utils/create'
import { deepMerge } from '@/_utils/'
import { useFormValues } from './hooks/useFormValues'
import { useFormAction } from './hooks/useFormAction'
import { createFormContext } from './hooks/useFormContext'
import { useDebounceFn } from '@vueuse/core';
import { FormBasicProps } from './props/form'
import { dateUtil } from '@/_utils/dateUtil'
import { dateItemType } from './helper'
import { cloneDeep } from 'lodash-es';
import useAdvanced from './hooks/useAdvanced';

const [name] = createNamespace('Form')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: FormBasicProps,
  setup(props, { emit, attrs }) {
    const formModel = reactive<Recordable>({})
    const propsRef = ref<Partial<IFormProps>>({})
    const defaultValueRef = ref<Recordable>({})
    const schemaRef = ref<Nullable<IFormSchema[]>>(null)
    const formRef = ref<Nullable<IFormActionType>>(null)
    const isInitedDefaultRef = ref(false);

    const advanceState = reactive<AdvanceState>({
      isAdvanced: true,
      hideAdvanceBtn: false,
      isLoad: false,
      actionSpan: 6,
    });
    const getProps = computed(
      (): IFormProps => {
        const _props = {
          ...props,
          ...unref(propsRef),
        } as IFormProps
        return _props
      }
    )
    const getRow = computed((): Recordable => {
      const { baseRowStyle = {}, rowProps } = unref(getProps);
      return {
        style: baseRowStyle,
        ...rowProps,
      };
    });

    const getBindValue = computed(
      () => ({ ...attrs, ...props, ...unref(getProps) } as Recordable)
    );

    const getSchema = computed((): IFormSchema[] => {
      const schemas: IFormSchema[] = unref(schemaRef) || (props.schemas as any)
      for (const schema of schemas) {
        const { defaultValue, component } = schema;
        // handle date type
        if (defaultValue && dateItemType.includes(component)) {
          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = dateUtil(defaultValue);
          } else {
            const def: any[] = [];
            defaultValue.forEach((item) => {
              def.push(dateUtil(item));
            });
            schema.defaultValue = def;
          }
        }
      }
      return cloneDeep(schemas as IFormSchema[])
    })

    // 初始化Form values
    const { initDefault, handleFormValues } = useFormValues({
      getProps,
      defaultValueRef,
      getSchema,
      formModel
    })

    const {
      handleSubmit,
      setFieldsValue,
      clearValidate,
      validate,
      validateFields,
      getFieldsValue,
      updateSchema,
      resetSchema,
      appendSchemaByField,
      removeSchemaByFiled,
      resetFields,
      scrollToField
    } = useFormAction({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef: formRef as Ref<IFormActionType>,
      schemaRef: schemaRef as Ref<IFormSchema[]>,
      handleFormValues
    })

    createFormContext({
      resetAction: resetFields,
      submitAction: handleSubmit
    })

    watch(
      () => unref(getProps).model,
      () => {
        const { model } = unref(getProps);
        if (!model) return;
        setFieldsValue(model);
      },
      {
        immediate: true
      }
    );

    watch(
      () => unref(getProps).schemas,
      (schemas) => {
        resetSchema(schemas ?? []);
      }
    );

    watch(
      () => getSchema.value,
      (schema) => {
        if (unref(isInitedDefaultRef)) {
          return;
        }
        if (schema?.length) {
          initDefault();
          isInitedDefaultRef.value = true;
        }
      }
    );

    watch(
      () => formModel,
      useDebounceFn(() => {
        handleSubmit()
      }, 300),
      { deep: true }
    );

    function setFormModel(key: string, value: any) {
      formModel[key] = value
      const { validateTrigger } = unref(getBindValue);
      if (!validateTrigger || validateTrigger === 'change') {
        validateFields([key]).catch((_) => { });
      }
      emit('field-value-change', key, value);
    }

    function handleEnterPress(e: KeyboardEvent) {
      const { autoSubmitOnEnter } = unref(getProps);
      if (!autoSubmitOnEnter) return;
      if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
        const target: HTMLElement = e.target as HTMLElement;
        if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
          handleSubmit();
        }
      }
    }



    async function setProps(formProps: Partial<IFormProps>): Promise<void> {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
    }

    const formActionType: Partial<IFormActionType> = {
      getFieldsValue,
      setFieldsValue,
      resetFields,
      updateSchema,
      resetSchema,
      setProps,
      removeSchemaByFiled,
      appendSchemaByField,
      clearValidate,
      validateFields,
      validate,
      submit: handleSubmit,
      scrollToField: scrollToField
    }
    onMounted(() => {
      initDefault()
      emit('register', formActionType)
    })



    const elItems = unref(getSchema).map(
      ({ field, component, label, ...args }) => {
        const schema = {
          field,
          component,
          label,
          ...args
        }
        const itemAttr = {
          schema,
          formModel,
          setFormModel,
          formActionType,
          allDefaultValues: defaultValueRef
        }
        return <FormItem {...itemAttr}></FormItem>
      }
    )


    const { handleToggleAdvanced } = useAdvanced({
      advanceState,
      emit,
      getProps,
      getSchema,
      formModel,
      defaultValueRef,
    });
    // const getFormActionBindProps = computed(
    //   (): Recordable => ({ ...getProps.value, ...advanceState }),
    // )
    // const fAProp = {
    //   getFormActionBindProps, handleToggleAdvanced
    // }
    // const fASlots = ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter'].forEach(it => {

    // })
    // const formAction = <FormAction {...fAProp}></FormAction>

    return () => {

      const fProps = {
        ref: formRef,
        'onKeypress:enter': handleEnterPress
      }
      return (
        <div class="vpandora-form">
          <ElForm {...getProps.value} {...fProps} >
            <ElRow {...getRow}>{elItems}</ElRow>
          </ElForm>
        </div>
      )
    }
  }
})
</script>
