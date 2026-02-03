/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */
import ComponentList from '@/_docs/list.json'
import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const docModules = import.meta.glob('./_docs/**/*.md')

function normalizeDocPages(list: any[]) {
  const sections = Array.isArray(list) ? list : []
  const pages: any[] = []

  function collect(node: any) {
    if (!node) return
    if (node.compName && node.doc) {
      pages.push({
        compName: String(node.compName),
        title: node.compZhName ? String(node.compZhName) : String(node.compName),
        doc: String(node.doc)
      })
    }

    if (Array.isArray(node.children)) {
      node.children.forEach((child: any) => collect(child))
    }
  }

  sections.forEach((sec) => collect(sec))

  return pages
}

function getFirstDocRoutePath() {
  const first = normalizeDocPages(ComponentList as any[])[0]
  return first ? `/components/${first.compName}` : '/components/Introduce'
}

const routes = [
  {
    title: '介绍',
    path: '/',
    redirect: getFirstDocRoutePath()
  },
  ...normalizeDocPages(ComponentList as any[]).map((it) => {
    const key = `./${it.doc}`
    const loader = (docModules as any)[key]
    if (!loader) {
      throw new Error(`[docs] 未找到文档：${key}（来自 list.json: ${it.compName}）`)
    }
    return {
      title: it.title,
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
