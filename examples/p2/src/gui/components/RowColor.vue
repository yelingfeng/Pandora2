<template>
  <li class="control-row color" ref="elColorRow">
    <label>
      <span class="ctrl-label" :title="title">{{ label }}</span>
      <div class="ctrl-value">
        <input class="row-input" type="text" readonly v-model="currentValue" />
        <!-- TODO: we set readonly bacause digestProp cannot handle validation of untrusted input -->

        <div
          class="picker-btn"
          :style="{ 'background-color': currentValue, color: inputColor }"
          @click="onShowPopup"
        ></div>

        <RowColorPicker
          v-show="popupVisible"
          ref="elPopup"
          :color="currentValue"
          @update:color="onColorChange"
          @update:pickerdown="onColorSelectorDown"
          @keydown="onKeyDown"
        />
      </div>
    </label>
  </li>
</template>

<script lang="ts">
import {
  ComponentPublicInstance,
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  Ref,
  ref,
  watch,
} from "vue";
import RowColorPicker from "./RowColorPicker.vue";
import { color4Background } from "../utils/colors";
export type HidePickerFn = (onHidePopup: () => void | null) => void;
export default defineComponent({
  name: "RowColor",
  props: {
    color: {
      type: String,
      default: "#00f", // TODO: handle color names like 'blue', 'red', and so on.
    },
    label: String,
    title: String,
  },
  components: { RowColorPicker },
  setup(props, { emit }) {
    const currentValue = ref(props.color);
    watch(
      () => props.color,
      () => (currentValue.value = props.color)
    );
    const pickColor = inject<HidePickerFn>("pickColor");
    const uiRoot = inject<Ref<HTMLElement>>("uiRoot");
    const elColorRow = ref<HTMLElement>(null);
    const elPopup = ref<ComponentPublicInstance>(null);
    const popupVisible = ref(false);
    let isColorSelectorDown = false;
    function onHidePopup() {
      popupVisible.value = false;
      window.removeEventListener("keydown", onKeyDown);
    }
    function onShowPopup() {
      popupVisible.value = !popupVisible.value;
      if (popupVisible.value) {
        emit("update:selectColor", { testColorSelectEvent: 5 });
        window.addEventListener("keydown", onKeyDown);
        pickColor(onHidePopup);
      } else {
        pickColor(null);
      }
    }
    function onKeyDown(event) {
      if (event.key === "Enter" || event.key === "Escape") {
        pickColor(null);
      }
    }
    const onColorChange = (e) => {
      currentValue.value = e.hex;
      emit("update:color", currentValue.value);
    };
    function onColorSelectorDown(isDown: boolean) {
      isColorSelectorDown = isDown;
    }
    function pointInsideRect(
      pt: { x: number; y: number },
      rc: { x: number; y: number; width: number; height: number }
    ): boolean {
      return (
        rc.x < pt.x && pt.x < rc.x + rc.width && rc.y < pt.y && pt.y < rc.y + rc.height
      );
    }
    function mouseup(evt: MouseEvent) {
      if (
        popupVisible.value &&
        !(evt.target as HTMLElement)?.classList?.contains("picker-btn")
      ) {
        let pt = { x: evt.clientX, y: evt.clientY };
        let outsideRoot = !pointInsideRect(pt, uiRoot.value.getBoundingClientRect());
        let insidePopup = pointInsideRect(pt, elPopup.value.$el.getBoundingClientRect());
        if (outsideRoot || !insidePopup) {
          pickColor(null);
        }
      }
    }
    window.addEventListener("mouseup", mouseup);
    onUnmounted(() => window.removeEventListener("mouseup", mouseup));
    const inputColor = computed(() => {
      // TODO: does not calc color well with alpha close to 0.
      return color4Background(currentValue.value);
    });
    return {
      currentValue,
      onColorChange,
      popupVisible,
      // onMouseOver,
      // onMouseLeave,
      onKeyDown,
      inputColor,
      onColorSelectorDown,
      onShowPopup,
      elColorRow,
      elPopup,
    };
  },
});
</script>
