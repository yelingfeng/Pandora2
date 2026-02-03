# Bar02 多系列柱形图

<Preview comp-name="PdCharts" demo-name="bar/bar02">
  <bar02 />
</Preview>

## 用法

```js
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'bar02',
  theme: 'ovilia-green'
})

onMounted(() => {
  setProps({
    data: [
      { category: 'A类', name: '1月', value: 3720 },
      { category: 'A类', name: '2月', value: 2920 },
      { category: 'B类', name: '1月', value: 1420 },
      { category: 'B类', name: '2月', value: 3200 }
    ]
  })
})
```

<script setup>
import bar02 from './bar02.vue'
</script>

