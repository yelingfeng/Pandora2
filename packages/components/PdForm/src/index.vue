<template>
  <div class="vpandora-form">
    <el-Form v-bind="getBindValue" :rules="getRules" ref="formRef" :model="formModel" @keypress.enter="handleEnterPress">
      <el-row v-bind="getRow">
        <slot name="formHeader"></slot>
        <template v-for="schema in getSchema" :key="schema.field">
          <FormItem :tableAction="tableAction" :formActionType="formActionType" :schema="schema" :formProps="getProps"
            :allDefaultValues="defaultValueRef" :formModel="formModel" :setFormModel="setFormModel">
            <template #[item]="data" v-for="item in Object.keys($slots)">
              <slot :name="item" v-bind="data || {}"></slot>
            </template>
          </FormItem>
        </template>
        <FormAction v-bind="getFormActionBindProps" @toggle-advanced="handleToggleAdvanced">
          <template #[item]="data" v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormAction>
        <slot name="formFooter"></slot>
      </el-row>
    </el-Form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  ref,
  Ref,
  computed,
  unref,
  onMounted,
} from 'vue'
import type { IFormActionType, IFormSchema, IFormProps } from './types'
import type { AdvanceState } from './types/hooks';
import { ElForm, ElRow ,FormRules } from 'element-plus'
import FormItem from './components/FormItem.vue'
import FormAction from './components/FormAction.vue'
import { createNamespace } from '@/_utils/create'
import { deepMerge } from '@/_utils/'
import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'
import { useAutoFocus } from './hooks/useAutoFocus'
import { createFormContext } from './hooks/useFormContext'
import { useDebounceFn } from '@vueuse/core';
import { FormBasicProps } from './props'
import { dateUtil } from '@/_utils/dateUtil'
import { dateItemType } from './helper'
import { cloneDeep } from 'lodash-es';
import useAdvanced from './hooks/useAdvanced';
const [name] = createNamespace('Form')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: FormBasicProps,
  components: {
    ElForm,
    ElRow,
    FormItem,
    FormAction
  },
  emits: ['advanced-change', 'reset', 'submit', 'register', 'field-value-change'],
  setup(props, { emit, attrs }) {
    const formModel = reactive<Recordable>({})
    const formPropsRef = ref<Partial<IFormProps>>({})
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
          ...unref(formPropsRef),
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

    const getRules = computed(():FormRules =>{
        const { rules={} } = unref(getProps)
        return rules
    })

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
      if (unref(getProps).showAdvancedButton) {
        return cloneDeep(
          schemas.filter((schema) => schema.component !== 'Divider') as IFormSchema[],
        );
      } else {
        return cloneDeep(schemas as IFormSchema[]);
      }
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
    } = useFormEvents({
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
        unref(getProps).submitOnChange && handleSubmit()
      }, 300),
      { deep: true }
    );

    async function setProps(formProps: Partial<IFormProps>): Promise<void> {
      formPropsRef.value = deepMerge(unref(formPropsRef) || {}, formProps);
    }

    function setFormModel(key: string, value: any) {
      formModel[key] = value
      const { validateTrigger } = unref(getBindValue);
      if (!validateTrigger || validateTrigger === 'change') {
        validateFields([key]).catch(() => { });
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

    useAutoFocus({
      getSchema,
      getProps,
      isInitedDefault: isInitedDefaultRef,
      formElRef: formRef as Ref<IFormActionType>,
    });


    onMounted(() => {
      initDefault()
      emit('register', formActionType)
    })


    const { handleToggleAdvanced } = useAdvanced({
      advanceState,
      emit,
      getProps,
      getSchema,
      formModel,
      defaultValueRef,
    });

    return {
      getBindValue,
      handleToggleAdvanced,
      handleEnterPress,
      formModel,
      defaultValueRef,
      advanceState,
      getRow,
      getProps,
      getRules,
      formRef,
      getSchema,
      formActionType: formActionType as any,
      setFormModel,
      getFormActionBindProps: computed(
        (): Recordable => ({ ...getProps.value, ...advanceState }),
      ),
      ...formActionType,
    };
  }
})
</script>
<style>
.vpandora-form {
  position: relative;

  .el-select,
  .el-date-editor.el-input,
  .el-radio-group {
    width: 100%;
  }

  .el-range-editor.el-input__wrapper {
    box-sizing: border-box;
    width: 100%;
  }

  .el-input__wrapper,
  .el-textarea__inner,
  .el-button {
    border-radius: 0;
  }

  .el-form-item__label {
    color: rgb(119, 119, 119);
  }

}
</style>