/* eslint-disable prettier/prettier */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const routes = [
  {
    title: '介绍',
    name: 'pandora2',
    path: '/',
    component: () => import('packages/Pandora/docs/README.md')
  },
  {
    title: '介绍',
    name: 'Pandora2',
    path: '/components/Introduce',
    component: () => import('packages/Pandora/docs/README.md')
  },
  {
    title: '安装',
    name: 'Install',
    path: '/components/Install',
    component: () => import('packages/Install/docs/README.md')
  },
  // {
  //   title: '快速上手',
  //   name: 'Start',
  //   path: '/components/Start',
  //   component: () => import('packages/Start/docs/README.md')
  // },
  {
    title: 'PdForm',
    name: 'PdForm',
    path: '/components/PdForm',
    component: () => import('packages/PdForm/docs/README.md')
  },
  {
    title: 'PdTable',
    name: 'PdTable',
    path: '/components/PdTable',
    component: () => import('packages/PdTable/docs/README.md')
  }
]

const routerConfig = {
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to: any, from: any) {
    if (to.path !== from.path) {
      return { top: 0 }
    }
  }
}

const router = createRouter(routerConfig as RouterOptions)

export default router
