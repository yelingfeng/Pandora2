# Pie01 饼图示例2


<Preview comp-name="PdCharts" demo-name="pie/pie02">
  <pie02 />
</Preview>  

## 示例：调用实例方法

```ts
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'pie',
  subChartType: 'pie02',
  theme: 'ovilia-green'
})

```




<script setup>
import pie02 from './pie02.vue'
</script>

