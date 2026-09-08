<template>
  <div class="demo-container">
    <h2>CommonCard 通用卡片</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <PdBizCommonCard title="基础卡片">
        <template #content>
          <div style="padding: 20px;">
            <p>这是卡片内容区域</p>
          </div>
        </template>
      </PdBizCommonCard>
    </div>

    <div class="demo-section">
      <h3>带提示和加载状态</h3>
      <PdBizCommonCard title="数据统计" :showTips="true" titleTip="这是一个提示信息" :loading="loading">
        <template #titleRight>
          <el-button size="small" @click="toggleLoading">切换加载状态</el-button>
        </template>
        <template #content>
          <div style="padding: 20px;">
            <p>当前状态: {{ loading ? '加载中...' : '已加载' }}</p>
          </div>
        </template>
      </PdBizCommonCard>
    </div>

    <div class="demo-section">
      <h3>带跳转图标</h3>
      <PdBizCommonCard title="可跳转的卡片" :showIcon="true" @clickHeader="clickAction">
        <template #content>
          <div style="padding: 20px;">
            <p>点击右上角图标可跳转</p>
          </div>
        </template>
      </PdBizCommonCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PdBizCommonCard } from '@pandora/components/PdBiz'
import { ref } from 'vue'

const loading = ref(false)

const toggleLoading = () => {
  loading.value = !loading.value
}
const clickAction = () => {
  alert('点击了跳转')
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
</style>
