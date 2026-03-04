const n=`<template>
  <div class="demo-charts">
    <div class="demo-ops">
      <span class="ops-label">单位类型</span>
      <button class="demo-btn" :class="{ active: type === 'num' }" @click="type = 'num'">数值</button>
      <button class="demo-btn" :class="{ active: type === 'flow' }" @click="type = 'flow'">流量</button>
      <button class="demo-btn" :class="{ active: type === 'percent' }" @click="type = 'percent'">百分比</button>
      <span class="ops-label">小数位</span>
      <button class="demo-btn" :class="{ active: dp === 0 }" @click="dp = 0">0</button>
      <button class="demo-btn" :class="{ active: dp === 1 }" @click="dp = 1">1</button>
      <button class="demo-btn" :class="{ active: dp === 2 }" @click="dp = 2">2</button>
      <span class="ops-label">单位名</span>
      <button class="demo-btn" :class="{ active: unitName === '' }" @click="unitName = ''">默认</button>
      <button class="demo-btn" :class="{ active: unitName === '条' }" @click="unitName = '个'">个</button>
    </div>
    <div class="demo-ops">
      <span class="ops-label">数据集</span>
      <button class="demo-btn" :class="{ active: preset === 'normal' }" @click="preset = 'normal'">普通</button>
      <button class="demo-btn" :class="{ active: preset === 'bigNum' }" @click="preset = 'bigNum'">大数值</button>
      <button class="demo-btn" :class="{ active: preset === 'bigFlow' }" @click="preset = 'bigFlow'">大流量</button>
    </div>
    <div class="demo-ops">
      <span class="ops-label">Tooltip 模版</span>
      <button class="demo-btn" :class="{ active: tooltipMode === 'none' }" @click="tooltipMode = 'none'">默认</button>
      <button class="demo-btn" :class="{ active: tooltipMode === 'row' }" @click="tooltipMode = 'row'">自定义行</button>
      <button class="demo-btn" :class="{ active: tooltipMode === 'full' }" @click="tooltipMode = 'full'">自定义整体</button>
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
const [registerNumber, { setProps: setNumberProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'basicBar',
})
const [registerRate, { setProps: setRateProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'basicBar',
})

const type = ref('num')
const dp = ref(2)
const unitName = ref('')

const preset = ref('normal')
const numberDp = ref(2)
const rateUnit = ref('mbps')
const rateDp = ref(2)
const tooltipMode = ref('none')

function buildNormal() {
  return [
    { category: 'A类', name: '1月', value: 37 },
    { category: 'A类', name: '2月', value: 29 },
    { category: 'A类', name: '3月', value: 22 },
    { category: 'B类', name: '1月', value: 87 },
    { category: 'B类', name: '2月', value: 94 },
    { category: 'B类', name: '3月', value: 75 }
  ]
}

function buildBigNum() {
  // 触发万/亿单位
  return [
    { category: 'A类', name: '1月', value: 12_000_000 },
    { category: 'A类', name: '2月', value: 580_000_000 },
    { category: 'A类', name: '3月', value: 304_000_000 },
    { category: 'B类', name: '1月', value: 98_000_000 },
    { category: 'B类', name: '2月', value: 1_200_000_000 },
    { category: 'B类', name: '3月', value: 160_500_000 }
  ]
}

function buildBigFlow() {
  // 字节级别：MB/GB/TB
  const MB = 1024 * 1024
  const GB = 1024 * 1024 * 1024
  const TB = GB * 1024
  return [
    { category: 'A类', name: '1月', value: 320 * MB },
    { category: 'A类', name: '2月', value: 2.5 * GB },
    { category: 'A类', name: '3月', value: 0.8 * GB },
    { category: 'B类', name: '1月', value: 120 * MB },
    { category: 'B类', name: '2月', value: 7.2 * GB },
    { category: 'B类', name: '3月', value: 0.5 * TB }
  ]
}

function getDataByPreset() {
  if (preset.value === 'bigNum') return buildBigNum()
  if (preset.value === 'bigFlow') return buildBigFlow()
  return buildNormal()
}

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

function buildRateData() {
  // 输入为 Mbps 默认；也可切换为 Kbps/Gbps
  const base = rateUnit.value === 'kbps' ? 1000 : rateUnit.value === 'gbps' ? 1 : 1
  const toUnit = (n) => n * base
  return [
    { category: '上行', name: '1月', value: toUnit(1200) }, // 1.2Gbps if mbps
    { category: '上行', name: '2月', value: toUnit(800) },
    { category: '上行', name: '3月', value: toUnit(3500) },
    { category: '下行', name: '1月', value: toUnit(2400) },
    { category: '下行', name: '2月', value: toUnit(12000) },
    { category: '下行', name: '3月', value: toUnit(500) }
  ]
}

onMounted(() => {
  setProps({
    data: getDataByPreset(),
    chartConfig: {
      autoFormatView: {
        key: 'value',
        type: type.value,
        decimalPlaces: dp.value,
        unitName: unitName.value,
        showUnitLabel: false
      },
      tooltip: tooltipMode.value === 'row'
        ? {
          rowTemplate: (p, unit) => {
            const v = p && p.value != null ? p.value : ''
            return \`<tr><td style="text-align:left;">\${p.marker}<strong>\${p.seriesName}</strong>：</td><td style="text-align:right;">\${v} <span style="color:#5B8FF9">\${unit}</span></td></tr>\`
          }
        }
        : tooltipMode.value === 'full'
          ? {
            formatter: (params, unit) => {
              const name = params && params[0] ? params[0].name : ''
              const rows = (params || []).map((p) => {
                const v = p && p.value != null ? p.value : ''
                return \`<tr><td style="text-align:left;">\${p.marker}<strong>\${p.seriesName}</strong>：</td><td style="text-align:right;">\${v} <span style="color:#5B8FF9">\${unit}</span></td></tr>\`
              })
              return \`<div style="min-width:180px;"><div style="margin-bottom:6px;color:#999;">\${name}</div><table style="width:100%;">\${rows.join('')}</table></div>\`
            }
          }
          : undefined
    }
  })
  setNumberProps({
    data: buildNumberData(),
    chartConfig: {
      autoFormatView: {
        type: 'num',
        decimalPlaces: numberDp.value,
        unitName: ''
      }
    }
  })
  setRateProps({
    data: buildRateData(),
    chartConfig: {
      autoFormatView: {
        type: 'rate',
        unitName: rateUnit.value,
        decimalPlaces: rateDp.value
      }
    }
  })
})

watch([type, dp, unitName, preset], () => {
  setProps({
    data: getDataByPreset(),
    chartConfig: {
      autoFormatView: {
        key: 'value',
        type: type.value,
        decimalPlaces: dp.value,
        unitName: unitName.value,
        showUnitLabel: false
      },
      tooltip: tooltipMode.value === 'row'
        ? {
          rowTemplate: (p, unit) => {
            const v = p && p.value != null ? p.value : ''
            return \`<tr><td style="text-align:left;">\${p.marker}<strong>\${p.seriesName}</strong>：</td><td style="text-align:right;">\${v} <span style="color:#5B8FF9">\${unit}</span></td></tr>\`
          }
        }
        : tooltipMode.value === 'full'
          ? {
            formatter: (params, unit) => {
              const name = params && params[0] ? params[0].name : ''
              const rows = (params || []).map((p) => {
                const v = p && p.value != null ? p.value : ''
                return \`<tr><td style="text-align:left;">\${p.marker}<strong>\${p.seriesName}</strong>：</td><td style="text-align:right;">\${v} <span style="color:#5B8FF9">\${unit}</span></td></tr>\`
              })
              return \`<div style="min-width:180px;"><div style="margin-bottom:6px;color:#999;">\${name}</div><table style="width:100%;">\${rows.join('')}</table></div>\`
            }
          }
          : undefined
    }
  })
})

watch([tooltipMode], () => {
  setProps({
    chartConfig: {
      autoFormatView: {
        key: 'value',
        type: type.value,
        decimalPlaces: dp.value,
        unitName: unitName.value,
        showUnitLabel: false
      },
      tooltip: tooltipMode.value === 'row'
        ? {
          rowTemplate: (p, unit) => {
            const v = p && p.value != null ? p.value : ''
            return \`<tr><td style="text-align:left;">\${p.marker}<strong>\${p.seriesName}</strong>：</td><td style="text-align:right;">\${v} <span style="color:#5B8FF9">\${unit}</span></td></tr>\`
          }
        }
        : tooltipMode.value === 'full'
          ? {
            formatter: (params, unit) => {
              const name = params && params[0] ? params[0].name : ''
              const rows = (params || []).map((p) => {
                const v = p && p.value != null ? p.value : ''
                return \`<tr><td style="text-align:left;">\${p.marker}<strong>\${p.seriesName}</strong>：</td><td style="text-align:right;">\${v} <span style="color:#5B8FF9">\${unit}</span></td></tr>\`
              })
              return \`<div style="min-width:180px;"><div style="margin-bottom:6px;color:#999;">\${name}</div><table style="width:100%;">\${rows.join('')}</table></div>\`
            }
          }
          : undefined
    }
  })
})

watch([numberDp], () => {
  setNumberProps({
    data: buildNumberData(),
    chartConfig: {
      autoFormatView: {
        type: 'num',
        decimalPlaces: numberDp.value,
        unitName: ''
      }
    }
  })
})

watch([rateUnit, rateDp], () => {
  setRateProps({
    data: buildRateData(),
    chartConfig: {
      autoFormatView: {
        type: 'rate',
        unitName: rateUnit.value,
        decimalPlaces: rateDp.value
      }
    }
  })
})
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
