<template>
  <li :class="['folder', { closed: currentValue }]">
    <div class="group">
      <div class="folder-text" :title="title" @click="handleClick">
        {{ label }}
      </div>
      <ul>
        <slot></slot>
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'RowFolder',
  props: {
    closed: Boolean,
    label: String,
    title: String
  },
  setup(props, { emit }) {
    const currentValue = ref(props.closed)
    watch(
      () => props.closed,
      () => (currentValue.value = props.closed)
    )
    function handleClick() {
      currentValue.value = !currentValue.value
      emit('update:folded', currentValue.value) // TODO: Do it as callback instead of custom event to preserve trust.
    }
    return {
      currentValue,
      handleClick
    }
  }
})
</script>
