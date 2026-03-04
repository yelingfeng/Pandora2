const n=`<template>
  <div class="demo-charts">
    <div class="demo-ops">
      <span class="ops-label">速率单位</span>
      <button class="demo-btn" :class="{ active: unit === 'kbps' }" @click="unit = 'kbps'">Kbps</button>
      <button class="demo-btn" :class="{ active: unit === 'mbps' }" @click="unit = 'mbps'">Mbps</button>
      <button class="demo-btn" :class="{ active: unit === 'gbps' }" @click="unit = 'gbps'">Gbps</button>
      <span class="ops-label">小数位</span>
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

const unit = ref('Mbps')
const dp = ref(2)

function buildRateData() {
  const toUnit = (n) => n * 1000
  return [
    { category: '上行', name: '1月', value: toUnit(1200) },
    { category: '上行', name: '2月', value: toUnit(800) },
    { category: '上行', name: '3月', value: toUnit(3500) },
    { category: '下行', name: '1月', value: toUnit(2400) },
    { category: '下行', name: '2月', value: toUnit(12000) },
    { category: '下行', name: '3月', value: toUnit(500) }
  ]
}

function apply() {
  setProps({
    data: buildRateData(),
    chartConfig: {
      autoFormatView: {
        type: 'rate',
        unitName: unit.value,
        decimalPlaces: dp.value
      }
    }
  })
}

onMounted(apply)
watch([unit, dp], apply)
<\/script>

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
`;export{n as default};
