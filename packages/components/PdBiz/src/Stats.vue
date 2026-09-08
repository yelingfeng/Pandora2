<template>
  <div class="pd-biz-stats" :class="{ 'auto-layout': layout === 'auto' && renderData.length <= 4 }">
    <div class="stats-container" :class="{ 'auto-container': layout === 'auto' && renderData.length <= 4 }">
      <div
        v-for="(item, index) in renderData"
        :key="index"
        class="stats-card"
        :class="{ 'auto-card': layout === 'auto' && renderData.length <= 4 }"
        :style="getCardStyle()"
      >
        <div class="card-left">
          <div class="icon-wrapper">
            <i v-if="item.icon" :class="item.icon" />
            <el-icon v-else><DataLine /></el-icon>
          </div>
        </div>
        <div class="card-right" :class="{ 'card-right-horizontal': layout === 'auto' && renderData.length <= 4 }">
          <div class="card-label" :class="{ 'card-label-horizontal': layout === 'auto' && renderData.length <= 4 }">
            {{ item.label }}
          </div>
          <div class="card-value" :class="{ 'card-value-horizontal': layout === 'auto' && renderData.length <= 4 }">
            {{ formatValue(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DataLine } from '@element-plus/icons-vue'
import type { IStatsProps, IStatsItem } from './types'

defineOptions({
  name: 'PdBizStats'
})

const props = withDefaults(defineProps<IStatsProps>(), {
  renderData: () => [],
  layout: 'flex'
})

const formatValue = (item: IStatsItem): string => {
  const numValue = Number(item.value)

  if (numValue >= 100000000) {
    const val = (numValue / 100000000).toFixed(item.decimals ?? 2)
    return `${val}${item.suffix ?? '亿'}`
  } else if (numValue >= 10000) {
    const val = (numValue / 10000).toFixed(item.decimals ?? 2)
    return `${val}${item.suffix ?? '万'}`
  } else {
    return `${numValue}${item.suffix ?? ''}`
  }
}

const getCardStyle = () => {
  if (props.layout !== 'auto' || props.renderData.length > 4) {
    return {}
  }

  const count = props.renderData.length
  const gap = 10

  let width = '100%'
  if (count === 2) {
    width = `calc(50% - ${gap}px)`
  } else if (count === 3) {
    width = `calc(33.333% - ${gap}px)`
  } else if (count === 4) {
    width = `calc(25% - ${gap}px)`
  }

  return {
    width: width,
    'margin-bottom': count > 1 ? '2px' : '0'
  }
}
</script>

<style scoped lang="scss">
.pd-biz-stats {
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 10px 6px;
  overflow-x: auto;
}

.stats-container {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.stats-card {
  display: flex;
  align-items: center;
  background: #f5f7fa;
  padding: 12px 16px;
  border-radius: 10px;
  min-width: 120px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.auto-layout {
  overflow-x: visible;
  white-space: normal;
}

.auto-container {
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
}

.auto-card {
  flex: 1;
  min-width: 0;
  margin-bottom: 0;
  padding: 5px 8px;
  min-height: 50px;
  height: 50px;
}

.card-left {
  margin-right: 12px;
}

.auto-layout .card-left {
  margin-right: 12px;
}

.icon-wrapper {
  width: 36px;
  height: 36px;
  background-color: #e0ebff;
  color: #2673ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 18px;
}

.auto-layout .icon-wrapper {
  width: 30px;
  height: 30px;
  font-size: 12px;
}

.card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card-right-horizontal {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-value {
  font-size: 20px;
  font-weight: bold;
  color: #666;
}

.card-value-horizontal {
  margin-left: 6px;
  flex-shrink: 0;
  font-size: 18px;
  text-align: right;
}

.card-label {
  font-size: 14px;
  color: #909399;
  margin-top: 4px;
}

.card-label-horizontal {
  margin-top: 0;
  text-align: left;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
</style>
