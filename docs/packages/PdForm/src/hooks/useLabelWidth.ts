import type { Ref } from 'vue'
import { computed, unref } from 'vue'
import type { IFormProps, IFormSchema } from '../types/form'
import { isNumber } from '@/_utils'

export function useItemLabelWidth(
  schemaItemRef: Ref<IFormSchema>,
  propsRef: Ref<IFormProps>
) {
  return computed(() => {
    const schemaItem = unref(schemaItemRef)
    const { labelCol = {}, wrapperCol = {} } = schemaItem.itemProps || {}
    const { labelWidth, disabledLabelWidth } = schemaItem

    const {
      labelWidth: globalLabelWidth,
      labelCol: globalLabelCol,
      wrapperCol: globWrapperCol,
      layout
    } = unref(propsRef)

    // If labelWidth is set globally, all items setting
    if (
      (!globalLabelWidth && !labelWidth && !globalLabelCol) ||
      disabledLabelWidth
    ) {
      labelCol.style = {
        textAlign: 'left'
      }
      return { labelCol, wrapperCol }
    }
    let width = labelWidth || globalLabelWidth
    const col = { ...globalLabelCol, ...labelCol }
    const wrapCol = { ...globWrapperCol, ...wrapperCol }

    if (width) {
      width = isNumber(width) ? `${width}px` : width
    }

    return {
      labelCol: { style: { width }, ...col },
      wrapperCol: {
        style: {
          width: layout === 'vertical' ? '100%' : `calc(100% - ${width})`
        },
        ...wrapCol
      }
    }
  })
}
