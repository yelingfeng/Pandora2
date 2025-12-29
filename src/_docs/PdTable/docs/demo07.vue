<template>
  <div style="height: 400px">
    <PdTable
      ref="table"
      :data="testData"
      :columns="columns"
      :tableConfig="config"
      border
    ></PdTable>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const testData = ref([
      { id: '1', name: 'Apple', price: 10, count: 20 },
      { id: '2', name: 'Banana', price: 20, count: 10 },
      { id: '3', name: 'Orange', price: 15, count: 15 }
    ])

    const columns = [
      { value: 'name', name: 'Product', width: '180' },
      { value: 'price', name: 'Price (Unit)', width: '120' },
      { value: 'count', name: 'Quantity', width: '120' }
    ]

    const config = reactive({
      showSummary: true,
      sumText: 'Total Cost',
      summaryMethod: (param) => {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total'
            return
          }
          const values = data.map((item) => Number(item[column.property]))
          if (!values.every((value) => Number.isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!Number.isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = 'N/A'
          }
        })
        return sums
      }
    })

    return {
      testData,
      columns,
      config
    }
  }
})
</script>
