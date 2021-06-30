<template>
  <div class="container">
    <VTable
      :data="testData"
      :columns="columns"
      :sortConfig="sortConfig"
      :tableConfig="tableConfig"
    />
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form label-position="right" label-width="80px" :model="formConfig">
          <el-form-item label="Type">
            <el-select
              v-model="formConfig.type"
              size="mini"
              placeholder="请选择"
              @change="typeOnChange"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Value">
            <el-input v-model="formConfig.value" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="Size">
            <el-select
              v-model="formConfig.size"
              size="mini"
              placeholder="请选择"
              @change="sizeOnChange"
            >
              <el-option
                v-for="item in sizeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Disabled">
            <el-switch
              v-model="formConfig.disabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import VTable from 'pandora2/table/src/index.vue'
export default defineComponent({
  components: {
    VTable
  },
  setup() {
    const formConfig = ref({
      type: 'primary',
      value: 'Button Test',
      disabled: false,
      size: 'mini'
    })
    const typeOptions = ref([
      {
        value: 'primary',
        label: 'primary'
      },
      {
        value: 'success',
        label: 'success'
      },
      {
        value: 'warning',
        label: 'warning'
      },
      {
        value: 'danger',
        label: 'danger'
      },
      {
        value: 'info',
        label: 'info'
      },
      {
        value: 'text',
        label: 'text'
      }
    ])

    const sizeOptions = ref([
      { value: 'medium', label: 'medium' },
      { value: 'small', label: 'small' },
      { value: 'mini', label: 'mini' }
    ])

    const typeOnChange = (e: any) => {
      formConfig.value.type = e
    }

    const sizeOnChange = (e: any) => {
      formConfig.value.size = e
    }

    const tableConfig = {}

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
      setTimeout(() => {
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
      }, 200)
    }

    onMounted(() => load())

    return {
      tableConfig,
      columns,
      testData,
      sortConfig,
      formConfig,
      typeOnChange,
      typeOptions,
      sizeOptions,
      sizeOnChange
    }
  }
})
</script>

<style scoped>
.container {
  width: 1000px;
  margin: auto 10px;
}
</style>
