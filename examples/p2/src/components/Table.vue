<template>
  <div>
    <VTable
      :data="testData"
      :columns="columns"
      :sortConfig="sortConfig"
      :tableConfig="tableConfig"
      @handleSizePageChange="handleSizePageChange"
    ></VTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onMounted, reactive } from 'vue'
import VTable from '../../../../src/table/src/index.vue'

export default defineComponent({
  components: {
    VTable
  },
  props: {
    option: Object
  },
  setup(props) {
    const { stripe, pagination } = toRefs(props.option)

    // console.log(stripe)

    const tableConfig = reactive({
      pagination,
      stripe
    })

    const sortConfig = {
      sortMode: 'multi',
      // 排序回调事件
      sortChange: (row: any) => {
        console.log(row)
      },
      defaultSort: 'descending',
      // 排序
      defaultSorts: [
        { prop: 'date', order: 'descending' },
        { prop: 'address', order: 'ascending' }
      ]
    }

    const testData: any = ref([])

    const columns = [
      { value: 'name', name: '姓名', width: '180' },
      { value: 'date', name: '日期', width: '180', sortable: true },
      { value: 'address', label: '地址', width: '200', sortable: true }
    ]

    const load = () => {
      testData.value = [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }

    onMounted(() => {
      setTimeout(() => {
        load()
      }, 500)
    })

    const handleSizePageChange = (val) => {
      console.log(val)
    }

    return {
      sortConfig,
      tableConfig,
      columns,
      testData,
      handleSizePageChange
    }
  }
})
</script>

<style scoped></style>
