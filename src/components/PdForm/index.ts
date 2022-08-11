import { withInstall } from '@/_utils'
import _Form from './src/index.vue'

export const PdForm = withInstall<typeof _Form>(_Form)

export * from './src/hooks/useForm'

export * from './src/types'

export default PdForm
