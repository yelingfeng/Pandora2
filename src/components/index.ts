import type { App } from 'vue'
import PdTable from './PdTable/src/index.vue'
import PdForm from './PdForm/src/index.vue'
import PdContainer from './PandoraContainer/index.vue'

const components: any = {
  PdTable,
  PdForm,
  PdContainer
}

function install(Vue: App) {
  const keys = Object.keys(components)
  keys.forEach((name) => {
    const component = components[name]
    Vue.component(component.name || name, component)
  })
}

const Pandora2 = {
  install,
  ...components
}

export default Pandora2
