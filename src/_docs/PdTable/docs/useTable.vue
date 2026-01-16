<template>
  <div style="margin-bottom: 10px">
    <el-button @click="changeStripe">切换斑马纹</el-button>
    <el-button @click="changeBorder">切换边框</el-button>
    <el-button @click="getSelection">获取选中行</el-button>
    <el-button @click="clearSelect">清空选择</el-button>
    <el-button @click="changeData">切换数据</el-button>
    <el-button @click="changeColumns">切换列</el-button>
  </div>
  <div style="height: 500px">
    <PdTable @register="register"></PdTable>
  </div>
</template>

<script lang="tsx">
import { useTable } from '@pandora/components/PdTable';
import { ElMessage } from 'element-plus';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const testData = [
      { id: '1', username: '张三', role: 'admin' },
      { id: '2', username: '李四', role: 'user' },
      { id: '3', username: '王五', role: 'guest' }
    ]

    const columns = [
      { type: 'selection', width: 50 },
      { value: 'id', name: 'ID', width: 80 },
      { value: 'username', name: '姓名', width: 120 },
      { value: 'role', name: '角色' }
    ]

    const [
      register,
      { setProps, setColumns, setData, getSelectRows, clearSelection }
    ] = useTable({
      data: testData,
      columns: columns,
      tableConfig: {
        stripe: false,
        border: true,
        selection: { selectionMode: 'multi' } // 显式配置 selection
      }
    })

    const changeStripe = () => {
      setProps({ tableConfig: { stripe: true } })
      ElMessage.success('已开启斑马纹')
    }

    const changeBorder = () => {
      setProps({ tableConfig: { border: false } })
      ElMessage.success('已关闭边框')
    }

    const getSelection = () => {
      const rows = getSelectRows()
      ElMessage.info(`选中 ${rows.length} 行`)
      console.log(rows)
    }

    const clearSelect = () => {
      clearSelection()
    }

    const changeData = () => {
      setData([
        { id: '101', username: '赵六', role: 'tester' },
        { id: '102', username: '孙七', role: 'dev' }
      ])
      ElMessage.success('数据已更新')
    }

    const changeColumns = () => {
      setColumns([
        { value: 'username', name: '用户名称', width: 150 },
        { value: 'role', name: '用户角色' }
      ])
      ElMessage.success('列已更新')
    }

    return {
      register,
      changeStripe,
      changeBorder,
      getSelection,
      clearSelect,
      changeData,
      changeColumns
    }
  }
})
</script>
