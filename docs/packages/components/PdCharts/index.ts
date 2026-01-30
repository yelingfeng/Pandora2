import { withInstall } from '@pandora/shared/_utils/vue'
import Charts from './src/index.vue'

export { Charts }


export const PdCharts: any = withInstall(Charts)

export default PdCharts

export type ChartsInstance = InstanceType<typeof PdCharts>

export { useAutoresize, useCharts, useLoading, usePublicAPI } from './src/hooks/index'
export * from './src/types'
