<template>
  <el-input
    v-model="vmodel"
    :disabled="option.disabled"
    :placeholder="option.placeholder"
    :autocomplete="option.autocomplete"
    :style="widthStyle"
    :type="option.type"
    :clearable="option.clearable"
    :maxlength="option.maxlength"
    :rows="option.rows"
    @input="inputHandler"
    @blur="blurHandler"
    @focus="focusHanlder"
  ></el-input>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { isFunction } from '@/utils/is'
import { useFormItemMethod } from '@/hooks/component/useCommon'
import { IFormItemCompOpt } from '@/common/formItem.interface'

const useInputEvevt = (option: IFormItemCompOpt) => {
  const inputHandler = (val: string) => {
    if (option.input && isFunction(option.input)) {
      option.input(val)
    }
  }
  const blurHandler = (e: any) => {
    if (option.blur && isFunction(option.blur)) {
      option.blur(e)
    }
  }
  const focusHanlder = (e: any) => {
    if (option.focus && isFunction(option.focus)) {
      option.focus(e)
    }
  }
  return {
    inputHandler,
    blurHandler,
    focusHanlder
  }
}

export default defineComponent({
  name: 'VText',
  props: {
    option: {
      type: Object as PropType<IFormItemCompOpt>,
      default: {}
    }
  },
  setup({ option }) {
    return {
      ...useFormItemMethod(option),
      ...useInputEvevt(option)
    }
  }
})
</script>
