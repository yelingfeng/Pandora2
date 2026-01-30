<template>
  <div class="my-kit-doc">
    <TopHeader />
    <aside>
      <div class="menu">
        <div v-for="(link, index) in data.links" :key="index" @click="scollTop">
          <div class="meauTitle" v-if="link.path == '/components/Meau'">
            {{ link.name }}
          </div>
          <router-link :class="{ active: link.path === $route.path }" v-else :key="index" :to="link.path">{{ link.name
            }}</router-link>
        </div>
      </div>
    </aside>
    <main id="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import ComponentList from '@/_docs/list.json';
import TopHeader from '@/components/layout/TopHeader.vue';

import { createBreakpointListen } from '@/hooks/event/useBreakpoint';
import { reactive } from 'vue';

const data = reactive({
  links: ComponentList.map((item) => ({
    path: `/components/${item.compName}`,
    name: item.compZhName
  }))
})

function scollTop() {
  document.getElementById('main').scrollTop = 0
}

createBreakpointListen();

</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
}

.el-input__prefix {
  align-items: center;
}

.my-kit-doc {
  display: flex;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  padding-top: 60px;
  /* Header height */
  box-sizing: border-box;

  aside {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 240px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #dcdfe6;
    background: #fff;
    z-index: 99;
    overflow-y: auto;
    transition: transform 0.3s ease;

    .menu {
      padding: 0 10px;
      box-sizing: border-box;
    }

    /* 滚动条美化 */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #e4e7ed;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    .meauTitle {
      font-size: 16px;
      font-weight: 700;
      color: #303133;
      padding-left: 0;
      margin-top: 10px;
      margin-bottom: 5px;
      /* 优化垂直居中，移除固定 line-height */
      display: flex;
      align-items: center;
      min-height: 40px;
    }

    a {
      display: flex;
      /* 改为 flex 布局 */
      align-items: center;
      /* 垂直居中 */
      color: #606266;
      text-decoration: none;
      padding: 2px 10px;
      /* 调整 padding */
      font-size: 14px;
      border-radius: 4px;
      margin: 2px 0;
      transition: all 0.2s;
      line-height: 1.5;
      min-height: 40px;
      /* 确保最小高度 */

      &:hover {
        color: #409eff;
        background-color: #ecf5ff;
      }

      &.active {
        color: #409eff;
        font-weight: 600;
        background-color: #ecf5ff;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: #409eff;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          display: none;
          /* 暂时隐藏右侧条，Element Plus 风格通常是整行高亮 */
        }
      }
    }
  }

  main {
    flex: 1;
    margin-left: 240px;
    /* Sidebar width */
    padding: 30px 40px;
    min-height: calc(100vh - 60px);
    overflow-x: hidden;
    box-sizing: border-box;
    max-width: calc(100vw - 240px);

    /* 限制内容最大宽度，优化阅读体验 */
    >* {
      max-width: 1400px;
      margin: 0 auto;
    }
  }
}
</style>
