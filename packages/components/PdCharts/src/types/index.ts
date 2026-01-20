import {
  init,
  type ECElementEvent,
  type ElementEvent,
  type SetOptionOpts,
} from 'echarts/core'
import { Ref } from 'vue'
export type Injection<T> =
  | T
  | null
  | Ref<T | null>
  | { value: T | null }

type InitType = typeof init
export type Theme = NonNullable<InitParameters[1]>
export type ThemeInjection = Injection<Theme>
export type InitParameters = Parameters<InitType>
export type InitOptions = NonNullable<InitParameters[2]>

export type InitOptionsInjection = Injection<InitOptions>

export type UpdateOptions = SetOptionOpts
export type UpdateOptionsInjection =
  Injection<UpdateOptions>

export type EChartsType = ReturnType<InitType>
type ZRenderType = ReturnType<EChartsType['getZr']>
export type EventTarget = EChartsType | ZRenderType
type SetOptionType = EChartsType['setOption']

export type ChartsOption = Parameters<SetOptionType>[0]
type MouseEventName =
  | 'click'
  | 'dblclick'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
  | 'mousedown'
  | 'mousemove'
  | 'contextmenu'
  | 'globalout'

type ElementEventName =
  | MouseEventName
  // | 'mousewheel'
  | 'drag'
  | 'dragstart'
  | 'dragend'
  | 'dragenter'
  | 'dragleave'
  | 'dragover'
  | 'drop'

type ZRenderEventName = `zr:${ElementEventName}`

type OtherEventName =
  | 'highlight'
  | 'downplay'
  | 'selectchanged'
  | 'legendselectchanged'
  | 'legendselected'
  | 'legendunselected'
  | 'legendselectall'
  | 'legendinverseselect'
  | 'legendscroll'
  | 'datazoom'
  | 'datarangeselected'
  | 'graphroam'
  | 'georoam'
  | 'treeroam'
  | 'timelinechanged'
  | 'timelineplaychanged'
  | 'restore'
  | 'dataviewchanged'
  | 'magictypechanged'
  | 'geoselectchanged'
  | 'geoselected'
  | 'geounselected'
  | 'axisareaselected'
  | 'brush'
  | 'brushEnd'
  | 'brushselected'
  | 'globalcursortaken'

export type LoadingOptions = {
  text?: string
  textColor?: string
  fontSize?: number | string
  fontWeight?: number | string
  fontStyle?: string
  fontFamily?: string
  maskColor?: string
  showSpinner?: boolean
  color?: string
  spinnerRadius?: number
  lineWidth?: number
  zlevel?: number
}

type MouseEmits = {
  [key in MouseEventName]: (
    params: ECElementEvent
  ) => boolean
}

type ZRenderEmits = {
  [key in ZRenderEventName]: (
    params: ElementEvent
  ) => boolean
}

type OtherEmits = {
  [key in OtherEventName]: null
}

export type Emits = MouseEmits &
  OtherEmits & {
    rendered: (params: { elapsedTime: number }) => boolean
    finished: () => boolean
    register: (instance: ChartsActionType) => void
  } & ZRenderEmits

/**
 * 原始数据类型
 */
export type OriginData<T> = {
  [index: number]: T | null
}

/**
 *  自动Resize刷新
 */
export type AutoresizeProp =
  | boolean
  | {
      throttle?: number
      onResize?: () => void
    }

export interface ChartsProps {
  data?: any[]
  options?: ChartsOption
  theme?: Theme
  chartType?: string
  subChartType?: string
  manualUpdate?: boolean
  autoresize?: AutoresizeProp
  loading?: boolean
  loadingOptions?: LoadingOptions
  initOptions?: InitOptions
  updateOptions?: UpdateOptions
  group?: string
}

export interface ChartsActionType {
  setOptions: (options: ChartsOption) => void
  setProps: (props: Partial<ChartsProps>) => void
  resize: () => void
  getInstance: () => EChartsType | undefined
  showLoading: (type?: string, opts?: LoadingOptions) => void
  hideLoading: () => void
  clear: () => void
  dispose: () => void
}

export type UseChartsReturnType = [
  (instance: ChartsActionType) => void,
  ChartsActionType
]

