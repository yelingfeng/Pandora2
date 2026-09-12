<template>
  <div
    ref="layoutRoot"
    :class="['pandora-page-layout', layoutClass]"
    :style="containerStyle"
  >
    <LoadCom v-if="tableLoading" />
    <div
      ref="formSectionRef"
      :class="['pandora-form-section', { 'pandora-form-section--expanded': isFormExpanded }]"
    >
      <div
        class="pandora-form-content"
        :style="{ ...formStyle, maxWidth: `calc(100% - ${buttonGroupWidth}px)` }"
      >
        <slot name="form"></slot>
      </div>
      <div class="pandora-button-group" :style="buttonGroupStyle">
        <div v-if="buttonConfig.length" class="pandora-action-buttons">
          <div class="pandora-button-section">
            <el-button
              v-for="button in buttonConfig"
              :key="button.key"
              :size="(button.size as any) || 'default'"
              :type="(button.type as any) || 'default'"
              @click="handleButtonClick(button)"
            >
              <el-icon v-if="isComponentIcon(button.icon)" class="pandora-page-layout-btn-icon">
                <component :is="button.icon" />
              </el-icon>
              <i v-else-if="button.icon" :class="button.icon"></i>
              {{ button.label }}
            </el-button>
          </div>
          <div class="pandora-toggle-section">
            <el-button
              v-show="canToggleForm"
              type="primary"
              link
              class="pandora-toggle-btn"
              @click="toggleForm"
            >
              <i :class="isFormExpanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
              {{ isFormExpanded ? '收起' : '展开' }}
            </el-button>
          </div>
        </div>
        <slot v-else name="buttons" :toggle-form="toggleForm" :is-expanded="isFormExpanded"></slot>
      </div>
    </div>
    <div ref="tableSectionRef" class="pandora-table-section">
      <div v-if="$slots.toolbar" ref="toolbarSectionRef" class="pandora-table-toolbar">
        <slot name="toolbar"></slot>
      </div>
      <div ref="tableBodyRef" class="pandora-table-body">
        <slot name="table" :height="calculatedTableHeight"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElIcon } from 'element-plus'
import type { PropType, StyleValue } from 'vue'
import {
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue'
import LoadCom from './components/Loading.vue'
import type { PageLayoutButton } from './types'

defineOptions({ name: 'PdPageLayout' })

provide('isInPageLayout', true)

const props = defineProps({
  /** 顶栏 50 + 页签 44 ≈ 94；padding 用 border-box 计入高度 */
  height: {
    type: [Number, String],
    default: 'calc(100vh - 94px)',
  },
  baseTableHeight: {
    type: Number,
    default: 400,
  },
  tableLoading: {
    type: Boolean,
    default: false,
  },
  initialExpanded: {
    type: Boolean,
    default: false,
  },
  formLabelWidth: {
    type: Number,
    default: 120,
  },
  buttonConfig: {
    type: Array as PropType<PageLayoutButton[]>,
    default: () => [],
  },
  /**
   * 布局风格：
   * - default：独立页（灰底 + 外间距 + 白卡片分块）
   * - tabs：Tab 内嵌页（去掉外层灰底/外边距，避免与外层容器叠套）
   */
  layout: {
    type: String as PropType<'default' | 'tabs'>,
    default: 'default',
    validator: (v: string) => ['default', 'tabs'].includes(v),
  },
  style: {
    type: [String, Object] as PropType<StyleValue>,
    default: () => ({}),
  },
})

const emit = defineEmits(['search', 'reset', 'form-toggle'])
const instance = getCurrentInstance()

const layoutRoot = ref<HTMLElement | null>(null)
const formSectionRef = ref<HTMLElement | null>(null)
const tableSectionRef = ref<HTMLElement | null>(null)
const toolbarSectionRef = ref<HTMLElement | null>(null)
const tableBodyRef = ref<HTMLElement | null>(null)

const formHeight = ref(0)
const isFormExpanded = ref(false)
const formStyle = ref<Record<string, string>>({})
const calculatedTableHeight = ref(props.baseTableHeight)
const buttonGroupWidth = ref(0)
const formItemWidth = ref(0)
const visibleItemCount = ref(3)
const canToggleForm = ref(false)

let resizeTimer: ReturnType<typeof setTimeout> | null = null
let formLayoutRetryTimer: ReturnType<typeof setTimeout> | null = null
let formLayoutRetryCount = 0
let resizeObserver: ResizeObserver | null = null

const layoutClass = computed(() =>
  props.layout === 'tabs' ? 'pandora-page-layout--tabs' : '',
)

const containerStyle = computed(() => {
  const h = props.height
  const heightValue = typeof h === 'number' ? `${h}px` : h
  const extraStyle = props.style
  if (typeof extraStyle === 'string') {
    return { height: heightValue }
  }
  return { height: heightValue, ...extraStyle }
})

const buttonGroupStyle = computed(() => {
  if (isFormExpanded.value) {
    return { height: 'auto' }
  }
  return { height: formHeight.value ? `${formHeight.value}px` : 'auto' }
})

watch(formHeight, () => {
  if (formHeight.value > 0) updateTableHeight()
})

const isComponentIcon = (icon: PageLayoutButton['icon']) => icon && typeof icon !== 'string'

const refreshLayout = () => {
  updateFormDisplay()
  updateTableHeight()
}

const handleWindowResize = () => {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    updateFormDisplay()
    updateTableHeight()
  }, 100)
}

