import { withInstall, withNoopInstall } from '@pandora/shared/_utils/vue'
import Form from './src/index.vue'
import FormItem from './src/components/FormItem.vue'
import type { SFCWithInstall } from '@pandora/shared/_utils/vue/typescript'

export { useComponentRegister } from './src/hooks/useComponentRegister'

export { useForm } from './src/hooks/useForm'

export const PdForm: SFCWithInstall<typeof Form> & { FormItem: typeof FormItem } = withInstall(Form, {
  FormItem
})
export default PdForm

export const PdFormItem: SFCWithInstall<typeof FormItem> = withNoopInstall(FormItem)

export type { IFormItem } from './src/types/formItem'
export type {
  IFormSchema,
  IFormProps,
  IFormActionType,
  RenderCallbackParams
} from './src/types/index'

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
