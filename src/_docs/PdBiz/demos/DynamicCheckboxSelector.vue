<template>
  <div class="demo-container">
    <h2>DynamicCheckboxSelector 动态多选选择器</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <PdBizDynamicCheckboxSelector
        v-model:visible="visible1"
        v-model:selected="selected1"
        :options="options1"
        @confirm="handleConfirm1"
      />
      <el-button type="primary" @click="visible1 = true">打开选择器</el-button>
      <div class="result" v-if="selected1.length > 0">
        已选择: <el-tag v-for="item in selected1" :key="item" style="margin-right: 8px;">{{ item }}</el-tag>
      </div>
    </div>

    <div class="demo-section">
      <h3>分组选项</h3>
      <PdBizDynamicCheckboxSelector
        v-model:visible="visible2"
        v-model:selected="selected2"
        :options="options2"
        title="选择设备类型"
        @confirm="handleConfirm2"
        @cancel="handleCancel"
      />
      <el-button type="primary" @click="visible2 = true">打开分组选择器</el-button>
      <div class="result" v-if="selected2.length > 0">
        已选择: <el-tag v-for="item in selected2" :key="item" style="margin-right: 8px;">{{ getOptionLabel(item) }}</el-tag>
      </div>
    </div>

    <div class="demo-section">
      <h3>默认选中</h3>
      <PdBizDynamicCheckboxSelector
        v-model:visible="visible3"
        v-model:selected="selected3"
        :options="options1"
        title="选择水果"
        @confirm="handleConfirm3"
      />
      <el-button type="primary" @click="visible3 = true">打开预选选择器</el-button>
      <div class="result" v-if="selected3.length > 0">
        已选择: <el-tag v-for="item in selected3" :key="item" style="margin-right: 8px;">{{ item }}</el-tag>
      </div>
    </div>

    <div class="demo-section">
      <h3>自定义按钮</h3>
      <PdBizDynamicCheckboxSelector
        v-model:visible="visible4"
        v-model:selected="selected4"
        :options="options1"
        confirmText="确认选择"
        cancelText="取消"
        @confirm="handleConfirm4"
      />
      <el-button type="primary" @click="visible4 = true">打开自定义选择器</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PdBizDynamicCheckboxSelector } from '@pandora/components/PdBiz'
import type { ICheckboxOption } from '@pandora/components/PdBiz'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)

const selected1 = ref<string[]>([])
const selected2 = ref<string[]>([])
const selected3 = ref<string[]>(['apple', 'banana'])
const selected4 = ref<string[]>([])

const options1: ICheckboxOption[] = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '西瓜', value: 'watermelon' },
  { label: '葡萄', value: 'grape' },
  { label: '草莓', value: 'strawberry' }
]

const options2: ICheckboxOption[] = [
  { label: '路由器', value: 'router', type: '网络设备' },
  { label: '交换机', value: 'switch', type: '网络设备' },
  { label: '防火墙', value: 'firewall', type: '网络设备' },
  { label: '服务器', value: 'server', type: '计算设备' },
  { label: '存储', value: 'storage', type: '计算设备' },
  { label: '负载均衡', value: 'loadbalancer', type: '计算设备' },
  { label: '摄像头', value: 'camera', type: '监控设备' },
  { label: '传感器', value: 'sensor', type: '监控设备' }
]

const getOptionLabel = (value: string) => {
  const option = options2.find(opt => opt.value === value)
  return option ? option.label : value
}

const handleConfirm1 = (values: string[]) => {
  console.log('确认选择1:', values)
}

const handleConfirm2 = (values: string[]) => {
  console.log('确认选择2:', values)
}

const handleConfirm3 = (values: string[]) => {
  console.log('确认选择3:', values)
}

const handleConfirm4 = (values: string[]) => {
  console.log('确认选择4:', values)
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
}
</style>
