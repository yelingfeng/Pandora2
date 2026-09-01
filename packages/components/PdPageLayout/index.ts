import { withInstall } from '@pandora/shared/_utils/vue'
import type { SFCWithInstall } from '@pandora/shared/_utils/vue/typescript'
import index from './index.vue'
import tree from './tree.vue'

export const PdPageLayout: SFCWithInstall<typeof index> = withInstall(index)
export const PdPageTreeLayout: SFCWithInstall<typeof tree> = withInstall(tree)

export * from './types'

export type PageLayoutInstance = InstanceType<typeof index>
export type PageTreeLayoutInstance = InstanceType<typeof tree>

export default PdPageLayout
