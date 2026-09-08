<template>
  <div class="pd-biz-button-picker">
    <el-segmented
      v-model="internalValue"
      :options="segmentedOptions"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { IButtonPickerProps } from './types'

defineOptions({
  name: 'PdBizButtonPicker'
})

const props = withDefaults(defineProps<IButtonPickerProps>(), {
  value: undefined,
  options: () => []
})

const emit = defineEmits<{
  input: [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

const internalValue = ref(props.value)

// 转换为 el-segmented 需要的格式
const segmentedOptions = computed(() => {
  return props.options.map((option) => ({
    label: option.label,
    value: option.value,
    disabled: option.disabled || false
  }))
})

watch(
  () => props.value,
  (newVal) => {
    internalValue.value = newVal
  }
)

const handleChange = (value: string | number | boolean) => {
  internalValue.value = value
  emit('input', value)
  emit('change', value)
}

defineExpose({
  handleChange,
  internalValue,
  segmentedOptions
})
</script>

<style lang="scss" scoped>
.pd-biz-button-picker {
  display: inline-flex;

  :deep(.el-segmented) {
    // 使用 CSS 变量覆盖默认样式
    --el-segmented-bg-color: rgba(244, 244, 255, 1);
    --el-segmented-item-selected-color: #323639;
    --el-segmented-item-selected-bg-color: rgba(255, 255, 255, 1);
    --el-segmented-color: #76717a;
    --el-border-radius-base: 8px;

    padding: 4px;

    .el-segmented__item {
      font-size: 14px;
      padding: 4px 12px;
      height: 26px;
      line-height: 1.2;
      font-weight: 500;
      // 使用更平滑的过渡，避免闪烁
      transition: color 0.2s ease, background-color 0.2s ease, font-weight 0.1s ease;

      &:hover:not(.is-disabled):not(.is-selected) {
        background-color: rgba(0, 0, 0, 0.03);
        color: rgba(31, 41, 55, 1);
      }

      &.is-selected {
        font-weight: 600;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.03);
        // 确保选中状态立即生效，不延迟
        transition: color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease, font-weight 0s;
      }

      &.is-disabled {
        background-color: rgba(229, 231, 235, 1);
        color: rgba(156, 163, 175, 1);
        cursor: not-allowed;
        opacity: 0.7;
      }
    }

    .el-segmented__item-label {
      line-height: 1.2;
    }

    // 移除 el-segmented 的指示器动画，避免闪烁
    .el-segmented__group {
      position: relative;
    }
  }
}
</style>
