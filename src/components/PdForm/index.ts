import { withInstall } from '@/_utils'
import _Form from './src/index.vue'

export const PdForm = withInstall<typeof _Form>(_Form)

export default PdForm
