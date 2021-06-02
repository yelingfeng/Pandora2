import { withInstall } from '../_utils'
import _Button from './src/index.vue'

const Button = withInstall<typeof _Button>(_Button)

export default Button 
export { Button }