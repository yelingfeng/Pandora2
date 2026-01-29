const n=`<template>
  <div style="height: 400px">
    <PdTable
      ref="table"
      :data="testData"
      :columns="columns"
      :tableConfig="tableConfig"
      @handleSizePageChange="handleSizeChange"
      @handleCurrentPageChange="handleCurrentChange"
    ></PdTable>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const testData = ref<any[]>([])
    
    // Generate dummy data
    const generateData = () => {
      const data = []
      for (let i = 0; i < 20; i++) {
        data.push({
          id: i + 1,
          username: \`User \${i + 1}\`,
          account: \`user\${i + 1}@example.com\`,
          email: \`user\${i + 1}@test.com\`,
          role: i % 2 === 0 ? 'Admin' : 'User',
          createTime: '2022-01-01'
        })
      }
      return data
    }
    
    testData.value = generateData()

    const columns = [
      { value: 'id', name: 'ID', width: '80' },
      { value: 'username', name: 'Name', width: '120' },
      { value: 'account', name: 'Account', width: '180' },
      { value: 'email', name: 'Email', width: '200' },
      { value: 'role', name: 'Role', width: '100' }
    ]

    const tableConfig = reactive({
      pagination: true, // Enable pagination
      pageOpt: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50],
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      stripe: true,
      border: true
    })

    const handleSizeChange = (val: number) => {
      console.log('Page size changed:', val)
      tableConfig.pageOpt.pageSize = val
    }

    const handleCurrentChange = (val: number) => {
      console.log('Current page changed:', val)
      tableConfig.pageOpt.currentPage = val
    }

    return {
      testData,
      columns,
      tableConfig,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
<\/script>
`;export{n as default};
