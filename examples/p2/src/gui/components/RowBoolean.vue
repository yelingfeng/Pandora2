<template>
  <li class="control-row boolean">
    <label>
      <span class="ctrl-label" :title="title">{{ label }}</span>
      <div class="ctrl-value">
        <input type="checkbox" :checked="currentValue" @change="handleChange" />
      </div>
    </label>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'RowBoolean',
  props: {
    checked: Boolean,
    label: String,
    title: String
  },
  setup(props, { emit }) {
    const currentValue = ref(props.checked)
    watch(
      () => props.checked,
      () => (currentValue.value = props.checked)
    )
    function handleChange() {
      currentValue.value = !currentValue.value
      emit('update:checked', currentValue.value)
    }
    return {
      currentValue,
      handleChange
    }
  }
})
</script>
