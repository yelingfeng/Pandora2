import { withInstall } from '@/_utils'
import _Table from './src/index.vue'

export const PdTable = withInstall<typeof _Table>(_Table)

export default PdTable
