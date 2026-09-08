<template>
  <header class="pandora-header">
    <div class="header-container">
      <div class="header-brand">
        <router-link to="/components/Introduce" class="logo-link">
          <img src="@/assets/pandora-logo.png" alt="Pandora2" class="logo-img" />
          <span class="logo-text">Pandora<span class="logo-accent">2</span></span>
          <span class="version-tag">v{{ version }}</span>
        </router-link>
      </div>

      <nav class="header-nav" aria-label="主导航">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isNavActive(item.path) }"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="header-actions">
        <el-tooltip content="休闲小游戏" placement="bottom" effect="dark" :show-after="200">
          <a
            href="http://8.140.252.93/"
            target="_blank"
            rel="noopener noreferrer"
            class="fish-link"
            aria-label="休闲小游戏"
          >
            <img src="@/assets/fish.svg" alt="休闲小游戏" class="fish-img" />
          </a>
        </el-tooltip>
        <a
          href="https://www.npmjs.com/package/@yelingfeng/pandora2"
          target="_blank"
          rel="noopener noreferrer"
          class="action-link"
        >
          npm
        </a>
        <a
          href="https://github.com/yelingfeng/Pandora2"
          target="_blank"
          rel="noopener noreferrer"
          class="action-link github-link"
        >
          <svg class="github-icon" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { version } from '../../../package.json'
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: '文档', path: '/components/Introduce' },
  { label: '组件', path: '/components/PdForm' },
  { label: '图表', path: '/components/Chart' },
  { label: '业务', path: '/components/CommonCard' }
]

function isNavActive(path: string) {
  if (path === '/components/Introduce') {
    return ['/components/Introduce', '/components/Install', '/components/Start'].includes(
      route.path
    )
  }
  if (path === '/components/PdForm') {
    return (
      route.path.includes('Form') ||
      route.path.includes('Table') ||
      route.path.includes('Layout') ||
      route.path.includes('Colorful')
    )
  }
  if (path === '/components/Chart') {
    return (
      route.path.includes('Chart') ||
      route.path.includes('Pie') ||
      route.path.includes('Bar') ||
      route.path.includes('Line') ||
      route.path.includes('Tooltip')
    )
  }
  if (path === '/components/CommonCard') {
    return [
      'ButtonPicker',
      'CommonCard',
      'IspStatsCard',
      'Stats',
      'TabSwitcher',
      'Loading',
      'RoomSelector',
      'DateQuarterPicker',
      'DateFilterDialog',
      'DynamicCheckboxSelector',
      'AdvancedQuery'
    ].some((name) => route.path.includes(name))
  }
  return route.path === path
}
</script>

<style lang="less" scoped>
.pandora-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--pd-header-height, 64px);
  background: var(--pd-bg-header, rgba(255, 255, 255, 0.78));
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid rgba(240, 240, 240, 0.75);
  z-index: 1000;
}

.header-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 100%;
  padding: 0 28px;
  box-sizing: border-box;
  gap: 24px;
}

.header-brand {
  justify-self: start;
  min-width: 0;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  .logo-img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  .logo-text {
    font-size: 18px;
    font-weight: 700;
    color: var(--pd-text, rgba(0, 0, 0, 0.88));
    letter-spacing: -0.02em;
  }

  .logo-accent {
    color: var(--pd-accent, #ff6a5f);
  }

  .version-tag {
    padding: 0 8px;
    height: 20px;
    font-size: 12px;
    line-height: 18px;
    color: var(--pd-primary, #5b8cff);
    background: var(--pd-primary-bg, rgba(91, 140, 255, 0.08));
    border: 1px solid var(--pd-primary-border, rgba(91, 140, 255, 0.35));
    border-radius: 10px;
    box-sizing: border-box;
  }
}

/* 居中文字导航 — Ant Design / AntV 文档站风格 */
.header-nav {
  justify-self: center;
  display: flex;
  align-items: stretch;
  height: 100%;
  gap: 8px;
}

.nav-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  color: var(--pd-text-secondary, rgba(0, 0, 0, 0.65));
  font-size: 15px;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--pd-primary, #5b8cff);
  }

  &.active {
    color: var(--pd-primary, #5b8cff);
    font-weight: 500;

    &::after {
      content: '';
      position: absolute;
      left: 16px;
      right: 16px;
      bottom: 0;
      height: 2px;
      background: var(--pd-primary, #5b8cff);
      border-radius: 1px 1px 0 0;
    }
  }
}

.header-actions {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.fish-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  padding: 2px;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: rgba(91, 140, 255, 0.08);
    transform: translateY(-1px) scale(1.04);
  }

  .fish-img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    display: block;
  }
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  color: var(--pd-text-secondary, rgba(0, 0, 0, 0.65));
  font-size: 14px;
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--pd-primary, #5b8cff);
    background: var(--pd-primary-bg, rgba(91, 140, 255, 0.08));
  }

  .github-icon {
    display: block;
  }
}

@media (max-width: 960px) {
  .header-container {
    grid-template-columns: 1fr auto;
    padding: 0 16px;
  }

  .header-nav {
    display: none;
  }
}

@media (max-width: 520px) {
  .logo-text,
  .version-tag {
    display: none;
  }

  .action-link:not(.github-link) {
    display: none;
  }
}
</style>
