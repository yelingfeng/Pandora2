<template>
  <header class="pandora-header">
    <div class="header-container">
      <div class="header-left">
        <a href="/" class="logo-link">
          <img src="@/assets/logo.svg" alt="Pandora2 Logo" class="logo-img" />
          <span class="logo-text">Pandora2</span>
          <span class="version-tag">v{{ version }}</span>
        </a>
      </div>
      <div class="header-right">
        <!-- 可以在这里添加 GitHub 链接或其他导航 -->
        <a href="https://github.com/yelingfeng/Pandora2" target="_blank" class="nav-link github-link">
          <i class="iconfont icon-github"></i> GitHub
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// TopHeader logic
import { ref } from 'vue';

const version = ref('0.0.27')
</script>

<style lang="less" scoped>
.pandora-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  z-index: 1000;
  box-shadow: 0 2px 8px #f2f3f5;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    /* 去除 max-width: 1400px; 保持两端对齐占满 */

    .header-left {
      display: flex;
      align-items: center;

      .logo-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding-left: 0;

        .logo-img {
          height: 36px;
          margin-right: 10px;
          padding: 0;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 600;
          color: #303133;
          margin-right: 10px;
        }

        .version-tag {
          font-size: 12px;
          color: #409eff;
          background: #ecf5ff;
          padding: 2px 8px;
          border-radius: 10px;
          border: 1px solid #d9ecff;
          height: 20px;
          line-height: 16px;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
        }
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      display: inline-flex;
      padding-left: 0;

      .nav-link {
        color: #606266;
        text-decoration: none;
        font-size: 14px;
        margin-left: 20px;
        transition: color 0.3s;

        &:hover {
          color: #409eff;
        }

        &.github-link {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
  }
}
</style>
