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
import { useFormItemMethod } from '@/hooks/component/useCommon'
import { IFormItemCompOpt } from '@/common/formItem.interface'
export default defineComponent({
  name: 'VButton',
  props: {
    option: {
      type: Object as PropType<IFormItemCompOpt>,
      default: {
        type: 'primary',
        size: 'medium',
        disabled: false
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
