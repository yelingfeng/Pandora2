# Bar01 排行柱形图

<Preview comp-name="PdCharts" demo-name="bar/bar01">
  <bar01 />
</Preview>

## 用法

```js
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted, ref, watch } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'bar01',
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
    chartConfig: makeChartConfig(mode),
  })
}, { immediate: true })

onMounted(() => {
  setProps({
    data: echartData,
  })
})
```

<script setup>
import bar01 from './bar01.vue'
</script>