const calculateFormItemWidth = (availableWidth: number, itemCount: number) => {
  return Math.floor(availableWidth / itemCount) - 30
}

const setFormItemContentStyles = (content: HTMLElement | null, isCollapsed = false) => {
  if (!content) return
  content.style.width = `calc(100% - ${props.formLabelWidth}px)`
  const input = content.querySelector('.el-input') as HTMLElement | null
  if (input && isCollapsed) input.style.setProperty('width', '100%', 'important')
  const inputInner = content.querySelector('.el-input__inner') as HTMLElement | null
  if (inputInner && isCollapsed) inputInner.style.setProperty('width', '100%', 'important')
  const select = content.querySelector('.el-select') as HTMLElement | null
  if (select) select.style.setProperty('width', '100%', 'important')
}

const setFormItemBaseStyles = (item: HTMLElement, width: number, isCollapsed = false) => {
  item.style.display = 'inline-flex'
  item.style.setProperty('width', `${Math.max(width, 120)}px`, 'important')
  item.style.flex = 'none'
  item.style.boxSizing = 'border-box'
  item.style.marginBottom = isCollapsed ? '0' : '15px'
}

const handleCollapsedFormItems = (
  formItems: NodeListOf<HTMLElement>,
  visibleCount: number,
  itemWidth: number,
) => {
  formItems.forEach((item, index) => {
    setFormItemBaseStyles(item, itemWidth, true)
    setFormItemContentStyles(item.querySelector('.el-form-item__content'), true)
    if (index >= visibleCount) item.style.display = 'none'
  })
}

const handleExpandedFormItems = (formItems: NodeListOf<HTMLElement>, itemWidth: number) => {
  formItems.forEach((item) => {
    setFormItemBaseStyles(item, itemWidth, false)
    setFormItemContentStyles(item.querySelector('.el-form-item__content'), false)
  })
}

const calculateAndSetFormHeight = (
  formItems: NodeListOf<HTMLElement>,
  visibleCount: number,
  isExpanded: boolean,
) => {
  if (!isExpanded) {
    nextTick(() => {
      let maxHeight = 0
      for (let i = 0; i < Math.min(visibleCount, formItems.length); i++) {
        const item = formItems[i]
        if (item.style.display !== 'none') maxHeight = Math.max(maxHeight, item.offsetHeight)
      }
      formHeight.value = Math.max(maxHeight + 20, 50)
      formStyle.value = { height: `${formHeight.value}px`, overflow: 'visible' }
      updateTableHeight()
    })
  } else {
    formStyle.value = { height: 'auto', overflow: 'visible' }
    nextTick(() => {
      formHeight.value = formSectionRef.value?.offsetHeight || 0
      updateTableHeight()
    })
  }
}

