<template>
  <div class="pandora-page-tree-layout" :style="{ height: typeof height === 'number' ? height + 'px' : height }">
    <div
      class="pandora-sidebar"
      :class="{ collapsed: isSidebarCollapsed }"
      :style="{ width: currentSidebarWidth + 'px' }"
    >
      <div class="pandora-sidebar-inner">
        <div v-if="$slots['sidebar-header']" class="pandora-sidebar-header">
          <slot name="sidebar-header"></slot>
        </div>
        <div class="pandora-sidebar-content">
          <slot name="sidebar"></slot>
        </div>
      </div>
      <div v-if="showLeftArrow" class="pandora-sidebar-handle" @click="toggleSidebar">
        <el-icon :size="16" color="#3a3a3a">
          <ArrowRight v-if="isSidebarCollapsed" />
          <ArrowLeft v-else />
        </el-icon>
      </div>
    </div>
    <div class="pandora-content" :style="{ width: `calc(100% - ${currentSidebarWidth}px)` }">
      <PdPageLayout
        height="100%"
        :base-table-height="baseTableHeight"
        :table-loading="tableLoading"
        :layout="layout"
        :button-config="buttonConfig"
        :initial-expanded="initialExpanded"
        :form-label-width="formLabelWidth"
        :style="pageLayoutStyle"
        @search="onSearch"
        @reset="onReset"
        @form-toggle="onFormToggle"
      >
        <template #form>
          <slot name="form"></slot>
        </template>
        <template v-if="$slots.toolbar" #toolbar>
          <slot name="toolbar"></slot>
        </template>
        <template #table="{ height: tableHeight }">
          <slot name="table" :height="tableHeight"></slot>
        </template>
      </PdPageLayout>
    </div>
  </div>
</template>

<script lang="ts" name="PdPageTreeLayout" setup>
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import { computed, PropType, ref, StyleValue } from 'vue'
import PdPageLayout from './index.vue'
import type { PageLayoutButton } from './types'

defineOptions({ name: 'PdPageTreeLayout' })

const props = defineProps({
  showLeftArrow: {
    type: Boolean,
    default: true,
  },
  sidebarWidth: {
    type: Number,
    default: 240,
  },
  sidebarCollapsedWidth: {
    type: Number,
    default: 0,
  },
  initialCollapsed: {
    type: Boolean,
    default: false,
  },
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
  layout: {
    type: String as PropType<'default' | 'tabs'>,
    default: 'default',
  },
  buttonConfig: {
    type: Array as PropType<PageLayoutButton[]>,
    default: () => [],
  },
  initialExpanded: {
    type: Boolean,
    default: false,
  },
  formLabelWidth: {
    type: Number,
    default: 120,
  },
  pageLayoutStyle: {
    type: [String, Object] as PropType<StyleValue>,
    default: () => ({}),
  },
})

const emit = defineEmits(['sidebar-toggle', 'search', 'reset', 'form-toggle'])

const onSearch = (btn: PageLayoutButton) => emit('search', btn)
const onReset = (btn: PageLayoutButton) => emit('reset', btn)
const onFormToggle = (expanded: boolean) => emit('form-toggle', expanded)

const isSidebarCollapsed = ref(props.initialCollapsed)

const currentSidebarWidth = computed(() =>
  isSidebarCollapsed.value ? props.sidebarCollapsedWidth : props.sidebarWidth,
)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
  emit('sidebar-toggle', isSidebarCollapsed.value)
}
</script>

<style lang="less" scoped>
.pandora-page-tree-layout {
  display: flex;
  width: 100%;
  align-items: stretch;
  position: relative;
  background: #f0f2f5;

  .pandora-sidebar {
    flex: none;
    background: #fff;
    border-right: 1px solid #ebeef5;
    overflow: visible;
    position: relative;
    transition: width 0.2s ease;
    height: 100%;
    z-index: 10;

    .pandora-sidebar-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 10px 12px;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
    }

    &.collapsed {
      .pandora-sidebar-inner {
        padding: 0;
        display: none;
      }
    }

    .pandora-sidebar-header {
      flex: none;
    }

    .pandora-sidebar-content {
      flex: 1;
      overflow: auto;
    }

    .pandora-sidebar-handle {
      position: absolute;
      top: 50%;
      right: -10px;
      transform: translateY(-50%);
      width: 16px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      border: 1px solid rgb(229, 229, 229);
      border-radius: 0px 2px 2px 0px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      z-index: 10;

      &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
      }
    }
  }

  .pandora-content {
    flex: 1;
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
}
</style>
