# Pie02 饼图示例2


<Preview comp-name="PdCharts" demo-name="pie/pie02">
  <pie02 />
</Preview>

## 示例：调用实例方法

```ts
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'pie',
  subChartType: 'pie02'
})

onMounted(() => {
  setProps({
    data: [
      { value: '2879', name: '北京TBD' },
      { value: '806', name: '上海TBD' }
    ]
  })
})
```

<script setup>
import pie02 from './pie02.vue'
</script>

