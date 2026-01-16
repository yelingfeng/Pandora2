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
    title: 'FormBaseProps',
    name: 'FormBaseProps',
    path: '/components/FormBaseProps',
    component: () => import('@/_docs/PdForm/docs/props.md')
  },

  {
    title:'FormAPI',
    name:'FormAPI',
    path:'/components/FormAPI',
    component: () => import('@/_docs/PdForm/docs/api.md')
  },
  {
    title: 'FormCustom',
    name: 'FormCustom',
    path: '/components/FormCustom',
    component: () => import('@/_docs/PdForm/docs/custom.md')
  },
  {
    title: 'FormDynamic',
    name: 'FormDynamic',
    path: '/components/FormDynamic',
    component: () => import('@/_docs/PdForm/docs/dynamic.md')
  },
  {
    title: 'PdTable',
    name: 'PdTable',
    path: '/components/PdTable',
    component: () => import('@/_docs/PdTable/docs/README.md')
  },
  {
    title: 'Table Pagination',
    name: 'TablePagination',
    path: '/components/TablePagination',
    component: () => import('@/_docs/PdTable/docs/pagination.md')
  },
  {
    title: 'Table Sort',
    name: 'TableSort',
    path: '/components/TableSort',
    component: () => import('@/_docs/PdTable/docs/sort.md')
  },
  {
    title: 'Table Styles',
    name: 'TableStyles',
    path: '/components/TableStyles',
    component: () => import('@/_docs/PdTable/docs/styles.md')
  },
  {
    title: 'Table Selection',
    name: 'TableSelection',
    path: '/components/TableSelection',
    component: () => import('@/_docs/PdTable/docs/selection.md')
  },
  {
    title: 'Table Interaction',
    name: 'TableInteraction',
    path: '/components/TableInteraction',
    component: () => import('@/_docs/PdTable/docs/interaction.md')
  },
  {
    title: 'Table Summary',
    name: 'TableSummary',
    path: '/components/TableSummary',
    component: () => import('@/_docs/PdTable/docs/summary.md')
  },
  {
    title: 'Table useTable',
    name: 'TableUseTable',
    path: '/components/TableUseTable',
    component: () => import('@/_docs/PdTable/docs/useTable.md')
  },
  {
    title: 'PageLayout',
    name: 'PdPageLayout',
    path: '/components/PdPageLayout',
    component: () => import('@/_docs/PdPageLayout/docs/README.md')
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
