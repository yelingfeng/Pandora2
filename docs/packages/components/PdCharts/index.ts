import { withInstall } from '@/_utils/vue'
import Charts from './src/index.vue'

export { Charts }


export const PdCharts= withInstall(Charts)

export default PdCharts

export type ChartsInstance = InstanceType<typeof PdCharts>

export { useAutoresize, useCharts, useEventListener, useLoading, usePublicAPI } from './src/hooks/index'
export * from './src/types'

