<template>
  <div ref="slider" class="slider" :style="bgStyle" @mousedown="handleMouseDown"></div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { clamp } from "../utils/colors";
export default defineComponent({
  name: "RowNumberSlider",
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  setup(props, { emit }) {
    const currentValue = ref(+props.value || 0);
    watch(
      () => props.value,
      () => (currentValue.value = +props.value || 0)
    );
    function handleMouseDown(evt: MouseEvent) {
      if (evt.button === 0) {
        updateState(evt.pageX);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }
    }
    function handleMouseUp(evt: MouseEvent) {
      updateState(evt.pageX);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    function handleMouseMove(evt: MouseEvent) {
      updateState(evt.pageX);
    }
    const progressWidth = computed(() =>
      clamp(((currentValue.value - props.min) * 100) / (props.max - props.min), 0, 100)
    );
    const slider = ref<HTMLSpanElement>(null);

    function updateState(pageX: number) {
      const rect = slider.value.getBoundingClientRect();
      const x = pageX - rect.left;
      const width = rect.right - rect.left;
      const value = props.min + clamp(x / width, 0, 1) * (props.max - props.min);
      emit("update:value", value);
    }

    const bgStyle = computed(() => {
      return { "background-size": `${progressWidth.value}% 100%` };
    });
    return {
      slider,
      bgStyle,
      progressWidth,
      handleMouseDown,
    };
  },
});
</script>
