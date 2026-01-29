const n=`<template>
  <div style="margin-bottom: 10px">
    <el-button @click="changeStripe">切换斑马纹</el-button>
    <el-button @click="changeBorder">切换边框</el-button>
    <el-button @click="getSelection">获取选中行</el-button>
    <el-button @click="clearSelect">清空选择</el-button>
    <el-button @click="changeData">切换数据</el-button>
    <el-button @click="changeColumns">切换列</el-button>
    <el-button @click="resetSort">重置排序</el-button>
  </div>
  <div style="margin-bottom: 10px">
    <el-button @click="sortIdAsc">按 ID 升序（本地排序）</el-button>
    <el-button @click="sortIdDesc">按 ID 降序（本地排序）</el-button>
    <span style="margin-left: 12px">当前排序：{{ sortText }}</span>
  </div>
  <div style="height: 500px">
    <PdTable @register="register"></PdTable>
  </div>
</template>

<script lang="tsx">
import { useTable } from '@pandora/components/PdTable';
import { ElMessage } from 'element-plus';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const testData = [
      { id: '3', username: '王五', role: 'guest' },
      { id: '1', username: '张三', role: 'admin' },
      { id: '2', username: '李四', role: 'user' }
    ]
    const baseData = [...testData]
    const sortText = ref('无')

    const columns = [
      { type: 'selection', width: 50 },
      { value: 'id', name: 'ID', width: 80, sortable: true },
      { value: 'username', name: '姓名', width: 120, sortable: true },
      { value: 'role', name: '角色' }
    ]

    const compareBy = (prop: string, order: 'ascending' | 'descending') => {
      const dir = order === 'ascending' ? 1 : -1
      return (a: any, b: any) => {
        const av = a?.[prop]
        const bv = b?.[prop]
        const an = Number(av)
        const bn = Number(bv)
        if (!Number.isNaN(an) && !Number.isNaN(bn)) return (an - bn) * dir
        return String(av ?? '').localeCompare(String(bv ?? ''), 'zh-CN') * dir
      }
    }

    const applySort = (prop: string, order: 'ascending' | 'descending') => {
      const sorted = [...(baseData || [])].sort(compareBy(prop, order))
      setData(sorted)
      sortText.value = \`\${prop} \${order}\`
    }

    const resetSort = () => {
      setData([...baseData])
      sortText.value = '无'
      ElMessage.success('已重置排序')
    }

    const [
      register,
      { setProps, setColumns, setData, getSelectRows, clearSelection }
    ] = useTable({
      data: testData,
      columns: columns,
      sortConfig: {
        sortMode: 'single',
        defaultOrder: 'ascending',
        defaultSorts: [{ prop: 'id', order: 'ascending' }],
        sortChange: (activeSort: any) => {
          const entries = Object.entries(activeSort || {})
          if (!entries.length) {
            resetSort()
            return
          }
          const [prop, order] = entries[0] as any
          if (!prop || !order) {
            resetSort()
            return
          }
          applySort(prop, order)
          ElMessage.success(\`触发排序：\${prop} \${order}（点击表头排序图标可测试）\`)
        }
      },
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
      ElMessage.info(\`选中 \${rows.length} 行\`)
      console.log(rows)
    }

    const clearSelect = () => {
      clearSelection()
    }

    const changeData = () => {
      const next = [
        { id: '101', username: '赵六', role: 'tester' },
        { id: '102', username: '孙七', role: 'dev' }
      ]
      baseData.splice(0, baseData.length, ...next)
      setData([...baseData])
      sortText.value = '无'
      ElMessage.success('数据已更新')
    }

    const changeColumns = () => {
      setColumns([
        { value: 'username', name: '用户名称', width: 150, sortable: true },
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
      changeColumns,
      sortIdAsc: () => applySort('id', 'ascending'),
      sortIdDesc: () => applySort('id', 'descending'),
      resetSort,
      sortText
    }
  }
})
<\/script>
`;export{n as default};
