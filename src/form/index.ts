import { withInstall } from '../_utils'
import _Form from './src/index.vue'

const VForm = withInstall<typeof _Form>(_Form)

export * from './src/types'
export { useForm } from './src/hooks/useForm'

export default VForm
export { VForm }
