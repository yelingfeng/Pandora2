<template>
  <div class="pandora-page-layout" :style="[{ height: typeof height === 'number' ? height + 'px' : height }, style]">
    <LoadCom v-if="tableLoading" />
    <!-- 表单区域 -->
    <div class="pandora-form-section" ref="formSectionRef">
      <div class="pandora-form-content">
        <!-- VForm 插槽 -->
        <slot name="form"></slot>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="pandora-table-section" :style="{ height: `${calculatedTableHeight}px` }">
      <!-- 表格插槽 -->
      <slot name="table" :height="calculatedTableHeight"></slot>
    </div>
  </div>
</template>

<script lang="ts" name="PdPageLayout" setup>
import { onBeforeUnmount, onMounted, PropType, provide, ref, StyleValue } from 'vue'
import LoadCom from './components/Loading.vue'

defineOptions({ name: 'PdPageLayout' })

// Provide context for child components (like PdForm) to adapt behavior
provide('isInPageLayout', true)

const props = defineProps({
  height: {
    type: [Number, String],
    default: 'calc(100vh - 124px)',
  },
  // 表格基础高度计算
  baseTableHeight: {
    type: Number,
    default: 400,
  },
  // 表格加载状态（由父级控制）
  tableLoading: {
    type: Boolean,
    default: false,
  },
  style: {
    type: [String, Object] as PropType<StyleValue>,
    default: () => ({}),
  },
})

const formSectionRef = ref<HTMLElement | null>(null)
const calculatedTableHeight = ref(props.baseTableHeight)
let resizeObserver: ResizeObserver | null = null

const updateTableHeight = () => {
  if (formSectionRef.value) {
    const actualFormHeight = formSectionRef.value.offsetHeight
    const fixedOffset = 144
    const viewportHeight = window.innerHeight
    const absoluteHeight = viewportHeight - actualFormHeight - fixedOffset
    calculatedTableHeight.value = Math.max(absoluteHeight, 200)
  }
}

const updateLayout = () => {
  updateTableHeight()
}

const handleWindowResize = () => {
  updateLayout()
}

onMounted(() => {
  updateLayout()
  if (formSectionRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateLayout()
    })
    resizeObserver.observe(formSectionRef.value)
  }
  window.addEventListener('resize', handleWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<style lang="less" scoped>
.pandora-page-layout {
  width: 100%;
  min-width: 900px;
  background: #f6f8f9;

  .pandora-form-section {
    position: relative;
    width: 100%;
    background: #fff;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    padding: 10px 18px;
    box-sizing: border-box;
    display: flex;
    min-height: 50px;

    .pandora-form-content {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      min-height: inherit;
      flex-wrap: wrap; // Allow wrapping
    }
  }

  .pandora-table-section {
    margin-top: 15px;
    position: relative;
    width: 100%;
    background: #fff;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    padding: 10px 18px;
    box-sizing: border-box;
  }
}
</style>
