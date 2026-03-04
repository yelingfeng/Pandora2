# HoriRankBar 横向排名TOP柱形图

<Preview comp-name="PdCharts" demo-name="bar/horiRankBar">
  <horiRankBar />
</Preview>

## 用法

```js
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted, ref, watch } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'horiRankBar',
})

const unitMode = ref('auto')

function formatTraffic(bytes, mode) {
  const n = Number(bytes)
  const v = Number.isFinite(n) ? n : 0
  const MB = 1024 * 1024
  const GB = 1024 * 1024 * 1024
  const realMode = mode === 'auto' ? (v >= GB ? 'GB' : 'MB') : mode
  if (realMode === 'GB') return `${(v / GB).toFixed(2)}GB`
  return `${(v / MB).toFixed(2)}MB`
}

function makeChartConfig(mode) {
  return {
    rank: {
      topCount: 3,
      topColors: [
        { backgroundColor: 'rgba(242, 99, 123, 0.20)', borderColor: 'rgba(242, 99, 123, 1)' },
        { backgroundColor: 'rgba(251, 212, 55, 0.20)', borderColor: 'rgba(251, 212, 55, 1)' },
        { backgroundColor: 'rgba(78, 203, 115, 0.20)', borderColor: 'rgba(78, 203, 115, 1)' },
      ],
    },
    bar: {
      color: 'rgba(26, 213, 152, 1)',
      backgroundColor: 'rgba(26, 213, 152, 0.20)',
      topColors: ['rgba(242, 99, 123, 1)', 'rgba(251, 212, 55, 1)', 'rgba(78, 203, 115, 1)'],
    },
    rightLabel: {
      formatter: ({ rawValue }) => formatTraffic(rawValue, mode),
    },
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

watch(unitMode, (mode) => {
  setProps({
    bizConfig: makeChartConfig(mode),
  })
}, { immediate: true })

onMounted(() => {
  setProps({
    data: echartData,
  })
})
```

<script setup>
import horiRankBar from './horiRankBar.vue'
</script>

## 属性说明（chartConfig.bar）

- rank.topCount：Top 排名数（默认 3）
- rank.topColors：Top 排名块颜色数组（对象包含 backgroundColor/borderColor/color 等）
- color：柱子主色
- backgroundColor：背景条颜色
- topColors：TopN 柱子颜色数组（按排名索引）
- rightLabel.formatter：右侧文案渲染函数，入参对象包含 { rawValue, value, name, index }
- label.minWidth/label.maxWidth/label.charWidth：左侧名称自适应宽度计算

### 动态配置示例

Demo 页顶部提供：
- 单位切换（自动/MB/GB）
- Top 数量切换（2/3/5）
- 配色主题切换（Green/Orange）

```js
const chartConfig = {
  bar: {
    rank: { topCount: 3, topColors: [{ backgroundColor: '#eee', borderColor: '#f00' }] },
    color: '#1AD598',
    backgroundColor: 'rgba(26, 213, 152, 0.20)',
    topColors: ['#f2637b', '#fbd437', '#4ecb73'],
    rightLabel: { formatter: ({ rawValue }) => formatTraffic(rawValue, unitMode) },
    label: { minWidth: 48, maxWidth: 160, charWidth: 14 }
  }
}
```
