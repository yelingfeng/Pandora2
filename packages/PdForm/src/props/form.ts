import type { FieldMapToTime, IFormSchema } from '../types/form'
import type { CSSProperties, PropType } from 'vue'
// import type { TableActionType } from '/@/components/Table'
import type { ButtonProps, ColProps, FormRules, RowProps } from 'element-plus'
import { propTypes } from '@/_utils/propTypes'

export const FormBasicProps = {
  model: {
    type: Object as PropType<Recordable>,
    default: {}
  },
  // 标签宽度  固定宽度
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => []
  },
  // compact: propTypes.bool,
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<IFormSchema[]>,
    default: () => []
  },
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null
  },
  baseRowStyle: {
    type: Object as PropType<CSSProperties>
  },
  baseColProps: {
    type: Object as PropType<Partial<ColProps>>
  },
  autoSetPlaceHolder: propTypes.bool.def(true),
  // 在INPUT组件上单击回车时，是否自动提交
  autoSubmitOnEnter: propTypes.bool.def(false),
  submitOnReset: propTypes.bool,
  submitOnChange: propTypes.bool,
  size: propTypes.oneOf(['large', 'default', 'small']).def('default'),
  // 禁用表单
  disabled: propTypes.bool,
  emptySpan: {
    type: [Number, Object] as PropType<number>,
    default: 0
  },
  // 是否显示收起展开按钮
  showAdvancedButton: propTypes.bool.def(false),
  // 转化时间
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date
    }
  },
  rulesMessageJoinLabel: propTypes.bool.def(true),
  // 超过3行自动折叠
  autoAdvancedLine: propTypes.number.def(3),
  // 不受折叠影响的行数
  alwaysShowLines: propTypes.number.def(1),

  // 是否显示操作按钮
  showActionButtonGroup: propTypes.bool.def(true),
  // 操作列Col配置
  actionColOptions: Object as PropType<Partial<ColProps>>,
  // 显示重置按钮
  showResetButton: propTypes.bool.def(true),
  // 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
  autoFocusFirstItem: propTypes.bool,
  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,

  // 显示确认按钮
  showSubmitButton: propTypes.bool.def(true),
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,

  // 自定义重置函数
  resetFunc: Function as PropType<() => Promise<void>>,
  submitFunc: Function as PropType<() => Promise<void>>,

  // 以下为默认props
  hideRequiredMark: propTypes.bool,

  labelAlign: propTypes.string,

  rowProps: Object as PropType<RowProps>,

  rules: Object as PropType<FormRules>
}
