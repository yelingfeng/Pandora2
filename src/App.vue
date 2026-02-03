<template>
  <div class="my-kit-doc">
    <TopHeader />
    <aside>
      <div class="menu">
        <div v-for="section in menuSections" :key="section.id" class="menu-section">
          <div class="meauTitle" @click="toggleSection(section.id)">
            <span>{{ section.title }}</span>
            <span class="menu-arrow" :class="{ open: isSectionOpen(section.id) }">›</span>
          </div>

          <div v-show="isSectionOpen(section.id)" class="menu-section-body">
            <div v-for="group in section.groups" :key="group.id" class="menu-group">
              <template v-if="group.items.length > 1">
                <div class="menu-group-title" @click="toggleGroup(group.id)">
                  <span>{{ group.title }}</span>
                  <span class="menu-arrow" :class="{ open: isGroupOpen(group.id) }">›</span>
                </div>
                <div v-show="isGroupOpen(group.id)" class="menu-group-body">
                  <router-link v-for="item in group.items" :key="item.path" :to="item.path"
                    class="menu-item menu-item--lvl3" :class="{ active: item.path === $route.path }" @click="scollTop">
                    {{ item.name }}
                  </router-link>
                </div>
              </template>

              <router-link v-else :to="group.items[0].path" class="menu-item menu-item--lvl2"
                :class="{ active: group.items[0].path === $route.path }" @click="scollTop">
                {{ group.items[0].name }}
              </router-link>
            </div>
          </div>
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
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

function normalizeMenu(list) {
  const sectionsInput = Array.isArray(list) ? list : []
  return sectionsInput
    .map((sec, sIndex) => {
      const title = sec && (sec.title || sec.compZhName) ? String(sec.title || sec.compZhName) : `分类${sIndex + 1}`
      const groupsInput = sec && Array.isArray(sec.children) ? sec.children : []
      const groups = groupsInput
        .map((group, gIndex) => {
          if (group && group.compName && group.doc) {
            const item = {
              path: `/components/${String(group.compName)}`,
              name: group.compZhName ? String(group.compZhName) : String(group.compName)
            }
            return {
              id: `group:${sIndex}:${gIndex}:${String(group.compName)}`,
              title: group.title ? String(group.title) : item.name,
              items: [item]
            }
          }

          const groupTitle = group && group.title ? String(group.title) : `分组${gIndex + 1}`
          const pagesInput = group && Array.isArray(group.children) ? group.children : []
          const items = pagesInput
            .filter((p) => p && p.compName && p.doc)
            .map((p) => ({
              path: `/components/${String(p.compName)}`,
              name: p.compZhName ? String(p.compZhName) : String(p.compName)
            }))
          return {
            id: `group:${sIndex}:${gIndex}:${groupTitle}`,
            title: groupTitle,
            items
          }
        })
        .filter((g) => g && g.items && g.items.length > 0)

      return {
        id: `section:${sIndex}:${title}`,
        title,
        groups
      }
    })
    .filter((s) => s.groups.length > 0)
}

const menuSections = computed(() => normalizeMenu(ComponentList))

const openSectionIds = ref(new Set())
const openGroupIds = ref(new Set())

function isSectionOpen(id) {
  return openSectionIds.value.has(id)
}

function isGroupOpen(id) {
  return openGroupIds.value.has(id)
}

function toggleSection(id) {
  const next = new Set(openSectionIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  openSectionIds.value = next
}

function toggleGroup(id) {
  const next = new Set(openGroupIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  openGroupIds.value = next
}

function ensureOpenByRoute(path) {
  const sections = menuSections.value
  const nextSections = new Set(openSectionIds.value)
  const nextGroups = new Set(openGroupIds.value)

  sections.forEach((sec) => {
    sec.groups.forEach((group) => {
      const hit = group.items.some((it) => it.path === path)
      if (!hit) return
      nextSections.add(sec.id)
      if (group.items.length > 1) nextGroups.add(group.id)
    })
  })

  openSectionIds.value = nextSections
  openGroupIds.value = nextGroups
}

watch(
  () => route.path,
  (p) => ensureOpenByRoute(p),
  { immediate: true }
)

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
      justify-content: space-between;
      cursor: pointer;
    }

    .menu-arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      color: #a8abb2;
      transition: transform 0.2s ease;
      user-select: none;
    }

    .menu-arrow.open {
      transform: rotate(90deg);
    }

    .menu-group-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 10px;
      margin: 2px 0;
      min-height: 36px;
      border-radius: 4px;
      color: #303133;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .menu-group-title:hover {
      color: #409eff;
      background-color: #ecf5ff;
    }

    .menu-item {
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

    .menu-item--lvl2 {
      padding-left: 10px;
    }

    .menu-item--lvl3 {
      padding-left: 26px;
      min-height: 36px;
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
