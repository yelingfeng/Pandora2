<template>
  <div>
    <VTable :data="testData" :columns="columns" :sortConfig="sortConfig" :tableConfig="tableConfig"
      @handleSizePageChange="handleSizePageChange"></VTable>
  </div>
</template>

<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue'
import { VTable } from '../../../../lib/pandora2.es'
import { ElButton } from 'element-plus'
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

    const clickTag = (e: Event, row: any) => {
      console.log(e, row)
    }

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

    const filters = [
      { text: '失败', value: '0' },
      { text: '成功', value: '1' }
    ]

    const columns = [
      { value: 'id', name: '序号', width: '50', type: 'selection' },
      { value: 'username', name: '姓名', width: '100', sortable: true },
      { value: 'account', name: '账号', width: '180' },
      { value: 'email', name: '邮箱', width: '200' },
      { value: 'role', name: '权限', width: '60' },
      { value: 'createTime', name: '创建时间', width: '200', sortable: true },
      { value: 'remark', name: '备注', width: '200' },
      {
        value: 'status',
        name: '状态',
        width: '80',
        filters: filters,
        filterMethod: (value: any, row: any) => {
          return row.status === value
        }
      },
      {
        name: '操作',
        width: '140',
        fixed: 'right',
        render: function (row: any) {
          return (
            <div>
              <ElButton
                type={row.status === '1' ? 'primary' : 'success'}
                size="small"
                onClick={(e: Event) => {
                  return clickTag(e, row)
                }}
              >
                查看
              </ElButton>
              <ElButton type="text" size="small">
                编辑
              </ElButton>
            </div>
          )
        }
      }
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

<style scoped>
</style>
