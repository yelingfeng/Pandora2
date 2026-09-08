<template>
  <div class="demo-container">
    <h2>Loading 加载状态</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <div style="position: relative; height: 200px; border: 1px solid #ddd;">
        <PdBizLoading :loading="loading1" />
        <div v-if="!loading1" style="padding: 20px;">
          <p>内容已加载</p>
        </div>
      </div>
      <el-button type="primary" @click="loading1 = !loading1" style="margin-top: 10px;">
        {{ loading1 ? '隐藏加载' : '显示加载' }}
      </el-button>
    </div>

    <div class="demo-section">
      <h3>自定义文本</h3>
      <div style="position: relative; height: 200px; border: 1px solid #ddd;">
        <PdBizLoading :loading="loading2" text="数据加载中..." />
      </div>
      <el-button type="primary" @click="loading2 = !loading2" style="margin-top: 10px;">
        {{ loading2 ? '隐藏加载' : '显示加载' }}
      </el-button>
    </div>

    <div class="demo-section">
      <h3>在卡片中使用</h3>
      <el-card>
        <template #header>
          <span>数据统计</span>
        </template>
        <div style="position: relative; min-height: 150px;">
          <PdBizLoading :loading="loading3" />
          <div v-if="!loading3">
            <p>总数：1,234</p>
            <p>增长：+12.5%</p>
            <p>更新时间：{{ new Date().toLocaleString() }}</p>
          </div>
        </div>
      </el-card>
      <el-button type="primary" @click="reloadData" style="margin-top: 10px;">
        重新加载
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PdBizLoading } from '@pandora/components/PdBiz'

const loading1 = ref(true)
const loading2 = ref(true)
const loading3 = ref(false)

const reloadData = () => {
  loading3.value = true
  setTimeout(() => {
    loading3.value = false
  }, 2000)
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
