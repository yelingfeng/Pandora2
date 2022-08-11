import { App } from 'vue'
export { default as PdContainer } from './PandoraContainer'
export { default as PdForm } from './PdForm'
export { default as PdTable } from './PdTable'

import PdContainer from './PandoraContainer/index'
import PdForm from './PdForm/index'
import PdTable from './PdTable/index'

const Pandora2 = {
  install(app: App) {
    app.use(PdContainer)
    app.use(PdForm)
    app.use(PdTable)
  }
}

export default Pandora2
