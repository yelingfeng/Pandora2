import type { Plugin } from 'vue'
import {
  PdBizCommonCard,
  PdBizButtonPicker,
  PdBizStats,
  PdBizTabSwitcher,
  PdBizLoading,
  PdBizIspStatsCard,
  PdBizDynamicCheckboxSelector,
  PdBizDateFilterDialog,
  PdBizRoomSelector,
  PdBizAdvancedQuery
} from './src/index'

export * from './src/index'

const components = [
  PdBizCommonCard,
  PdBizButtonPicker,
  PdBizStats,
  PdBizTabSwitcher,
  PdBizLoading,
  PdBizIspStatsCard,
  PdBizDynamicCheckboxSelector,
  PdBizDateFilterDialog,
  PdBizRoomSelector,
  PdBizAdvancedQuery
]

const install = (app: any) => {
  components.forEach((component) => {
    app.use(component)
  })
}

export default {
  install
} as Plugin
