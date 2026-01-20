import { withInstall } from '@/_utils/vue'
import index from './index.vue'
import tree from './tree.vue'

export const PdPageLayout = withInstall(index)
export const PdPageTreeLayout = withInstall(tree)

export default PdPageLayout
