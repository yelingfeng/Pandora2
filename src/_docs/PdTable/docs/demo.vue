<template>
  <div style="height: 500px">
    <PdTable ref="table" :data="testData" :tableConfig="config" :columns="columns" :tableLayout="tableLayout"></PdTable>
  </div>
</template>

<script lang="tsx">
import { defineComponent, onMounted, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    // const { stripe, pagination } = toRefs<any>(props.option)
    // console.log(stripe)

    // const clickTag = (e: Event, row: any) => {
    //   console.log(e, row)
    // }
    let testData: any = ref([
      {
        id: '1',
        username: '张三',
        account: 'asdasd@111.com',
        email: 'asdasd@123123.com',
        role: 'addmin',
        createTime: '2022-01-01'
      },
      {
        id: '2',
        username: '李四',
        account: 'asdasd@111.com',
        email: 'asdasd@123123.com',
        role: 'addmin',
        createTime: '2022-01-01'
      },
      {
        id: '3',
        username: '王五',
        account: 'asdasd@111.com',
        email: 'asdasd@123123.com',
        role: 'addmin',
        createTime: '2022-01-01'
      },
      {
        id: '4',
        username: '强哥',
        account: 'asdasd@111.com',
        email: 'asdasd@123123.com',
        role: 'addmin',
        createTime: '2022-01-01'
      }
    ])

    const tableLayout = ref('auto')

    const config = reactive({
      size: 'large',
      stripe: true,
      border: true,
      pagination: true, // Enable pagination
      pageOpt: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50],
        layout: 'total, sizes, prev, pager, next, jumper'
      },
    })

    const editClick = (row: any) => {
      console.log(row)
    }


    const columns = [
      { value: 'id', name: '序号', width: '50', type: 'selection' },
      { value: 'username', name: '姓名', width: '120', sortable: true },
      { value: 'account', name: '账号', width: '180' },
      { value: 'email', name: '邮箱', width: '200' },
      { value: 'role', name: '权限', width: '100' },
      { value: 'createTime', name: '创建时间', width: '200', sortable: true },
      {
        value: 'op', name: '操作', align: 'center', width: '200', render: (row: any, column: any, index: number) => {
          // console.log(row, index)
          return (
            <div>
              <el-button type="text" size="small" onClick={() => editClick(row)}>编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </div>
          )
        }
      }
    ]

    onMounted(() => {
    })

    return {
      columns,
      testData,
      config,
      tableLayout
    }
  }
})
</script>

<style scoped></style>
