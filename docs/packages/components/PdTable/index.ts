import { withInstall } from '@pandora/shared/_utils/vue'
import _Table from './src/index.vue'
import _ColorfulTable from './src/colorful/ColorfulTable.vue'

export const PdTable = withInstall(_Table)
export const ColorfulTable = withInstall(_ColorfulTable)

export default PdTable

export type TableInstance = InstanceType<typeof PdTable>
export type ColorfulTableInstance = InstanceType<typeof ColorfulTable>

export * from './src/types'
