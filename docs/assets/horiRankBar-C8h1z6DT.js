const n=`<template>
  <div class="demo-charts">
    <div class="demo-ops">
      <button class="demo-btn" :class="{ active: unitMode === 'auto' }" @click="unitMode = 'auto'">
        自动
      </button>
      <button class="demo-btn" :class="{ active: unitMode === 'MB' }" @click="unitMode = 'MB'">
        MB
      </button>
      <button class="demo-btn" :class="{ active: unitMode === 'GB' }" @click="unitMode = 'GB'">
        GB
      </button>
      <span class="demo-tip">右侧文案单位：{{ unitMode }}</span>
    </div>
    <div class="demo-ops">
      <span class="ops-label">Top 数量</span>
      <button class="demo-btn" :class="{ active: topCount === 2 }" @click="topCount = 2">2</button>
      <button class="demo-btn" :class="{ active: topCount === 3 }" @click="topCount = 3">3</button>
      <button class="demo-btn" :class="{ active: topCount === 5 }" @click="topCount = 5">5</button>
      <span class="ops-label">配色主题</span>
      <button class="demo-btn" :class="{ active: colorPreset === 'green' }"
        @click="colorPreset = 'green'">Green</button>
      <button class="demo-btn" :class="{ active: colorPreset === 'orange' }"
        @click="colorPreset = 'orange'">Orange</button>
    </div>
    <div class="demo-ops">
      <span class="ops-label">标签宽度</span>
      <button class="demo-btn" :class="{ active: labelPreset === 'compact' }"
        @click="labelPreset = 'compact'">紧凑</button>
      <button class="demo-btn" :class="{ active: labelPreset === 'normal' }" @click="labelPreset = 'normal'">标准</button>
      <button class="demo-btn" :class="{ active: labelPreset === 'wide' }" @click="labelPreset = 'wide'">宽</button>
    </div>
    <div class="demo-ops">
      <span class="ops-label">Top 块样式</span>
      <button class="demo-btn" :class="{ active: rankPreset === 'default' }" @click="rankPreset = 'default'">默认</button>
      <button class="demo-btn" :class="{ active: rankPreset === 'red' }" @click="rankPreset = 'red'">红系</button>
      <button class="demo-btn" :class="{ active: rankPreset === 'yellow' }" @click="rankPreset = 'yellow'">黄系</button>
      <span class="ops-label">右侧文案</span>
      <button class="demo-btn" :class="{ active: useRightFormatter }" @click="useRightFormatter = true">格式化</button>
      <button class="demo-btn" :class="{ active: !useRightFormatter }" @click="useRightFormatter = false">原值</button>
      <span class="ops-label">前后缀</span>
      <button class="demo-btn" :class="{ active: rightPrefix === '总数' }" @click="rightPrefix = '总数'">总数</button>
      <button class="demo-btn" :class="{ active: rightPrefix === '流量:' }" @click="rightPrefix = '流量:'">流量:</button>
      <button class="demo-btn" :class="{ active: rightSuffix === '' }" @click="rightSuffix = ''">无后缀</button>
      <button class="demo-btn" :class="{ active: rightSuffix === 'MB' }" @click="rightSuffix = 'MB'">MB</button>
      <button class="demo-btn" :class="{ active: rightSuffix === 'GB' }" @click="rightSuffix = 'GB'">GB</button>
    </div>
    <Charts class="demo-echarts" @register="register" />
  </div>
</template>

<script setup>
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted, ref, watch } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'horiRankBar',
})

const unitMode = ref('auto')
const topCount = ref(3)
const colorPreset = ref('green')
const labelPreset = ref('normal')
const rankPreset = ref('default')
const rightPrefix = ref('总数')
const rightSuffix = ref('')
const useRightFormatter = ref(true)

function formatTraffic(bytes, mode) {
  const n = Number(bytes)
  const v = Number.isFinite(n) ? n : 0
  const MB = 1024 * 1024
  const GB = 1024 * 1024 * 1024
  const realMode = mode === 'auto' ? (v >= GB ? 'GB' : 'MB') : mode
  if (realMode === 'GB') return \`\${(v / GB).toFixed(2)}GB\`
  return \`\${(v / MB).toFixed(2)}MB\`
}

function makeChartConfig(mode) {
  const labelCfgMap = {
    compact: { minWidth: 48, maxWidth: 100, charWidth: 12 },
    normal: { minWidth: 48, maxWidth: 160, charWidth: 14 },
    wide: { minWidth: 60, maxWidth: 200, charWidth: 16 },
  }
  const labelCfg = labelCfgMap[labelPreset.value]
  const rankColorMap = {
    default: [
      { backgroundColor: 'rgba(242, 99, 123, 0.20)', borderColor: 'rgba(242, 99, 123, 1)' },
      { backgroundColor: 'rgba(251, 212, 55, 0.20)', borderColor: 'rgba(251, 212, 55, 1)' },
      { backgroundColor: 'rgba(78, 203, 115, 0.20)', borderColor: 'rgba(78, 203, 115, 1)' },
    ],
    red: [
      { backgroundColor: 'rgba(255, 102, 102, 0.20)', borderColor: 'rgba(255, 102, 102, 1)', color: '#4D4D4D' },
      { backgroundColor: 'rgba(255, 153, 153, 0.20)', borderColor: 'rgba(255, 153, 153, 1)', color: '#4D4D4D' },
      { backgroundColor: 'rgba(255, 51, 51, 0.20)', borderColor: 'rgba(255, 51, 51, 1)', color: '#4D4D4D' },
    ],
    yellow: [
      { backgroundColor: 'rgba(255, 204, 102, 0.20)', borderColor: 'rgba(255, 204, 102, 1)', color: '#4D4D4D' },
      { backgroundColor: 'rgba(255, 204, 51, 0.20)', borderColor: 'rgba(255, 204, 51, 1)', color: '#4D4D4D' },
      { backgroundColor: 'rgba(255, 204, 0, 0.20)', borderColor: 'rgba(255, 204, 0, 1)', color: '#4D4D4D' },
    ],
  }
  const rankTopColors = rankColorMap[rankPreset.value]
  return {
    bar: {
      rank: {
        topCount: topCount.value,
        topColors: rankTopColors,
      },

      color: colorPreset.value === 'green' ? 'rgba(26, 213, 152, 1)' : 'rgba(255, 153, 0, 1)',
      backgroundColor: colorPreset.value === 'green' ? 'rgba(26, 213, 152, 0.20)' : 'rgba(255, 153, 0, 0.20)',
      topColors: colorPreset.value === 'green'
        ? ['rgba(242, 99, 123, 1)', 'rgba(251, 212, 55, 1)', 'rgba(78, 203, 115, 1)']
        : ['rgba(255, 153, 0, 1)', 'rgba(255, 204, 102, 1)', 'rgba(255, 102, 102, 1)'],
      rightLabel: useRightFormatter.value
        ? {
          prefix: rightPrefix.value,
          suffix: rightSuffix.value,
          formatter: ({ rawValue }) => \`\${rightPrefix.value}\${formatTraffic(rawValue, mode)}\${rightSuffix.value}\`,
        }
        : {
          prefix: rightPrefix.value,
          suffix: rightSuffix.value,
        },
      label: labelCfg
    }
  }
}

const echartData = [
  {
    name: 'A类-BAR-Bar-bar',
    value: 8 * 1024 * 1024 * 1024,
  },
  {
    name: 'E类',
    value: 6.2 * 1024 * 1024 * 1024,
  },
  {
    name: 'I类',
    value: 5.8 * 1024 * 1024 * 1024,
  },
  {
    name: 'B类',
    value: 3.2 * 1024 * 1024 * 1024,
  },
  {
    name: 'F类',
    value: 2.6 * 1024 * 1024 * 1024,
  },
  {
    name: 'J类',
    value: 2.2 * 1024 * 1024 * 1024,
  },
  {
    name: 'C类',
    value: 1.6 * 1024 * 1024 * 1024,
  },
  {
    name: 'G类',
    value: 1.2 * 1024 * 1024 * 1024,
  },
  {
    name: 'D类',
    value: 820 * 1024 * 1024,
  },
  {
    name: 'H类',
    value: 420 * 1024 * 1024,
  },
]

watch([unitMode, topCount, colorPreset, labelPreset, rankPreset, rightPrefix, rightSuffix, useRightFormatter], ([mode]) => {
  setProps({
    chartConfig: makeChartConfig(mode),
  })
}, { immediate: true })

onMounted(() => {
  setProps({
    data: echartData,
  })
})
<\/script>

<style scoped>
.demo-charts {
  height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.demo-ops {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
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
  border-color: #1ad598;
  color: #1ad598;
}

.demo-tip {
  margin-left: 8px;
  font-size: 12px;
  color: #666;
}

.ops-label {
  font-size: 12px;
  color: #666;
  margin-left: 8px;
}

.demo-echarts {
  flex: 1;
}
</style>
`;export{n as default};
