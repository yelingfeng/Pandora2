<template>
  <div ref="root" :class="['dat-gui', { closed: folded }]">
    <div v-if="foldPosition === 'top'" class="fold-ui" @click="folded = !folded">
      {{ closeButtonText }}
    </div>
    <div class="group--main group">
      <ul>
        <slot></slot>
      </ul>
    </div>
    <div v-if="foldPosition === 'bottom'" class="fold-ui" @click="folded = !folded">
      {{ closeButtonText }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, readonly, ref } from "vue";
import { HidePickerFn } from "./components/RowColor.vue";
export default defineComponent({
  name: "DatGui",
  props: {
    foldPosition: {
      type: String, // 'top' | buttom //TBD: add vertical 'right', 'left'.
      default: "bottom",
    },
  },
  setup() {
    const root = ref<HTMLElement>(null);
    const folded = ref(false);
    const closeButtonText = computed(() =>
      folded.value ? "Show controls" : "Hide controls"
    );
    let activePicker: (() => void) | null = null;
    function closeActive() {
      if (activePicker) {
        console.log("GUI: activePicker() before");
        activePicker();
        console.log("GUI: activePicker() done");
        activePicker = null;
      }
    }
    const pickColor: HidePickerFn = (onHidePopup) => {
      closeActive();
      activePicker = onHidePopup;
    };
    provide("pickColor", pickColor);
    provide("uiRoot", readonly(root));
    return {
      root,
      folded,
      closeButtonText,
    };
  },
});
</script>
<style>
.dat-gui {
  position: fixed;
  top: 0;
  right: 1em;
  width: 245px;
  font-size: 0.8em;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  color: #ddd;
}

.dat-gui.closed ul {
  display: none;
}

.dat-gui * {
  box-sizing: border-box;
}

.dat-gui .fold-ui {
  height: 22.4px;
  line-height: 22.4px;
  text-align: center;
  background-color: #1a1a1a;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.group--main {
  background-color: #6b8e23;
}

.group--main > ul {
  max-height: 50vh;
  overflow-y: auto;
  scrollbar-color: #009c9c #003636;
  scrollbar-width: thin;
}

.group--main > ul::-webkit-scrollbar {
  width: 5px;
  background: #003636;
}

.group--main > ul::-webkit-scrollbar-corner {
  height: 0;
  display: none;
}

.group--main > ul::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #009c9c;
}

.group--main li {
  list-style-type: none;
}

.group {
  overflow: hidden;
}

.group ul {
  margin: 0;
  padding: 0;
}

.group li:not(.folder) {
  height: 29px;
  line-height: 28px;
  padding: 0 0.4em;
  overflow: hidden;
  border-bottom: 1px solid #008585;
  cursor: auto;
}

.folder {
  background-color: #003636;
}

.folder .folder-text {
  padding: 5px 5px 5px 20px;
  text-align: left;
  background: #000
    url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==)
    10px 48% no-repeat;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
  font-weight: 700;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}

.folder ul {
  margin-left: 10px;
  width: calc(100% - 10px);
}

.folder.closed .folder-text {
  background: #000
    url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)
    10px 48% no-repeat;
}

.folder.closed ul {
  display: none;
}

.control-row label {
  display: flex;
  padding: 0 0 0 0.4em;
}

