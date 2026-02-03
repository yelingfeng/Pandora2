const n=`<template>
  <div class="demo-card">
    <div class="operation-bar">
      <el-button type="primary" @click="changeData">更新数据</el-button>
      <el-button @click="toggleLoading">切换 Loading</el-button>
      <el-button @click="resize">重置大小</el-button>
    </div>
    <div class="chart-container">
      <Charts @register="register" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { nextTick, onMounted, ref } from 'vue'

const [register, { setOptions, showLoading, hideLoading, resize }] = useCharts()
const loading = ref(false)

// 初始化配置
const initOptions = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
}
// 注册时设置初始配置
onMounted(() => {
  nextTick(() => {
    setOptions(initOptions)
  })
})




function changeData() {
  const newData = [
    { value: Math.floor(Math.random() * 1000), name: 'Search Engine' },
    { value: Math.floor(Math.random() * 1000), name: 'Direct' },
    { value: Math.floor(Math.random() * 1000), name: 'Email' },
    { value: Math.floor(Math.random() * 1000), name: 'Union Ads' },
    { value: Math.floor(Math.random() * 1000), name: 'Video Ads' }
  ]

  setOptions({
    series: [
      {
        data: newData
      }
    ]
  })
}

function toggleLoading() {
  loading.value = !loading.value
  if (loading.value) {
    showLoading()
  } else {
    hideLoading()
  }
}
<\/script>

<style scoped>
.demo-card {
  border: 1px solid #ebeef5;
  padding: 20px;
  border-radius: 4px;
}

.operation-bar {
  margin-bottom: 20px;
}

.chart-container {
  height: 400px;
  width: 100%;
}
</style>
`;export{n as default};