const updateFormDisplay = () => {
  nextTick(() => {
    const formSection = formSectionRef.value
    if (!formSection) return

    const buttonGroup = formSection.querySelector('.pandora-button-group') as HTMLElement | null
    if (buttonGroup) buttonGroupWidth.value = buttonGroup.offsetWidth

    const formContent = formSection.querySelector('.pandora-form-content') as HTMLElement | null
    if (!formContent) return

    const formItems = formContent.querySelectorAll('.el-form-item') as NodeListOf<HTMLElement>
    if (!formItems.length) {
      updateTableHeight()
      return
    }

    const availableWidth = formContent.offsetWidth
    if (availableWidth < 80) {
      formLayoutRetryCount += 1
      if (formLayoutRetryCount <= 20) {
        if (formLayoutRetryTimer) clearTimeout(formLayoutRetryTimer)
        formLayoutRetryTimer = setTimeout(() => updateFormDisplay(), 120)
      }
      return
    }

    formLayoutRetryCount = 0
    if (formLayoutRetryTimer) clearTimeout(formLayoutRetryTimer)

    const safety = 40
    const minItemWidth = props.formLabelWidth + 180
    const byWidth = Math.floor((availableWidth - safety) / Math.max(minItemWidth, 1))

    if (formItems.length <= 2) {
      visibleItemCount.value = formItems.length
      canToggleForm.value = false
    } else {
      visibleItemCount.value = Math.max(1, Math.min(byWidth, 3, formItems.length))
      canToggleForm.value = formItems.length > visibleItemCount.value
    }

    if (!isFormExpanded.value) {
      const cols = Math.min(visibleItemCount.value, formItems.length)
      const width = calculateFormItemWidth(availableWidth - safety, cols)
      handleCollapsedFormItems(formItems, visibleItemCount.value, width)
      calculateAndSetFormHeight(formItems, visibleItemCount.value, false)
    } else {
      const cols = Math.min(visibleItemCount.value, formItems.length)
      formItemWidth.value = calculateFormItemWidth(availableWidth - safety, cols)
      handleExpandedFormItems(formItems, formItemWidth.value)
      calculateAndSetFormHeight(formItems, visibleItemCount.value, true)
    }
  })
}

const toggleForm = () => {
  if (!canToggleForm.value) return
  isFormExpanded.value = !isFormExpanded.value
  updateFormDisplay()
  emit('form-toggle', isFormExpanded.value)
}

const updateTableHeight = () => {
  nextTick(() => {
    const tableSection = tableSectionRef.value
    const tableBody = tableBodyRef.value
    if (!tableSection || !tableBody) return

    const bodyHeight = tableBody.clientHeight
    if (bodyHeight > 0) {
      calculatedTableHeight.value = Math.max(Math.floor(bodyHeight), 200)
      return
    }

    const style = window.getComputedStyle(tableSection)
    const padY =
      (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0)
    const toolbarH = toolbarSectionRef.value?.offsetHeight || 0
    calculatedTableHeight.value = Math.max(
      Math.floor(tableSection.clientHeight - padY - toolbarH),
      200,
    )
  })
}

const handleButtonClick = (button: PageLayoutButton) => {
  if (button.key === 'search') {
    emit('search', button)
  } else if (button.key === 'reset') {
    emit('reset', button)
  } else {
    instance?.emit(button.event || button.key, button)
  }
}

const initFormHeight = () => {
  nextTick(() => {
    if (formSectionRef.value) {
      updateFormDisplay()
      updateTableHeight()
    }
  })
}

