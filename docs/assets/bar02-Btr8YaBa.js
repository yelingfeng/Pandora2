const n=`<template>
  <div class="demo-charts">
    <Charts @register="register" />
  </div>
</template>

<script setup>
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'bar02',
})

const echartData = [
  { category: 'A类', name: '1月', value: '3720' },
  { category: 'A类', name: '2月', value: '2920' },
  { category: 'A类', name: '3月', value: '2200' },
  { category: 'B类', name: '1月', value: '1420' },
  { category: 'B类', name: '2月', value: '3200' },
  { category: 'B类', name: '3月', value: '2420' }
]

onMounted(() => {
  setProps({
    data: echartData
  })
})
<\/script>

<style scoped>
.demo-charts {
  height: 400px;
  width: 100%;
}
</style>
`;export{n as default};
