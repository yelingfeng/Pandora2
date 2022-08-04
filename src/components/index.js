import PdTable from './PdTable/src/index.vue'
import PdForm from './PdForm/src/index.vue'
import PdContainer from './PandoraContainer/index.vue'

import * as Icons from '@element-plus/icons-vue'

const IconArr = Icons

const components = {
  PdTable,
  PdForm,
  PdContainer
}

function install(Vue) {
  const keys = Object.keys(components)
  keys.forEach((name) => {
    const component = components[name]
    Vue.component(component.name || name, component)
  })
  // 注册Icons 全局组件
  Object.keys(Icons).forEach((key) => {
    Vue.component(key, IconArr[key])
  })
}

const Pandora2 = {
  install,
  ...components
}

export default Pandora2
