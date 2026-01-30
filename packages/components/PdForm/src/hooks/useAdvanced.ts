import type { ColProps } from 'element-plus'
import type { AdvanceState } from '../types/hooks'
import type { EmitType, IFormProps, IFormSchema } from '../types'
import { ComputedRef, getCurrentInstance, Ref } from 'vue'
import { computed, unref, watch } from 'vue'
import { isBoolean, isFunction, isNumber, isObject } from '@pandora/shared/_utils/is'
import { useBreakpoint } from '@pandora/shared/hooks/event/useBreakpoint'
import { useDebounceFn } from '@vueuse/core'

const BASIC_COL_LEN = 24

interface UseAdvancedContext {
  advanceState: AdvanceState
  emit: EmitType
  getProps: ComputedRef<IFormProps>
  getSchema: ComputedRef<IFormSchema[]>
  formModel: Recordable
  defaultValueRef: Ref<Recordable>
}

export default function ({
  advanceState,
  emit,
  getProps,
  getSchema,
  formModel,
  defaultValueRef
}: UseAdvancedContext) {
  const vm = getCurrentInstance()

  const { realWidthRef, screenEnum, screenRef } = useBreakpoint()
  const getEmptySpan = computed((): number => {
    if (!advanceState.isAdvanced) {
      return 0
    }
    // For some special cases, you need to manually specify additional blank lines
    const emptySpan = unref(getProps).emptySpan || 0

    if (isNumber(emptySpan)) {
      return emptySpan
    }
    if (isObject(emptySpan)) {
      const { span = 0 } = emptySpan
      const screen = unref(screenRef) as string

      const screenSpan = (emptySpan as any)[screen.toLowerCase()]
      return screenSpan || span || 0
    }
    return 0
  })

  const debounceUpdateAdvanced = useDebounceFn(updateAdvanced, 30)

  watch(
    [
      () => unref(getSchema),
      () => advanceState.isAdvanced,
      () => unref(realWidthRef)
    ],
    () => {
      const { showAdvancedButton } = unref(getProps)
      if (showAdvancedButton) {
        debounceUpdateAdvanced()
      }
    },
    { immediate: true }
  )

  function getAdvanced(
    itemCol: Partial<ColProps>,
    itemColSum = 0,
    isLastAction = false
  ) {
    const width = unref(realWidthRef)

    const mdWidth =
      parseInt(itemCol.md as string) ||
      parseInt(itemCol.xs as string) ||
      parseInt(itemCol.sm as string) ||
      (itemCol.span as number) ||
      BASIC_COL_LEN
    const lgWidth = parseInt(itemCol.lg as string) || mdWidth
    const xlWidth = parseInt(itemCol.xl as string) || lgWidth
    const xxlWidth = parseInt((itemCol as any).xxl as string) || xlWidth
    if (width <= screenEnum.MD) {
      itemColSum += mdWidth
    } else if (width < screenEnum.LG) {
      itemColSum += lgWidth
    } else if (width < screenEnum.XL) {
      itemColSum += xlWidth
    } else {
      itemColSum += xxlWidth
    }
    if (isLastAction) {
      advanceState.hideAdvanceBtn = false
      const alwaysShowLines = unref(getProps).alwaysShowLines || 1
      if (itemColSum <= BASIC_COL_LEN * alwaysShowLines) {
        // When less than or equal to alwaysShowLines lines, the collapse and expand buttons are not displayed
        advanceState.hideAdvanceBtn = true
        advanceState.isAdvanced = true
      } else if (
        itemColSum > BASIC_COL_LEN * alwaysShowLines &&
        itemColSum <= BASIC_COL_LEN * (unref(getProps).autoAdvancedLine || 3)
      ) {
        advanceState.hideAdvanceBtn = false

        // More than autoAdvancedLine lines collapsed by default
      } else if (!advanceState.isLoad) {
        advanceState.isLoad = true
        advanceState.isAdvanced = !advanceState.isAdvanced
      }
      return { isAdvanced: advanceState.isAdvanced, itemColSum }
    }
    if (itemColSum > BASIC_COL_LEN * (unref(getProps).alwaysShowLines || 1)) {
      return { isAdvanced: advanceState.isAdvanced, itemColSum }
    } else {
      // The first line is always displayed
      return { isAdvanced: true, itemColSum }
    }
  }

  function updateAdvanced() {
    let itemColSum = 0
    let realItemColSum = 0
    const { baseColProps = {} } = unref(getProps)

    for (const schema of unref(getSchema)) {
      const { show, colProps } = schema
      let isShow = true

      if (isBoolean(show)) {
        isShow = show
      }

      if (isFunction(show)) {
        isShow = show({
          schema: schema,
          model: formModel,
          field: schema.field,
          values: {
            ...unref(defaultValueRef),
            ...formModel
          }
        })
      }

      if (isShow && (colProps || baseColProps)) {
        const { itemColSum: sum, isAdvanced } = getAdvanced(
          { ...baseColProps, ...colProps },
          itemColSum
        )

        itemColSum = sum || 0
        if (isAdvanced) {
          realItemColSum = itemColSum
        }
        schema.isAdvanced = isAdvanced
      }
    }
    // 确保页面发送更新
    vm?.proxy?.$forceUpdate()

    advanceState.actionSpan =
      (realItemColSum % BASIC_COL_LEN) + unref(getEmptySpan)

    getAdvanced(
      unref(getProps).actionColOptions || { span: BASIC_COL_LEN },
      itemColSum,
      true
    )

    emit('advanced-change')
  }

  function handleToggleAdvanced() {
    advanceState.isAdvanced = !advanceState.isAdvanced
  }

  return { handleToggleAdvanced }
}
