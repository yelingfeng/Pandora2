<template>
  <div style="height: 500px">
    <div style="margin-bottom: 20px">
      <el-checkbox v-model="config.stripe">Stripe</el-checkbox>
      <el-checkbox v-model="config.border">Border</el-checkbox>
      <el-checkbox v-model="config.showHeader">showHeader</el-checkbox>
      <el-radio-group v-model="config.size" style="margin-left: 20px">
        <el-radio label="large">Large</el-radio>
        <el-radio label="default">Default</el-radio>
        <el-radio label="small">Small</el-radio>
      </el-radio-group>
    </div>

    <PdTable ref="table" :data="testData" :columns="columns" :tableConfig="config"></PdTable>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const testData = ref([
      { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
      { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
      { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
      { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' }
    ])

    const columns = [
      { value: 'date', name: 'Date', width: '180' },
      { value: 'name', name: 'Name', width: '180' },
      { value: 'address', name: 'Address' }
    ]

    const config = reactive({
      stripe: true,
      border: true,
      size: 'default',
      showHeader: true
    })

    return {
      testData,
      columns,
      config
    }
  }
})
</script>
