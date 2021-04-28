<template>
  <el-button
    :type="type"
    :icon="icon"
    :size="size"
    :disabled="disabled"
    @click="onClickHandler"
    >{{ renderText() }}</el-button
  >
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { createNamespace } from '../../utils/create'
import { propTypes } from '../../utils/propTypes'

const [name] = createNamespace('button')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    value: propTypes.string,
    icon: propTypes.string,
    type: propTypes
      .oneOf(['primary', 'default', 'danger', 'success', 'info', 'text'])
      .def('default'),
    size: propTypes.oneOf(['large', 'normal', 'small', 'mini']).def('normal'),
    nativeType: propTypes.oneOf(['button', 'submit', 'reset']).def('button'),
    disabled: propTypes.bool,
    click: propTypes.func
  },
  setup(props, { slots }) {
    const renderText = () => {
      let text: any
      if (props.value) {
        text = slots.default ? slots.default() : props.value
      }
      if (text) {
        return text.replace(/^(\W{1})(\W{1})$/, '$1 $2')
      }
    }
    const onClickHandler = (event: MouseEvent) => {
      if (!props.disabled) {
        props.click(event)
      }
    }

    return {
      ...toRefs(props),
      onClickHandler,
      renderText
    }
  }
})
</script>