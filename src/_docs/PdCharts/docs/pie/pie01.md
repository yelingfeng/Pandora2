# Pie01 基础饼图


<Preview comp-name="PdCharts" demo-name="pie/pie01">
  <pie01 />
</Preview>

## 调用实例方法

```ts
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'pie',
  subChartType: 'pie01',
  theme: 'ovilia-green'
})

```




<script setup>
import pie01 from './pie01.vue'
</script>

