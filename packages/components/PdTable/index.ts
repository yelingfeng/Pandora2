import { withInstall } from '@pandora/shared/_utils/vue'
import _Table from './src/index.vue'

export const PdTable = withInstall(_Table)

export default PdTable

export type TableInstance = InstanceType<typeof PdTable>

export * from './src/types'

