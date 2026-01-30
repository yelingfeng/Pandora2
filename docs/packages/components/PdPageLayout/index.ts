import { withInstall } from '@pandora/shared/_utils/vue'
import index from './index.vue'
import tree from './tree.vue'
import type { SFCWithInstall } from '@pandora/shared/_utils/vue/typescript'

export const PdPageLayout: SFCWithInstall<typeof index> = withInstall(index)
export const PdPageTreeLayout: SFCWithInstall<typeof tree> = withInstall(tree)

export default PdPageLayout
