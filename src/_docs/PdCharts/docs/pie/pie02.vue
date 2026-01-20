<template>
  <div class="demo-charts">
    <Charts @register="register" />
  </div>
</template>

<script setup lang="ts">
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'pie',
  subChartType: 'pie02'
})

const echartData = [
  { value: '2879', name: '北京TBD' },
  { value: '806', name: '上海TBD' },
  { value: '723', name: '天津TBD' },
  { value: '546', name: '宁夏TBD' },
  { value: '454', name: '青岛TBD' },
  { value: '344', name: '沈阳TBD' },
  { value: '244', name: '新疆TBD' },
]

onMounted(() => {
  setProps({
    data: echartData
  })
})
</script>

<style scoped>
.demo-charts {
  height: 400px;
  width: 100%;
}
</style>
