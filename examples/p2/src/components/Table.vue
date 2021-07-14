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
import { defineComponent, onMounted, ref } from 'vue'
import VTable from '../../../../src/table/src/index.vue'
import axios from 'axios'
export default defineComponent({
  components: {
    VTable
  },
  props: {
    option: Object
  },
  setup(props) {
    // const { stripe, pagination } = toRefs<any>(props.option)
    // console.log(stripe)

    const tableConfig = props.option

    const sortConfig = {
      sortMode: 'multi',
      // 排序回调事件
      sortChange: (row: any) => {
        console.log(row)
      },
      defaultSort: 'descending',
      // 排序
      defaultSorts: [
        { prop: 'username', order: 'descending' },
        { prop: 'createTime', order: 'ascending' }
      ]
    }

    let testData: any = ref([])

    const columns = [
      { value: 'id', name: '序号', width: '55', fixed: true },
      { value: 'username', name: '姓名', width: '100', sortable: true },
      { value: 'account', name: '账号', width: '180' },
      { value: 'email', name: '邮箱', width: '200' },
      { value: 'role', name: '权限', width: '60' },
      { value: 'createTime', name: '创建时间', width: '200', sortable: true },
      { value: 'remark', name: '备注', width: '200' },
      { value: 'status', name: '状态', width: '50', fixed: 'right' }
    ]

    onMounted(() => {
      axios.get('/api/getTableData').then((resp) => {
        // console.log(resp)
        const { data } = resp
        testData.value = data.data
      })
    })

    const handleSizePageChange = (val: any) => {
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
