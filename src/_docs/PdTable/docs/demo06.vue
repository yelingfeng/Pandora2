<template>
  <div style="height: 500px">
    <div style="margin-bottom: 20px">
      <el-button @click="loading = !loading">Toggle Loading</el-button>
      <el-button @click="config.showHeader = !config.showHeader">Toggle Header</el-button>
      <el-button @click="config.highlightCurrentRow = !config.highlightCurrentRow">Toggle Highlight Row</el-button>
    </div>

    <PdTable
      ref="table"
      v-loading="loading"
      :data="testData"
      :columns="columns"
      :tableConfig="config"
      @row-click="handleRowClick"
      border
    ></PdTable>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const testData = ref([
      { id: 1, name: 'Tom', status: 'Active' },
      { id: 2, name: 'Jerry', status: 'Inactive' },
      { id: 3, name: 'Bob', status: 'Active' }
    ])

    const columns = [
      { value: 'id', name: 'ID', width: '80' },
      { value: 'name', name: 'Name', width: '180' },
      { value: 'status', name: 'Status' }
    ]

    const config = reactive({
      showHeader: true,
      highlightCurrentRow: true
    })

    const handleRowClick = (row: any) => {
      console.log('Row clicked:', row)
      ElMessage.info(`Clicked row: ${row.name}`)
    }

    return {
      testData,
      columns,
      loading,
      config,
      handleRowClick
    }
  }
})
</script>
