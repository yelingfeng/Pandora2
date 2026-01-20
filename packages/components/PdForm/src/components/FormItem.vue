<script lang="tsx">
import { deepMerge } from '@/_utils/'
import { getSlot } from '@/_utils/helper/tsxHelper'
import { isBoolean, isFunction } from '@/_utils/is'
import { ElCol, ElDivider, ElFormItem } from 'element-plus'
import { upperFirst } from 'lodash-es'
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  Ref,
  toRefs,
  unref
} from 'vue'
import { componentMap } from '../componentsMap'
import { createPlaceholderMessage } from '../helper'
import type { IFormActionType, IFormProps, IFormSchema } from '../types'
import { ComponentType } from '../types'
// import { useItemLabelWidth } from '../hooks/useLabelWidth'
import BasicHelp from './BasicHelp.vue'


export default defineComponent({
  name: 'PandoraBasicFormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object as PropType<IFormSchema>,
      default: () => ({})
    },
    formModel: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    formProps: {
      type: Object as PropType<IFormProps>,
      default: () => ({})
    },
    setFormModel: {
      type: Function as PropType<(key: string, value: any) => void>,
      default: null
    },
    allDefaultValues: {
      type: Object as PropType<Recordable>,
      default: () => ({})
    },
    tableAction: {
      type: Object as PropType<Recordable>,
    },
    formActionType: {
      type: Object as PropType<IFormActionType>
    }
  },
  setup(props, { slots }) {
    const { schema } = toRefs(props) as {
      schema: Ref<IFormSchema>;
    }

    const getComponentsProps = computed(() => {
      const { schema, tableAction, formModel, formActionType } = props
      const { componentProps = {} } = schema
      if (!isFunction(componentProps)) {
        return componentProps
      }
      return componentProps({ schema, tableAction, formModel, formActionType }) ?? {}
    })


    const getValues = computed(() => {
      const { allDefaultValues, formModel, schema } = props;
      const { mergeDynamicData } = props.formProps;
      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...allDefaultValues,
          ...formModel
        } as Recordable,
        schema: schema
      };
    });


    const getDisable = computed(() => {
      const { disabled: globDisabled } = props.formProps;
      const { dynamicDisabled } = props.schema;
      const { disabled: itemDisabled = false } = unref(getComponentsProps);
      let disabled = !!globDisabled || itemDisabled;
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled;
      }
      if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues));
      }
      return disabled;
    });

    function getShow(): { isShow: boolean; isIfShow: boolean } {
      const { show, ifShow } = props.schema;
      const { showAdvancedButton } = props.formProps;
      const itemIsAdvanced = showAdvancedButton
        ? isBoolean(props.schema.isAdvanced)
          ? props.schema.isAdvanced
          : true
        : true;

      let isShow = true;
      let isIfShow = true;

      if (isBoolean(show)) {
        isShow = show;
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow;
      }
      if (isFunction(show)) {
        isShow = show(unref(getValues));
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(unref(getValues));
      }
      isShow = isShow && itemIsAdvanced;
      return { isShow, isIfShow };
    }

    const getComponentsChild = (component: ComponentType) => {
      let childNode
      const { schema, tableAction, formModel, formActionType } = props
      let { componentProps = {} } = unref(schema)
      if (isFunction(componentProps)) {
        componentProps = componentProps({ schema, tableAction, formModel, formActionType }) ?? {};
      }
      const opts = componentProps.options as any
      if (component === 'CheckboxGroup') {

        childNode = opts.map(
          ({ label, value }: Recordable) => {
            const CheckNode = componentMap.get('Checkbox') as ReturnType<
              typeof defineComponent
            >
            return (
              <CheckNode label={value} key={value}>
                {label}
              </CheckNode>
            )
          }
        )
        return childNode
      } else if (component === 'Select') {
        childNode = opts.map(
          ({ label, value }: Recordable) => {
            const OptionNode = componentMap.get('SelectOption') as ReturnType<
              typeof defineComponent
            >
            return (
              <OptionNode label={label} value={value} key={value}>
                {label}
              </OptionNode>
            )
          }
        )
      } else if (component === 'RadioGroup') {
        childNode = opts.map(
          ({ label, value }: Recordable) => {
            const RadioNode = componentMap.get('Radio') as ReturnType<
              typeof defineComponent
            >
            return (
              <RadioNode label={value} key={value}>
                {label}
              </RadioNode>
            )
          }
        )
      }
      return childNode
    }


    const renderComponent = () => {
      const {
        renderComponentContent,
        component,
        field,
        changeEvent = 'change',
        valueField
      } = props.schema

      const isCheck = component && ['Switch', 'Checkbox'].includes(component);

      const eventKey = `on${upperFirst(changeEvent)}`;

      const on = {
        [eventKey]: (...args: Nullable<Recordable>[]) => {
          const [e] = args;
          if (propsData[eventKey]) {
            propsData[eventKey](...args);
          }
          const target = e ? e.target : null;
          const value = target ? (isCheck ? target.checked : target.value) : e;
          props.setFormModel(field, value);
        }
      };
      const Comp = componentMap.get(component) as ReturnType<typeof defineComponent>;
      const propsData: Recordable = {
        getPopupContainer: (trigger: Element) => trigger.parentNode,
        ...unref(getComponentsProps),
        disabled: unref(getDisable),
      };
      const { autoSetPlaceHolder } = props.formProps;

      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder;
      // RangePicker place is an array
      if (isCreatePlaceholder && component) {
        propsData.placeholder =
          unref(getComponentsProps)?.placeholder || createPlaceholderMessage(component);
      }
      propsData.placeholder = unref(getComponentsProps)?.placeholder;
      propsData.codeField = field;
      propsData.formValues = unref(getValues);


      const bindValue: Recordable = {
        [valueField || (isCheck ? 'checked' : 'value')]: props.formModel[field],
      };

      // console.log(props.formModel)


      const compAttr: Recordable = {
        ...propsData,
        ...on,
        ...bindValue,
      };

      if (!renderComponentContent) {
        return <Comp {...compAttr} v-model={props.formModel[field]}>{getComponentsChild(component)}</Comp>;
      }
      const compSlot = isFunction(renderComponentContent)
        ? { ...renderComponentContent(unref(getValues)) }
        : {
          default: () => renderComponentContent
        };
      return <Comp {...compAttr} v-model={props.formModel[field]}>{compSlot}</Comp>;
    }

    const renderLabelHelpMessage = () => {
      const { label, helpMessage, helpComponentProps, subLabel } = props.schema;
      const renderLabel = subLabel ? (
        <span>
          {label} <span class="text-secondary">{subLabel}</span>
        </span>
      ) : (
        label
      );
      const getHelpMessage = isFunction(helpMessage)
        ? helpMessage(unref(getValues))
        : helpMessage;
      if (getHelpMessage !== undefined || (Array.isArray(getHelpMessage) && getHelpMessage?.length > 0)) {
        return (
          <span>
            {renderLabel}
            <BasicHelp placement="top" content={getHelpMessage} {...helpComponentProps} />
          </span>
        )
      }
      return (<span>{renderLabel}</span>)
    }



    const renderItem = () => {
      const { label, slot, rules, render, field, suffix, itemProps, component } = props.schema;
      if (component === 'Divider') {
        const dividerProp = deepMerge({ contentPosition: 'left' }, { ...unref(getComponentsProps) })
        return (
          <ElCol span={24}>
            <ElDivider {...dividerProp} >{renderLabelHelpMessage()}</ElDivider>
          </ElCol>
        );
      } else {
        const values = unref(getValues);
        const getContent = () => {
          return slot
            ? getSlot(slots, slot, values)
            : render
              ? render(values)
              : renderComponent();
        };

        const showSuffix = !!suffix;
        const getSuffix = isFunction(suffix) ? suffix(unref(getValues)) : suffix;

        const Slots = {
          default: () => {
            return (
              <div style="display:flex;width:100%;"  >
                <div style="flex:1;">{getContent()}</div>
                {showSuffix && <span class="suffix">{getSuffix}</span>}
              </div>
            )
          },
          label: () => { return renderLabelHelpMessage() }
        }
        return (
          <ElFormItem
            prop={field}
            label={label}
            rules={rules}
            v-slots={Slots}
            {...(itemProps as Recordable)}
          > </ElFormItem >
        );
      }
    }
    onMounted(() => {
      const { field,
        defaultValue = '',
      } = unref(schema) as IFormSchema
      props.setFormModel(field, defaultValue)
    })



    return () => {
      const { colProps = {}, colSlot, renderColContent, component } = props.schema;
      if (!componentMap.has(component)) {
        console.error(
          `FormItem component:${component} is an unregistered component Key`
        )
        return null
      }

      const { baseColProps = {} } = props.formProps;
      const realColProps = { ...baseColProps, ...colProps };
      const { isShow } = getShow();
      const values = unref(getValues);

      const getContent = () => {
        return colSlot
          ? getSlot(slots, colSlot, values)
          : renderColContent
            ? renderColContent(values)
            : renderItem();
      };
      return (
        <ElCol {...realColProps} v-show={isShow}>
          {getContent()}
        </ElCol>
      )
    }
  }
})
</script>
