import { withInstall, withNoopInstall } from '@/_utils/vue'
import Form from './src/index.vue'
import FormItem from './src/components/FormItem.vue'

export const PdForm = withInstall(Form, {
  FormItem
})
export default PdForm

export const PdFormItem = withNoopInstall(FormItem)

export * from './src/types/form'
export * from './src/types/formItem'
export * from './src/types/index'

export { useForm } from './src/hooks/useForm'
export { useComponentRegister } from './src/hooks/useComponentRegister'

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
