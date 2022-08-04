<template>
  <ElButton :type="type" :icon="icon" :size="size" :disabled="disabled" @click="onClickHandler">{{ renderText() }}
  </ElButton>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { createNamespace } from '@/_utils/create'
import { isFunction } from '@/_utils/is'
import { propTypes } from '@/_utils/propTypes'
import { ElButton } from 'element-plus'

const [name] = createNamespace('button')

export default defineComponent({
  name,
  inheritAttrs: false,
  components: {
    ElButton
  },
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
      if (!props.disabled && isFunction(props.click)) {
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
