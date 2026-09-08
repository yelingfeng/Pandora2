<template>
  <div class="demo-container">
    <h2>TabSwitcher 标签切换器</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <PdBizTabSwitcher
        v-model="activeTab1"
        :tabs="tabs1"
        @change="handleChange1"
      />
      <p class="result">当前选中: <span>{{ activeTab1 }}</span></p>
    </div>

    <div class="demo-section">
      <h3>带数量统计</h3>
      <PdBizTabSwitcher
        v-model="activeTab2"
        :tabs="tabs2"
        @change="handleChange2"
      />
      <p class="result">当前选中: <span>{{ activeTab2 }}</span></p>
    </div>

    <div class="demo-section">
      <h3>禁用某些标签</h3>
      <PdBizTabSwitcher
        v-model="activeTab3"
        :tabs="tabs3"
        @change="handleChange3"
      />
      <p class="result">当前选中: <span>{{ activeTab3 }}</span></p>
    </div>

    <div class="demo-section">
      <h3>自定义样式</h3>
      <PdBizTabSwitcher
        v-model="activeTab4"
        :tabs="tabs4"
        class="custom-tabs"
        @change="handleChange4"
      />
      <p class="result">当前选中: <span>{{ activeTab4 }}</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PdBizTabSwitcher } from '@pandora/components/PdBiz'
import type { ITabItem } from '@pandora/components/PdBiz'

const activeTab1 = ref('all')
const activeTab2 = ref('online')
const activeTab3 = ref('tab1')
const activeTab4 = ref('home')

const tabs1: ITabItem[] = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'doing' },
  { label: '已完成', value: 'done' },
  { label: '已取消', value: 'cancel' }
]

const tabs2: ITabItem[] = [
  { label: '在线', value: 'online', count: 125 },
  { label: '离线', value: 'offline', count: 38 },
  { label: '告警', value: 'alarm', count: 5 },
  { label: '全部', value: 'all', count: 168 }
]

const tabs3: ITabItem[] = [
  { label: '标签1', value: 'tab1' },
  { label: '标签2', value: 'tab2', disabled: true },
  { label: '标签3', value: 'tab3' },
  { label: '标签4', value: 'tab4', disabled: true }
]

const tabs4: ITabItem[] = [
  { label: '首页', value: 'home' },
  { label: '数据', value: 'data' },
  { label: '设置', value: 'settings' }
]

const handleChange1 = (value: string) => {
  console.log('切换标签1:', value)
}

const handleChange2 = (value: string) => {
  console.log('切换标签2:', value)
}

const handleChange3 = (value: string) => {
  console.log('切换标签3:', value)
}

const handleChange4 = (value: string) => {
  console.log('切换标签4:', value)
}
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

.result {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

.result span {
  color: #409eff;
  font-weight: 600;
}

.custom-tabs {
  border-radius: 8px;
  overflow: hidden;
}
</style>
