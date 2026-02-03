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
  subChartType: 'bar01',
  chartConfig: {
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
      formatter: ({ rawValue }) => \`总数\${rawValue}\`,
    },
  },
})

const echartData = [
  {
    name: 'A类-BAR-Bar-bar',
    value: '3720',
  },
  {
    name: 'E类',
    value: '3200',
  },
  {
    name: 'I类',
    value: '3200',
  },
  {
    name: 'B类',
    value: '2920',
  },
  {
    name: 'F类',
    value: '2420',
  },
  {
    name: 'J类',
    value: '2420',
  },
  {
    name: 'C类',
    value: '2200',
  },
  {
    name: 'G类',
    value: '2200',
  },
  {
    name: 'D类',
    value: '1420',
  },
  {
    name: 'H类',
    value: '1420',
  },
]

onMounted(() => {
  setProps({
    data: echartData,
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
