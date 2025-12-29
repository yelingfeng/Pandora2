<template>
  <div style="height: 400px">
    <div style="margin-bottom: 20px">
      <el-radio-group v-model="config.selection.selectionPos" style="margin-right: 20px">
        <el-radio label="top">Pos: Top</el-radio>
        <el-radio label="end">Pos: End</el-radio>
      </el-radio-group>
      <span>Selectable: Disable ID 2</span>
    </div>

    <PdTable ref="table" :data="testData" :columns="columns" :tableConfig="config" border
      @selection-change="handleSelectionChange"></PdTable>
    <div style="margin-top: 20px">
      Selected rows: {{ selectedRows.length }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const testData = ref([
      { id: 1, name: 'Product A', price: 100 },
      { id: 2, name: 'Product B', price: 200 }, // Will be disabled
      { id: 3, name: 'Product C', price: 300 },
      { id: 4, name: 'Product D', price: 400 }
    ])

    const columns = [
      { value: 'id', name: 'ID', width: '80' },
      { value: 'name', name: 'Product Name', width: '200' },
      { value: 'price', name: 'Price', width: '120' }
    ]

    const selectedRows = ref<any[]>([])

    const handleSelectionChange = (val: any[]) => {
      console.log('Selection changed:', val)
      selectedRows.value = val
    }

    const config = ref({
      selection: {
        selectionMode: 'multi',
        selectionPos: 'top',
        selectable: (row: any, index: number) => {
          return row.id !== 2
        }
      }
    })

    return {
      testData,
      columns,
      selectedRows,
      handleSelectionChange,
      config
    }
  }
})
</script>
