import { withInstall } from '../_utils'
import _Form from './src/index.vue'

const VForm = withInstall<typeof _Form>(_Form)

export default VForm
export { VForm }
