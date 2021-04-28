import { withInstall } from '../../utils'
import _Button from './Button.vue'

const Button = withInstall<typeof _Button>(_Button)

export default Button 
export { Button }