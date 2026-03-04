<template>
  <div class="demo-charts">
    <div class="demo-ops">
      <span class="ops-label">Number 小数位</span>
      <button class="demo-btn" :class="{ active: dp === 0 }" @click="dp = 0">0</button>
      <button class="demo-btn" :class="{ active: dp === 1 }" @click="dp = 1">1</button>
      <button class="demo-btn" :class="{ active: dp === 2 }" @click="dp = 2">2</button>
    </div>
    <Charts class="demo-echarts" @register="register" />
  </div>
</template>

<script setup>
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted, ref, watch } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'basicBar',
})

const dp = ref(2)

function buildNumberData() {
  return [
    { category: 'A类', name: '1月', value: 3_800_000 },
    { category: 'A类', name: '2月', value: 24_600_000 },
    { category: 'A类', name: '3月', value: 980_000_000 },
    { category: 'B类', name: '1月', value: 12_300_000 },
    { category: 'B类', name: '2月', value: 540_000_000 },
    { category: 'B类', name: '3月', value: 1_200_000_000 }
  ]
}

function apply() {
  setProps({
    data: buildNumberData(),
    chartConfig: {
      autoFormatView: {
        type: 'num',
        decimalPlaces: dp.value,
        unitName: ''
      }
    }
  })
}

onMounted(apply)
watch([dp], apply)
</script>

<style scoped>
.demo-charts {
  height: 400px;
  width: 100%;
}

.demo-ops {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}

.ops-label {
  font-size: 12px;
  color: #666;
}

.demo-btn {
  height: 26px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #1a1a1a;
  cursor: pointer;
}

.demo-btn.active {
  border-color: #5B8FF9;
  color: #5B8FF9;
}

.demo-echarts {
  height: calc(100% - 40px);
}
</style>