.control-row label .ctrl-label {
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.control-row label .ctrl-value {
  width: 60%;
  display: inline-flex;
}

.control-row label .ctrl-value .row-input {
  width: 100%;
  padding: 0.4em;
  font-size: inherit;
  border-radius: 0;
  outline: none;
  background-color: #005050;
  border: 1px solid #003b3b;
}

.control-row label .ctrl-value .row-input:hover {
  background: #006969;
}

.control-row label .ctrl-value .row-input:focus {
  background: #008383;
  color: #fff;
}

.control-row.color {
  background-color: #003636;
}

.control-row.color .ctrl-value input[type="text"] {
  text-align: center;
  flex: 3;
  color: #ddd;
}

.control-row.color .ctrl-value > div.cp__wrapper {
  width: 218px;
  position: absolute;
  right: 2.4em;
}

.control-row.number {
  background-color: #003636;
}

.control-row.number .slider {
  border: 1px solid #003b3b;
  background-color: #005050;
  background-image: linear-gradient(90deg, #2fa1d6, #2fa1d6);
  background-repeat: no-repeat;
  flex: 3;
  cursor: ew-resize;
}

.control-row.number input[type="number"] {
  flex: 1;
  color: #2fa1d6;
  min-width: 0.1em;
  -moz-appearance: textfield;
}

.control-row.number input[type="number"]::-webkit-inner-spin-button,
.control-row.number input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.control-row.title {
  background-color: #6b8e23;
}

.control-row.string {
  background-color: #003636;
}

.control-row.string input {
  color: #ddd;
}

.control-row.boolean {
  background-color: #003636;
}

.control-row.boolean .ctrl-value {
  display: flex;
  align-items: center;
}

.control-row.boolean .ctrl-value input[type="checkbox"] {
  margin-left: 0;
}

.control-row.button,
.control-row.select {
  background-color: #003636;
}

.control-row.select select {
  width: 100%;
  background-color: #003636;
  color: #ddd;
  border: 1px solid #003b3b;
  outline: none;
}

.control-row.select select:hover {
  background: #006969;
}

.control-row.select select:focus {
  background: #008383;
  color: #fff;
}

.cp__wrapper {
  width: 250px;
  margin: 0;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: Menlo, Microsoft Yahei, sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.cp__v-ctrl {
  position: relative;
}

.cp__thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 0;
  border-radius: 50%;
  margin-top: -1px;
  transform: translateX(-50%);
  background-color: #f8f8f8;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.368627);
  cursor: default;
}

.cp__saturation {
  position: relative;
  width: 100%;
  padding-bottom: 55%;
  border-radius: 2px 2px 0 0;
  overflow: hidden;
}

.cp__saturation > div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}

.cp__saturation > .msk-white {
  background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
}

.cp__saturation > .msk-black {
  background: linear-gradient(0deg, #000, transparent);
}

.cp__saturation > .cp__thumb {
  background-color: transparent;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3),
    0 0 1px 2px rgba(0, 0, 0, 0.4);
}

.cp__ctrl-pane {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 12px 12px;
}

.cp__ctrl-pane > div {
  display: flex;
  align-items: center;
}

.cp__tracks {
  flex: 1 0 0;
}

.cp__ctrl-bar {
  height: 10px;
}

.cp__ctrl-hue {
  background: linear-gradient(
    -90deg,
    red,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    red
  );
}

.cp__ctrl-alpha {
  margin-top: 8px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==)
    0;
}

.cp__previews {
  padding: 0 4px;
}

.cp__preview {
  position: relative;
  width: 28px;
  height: 28px;
  margin-right: 5px;
  overflow: hidden;
  border-radius: 50%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==)
    50%;
}

.cp__preview > div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid transparent;
  box-sizing: border-box;
}

.cp__fm-fields {
  display: flex;
  flex: 1;
}

.cp__fm-fields > div {
  padding-left: 6px;
  flex: 1 0 0;
}

.cp__fm-fields input.cp__inp {
  width: 100%;
  height: 26px !important;
  font-size: 0.9em !important;
  text-align: center;
  color: #333;
  background-color: #fff !important;
  padding: 4px !important;
  border-radius: 2px !important;
  border: none !important;
  box-shadow: inset 0 0 0 1px #dadada;
  transition: box-shadow 0.2s ease;
  -moz-appearance: textfield;
}

.cp__fm-fields input.cp__inp:focus {
  outline: 0 !important;
  box-shadow: inset 0 0 0 1px #007dff !important;
  color: #333 !important;
}

.cp__fm-fields input.cp__inp::-webkit-inner-spin-button,
.cp__fm-fields input.cp__inp::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

.cp__fm-fields span {
  display: block;
  margin-top: 6px;
  text-transform: uppercase;
  font-size: 11px;
  line-height: 11px;
  color: #969696;
  text-align: center;
}

.cp__fm-switcher {
  position: relative;
  width: 32px;
  text-align: right;
}

.cp__fm-switcher > div {
  position: relative;
  margin-right: -4px;
  margin-top: 12px;
  cursor: pointer;
}

.cp__fm-switcher > div > svg {
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background: transparent;
  border: 1px solid transparent;
}

.cp__fm-switcher > div > svg:hover {
  border-color: #eee;
  background: #eee;
}

.picker-btn {
  margin-top: 3px;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  margin-left: 0.4em;
  border: 1px solid #fff;
}
.results {
  background-color: #bee7ff;
}
</style>
