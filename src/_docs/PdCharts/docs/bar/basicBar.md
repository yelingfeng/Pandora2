# BasicBar 基础柱形图

<Preview comp-name="PdCharts" demo-name="bar/basicBar">
  <basicBar />
</Preview>

## 基础用法

```js
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'basicBar',
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
import basicBar from './basicBar.vue'
import numberBar from './numberBar.vue'
import rateBar from './rateBar.vue'
</script>

## 格式化处理 model number
<Preview comp-name="PdCharts" demo-name="bar/numberBar">
  <numberBar />
</Preview>


## 格式化处理 model rate 
<Preview comp-name="PdCharts" demo-name="bar/rateBar">
  <rateBar />
</Preview>
