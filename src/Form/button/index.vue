<template>
  <el-button
    :type="option.type"
    :size="option.size"
    :disabled="option.disabled"
    :icon="option.icon"
    @click="clickHandler"
  >
    {{ option.value.replace(/^(\W{1})(\W{1})$/, '$1 $2') }}
  </el-button>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useFormItemMethod } from '../__hooks/useCommon'
import { IFormItemCompOpt } from '../types/form'
import { propTypes } from '../../utils/propTypes'
export default defineComponent({
  name: 'VButton',
  props: {
    option: {
      type: Object as PropType<IFormItemCompOpt>,
      default: {
        type: propTypes.oneOf(['primary', 'default', 'danger', 'success', 'info','text']).def('default'),
        buttonOption:{
          size:  propTypes.oneOf(['medium','small','mini']).def('medium'),
        },
        disabled: propTypes.bool
      }
    }
  },
  setup({ option }) {
    return {
      ...useFormItemMethod(option)
    }
  }
})
</script>
