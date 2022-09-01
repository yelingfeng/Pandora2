import { withInstall } from '@/_utils'
import _Form from './src/index.vue'

export const PdForm = withInstall<typeof _Form>(_Form)
export * from './src/types/form'
export * from './src/types/formItem'

export { useForm } from './src/hooks/useForm'

export { useComponentRegister } from './src/hooks/useComponentRegister'
export { _Form as BasicForm }
export default PdForm
