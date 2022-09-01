import { withInstall } from '@/_utils'
import PandoraContainer from './index.vue'

export const PdFContainer =
  withInstall<typeof PandoraContainer>(PandoraContainer)

export default PdFContainer
