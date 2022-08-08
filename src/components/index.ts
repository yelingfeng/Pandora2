import { App } from 'vue'
export * from './PandoraContainer'
export * from './PdForm'
export * from './PdTable'

import PdContainer from './PandoraContainer/index.vue'
import PdForm from './PdForm/src/index.vue'
import PdTable from './PdTable/src/index.vue'

const components: any = {
  PdContainer,
  PdForm,
  PdTable
}

const Pandora2 = {
  install(app: App) {
    Object.keys(components).forEach((it: any) => {
      const component = components[it]
      app.component(component.name, component)
    })
  },
  ...components
}

export default Pandora2
