import { withInstall } from '@pandora/shared/_utils/vue'
import CommonCard from './CommonCard.vue'
import ButtonPicker from './ButtonPicker.vue'
import Stats from './Stats.vue'
import TabSwitcher from './TabSwitcher.vue'
import Loading from './Loading.vue'
import IspStatsCard from './IspStatsCard.vue'
import DynamicCheckboxSelector from './DynamicCheckboxSelector.vue'
import DateFilterDialog from './DateFilterDialog.vue'
import RoomSelector from './RoomSelector.vue'
import AdvancedQuery from './AdvancedQuery.vue'

export const PdBizCommonCard = withInstall(CommonCard)
export const PdBizButtonPicker = withInstall(ButtonPicker)
export const PdBizStats = withInstall(Stats)
export const PdBizTabSwitcher = withInstall(TabSwitcher)
export const PdBizLoading = withInstall(Loading)
export const PdBizIspStatsCard = withInstall(IspStatsCard)
export const PdBizDynamicCheckboxSelector = withInstall(DynamicCheckboxSelector)
export const PdBizDateFilterDialog = withInstall(DateFilterDialog)
export const PdBizRoomSelector = withInstall(RoomSelector)
export const PdBizAdvancedQuery = withInstall(AdvancedQuery)

export default {
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
}

export * from './types'
