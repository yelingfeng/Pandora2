const n=`<template>
  <div class="demo-charts">
    <div class="demo-ops">
      <div class="ops-row">
        <span class="ops-label">主题</span>
        <button class="demo-btn" :class="{ active: themeMode === 'light' }" @click="themeMode = 'light'">Light</button>
        <button class="demo-btn" :class="{ active: themeMode === 'dark' }" @click="themeMode = 'dark'">Dark</button>
      </div>
      <div class="ops-row">
        <span class="ops-label">平滑</span>
        <button class="demo-btn" :class="{ active: smooth }" @click="smooth = true">开</button>
        <button class="demo-btn" :class="{ active: !smooth }" @click="smooth = false">关</button>
      </div>
      <div class="ops-row">
        <span class="ops-label">图例</span>
        <button class="demo-btn" :class="{ active: legendShow }" @click="legendShow = true">显示</button>
        <button class="demo-btn" :class="{ active: !legendShow }" @click="legendShow = false">隐藏</button>
      </div>
      <div class="ops-row">
        <span class="ops-label">配色</span>
        <button class="demo-btn" :class="{ active: colorPreset === 'light' }"
          @click="colorPreset = 'light'">主题1</button>
        <button class="demo-btn" :class="{ active: colorPreset === 'dark' }" @click="colorPreset = 'dark'">主题2</button>
      </div>
      <div class="ops-row">
        <span class="ops-label">缩放</span>
        <button class="demo-btn" :class="{ active: dataZoomOn }" @click="dataZoomOn = true">开</button>
        <button class="demo-btn" :class="{ active: !dataZoomOn }" @click="dataZoomOn = false">关</button>
        <span class="ops-label">起始</span>
        <button class="demo-btn" :class="{ active: dataZoomStart === 0 }" @click="dataZoomStart = 0">0</button>
        <button class="demo-btn" :class="{ active: dataZoomStart === 60 }" @click="dataZoomStart = 60">60</button>
        <button class="demo-btn" :class="{ active: dataZoomStart === 80 }" @click="dataZoomStart = 80">80</button>
      </div>
    </div>
    <Charts class="demo-echarts" @register="register" />
  </div>
</template>

<script setup>
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted, ref, watch } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'line',
  subChartType: 'line01',
})

const themeMode = ref('light')
const smooth = ref(true)
const legendShow = ref(true)
const colorPreset = ref('light')
const dataZoomOn = ref(true)
const dataZoomStart = ref(80)

const COLORS_LIGHT = ['#6efbbf',
  '#40c057',
  '#ffd351',
  '#ff8e43',
  '#f56b6d',]
const COLORS_DARK = ['#FF0087', '#FFBF00',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF99C3',]

function applyConfig() {
  const colors = colorPreset.value === 'dark' ? COLORS_DARK : COLORS_LIGHT
  setProps({
    chartConfig: {
      themeMode: themeMode.value,
      colors,
      smooth: smooth.value,
      legend: { show: legendShow.value },
      dataZoom: { show: dataZoomOn.value, start: dataZoomStart.value }
    }
  })
}

watch([themeMode, smooth, legendShow, colorPreset, dataZoomOn, dataZoomStart], applyConfig, { immediate: true })

function buildMockDaysData(dayCount = 180) {
  const groups = ['A类', 'B类', 'C类', 'D类']
  const data = []
  groups.forEach((g, gi) => {
    const base = 100 + gi * 40
    for (let i = 1; i <= dayCount; i++) {
      const name = \`Day\${String(i).padStart(3, '0')}\`
      const noise = (Math.random() - 0.5) * 20
      const wave = Math.sin(i / 12 + gi) * 25
      const value = Math.max(0, Math.round(base + wave + noise))
      data.push({ category: g, name, value })
    }
  })
  return data
}

const echartData = buildMockDaysData(180)

onMounted(() => {
  setProps({
    data: echartData
  })
})
<\/script>

<style scoped>
.demo-charts {
  height: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.demo-ops {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  align-items: center;
}

.ops-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.ops-label {
  font-size: 12px;
  color: #666;
}

.demo-btn {
  height: 28px;
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
  flex: 1;
}
</style>
`;export{n as default};
