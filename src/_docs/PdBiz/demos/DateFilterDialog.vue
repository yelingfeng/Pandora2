<template>
  <div class="demo-container">
    <h2>DateFilterDialog 日期筛选对话框</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <el-button type="primary" @click="showDialog1 = true">打开日期筛选</el-button>
      <PdBizDateFilterDialog
        :visible="showDialog1"
        @update:visible="showDialog1 = $event"
        @confirm="handleConfirm1"
      />
      <p class="result" v-if="selectedRange1">
        选择: {{ selectedRange1.option.label }}<br>
        时间范围: {{ selectedRange1.startTime }} ~ {{ selectedRange1.endTime }}
      </p>
    </div>

    <div class="demo-section">
      <h3>自定义选项</h3>
      <el-button type="primary" @click="showDialog2 = true">打开自定义筛选</el-button>
      <PdBizDateFilterDialog
        :visible="showDialog2"
        :options="customOptions"
        confirmText="确定"
        cancelText="取消"
        @update:visible="showDialog2 = $event"
        @confirm="handleConfirm2"
        @cancel="handleCancel"
      />
      <p class="result" v-if="selectedRange2">
        选择: {{ selectedRange2.option.label }}<br>
        时间范围: {{ selectedRange2.startTime }} ~ {{ selectedRange2.endTime }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PdBizDateFilterDialog } from '@pandora/components/PdBiz'
import type { IDateRangeOption } from '@pandora/components/PdBiz'

const showDialog1 = ref(false)
const showDialog2 = ref(false)
const selectedRange1 = ref<any>(null)
const selectedRange2 = ref<any>(null)

const customOptions: IDateRangeOption[] = [
  { label: '今天', value: 0, desc: '今天的数据', days: 0 },
  { label: '近3天', value: 3, desc: '最近3天', days: 3 },
  { label: '近一周', value: 7, desc: '最近7天', days: 7 },
  { label: '近半个月', value: 15, desc: '最近15天', days: 15 },
  { label: '近一个月', value: 30, desc: '最近30天', days: 30 }
]

const handleConfirm1 = (result: any) => {
  selectedRange1.value = result
  console.log('确认选择1:', result)
}

const handleConfirm2 = (result: any) => {
  selectedRange2.value = result
  console.log('确认选择2:', result)
}

const handleCancel = () => {
  console.log('取消选择')
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

.result {
  margin-top: 15px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.result span {
  color: #409eff;
  font-weight: 600;
}
</style>
