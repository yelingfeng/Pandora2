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
    path: '/'
  },
  {
    title: '介绍',
    name: 'Pandora2',
    path: '/components/Introduce',
    component: () => import('@/_docs/Pandora/docs/README.md')
  },
  {
    title: '安装',
    name: 'Install',
    path: '/components/Install',
    component: () => import('@/_docs/Install/README.md')
  },
  // {
  //   title: '快速上手',
  //   name: 'Start',
  //   path: '/components/Start',
  //   component: () => import('src/_docs_/Start/docs/README.md')
  // },
  {
    title: 'PdForm',
    name: 'PdForm',
    path: '/components/PdForm',
    component: () => import('@/_docs/PdForm/docs/README.md')
  },
  {
    title: 'PdTable',
    name: 'PdTable',
    path: '/components/PdTable',
    component: () => import('@/_docs/PdTable/docs/README.md')
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
