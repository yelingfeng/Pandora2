<script lang="jsx">
import { deepMerge } from '@pandora/shared/_utils'
import { getSlot } from '@pandora/shared/_utils/helper/tsxHelper'
import { isBoolean, isFunction } from '@pandora/shared/_utils/is'
import { ElCol, ElDivider, ElFormItem } from 'element-plus'
import { upperFirst } from 'lodash-es'
import {
  computed,
  defineComponent,
  onMounted,
  toRefs,
  unref,
} from 'vue'
import { componentMap } from '../componentsMap'
import { createPlaceholderMessage } from '../helper'
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
      type: Object
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

      if (!isFunction(componentProps)) return componentProps
      return componentProps({ schema, tableAction, formModel, formActionType }) ?? {}
    })

    const getValues = computed(() => {
      const { allDefaultValues, formModel, schema } = props
      const { mergeDynamicData } = props.formProps

      return {
        field: schema.field,
        model: formModel,
        values: {
          ...mergeDynamicData,
          ...allDefaultValues,
          ...formModel
        },
        schema: schema
      }
    })

    const getDisable = computed(() => {
      const { disabled: globDisabled } = props.formProps
      const { dynamicDisabled } = props.schema
      const { disabled: itemDisabled = false } = unref(getComponentsProps)

      let disabled = !!globDisabled || itemDisabled

      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
      }
      if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues))
      }
      return disabled
    })

    function getShow() {
      const { show, ifShow } = props.schema
      const { showAdvancedButton } = props.formProps

      const itemIsAdvanced = showAdvancedButton
        ? isBoolean(props.schema.isAdvanced)
          ? props.schema.isAdvanced
          : true
        : true

      let isShow = true
      let isIfShow = true

      if (isBoolean(show)) isShow = show
      if (isBoolean(ifShow)) isIfShow = ifShow
      if (isFunction(show)) isShow = show(unref(getValues))
      if (isFunction(ifShow)) isIfShow = ifShow(unref(getValues))

      isShow = isShow && itemIsAdvanced

      return { isShow, isIfShow }
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
        return opts.map(({ label, value }) => (
          <CheckNode label={value} key={value}>
            {label}
          </CheckNode>
        ))
      }

      if (component === 'Select') {
        const OptionNode = componentMap.get('SelectOption')
        return opts.map(({ label, value }) => (
          <OptionNode label={label} value={value} key={value}>
            {label}
          </OptionNode>
        ))
      }

      if (component === 'RadioGroup') {
        const RadioNode = componentMap.get('Radio')
        return opts.map(({ label, value }) => (
          <RadioNode label={value} key={value}>
            {label}
          </RadioNode>
        ))
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

      const isCheck = component && ['Switch', 'Checkbox'].includes(component)
      const eventKey = `on${upperFirst(changeEvent)}`

      const Comp = componentMap.get(component)
      if (!Comp) return null

      const propsData = {
        getPopupContainer: (trigger) => trigger.parentNode,
        ...unref(getComponentsProps),
        disabled: unref(getDisable),
      }

      const { autoSetPlaceHolder } = props.formProps

      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder
      if (isCreatePlaceholder && component) {
        propsData.placeholder =
          unref(getComponentsProps)?.placeholder || createPlaceholderMessage(component)
      }

      // 你这里原代码写了两次 placeholder，第二次会覆盖第一次
      propsData.placeholder = unref(getComponentsProps)?.placeholder

      propsData.codeField = field
      propsData.formValues = unref(getValues)

      const bindValue = {
        [valueField || (isCheck ? 'checked' : 'modelValue')]: props.formModel[field],
      }

      const on = {
        'onUpdate:modelValue': (...args) => {
          const [e] = args
          if (propsData[eventKey]) {
            propsData[eventKey](...args)
          }

          const target = e ? e.target : null
          const value = target ? (isCheck ? target.checked : target.value) : e

          props.setFormModel(field, value)
        }
      }

      const compAttr = {
        ...propsData,
        ...on,
        ...bindValue,
      }

      if (!renderComponentContent) {
        const children = getComponentsChild(component)
        return <Comp {...compAttr}>{children}</Comp>
      }

      if (isFunction(renderComponentContent)) {
        const slotObj = renderComponentContent(unref(getValues)) || {}
        if (slotObj && typeof slotObj === 'object') {
          return <Comp {...compAttr}>{slotObj}</Comp>
        }
        return <Comp {...compAttr}>{() => slotObj}</Comp>
      }

      return <Comp {...compAttr}>{renderComponentContent}</Comp>
    }

    const renderLabelHelpMessage = () => {
      const { label, helpMessage, helpComponentProps, subLabel } = props.schema

      const renderLabel = subLabel ? (
        <span>
          {label}{' '}
          <span class="text-secondary">{subLabel}</span>
        </span>
      ) : (
        <span>{label}</span>
      )

      const getHelpMessage = isFunction(helpMessage)
        ? helpMessage(unref(getValues))
        : helpMessage

      if (
        getHelpMessage !== undefined ||
        (Array.isArray(getHelpMessage) && getHelpMessage.length > 0)
      ) {
        return (
          <span>
            {renderLabel}
            <BasicHelp
              placement="top"
              content={getHelpMessage}
              {...(helpComponentProps || {})}
            />
          </span>
        )
      }

      return <span>{renderLabel}</span>
    }

    const renderItem = () => {
      const { label, slot, rules, render, field, suffix, itemProps, component } =
        props.schema

      // Divider
      if (component === 'Divider') {
        const dividerProp = deepMerge(
          { contentPosition: 'left' },
          { ...unref(getComponentsProps) }
        )

        return (
          <ElCol span={24}>
            <ElDivider {...dividerProp}>
              {renderLabelHelpMessage()}
            </ElDivider>
          </ElCol>
        )
      }

      const values = unref(getValues)

      const getContent = () => {
        return slot
          ? getSlot(slots, slot, values)
          : render
            ? render(values)
            : renderComponent()
      }

      const showSuffix = !!suffix
      const getSuffix = isFunction(suffix) ? suffix(unref(getValues)) : suffix

      return (
        <ElFormItem
          prop={field}
          label={label}
          rules={rules}
          {...(itemProps || {})}
        >
          {{
            default: () => (
              <div style="display:flex;width:100%;">
                <div style="flex:1;">
                  {getContent()}
                </div>
                {showSuffix ? (
                  <span class="suffix">{String(getSuffix)}</span>
                ) : null}
              </div>
            ),
            label: () => renderLabelHelpMessage(),
          }}
        </ElFormItem>
      )
    }

    onMounted(() => {
      const { field, defaultValue = '' } = unref(schema) || {}
      if (field) props.setFormModel(field, defaultValue)
    })

    return () => {
      const { colProps = {}, colSlot, renderColContent, component } = props.schema

      if (!componentMap.has(component)) {
        console.error(`FormItem component:${component} is an unregistered component Key`)
        return null
      }

      const { baseColProps = {} } = props.formProps
      const realColProps = { ...baseColProps, ...colProps }

      const { isShow } = getShow()
      const values = unref(getValues)

      const getContent = () => {
        return colSlot
          ? getSlot(slots, colSlot, values)
          : renderColContent
            ? renderColContent(values)
            : renderItem()
      }

      return (
        <ElCol {...realColProps} v-show={isShow}>
          {getContent()}
        </ElCol>
      )
    }
  }
})
</script>
