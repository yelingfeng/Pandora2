<template>
  <div class="demo-container">
    <h2>Stats 统计数据展示</h2>

    <div class="demo-section">
      <h3>基础用法 - 自动布局</h3>
      <PdBizStats :renderData="statsData1" layout="auto" />
    </div>

    <div class="demo-section">
      <h3>2个数据项</h3>
      <PdBizStats :renderData="statsData2" layout="auto" />
    </div>

    <div class="demo-section">
      <h3>3个数据项</h3>
      <PdBizStats :renderData="statsData3" layout="auto" />
    </div>

    <div class="demo-section">
      <h3>4个数据项</h3>
      <PdBizStats :renderData="statsData4" layout="auto" />
    </div>

    <div class="demo-section">
      <h3>自定义布局 - 超过4个数据项</h3>
      <PdBizStats :renderData="statsData5" layout="flex" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PdBizStats } from '@pandora/components/PdBiz'
import type { IStatsItem } from '@pandora/components/PdBiz'

const statsData1 = ref<IStatsItem[]>([
  { label: '总用户数', value: 12580, icon: 'icon-user' }
])

const statsData2 = ref<IStatsItem[]>([
  { label: '总用户数', value: 12580, icon: 'icon-user' },
  { label: '活跃用户', value: 8960, icon: 'icon-active' }
])

const statsData3 = ref<IStatsItem[]>([
  { label: '总用户数', value: 12580 },
  { label: '活跃用户', value: 8960 },
  { label: '新增用户', value: 456 }
])

const statsData4 = ref<IStatsItem[]>([
  { label: '总用户数', value: 12580 },
  { label: '活跃用户', value: 8960 },
  { label: '新增用户', value: 456 },
  { label: '流失用户', value: 23 }
])

const statsData5 = ref<IStatsItem[]>([
  { label: '总用户数', value: 12580 },
  { label: '活跃用户', value: 8960 },
  { label: '新增用户', value: 456 },
  { label: '流失用户', value: 23 },
  { label: '在线用户', value: 3450 },
  { label: '离线用户', value: 5510 }
])
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

h3 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #666;
  font-weight: 500;
}
</style>
