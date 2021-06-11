<template>
  <li class="control-row button">
    <label>
      <span class="ctrl-label" :title="title" @click="handleClick">{{ label }}</span>
    </label>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "RowBytton",
  props: {
    label: String,
    title: String,
  },
  setup(props, { emit }) {
    function handleClick(evt) {
      emit("clicked", evt); // TODO: Check if Vue events are synchronous (if not add callback option, to make call from this event).
    }
    return {
      handleClick,
    };
  },
});
</script>
