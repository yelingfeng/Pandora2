<template>
  <div class="home-container">
    <div class="banner">
      <img src="@/assets/logo.svg" alt="Pandora Logo" class="logo" />
      <h1 class="title">Pandora2</h1>
      <p class="description">基于 Vue 3 + TypeScript + Element Plus 的二次封装组件库</p>
      <div class="actions">
        <el-button type="primary" size="large" round @click="goStart">快速开始</el-button>
        <el-button size="large" round @click="goGithub">GitHub</el-button>
      </div>
    </div>

    <div class="features">
      <div class="feature-item">
        <div class="icon-wrapper">⚡️</div>
        <h3>快速开发</h3>
        <p>基于 JSON 配置化生成表单和表格，极大地减少模板代码，提升开发效率。</p>
      </div>
      <div class="feature-item">
        <div class="icon-wrapper">🦾</div>
        <h3>TypeScript</h3>
        <p>完全使用 TypeScript 开发，提供完整的类型定义，开发体验更佳。</p>
      </div>
      <div class="feature-item">
        <div class="icon-wrapper">🧩</div>
        <h3>组件丰富</h3>
        <p>内置常用业务组件，涵盖表单、表格、布局等核心场景，开箱即用。</p>
      </div>
    </div>

    <div class="tech-stack">
      <h2>技术栈版本</h2>
      <div class="stack-table">
        <div class="stack-header">
          <span>Vue</span>
          <span>Element Plus</span>
          <span>TypeScript</span>
        </div>
        <div class="stack-row">
          <span>{{ dependencies.vue }}</span>
          <span>{{ dependencies.elementPlus }}</span>
          <span>{{ devDependencies.typescript }}</span>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Created by <a href="https://github.com/yelingfeng" target="_blank">yelingfeng</a> | MIT License</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// import pkg from '../../../../../package.json'

const router = useRouter()

// const dependencies = pkg.dependencies
// const devDependencies = pkg.devDependencies
const dependencies = {
  vue: '3.5.26',
  elementPlus: '2.13.1'
}
const devDependencies = {
  typescript: '5.9.3'
}

const goStart = () => {
  // 假设快速开始在安装页面，或者第一个组件页面
  router.push('/components/Install')
}

const goGithub = () => {
  window.open('https://github.com/yelingfeng/Pandora2', '_blank')
}
</script>

<style scoped lang="less">
.home-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;

  .banner {
    padding: 60px 0;

    .logo {
      height: 120px;
      margin-bottom: 20px;
    }

    .title {
      font-size: 48px;
      font-weight: 600;
      color: #303133;
      margin: 10px 0;
    }

    .description {
      font-size: 20px;
      color: #606266;
      margin-bottom: 40px;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin: 60px 0;
    text-align: left;

    .feature-item {
      padding: 24px;
      background: #f9f9f9;
      border-radius: 12px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
      }

      .icon-wrapper {
        font-size: 32px;
        margin-bottom: 16px;
      }

      h3 {
        font-size: 20px;
        margin-bottom: 10px;
        color: #303133;
      }

      p {
        color: #606266;
        line-height: 1.6;
        font-size: 14px;
      }
    }
  }

  .tech-stack {
    margin: 60px 0;

    h2 {
      margin-bottom: 30px;
      color: #303133;
    }

    .stack-table {
      border: 1px solid #ebeef5;
      border-radius: 8px;
      overflow: hidden;
      max-width: 600px;
      margin: 0 auto;

      .stack-header,
      .stack-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 15px;
      }

      .stack-header {
        background: #f5f7fa;
        font-weight: 600;
        color: #303133;
        border-bottom: 1px solid #ebeef5;
      }

      .stack-row {
        color: #606266;
      }
    }
  }

  .footer {
    margin-top: 80px;
    padding-top: 20px;
    border-top: 1px solid #ebeef5;
    color: #909399;
    font-size: 14px;

    p {
      white-space: nowrap;
      text-align: center;
      width: 100%;
      margin: 0;
    }

    a {
      color: #409eff;
      text-decoration: none;
    }
  }
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr !important;
  }
}
</style>
