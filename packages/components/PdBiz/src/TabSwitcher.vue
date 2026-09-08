<template>
  <div
    class="pd-biz-tab-switcher"
    :class="{ 'is-disabled': disabled }"
    :style="{ width: computedWidth }"
  >
    <div
      v-for="(option, index) in tabList"
      :key="option.value ?? index"
      class="tab-item"
      :class="{
        active: modelValue === option.value,
        disabled: disabled || option.disabled
      }"
      @click="handleTabClick(option)"
    >
      <i v-if="option.icon" :class="option.icon"></i>
      <span>{{ option.label }}</span>
      <span v-if="option.count !== undefined" class="tab-count">{{ option.count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ITabSwitcherProps, ITabSwitcherOption } from './types'

defineOptions({
  name: 'PdBizTabSwitcher'
})

const props = withDefaults(defineProps<ITabSwitcherProps>(), {
  modelValue: null,
  options: () => [],
  tabs: () => [],
  disabled: false,
  width: 'auto'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number, option: ITabSwitcherOption]
}>()

const tabList = computed(() => {
  if (props.tabs && props.tabs.length > 0) return props.tabs
  return props.options || []
})

const computedWidth = computed(() => {
  if (typeof props.width === 'number') return `${props.width}px`
  return props.width || 'auto'
})

const handleTabClick = (option: ITabSwitcherOption) => {
  if (props.disabled || option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value, option)
}
</script>

<style lang="scss" scoped>
.pd-biz-tab-switcher {
  display: inline-flex;
  background: #f5f7fa;
  border-radius: 4px;
  padding: 2px;
  height: 32px;
  min-width: 150px;
  box-sizing: border-box;
  vertical-align: middle;

  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .tab-item {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 0 12px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #606266;
    font-size: 13px;
    font-weight: 500;
    background: transparent;
    height: 28px;
    white-space: nowrap;
    box-sizing: border-box;

    i {
      font-size: 14px;
    }

    .tab-count {
      font-size: 12px;
      color: #909399;
      font-weight: 400;
    }

    &:hover:not(.disabled) {
      color: #409eff;
      background: rgba(64, 158, 255, 0.1);
    }

    &.active {
      background: #ffffff;
      color: #409eff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      .tab-count {
        color: #409eff;
      }
    }

    &.disabled {
      cursor: not-allowed;
      color: #c0c4cc;
      background: transparent;

      .tab-count {
        color: #c0c4cc;
      }

      &:hover {
        color: #c0c4cc;
        background: transparent;
      }
    }
  }
}
</style>
