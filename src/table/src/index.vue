
<script lang="tsx">
import { defineComponent } from 'vue'
import { createNamespace } from '../../_utils/create'
// import { isFunction } from '../../_utils/is'
import { propTypes } from '../../_utils/propTypes'
import { ElTable, ElTableColumn } from 'element-plus'

const [name] = createNamespace('VTable')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    options: propTypes.object
  },
  components: {
    ElTable, ElTableColumn
  },
  setup() {
    const tableData = [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }]

    const columnProps = [
      { prop: 'name', label: '姓名', width: '180' },
      { prop: 'date', label: '日期', width: '180' },
      { prop: 'address', label: '地址', width: '180' },
    ]
    const columns = columnProps.map(item=>{
      const columnProps = {
        prop :item.prop,
        label : item.label,
        width : item.width
      }
      return <ElTableColumn {...columnProps}></ElTableColumn>
    })
    const tableProps = {
        data :tableData
    }
    return ()=> {
      return (
        <ElTable {...tableProps}>
          {columns}
       </ElTable>
      )
    }
    // return {
    //   columnProps,
    //   tableData
    // }
  }
})
</script>