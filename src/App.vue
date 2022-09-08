<template>
  <div class="my-kit-doc">
    <aside>
      <div class="logo">
        <img src="@/assets/logo-long.png" alt="" />
        <div class="version">0.0.12</div>
      </div>
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
import ComponentList from '@/_docs/list.json'

import { createBreakpointListen } from '@/hooks/event/useBreakpoint';
import { reactive } from 'vue'

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
}

.el-input__prefix {
  align-items: center;
}

.my-kit-doc {
  display: flex;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;

  .logo {
    width: 100%;
    position: relative;
    padding: 20px 0;

    img {
      width: 100%;
    }

    .version {
      position: absolute;
      right: 0;
      bottom: 15px;
      background: #7abafa;
      color: #fff;
      padding: 0 10px;
      border-radius: 25px;
      font-size: 10px;
      line-height: 18px;
    }
  }

  aside {
    width: 230px;
    padding: 0 15px;
    display: flex;
    flex-direction: column;

    .menu {
      height: calc(100vh - 107px);
      overflow: scroll;
      padding-bottom: 30px;
      padding-right: 10px;
      box-sizing: border-box;
    }

    .menu::-webkit-scrollbar {
      width: 0 !important;
    }

    .meauTitle {
      font-size: 16px;
      font-weight: bold;
      line-height: 50px;
      color: #333;
      padding-left: 30px;
    }

    .active {
      color: #53a8ff;
      font-weight: bold;
      padding: 5px 2rem 5px 1.5rem;
      font-size: 0.9rem;
      margin: 0 8px;
      border-radius: 8px;
      background: #ecf5ff;
    }
  }

  main {
    width: 100%;
    flex: 1;
    padding: 0 30px;
    height: 100vh;
    overflow: scroll;
    padding-bottom: 30px;
    box-sizing: border-box;
  }

  main::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
