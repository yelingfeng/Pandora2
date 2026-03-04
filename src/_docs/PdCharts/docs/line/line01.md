# Line01 折线图

<Preview comp-name="PdCharts" demo-name="line/line01">
  <line01 />
</Preview>

## 用法

```js
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'line',
  subChartType: 'line01',
  chartConfig: {
    colors: ['#5AD8A6', '#5B8FF9'],
    smooth: true,
    legend: { show: true },
    themeMode: 'light',
  }
})

onMounted(() => {
  setProps({
    data: [
      { category: 'A类', name: '1月', value: 120 },
      { category: 'A类', name: '2月', value: 132 },
      { category: 'B类', name: '1月', value: 220 }
    ]
  })
})
```

<script setup>
import line01 from './line01.vue'
</script>

