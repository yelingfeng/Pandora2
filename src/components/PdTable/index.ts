import { withInstall } from '@/_utils'
import _Table from './src/index.vue'

const VTable = withInstall<typeof _Table>(_Table)

export default VTable
export { VTable }
