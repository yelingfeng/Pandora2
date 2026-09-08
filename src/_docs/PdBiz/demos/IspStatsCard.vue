<template>
  <div class="demo-container">
    <h2>IspStatsCard 运营商统计卡</h2>

    <div class="demo-section">
      <h3>基础用法 - 三大运营商统计</h3>
      <PdBizIspStatsCard :data="basicData" />
    </div>

    <div class="demo-section">
      <h3>自定义运营商 - 其他网络运营商</h3>
      <PdBizIspStatsCard
        :data="customData"
        :ispMap="customIspMap"
        :ispOrder="['5', '6', '7']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PdBizIspStatsCard } from '@pandora/components/PdBiz'
import type { IIspStatItem } from '@pandora/components/PdBiz'

const basicData = ref<IIspStatItem[]>([
  { isp: '0', count: 1250, flag: '正常' },
  { isp: '0', count: 45, flag: '异常' },
  { isp: '0', count: 12, flag: '警告' },
  { isp: '1', count: 980, flag: '正常' },
  { isp: '1', count: 23, flag: '异常' },
  { isp: '1', count: 8, flag: '警告' },
  { isp: '3', count: 1580, flag: '正常' },
  { isp: '3', count: 67, flag: '异常' },
  { isp: '3', count: 15, flag: '警告' }
])

const customData = ref<IIspStatItem[]>([
  { isp: '5', count: 500, flag: '在线' },
  { isp: '5', count: 50, flag: '离线' },
  { isp: '6', count: 800, flag: '在线' },
  { isp: '6', count: 20, flag: '离线' },
  { isp: '7', count: 600, flag: '在线' },
  { isp: '7', count: 30, flag: '离线' }
])

const customIspMap = {
  '5': '广电',
  '6': '鹏博士',
  '7': '长城宽带'
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
</style>
