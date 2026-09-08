<template>
  <div class="my-kit-doc">
    <TopHeader />
    <aside class="doc-aside">
      <div class="menu">
        <div v-for="section in menuSections" :key="section.id" class="menu-section">
          <div class="menu-title" @click="toggleSection(section.id)">
            <span>{{ section.title }}</span>
            <span class="menu-arrow" :class="{ open: isSectionOpen(section.id) }">
              <svg viewBox="0 0 1024 1024" width="10" height="10">
                <path
                  fill="currentColor"
                  d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"
                />
              </svg>
            </span>
          </div>

          <div v-show="isSectionOpen(section.id)" class="menu-section-body">
            <div v-for="group in section.groups" :key="group.id" class="menu-group">
              <template v-if="group.items.length > 1">
                <div class="menu-group-title" @click="toggleGroup(group.id)">
                  <span>{{ group.title }}</span>
                  <span class="menu-arrow" :class="{ open: isGroupOpen(group.id) }">
                    <svg viewBox="0 0 1024 1024" width="10" height="10">
                      <path
                        fill="currentColor"
                        d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"
                      />
                    </svg>
                  </span>
                </div>
                <div v-show="isGroupOpen(group.id)" class="menu-group-body">
                  <router-link
                    v-for="item in group.items"
                    :key="item.path"
                    :to="item.path"
                    class="menu-item menu-item--lvl3"
                    :class="{ active: item.path === $route.path }"
                    @click="scrollTop"
                  >
                    {{ item.name }}
                  </router-link>
                </div>
              </template>

              <router-link
                v-else
                :to="group.items[0].path"
                class="menu-item menu-item--lvl2"
                :class="{ active: group.items[0].path === $route.path }"
                @click="scrollTop"
              >
                {{ group.items[0].name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <main id="main" class="doc-main">
      <div class="doc-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import ComponentList from '@/_docs/list.json'
import TopHeader from '@/components/layout/TopHeader.vue'

import { createBreakpointListen } from '@/hooks/event/useBreakpoint'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

function normalizeMenu(list) {
  const sectionsInput = Array.isArray(list) ? list : []
  return sectionsInput
    .map((sec, sIndex) => {
      const title =
        sec && (sec.title || sec.compZhName)
          ? String(sec.title || sec.compZhName)
          : `分类${sIndex + 1}`
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

function scrollTop() {
  const el = document.getElementById('main')
  if (el) el.scrollTop = 0
}

createBreakpointListen()
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
  padding-top: var(--pd-header-height, 64px);
  box-sizing: border-box;
  background: transparent;

  .doc-aside {
    position: fixed;
    top: var(--pd-header-height, 64px);
    left: 0;
    bottom: 0;
    width: var(--pd-sidebar-width, 260px);
    padding: 16px 0 32px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(240, 240, 240, 0.85);
    background: var(--pd-bg-sidebar, rgba(255, 255, 255, 0.72));
    backdrop-filter: saturate(160%) blur(12px);
    -webkit-backdrop-filter: saturate(160%) blur(12px);
    z-index: 99;
    overflow-y: auto;
    box-sizing: border-box;

    .menu {
      padding: 0 12px;
      box-sizing: border-box;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.12);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    .menu-section + .menu-section {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--pd-border, #f0f0f0);
    }

    .menu-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      padding: 0 12px;
      margin: 0;
      font-size: 13px;
      font-weight: 600;
      color: var(--pd-text-tertiary, rgba(0, 0, 0, 0.45));
      letter-spacing: 0.02em;
      text-transform: none;
      cursor: pointer;
      user-select: none;
      transition: color var(--pd-duration, 0.2s) var(--pd-ease, ease);

      &:hover {
        color: var(--pd-text, rgba(0, 0, 0, 0.88));
      }
    }

    .menu-arrow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      color: var(--pd-text-quaternary, rgba(0, 0, 0, 0.25));
      transition: transform var(--pd-duration, 0.2s) var(--pd-ease, ease);
      user-select: none;
    }

    .menu-arrow.open {
      transform: rotate(90deg);
    }

    .menu-group-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 40px;
      padding: 0 12px;
      margin: 2px 0;
      border-radius: var(--pd-radius-sm, 6px);
      color: var(--pd-text, rgba(0, 0, 0, 0.88));
      font-size: 14px;
      cursor: pointer;
      transition: background var(--pd-duration, 0.2s) var(--pd-ease, ease),
        color var(--pd-duration, 0.2s) var(--pd-ease, ease);

      &:hover {
        color: var(--pd-primary, #5b8cff);
        background: var(--pd-primary-bg, rgba(91, 140, 255, 0.08));
      }
    }

    .menu-item {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 40px;
      margin: 2px 0;
      padding: 0 12px;
      color: var(--pd-text-secondary, rgba(0, 0, 0, 0.65));
      font-size: 14px;
      line-height: 1.5;
      text-decoration: none;
      border-radius: var(--pd-radius-sm, 6px);
      transition: background var(--pd-duration, 0.2s) var(--pd-ease, ease),
        color var(--pd-duration, 0.2s) var(--pd-ease, ease);

      &:hover {
        color: var(--pd-primary, #5b8cff);
        background: var(--pd-primary-bg, rgba(91, 140, 255, 0.08));
      }

      &.active {
        color: var(--pd-primary, #5b8cff);
        font-weight: 500;
        background: var(--pd-primary-bg, rgba(91, 140, 255, 0.08));

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 3px;
          background: var(--pd-primary, #5b8cff);
          border-radius: 0 2px 2px 0;
        }
      }
    }

    .menu-item--lvl2 {
      padding-left: 12px;
    }

    .menu-item--lvl3 {
      padding-left: 28px;
      min-height: 36px;
    }
  }

  .doc-main {
    flex: 1;
    margin-left: var(--pd-sidebar-width, 260px);
    min-height: calc(100vh - var(--pd-header-height, 64px));
    max-width: calc(100vw - var(--pd-sidebar-width, 260px));
    padding: 0 20px;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    background: transparent;
  }

  .doc-content {
    max-width: var(--pd-content-max, 1152px);
    margin: 16px auto 32px;
    padding: 28px 40px 64px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: saturate(140%) blur(10px);
    -webkit-backdrop-filter: saturate(140%) blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: var(--pd-radius-lg, 12px);
    box-shadow: var(--pd-shadow-sm);
  }
}

@media (max-width: 900px) {
  .my-kit-doc {
    .doc-aside {
      display: none;
    }

    .doc-main {
      margin-left: 0;
      max-width: 100vw;
    }

    .doc-content {
      margin: 8px 12px 24px;
      padding: 20px 16px 48px;
      border-radius: var(--pd-radius, 8px);
    }
  }
}
</style>
