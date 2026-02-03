import { type PropType } from 'vue'
import type {
  AutoresizeProp,
  ChartsOption,
  InitOptions,
  LoadingOptions,
  OriginData,
  Theme,
  UpdateOptions,
} from '../types'
import type {
  ChartTypes,
  SubChartType,
} from '../types/chart'

export const defaultProps = {
  data: {
    type: Array as PropType<OriginData<any>[]>,
    default: () => [],
  },
  theme: {
    type: [Object, String] as PropType<Theme>,
  },
  //
  options: {
    type: Object as PropType<ChartsOption>,
    default: () => {},
  },
  chartConfig: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  group: String,
  // echarts 配置
  initOptions: Object as PropType<InitOptions>,
  // 更新配置
  updateOptions: Object as PropType<UpdateOptions>,
  //
  manualUpdate: Boolean,
  //
  autoresize: {
    type: [Boolean, Object] as PropType<AutoresizeProp>,
    default: true,
  },
  // loading
  loading: {
    type: Boolean,
    default: false,
  },
  // loading配置
  loadingOptions: {
    type: Object as PropType<LoadingOptions>,
    default: () => {},
  },
  /**
   * 一级图表类型
   */
  chartType: String as PropType<ChartTypes>,
  /**
   * 二级图标类型
   */
  subChartType: String as PropType<SubChartType>,
}
