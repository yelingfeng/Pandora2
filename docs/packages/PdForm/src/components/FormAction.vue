<template>
  <el-col v-bind="actionColOpt" v-if="showActionButtonGroup">
    <div style="width: 100%" :style="{ textAlign: 'right' }">
      <el-form-item>
        <slot name="resetBefore"></slot>
        <el-button type="default" v-bind="getResetBtnOptions" @click="resetAction" v-if="showResetButton">
          {{ getResetBtnOptions.label }}
        </el-button>
        <slot name="submitBefore"></slot>

        <el-button type="primary" v-bind="getSubmitBtnOptions" @click="submitAction" v-if="showSubmitButton">
          {{ getSubmitBtnOptions.label }}
        </el-button>

        <slot name="advanceBefore"></slot>
        <el-button type="text" size="small" @click="toggleAdvanced" v-if="showAdvancedButton && !hideAdvanceBtn">
          {{ isAdvanced ? '收起' : '展开' }}
          <BasicArrow class="ml-1" :expand="!isAdvanced" up />
        </el-button>
        <slot name="advanceAfter"></slot>
      </el-form-item>
    </div>
  </el-col>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { ElFormItem, ElCol, ButtonProps, ColProps, ElButton } from 'element-plus';
import BasicArrow from './BasicArrow.vue';
import { useFormContext } from '../hooks/useFormContext';
import { propTypes } from '@/_utils/propTypes';

type ButtonOptions = Partial<ButtonProps> & { label: string };

export default defineComponent({
  name: 'BasicFormAction',
  components: {
    ElFormItem,
    BasicArrow,
    ElCol,
    ElButton
  },
  props: {
    showActionButtonGroup: propTypes.bool.def(true),
    showResetButton: propTypes.bool.def(true),
    showSubmitButton: propTypes.bool.def(true),
    showAdvancedButton: propTypes.bool.def(true),
    resetButtonOptions: {
      type: Object as PropType<Partial<ButtonOptions>>,
      default: () => ({}),
    },
    submitButtonOptions: {
      type: Object as PropType<Partial<ButtonOptions>>,
      default: () => ({}),
    },
    actionColOptions: {
      type: Object as PropType<Partial<ColProps>>,
      default: () => ({}),
    },
    actionSpan: propTypes.number.def(6),
    isAdvanced: propTypes.bool,
    hideAdvanceBtn: propTypes.bool.def(false),
  },
  emits: ['toggle-advanced'],
  setup(props, { emit }) {

    const actionColOpt = computed(() => {
      const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
      const actionSpan = 24 - span;
      const advancedSpanObj = showAdvancedButton
        ? { span: actionSpan < 6 ? 24 : actionSpan }
        : {};
      const actionColOpt: Partial<ColProps> = {
        span: showAdvancedButton ? 6 : 4,
        ...advancedSpanObj,
        ...actionColOptions,
      };
      return actionColOpt;
    });

    const getResetBtnOptions = computed((): ButtonOptions => {
      return Object.assign(
        {
          label: '重置',
        },
        props.resetButtonOptions,
      );
    });



    const getSubmitBtnOptions = computed(() => {
      return Object.assign(
        {
          label: '查询',
        },
        props.submitButtonOptions,
      );
    });

    function toggleAdvanced() {
      emit('toggle-advanced');
    }


    return {
      actionColOpt,
      getResetBtnOptions,
      getSubmitBtnOptions,
      toggleAdvanced,
      ...useFormContext(),
    };
  },
});
</script>
