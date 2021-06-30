<template>
  <li class="control-row number">
    <label>
      <span class="ctrl-label" :title="title">{{ label }}</span>
      <div class="ctrl-value">
        <Slider
          class="slider"
          v-show="hasSlider"
          :min="minValue"
          :max="maxValue"
          :value="currentValue"
          @update:value="sanitizeNumber"
        />
        <input
          class="row-input"
          type="number"
          :min="minValue"
          :max="maxValue"
          :step="stepValue"
          v-model="currentValue"
          @change="handleChange"
        />
      </div>
    </label>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { clamp } from '../utils/colors'
import Slider from './RowNumberSlider.vue'
export default defineComponent({
  name: 'RowNumber',
  components: { Slider },
  props: {
    showSlider: {
      type: Boolean,
      default: true
    },
    min: Number,
    max: Number,
    step: Number,
    value: {
      type: [Number, String],
      required: true
    },
    label: String,
    title: String
  },
  setup(props, { emit }) {
    let minValue =
      typeof props.min === 'number' ? props.min : Number.NEGATIVE_INFINITY
    let maxValue =
      typeof props.max === 'number' ? props.max : Number.POSITIVE_INFINITY
    if (minValue > maxValue) {
      ;[minValue, maxValue] = [maxValue, minValue]
    }
    const currentValue = ref(+props.value || 0)
    watch(
      () => props.value,
      () => (currentValue.value = +props.value || 0)
    ) // TODO: Do we need to sanitize this value?
    const hasSlider = computed(
      () =>
        props.showSlider &&
        Number.isFinite(minValue) &&
        Number.isFinite(maxValue)
    )
    const stepValue = computed(() => {
      if (!props.step) {
        const val = maxValue - minValue
        return 10 ** Math.floor(Math.log(Math.abs(val)) / Math.LN10) / 10
      }
      return props.step
    })
    function sanitizeNumber(number: number) {
      let safeNumber = clamp(+number || 0, minValue, maxValue)
      const step: number = stepValue.value
      if (step !== 0 && Number.isFinite(step)) {
        safeNumber = Math.round(safeNumber / step) * step
      }
      currentValue.value = safeNumber
      emit('update:value', safeNumber)
    }
    function handleChange(evt: InputEvent) {
      sanitizeNumber(+(evt.target as HTMLInputElement).value)
    }
    return {
      currentValue,
      hasSlider,
      stepValue,
      minValue,
      maxValue,
      sanitizeNumber,
      handleChange
    }
  }
})
</script>
