<template>
  <div class="demo-container">
    <h2>AdvancedQuery 高级查询</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <PdBizAdvancedQuery
        v-model:visible="visible1"
        :fields="fields1"
        @confirm="handleConfirm1"
      />
      <el-button type="primary" @click="visible1 = true">打开高级查询</el-button>
      <div v-if="query1.length > 0" class="result">
        <h4>查询条件:</h4>
        <div v-for="(item, index) in query1" :key="index" class="query-item">
          {{ item.fieldLabel }} {{ item.conditionLabel }} <span>{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>多字段类型</h3>
      <PdBizAdvancedQuery
        v-model:visible="visible2"
        :fields="fields2"
        @confirm="handleConfirm2"
        @cancel="handleCancel"
      />
      <el-button type="primary" @click="visible2 = true">打开多类型查询</el-button>
      <div v-if="query2.length > 0" class="result">
        <h4>查询条件:</h4>
        <div v-for="(item, index) in query2" :key="index" class="query-item">
          {{ item.fieldLabel }} {{ item.conditionLabel }}
          <span v-if="item.value !== undefined && item.value !== ''">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3>自定义按钮文本</h3>
      <PdBizAdvancedQuery
        v-model:visible="visible3"
        :fields="fields1"
        confirmText="应用筛选"
        cancelText="重置"
        @confirm="handleConfirm3"
      />
      <el-button type="primary" @click="visible3 = true">打开自定义查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PdBizAdvancedQuery } from '@pandora/components/PdBiz'
import type { IQueryField, IQueryCondition } from '@pandora/components/PdBiz'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const query1 = ref<IQueryCondition[]>([])
const query2 = ref<IQueryCondition[]>([])

const fields1: IQueryField[] = [
  { label: 'IP地址', value: 'ip', type: 'input' },
  { label: '机房', value: 'room', type: 'input' },
  { label: '状态', value: 'status', type: 'input' },
  { label: '运营商', value: 'isp', type: 'input' }
]

const fields2: IQueryField[] = [
  { label: 'IP地址', value: 'ip', type: 'input' },
  { label: '端口', value: 'port', type: 'number' },
  {
    label: '状态',
    value: 'status',
    type: 'select',
    options: [
      { label: '在线', value: '1' },
      { label: '离线', value: '0' },
      { label: '异常', value: '2' }
    ]
  },
  { label: '创建时间', value: 'createTime', type: 'date' },
  { label: '备注', value: 'remark', type: 'input' }
]

const handleConfirm1 = (conditions: IQueryCondition[]) => {
  query1.value = conditions
  console.log('查询条件1:', conditions)
}

const handleConfirm2 = (conditions: IQueryCondition[]) => {
  query2.value = conditions
  console.log('查询条件2:', conditions)
}

const handleConfirm3 = (conditions: IQueryCondition[]) => {
  console.log('查询条件3:', conditions)
}

const handleCancel = () => {
  console.log('取消查询')
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

h3 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #666;
  font-weight: 500;
}

h4 {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
}

.result {
  margin-top: 15px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 4px;
}

.query-item {
  padding: 8px 0;
  color: #666;
  font-size: 14px;
  border-bottom: 1px solid #ebeef5;
}

.query-item:last-child {
  border-bottom: none;
}

.query-item span {
  color: #409eff;
  font-weight: 600;
}
</style>
