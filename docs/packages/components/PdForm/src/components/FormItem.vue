<script lang="js">
import { deepMerge } from '@pandora/shared/_utils'
import { getSlot } from '@pandora/shared/_utils/helper/tsxHelper'
import { isBoolean, isFunction } from '@pandora/shared/_utils/is'
import { ElCol, ElDivider, ElFormItem } from 'element-plus'
import { upperFirst } from 'lodash-es'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  toRefs,
  unref,
  vShow,
  withDirectives
} from 'vue'
import { componentMap } from '../componentsMap'
import { createPlaceholderMessage } from '../helper'
// import { useItemLabelWidth } from '../hooks/useLabelWidth'
import BasicHelp from './BasicHelp.vue'


export default defineComponent({
  name: 'PandoraBasicFormItem',
  inheritAttrs: false,
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },
    formModel: {
      type: Object,
      default: () => ({})
    },
    formProps: {
      type: Object,
      default: () => ({})
    },
    setFormModel: {
      type: Function,
      default: null
    },
    allDefaultValues: {
      type: Object,
      default: () => ({})
    },
    tableAction: {
      type: Object,
    },
    formActionType: {
      type: Object
    }
  },
  setup(props, { slots }) {
    const { schema } = toRefs(props)

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
        },
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

    function getShow() {
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

    const getComponentsChild = (component) => {
      const { schema, tableAction, formModel, formActionType } = props
      let { componentProps = {} } = unref(schema) || {}
      if (isFunction(componentProps)) {
        componentProps =
          componentProps({
            schema,
            tableAction,
            formModel,
            formActionType
          }) ?? {}
      }
      const opts = (componentProps && componentProps.options) || []
      if (!Array.isArray(opts)) return undefined

      if (component === 'CheckboxGroup') {
        const CheckNode = componentMap.get('Checkbox')
        return opts.map(({ label, value }) =>
          h(CheckNode, { label: value, key: value }, () => label)
        )
      }
      if (component === 'Select') {
        const OptionNode = componentMap.get('SelectOption')
        return opts.map(({ label, value }) =>
          h(OptionNode, { label, value, key: value }, () => label)
        )
      }
      if (component === 'RadioGroup') {
        const RadioNode = componentMap.get('Radio')
        return opts.map(({ label, value }) =>
          h(RadioNode, { label: value, key: value }, () => label)
        )
      }
      return undefined
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
        [eventKey]: (...args) => {
          const [e] = args;
          if (propsData[eventKey]) {
            propsData[eventKey](...args);
          }
          const target = e ? e.target : null;
          const value = target ? (isCheck ? target.checked : target.value) : e;
          props.setFormModel(field, value);
        }
      };
      const Comp = componentMap.get(component);
      const propsData = {
        getPopupContainer: (trigger) => trigger.parentNode,
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


      const bindValue = {
        [valueField || (isCheck ? 'checked' : 'value')]: props.formModel[field],
      };

      // console.log(props.formModel)


      const compAttr = {
        ...propsData,
        ...on,
        ...bindValue,
      };

      if (!Comp) return null

      if (!renderComponentContent) {
        const children = getComponentsChild(component)
        return h(Comp, compAttr, () => children)
      }

      if (isFunction(renderComponentContent)) {
        const slotObj = renderComponentContent(unref(getValues)) || {}
        if (slotObj && typeof slotObj === 'object') {
          return h(Comp, compAttr, slotObj)
        }
        return h(Comp, compAttr, { default: () => slotObj })
      }

      return h(Comp, compAttr, { default: () => renderComponentContent })
    }

    const renderLabelHelpMessage = () => {
      const { label, helpMessage, helpComponentProps, subLabel } = props.schema;
      const renderLabel = subLabel
        ? h('span', null, [
          label,
          ' ',
          h('span', { class: 'text-secondary' }, subLabel)
        ])
        : h('span', null, label)
      const getHelpMessage = isFunction(helpMessage)
        ? helpMessage(unref(getValues))
        : helpMessage;
      if (getHelpMessage !== undefined || (Array.isArray(getHelpMessage) && getHelpMessage.length > 0)) {
        return h('span', null, [
          renderLabel,
          h(BasicHelp, {
            placement: 'top',
            content: getHelpMessage,
            ...(helpComponentProps || {})
          })
        ])
      }
      return h('span', null, [renderLabel])
    }



    const renderItem = () => {
      const { label, slot, rules, render, field, suffix, itemProps, component } = props.schema;
      if (component === 'Divider') {
        const dividerProp = deepMerge({ contentPosition: 'left' }, { ...unref(getComponentsProps) })
        return h(ElCol, { span: 24 }, () =>
          h(ElDivider, dividerProp, () => renderLabelHelpMessage())
        )
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
            return h(
              'div',
              { style: 'display:flex;width:100%;' },
              [
                h('div', { style: 'flex:1;' }, [getContent()]),
                showSuffix ? h('span', { class: 'suffix' }, String(getSuffix)) : null
              ]
            )
          },
          label: () => { return renderLabelHelpMessage() }
        }
        return h(
          ElFormItem,
          {
            prop: field,
            label,
            rules,
            ...(itemProps || {})
          },
          Slots
        )
      }
    }
    onMounted(() => {
      const { field, defaultValue = '' } = unref(schema) || {}
      if (field) props.setFormModel(field, defaultValue)
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
      return withDirectives(
        h(ElCol, { ...realColProps }, () => getContent()),
        [[vShow, isShow]]
      )
    }
  }
})
</script>
