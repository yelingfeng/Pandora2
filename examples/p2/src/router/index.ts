import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/table',
      name: 'table',
      component: () =>
        import(/* webpackChunkName: "Table" */ '../components/Table.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/antDTable',
      name: 'antTable',
      component: () =>
        import(/* webpackChunkName: "Table" */ '../components/antDTable.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/form',
      name: 'form',
      component: () =>
        import(/* webpackChunkName: "Form" */ '../components/Form.vue'),
      meta: {
        index: 2
      }
    },
    {
      path: '/guiTable',
      name: 'guiTable',
      component: () =>
        import(/* webpackChunkName: "guiTable" */ '../views/GuiTable.vue'),
      meta: {
        index: 3
      }
    }
  ]
})

export default router