onMounted(() => {
  isFormExpanded.value = props.initialExpanded
  initFormHeight()
  window.addEventListener('resize', handleWindowResize)

  nextTick(() => {
    if (typeof ResizeObserver === 'undefined') return
    resizeObserver = new ResizeObserver(() => {
      updateFormDisplay()
      updateTableHeight()
    })
    if (layoutRoot.value) resizeObserver.observe(layoutRoot.value)
    if (formSectionRef.value) resizeObserver.observe(formSectionRef.value)
    if (tableSectionRef.value) resizeObserver.observe(tableSectionRef.value)
    if (toolbarSectionRef.value) resizeObserver.observe(toolbarSectionRef.value)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (resizeTimer) clearTimeout(resizeTimer)
  if (formLayoutRetryTimer) clearTimeout(formLayoutRetryTimer)
})

defineExpose({
  refreshLayout,
  syncCrudHeight: refreshLayout,
})
</script>

<style lang="less" scoped>
.pandora-page-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 900px;
  box-sizing: border-box;
  padding: 12px 16px 16px;
  overflow: hidden;
  background: #f0f2f5;

  .pandora-form-section {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 10px 18px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;

    &.pandora-form-section--expanded {
      align-items: flex-start;

      .pandora-form-content {
        align-items: flex-start;
      }

      .vpandora-form {
        align-items: flex-start;
      }

      .pandora-button-group {
        align-self: center;
      }

      .pandora-action-buttons {
        height: auto;
        align-items: center;
      }
    }

    &:not(.pandora-form-section--expanded) {
      :deep(.vpandora-form .el-col) {
        margin-bottom: 0 !important;
      }
    }

    .pandora-form-content {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      min-height: inherit;
      flex-wrap: nowrap;
    }

    .vpandora-form {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      min-height: 100%;

      :deep(.el-form-item) {
        align-items: center;
      }

      :deep(.el-form-item .el-form-item__content) {
        .el-input,
        .el-input .el-input__inner {
          width: 100% !important;
        }
      }
    }

    .pandora-button-group {
      display: flex;
      gap: 16px;
      flex-shrink: 0;
      min-height: 50px;
      align-items: center;

      .pandora-action-buttons {
        display: flex;
        align-items: center;
        gap: 16px;
        height: 100%;

        .pandora-button-section {
          display: flex;
          gap: 4px;
          align-items: center;

          .el-button {
            padding: 0 12px;
            height: 32px;
            font-size: 12px;
            border-radius: 2px;

            .pandora-page-layout-btn-icon {
              margin-right: 4px;
            }

            &:not(.el-button--primary) {
              background: #fff;
              border-color: #d9d9d9;
              color: #333;

              &:hover {
                background: #fff;
                border-color: #0064c8;
                color: #0064c8;
              }
            }

            &.el-button--primary {
              background: #0064c8;
              border-color: #0064c8;

              &:hover {
                background: #0054a8;
                border-color: #0054a8;
              }
            }
          }
        }

        .pandora-toggle-section .pandora-toggle-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          color: #0064c8;

          i {
            font-size: 16px;
            color: #0064c8;
          }
        }
      }
    }
  }

  .pandora-table-section {
    flex: 1;
    min-height: 0;
    margin-top: 12px;
    width: 100%;
    background: #fff;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 12px 16px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .pandora-table-toolbar {
      flex-shrink: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;

      :deep(.el-button) {
        height: 32px;
        min-height: 32px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    .pandora-table-body {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  }

  &--tabs {
    padding: 0;
    background: transparent;
    min-width: 0;

    .pandora-form-section {
      padding: 4px 0 8px;
      box-shadow: none;
      border-radius: 0;
      background: transparent;
      border-bottom: 1px solid #ebeef5;
    }

    .pandora-table-section {
      margin-top: 0;
      padding: 10px 0 0;
      box-shadow: none;
      border-radius: 0;
      background: transparent;
    }

    .pandora-table-toolbar {
      margin-bottom: 8px;
    }
  }
}
</style>
