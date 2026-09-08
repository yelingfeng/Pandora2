<template>
  <div class="demo-container">
    <h2>ButtonPicker 按钮选择器</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <PdBizButtonPicker v-model="selected1" :options="options1" />
      <p class="result">当前选中: <span>{{ selected1 }}</span></p>
    </div>

    <div class="demo-section">
      <h3>带禁用选项</h3>
      <PdBizButtonPicker v-model="selected2" :options="options2" />
      <p class="result">当前选中: <span>{{ selected2 }}</span></p>
    </div>

    <div class="demo-section">
      <h3>时间范围选择</h3>
      <PdBizButtonPicker v-model="selected3" :options="options3" />
      <p class="result">当前选中: <span>{{ selected3 }}</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PdBizButtonPicker } from '@pandora/components/PdBiz'
import type { IButtonPickerOption } from '@pandora/components/PdBiz'

const selected1 = ref('option1')
const selected2 = ref('enabled1')
const selected3 = ref('today')

const options1: IButtonPickerOption[] = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
]

const options2: IButtonPickerOption[] = [
  { label: '可选1', value: 'enabled1' },
  { label: '禁用', value: 'disabled', disabled: true },
  { label: '可选2', value: 'enabled2' }
]

const options3: IButtonPickerOption[] = [
  { label: '今天', value: 'today' },
  { label: '近7天', value: 'week' },
  { label: '近30天', value: 'month' },
  { label: '近90天', value: 'quarter' }
]
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
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.result span {
  color: #409eff;
  font-weight: 600;
}
</style>
