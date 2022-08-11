<script lang="tsx">
import type { CSSProperties, PropType } from 'vue';
import { defineComponent, computed, unref } from 'vue';
import { ElTooltip } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';
import { getPopupContainer } from '@/_utils';
import { isString, isArray } from '@/_utils/is';
import { getSlot } from '@/_utils/helper/tsxHelper';

const props = {
  /**
   * Help text max-width
   * @default: 600px
   */
  maxWidth: { type: String, default: '600px' },
  /**
   * Whether to display the serial number
   * @default: false
   */
  showIndex: { type: Boolean },
  /**
   * Help text font color
   * @default: #ffffff
   */
  color: { type: String, default: '#ffffff' },
  /**
   * Help text font size
   * @default: 14px
   */
  fontSize: { type: String, default: '14px' },
  /**
   * Help text list
   */
  placement: { type: String, default: 'right' },
  /**
   * Help text list
   */
  text: { type: [Array, String] as PropType<string[] | string> },
};

export default defineComponent({
  name: 'BasicHelp',
  components: { ElTooltip },
  props,
  setup(props, { slots }) {
    const prefixCls = 'pandora-basic-help';

    const getTooltipStyle = computed(
      (): CSSProperties => ({ color: props.color, fontSize: props.fontSize }),
    );

    const getOverlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));

    function renderTitle() {
      const textList = props.text;

      if (isString(textList)) {
        return <p>{textList}</p>;
      }

      if (isArray(textList)) {
        return textList.map((text, index) => {
          return (
            <p key={text}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {text}
              </>
            </p>
          );
        });
      }
      return null;
    }

    return () => {
      return (
        <ElTooltip
          popperClass={`${prefixCls}__wrap`}
          content={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
          rawContent={true}
          overlayStyle={unref(getOverlayStyle)}
          placement={props.placement as 'right'}
          appendTo={() => getPopupContainer()}
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
  display: inline-block;
  margin-left: 6px;
  font-size: 14px;
  color: #909399;
  cursor: pointer;

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
