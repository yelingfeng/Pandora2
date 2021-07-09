import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/button',
      name: 'button',
      component: () =>
        import(/* webpackChunkName: "home" */ '../components/Button.vue'),
      meta: {
        index: 0
      }
    },
    {
      path: '/table',
      name: 'table',
      component: () =>
        import(/* webpackChunkName: "home" */ '../components/Table.vue'),
      meta: {
        index: 1
      }
    },
    {
      path: '/guiTable',
      name: 'guiTable',
      component: () =>
        import(/* webpackChunkName: "home" */ '../views/GuiTable.vue'),
      meta: {
        index: 2
      }
    }
  ]
})

export default router
