<template>
  <div style="height: 400px">
    <PdTable ref="table" :data="testData" :columns="columns" :sortConfig="sortConfig" border></PdTable>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const testData = ref<any[]>([
      { name: 'Tom', age: 20, score: 90 },
      { name: 'Jerry', age: 18, score: 95 },
      { name: 'Bob', age: 22, score: 85 },
      { name: 'Alice', age: 19, score: 92 }
    ])

    const columns = [
      { value: 'name', name: 'Name', width: '150' },
      { value: 'age', name: 'Age', width: '100' }, // Enable sorting on this column
      { value: 'score', name: 'Score', width: '100', sortable: true }
    ]

    const getTableList = (column: any) => {
      const keys = Object.keys(column)
      if (keys.length === 0) return

      const prop = keys[0]
      const order = column[prop]

      console.log(prop, order)

      testData.value.sort((a, b) => {
        if (order === 'ascending') {
          return a[prop] > b[prop] ? 1 : -1
        } else {
          return a[prop] < b[prop] ? 1 : -1
        }
      })
    }

    const handleSortChange = (column: any) => {
      console.log('Sort changed:', column)
      getTableList(column)
    }

    const sortConfig = reactive({
      sortMode: 'single', // 'single' or 'multi'
      defaultSorts: [{ prop: 'score', order: 'descending' }],
      sortChange: handleSortChange
    })

    return {
      testData,
      columns,
      sortConfig,
      handleSortChange
    }
  }
})
</script>
