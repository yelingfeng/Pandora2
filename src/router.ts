/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */
import ComponentList from '@/_docs/list.json'
import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const docModules = import.meta.glob('./_docs/**/*.md')

function getFirstDocRoutePath() {
  const first = (ComponentList as any[]).find(
    (it) => it && it.compName && it.compName !== 'Meau' && it.doc
  )
  return first ? `/components/${first.compName}` : '/components/Introduce'
}

const routes = [
  {
    title: '介绍',
    path: '/',
    redirect: getFirstDocRoutePath()
  },
  ...(ComponentList as any[])
    .filter((it) => it && it.compName && it.compName !== 'Meau' && it.doc)
    .map((it) => {
      const key = `./${it.doc}`
      const loader = (docModules as any)[key]
      if (!loader) {
        throw new Error(`[docs] 未找到文档：${key}（来自 list.json: ${it.compName}）`)
      }
      return {
        title: it.compZhName || it.compName,
        name: it.compName,
        path: `/components/${it.compName}`,
        component: loader
      }
    })
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
