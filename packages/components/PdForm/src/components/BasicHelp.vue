<script lang="tsx">
import { defineComponent, type PropType } from 'vue';
import { ElTooltip } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';
import { getSlot } from '@/_utils/helper/tsxHelper';

const props = {
  color: { type: String, default: '#ffffff' },
  /**
 * Help text font size
 * @default: 14px
 */
  fontSize: { type: String, default: '14px' },
  /**
   * 
   * Whether to display the serial number
   * @default: false
   */
  tabindex: { type: Boolean },
  /**
   * Help text list
   */
  placement: { type: String, default: 'right' },
  /**
   * Help text list
   */
  content: { type: [Array, String] as PropType<string[] | string> },
};

export default defineComponent({
  name: 'BasicHelp',
  components: { ElTooltip },
  props,
  setup(props, { slots }) {
    const prefixCls = 'pandora-basic-help';
    // const getOverlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));
    const getContent = ()=>{
      const str = `<div style="color: ${props.color};fontSize: ${props.fontSize};">${props.content}</div>`
      return str
    }

    return () => {
      return (
        <ElTooltip
          content={getContent()}
          rawContent={true}
          placement={props.placement as 'right'}
        >
          <span class={prefixCls}>{getSlot(slots) || <Warning />}</span>
        </ElTooltip>
      );
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'pandora-basic-help';

.@{prefix-cls} {
  display: block;
  margin-left: 6px;
  font-size: 14px;
  width: 16px;
  height: 16px;
  color: #909399;
  cursor: pointer;
  float: right;
  margin-top: 3px;

  &:hover {
    color: #0960bd;
  }

  &__wrap {
    p {
      margin-bottom: 0;
    }
  }
}
</style>
