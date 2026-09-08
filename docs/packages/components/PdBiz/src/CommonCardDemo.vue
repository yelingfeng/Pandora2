<template>
  <div class="demo-container">
    <h2>CommonCard 通用卡片</h2>
    <div class="demo-section">
      <h3>基础用法</h3>
      <PdBizCommonCard title="基础卡片">
        <template #content>
          <p>这是卡片内容</p>
        </template>
      </PdBizCommonCard>
    </div>

    <div class="demo-section">
      <h3>带提示和加载状态</h3>
      <PdBizCommonCard
        title="数据统计"
        :showTips="true"
        titleTip="这是提示信息"
        :loading="loading"
      >
        <template #titleRight>
          <el-button size="small" @click="toggleLoading">切换加载</el-button>
        </template>
        <template #content>
          <div style="padding: 20px;">
            <p>卡片内容区域</p>
          </div>
        </template>
      </PdBizCommonCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PdBizCommonCard } from '@pandora/components'

const loading = ref(false)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #666;
}
</style>
