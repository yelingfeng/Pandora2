import { withInstall, withNoopInstall } from '@/_utils/vue'
import Form from './src/index.vue'
import FormItem from './src/components/FormItem.vue'
export { useComponentRegister } from './src/hooks/useComponentRegister'
export const PdForm = withInstall(Form, {
  FormItem
})
export default PdForm

export const PdFormItem = withNoopInstall(FormItem)

export type { IFormItem } from './src/types/formItem'
export type {
  IFormProps,
  IFormSchema,
  IFormActionType,
  ComponentType,
  RenderCallbackParams,
  HelpComponentProps,
  UseFormReturnType
} from './src/types/index'

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
