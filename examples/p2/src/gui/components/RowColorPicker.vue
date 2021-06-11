<template>
  <div class="cp__wrapper">
    <div ref="ref_s" class="cp__v-ctrl cp__saturation">
      <div class="msk-hue" :style="styles.saturationPane"></div>
      <div class="msk-white"></div>
      <div class="msk-black"></div>
      <p class="cp__thumb" :style="styles.saturationThumb"></p>
    </div>

    <div class="cp__ctrl-pane">
      <div class="cp__previews">
        <div class="cp__preview">
          <div :style="styles.preview"></div>
        </div>

        <div class="cp__tracks">
          <div ref="ref_h" class="cp__v-ctrl cp__ctrl-bar cp__ctrl-hue">
            <div class="cp__thumb" :style="styles.hueThumb"></div>
          </div>

          <div ref="ref_a" class="cp__v-ctrl cp__ctrl-alpha">
            <div class="cp__thumb" :style="styles.alphaThumb"></div>
            <div class="cp__ctrl-bar" :style="styles.alphaTrack"></div>
          </div>
        </div>
      </div>

      <div style="margin-top: 10px">
        <div class="cp__fm-fields">
          <div v-for="k in colorModes[currentMode]" :key="k">
            <div style="position: relative">
              <input
                class="cp__inp"
                @change="handleInput(k, $event)"
                :value="colorModel[k]"
                :type="constrains[k].type"
                :maxlength="constrains[k].maxlength"
              />
              <span>{{ k }}</span>
            </div>
          </div>
        </div>

        <div class="cp__fm-switcher">
          <div @click="changecurrentMode()">
            <svg viewBox="0 0 24 24">
              <path
                fill="#333"
                d="M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
              />
              <path
                fill="#333"
                d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO: DevTools Material UI color palletes
// TODO: re-work types on pure-colors
// TODO: gradients
import { defineComponent, Ref, ref, watch } from "vue";
import {
  toPercent,
  getColorType,
  simplifyHex,
  convert,
  ArrayHsl,
  ArrayRgba,
  ArrayHsva,
  ArrayHsla,
  ArrayHsvaStr,
  ColorMode,
  clamp,
} from "../utils/colors";
import { useMouse } from "../utils/useMouse";
import debounce from "../utils/debounce";
type TConstraint = {
  type: string; // 'number' | 'string'
  maxlength: number;
};
type TConstraints = {
  [key: string]: TConstraint;
};
function constrains(): TConstraints {
  const commonNumber = {
    type: "number",
    maxlength: 3,
  };
  const percentValue = {
    type: "text",
    maxlength: 4,
  };
  return {
    r: commonNumber,
    g: commonNumber,
    b: commonNumber,
    h: commonNumber,
    s: percentValue,
    l: percentValue,
    a: {
      type: "number",
      maxlength: 4,
    },
    hex: {
      type: "text",
      maxlength: 9,
    },
  };
}
const COLOR_MODES = {
  rgba: ["r", "g", "b", "a"],
  hsla: ["h", "s", "l", "a"],
  hex: ["hex"],
};
type TSaturation = {
  x: number;
  y: number;
};
type TColorData = {
  alpha: number;
  hue: number;
  saturation: TSaturation;
};
function digestProp(val: string): TColorData {
  // TODO: digestProp cannot handle validation of untrusted input
  const rgba = val ? convert.parse2rgb(val) : ([255, 0, 0, 1] as ArrayRgba); // TODO: definitely get rid off parse2rgb due to default values
  const alpha = rgba[3] == null ? 1 : rgba[3];
  const [hue, saturation, value] = convert.rgb2hsv(rgba);
  // format of alpha: `.2f` according to Chrome DevTool
  const _alpha = parseFloat(alpha.toFixed(2));
  return {
    alpha: _alpha,
    hue: hue / 360,
    saturation: {
      x: saturation / 100,
      y: 1 - value / 100,
    },
  };
}
type ColorModel = {
  r: number; // maxLength: 3
  g: number; // maxLength: 3
  b: number; // maxLength: 3
  h: number; // maxLength: 3
  s: string; // maxLength: 4
  l: string; // maxLength: 4
  a: number; // maxlength: 4
  hex: string; // maxlength: 9
};
interface Data extends TColorData {
  currentMode: ColorMode;
  colorModel: ColorModel;
  constrains: TConstraints;
}
export default defineComponent({
  name: "RowColorPicker",
  props: {
    color: {
      type: String,
      default: "#ff0000",
    },
  },
  setup(props, { emit }) {
    const ref_s = ref(null);
    const ref_h = ref(null);
    const ref_a = ref(null);
    const { pos: pos_s, down: down_s } = useMouse(ref_s);
    const { pos: pos_h } = useMouse(ref_h);
    const { pos: pos_a } = useMouse(ref_a);
    watch(down_s, () => emit("update:pickerdown", down_s.value));
    return {
      ref_s,
      ref_h,
      ref_a,
      pos_s,
      pos_h,
      pos_a,
    };
  },
  data(): Data {
    const { color } = this;
    return {
      ...digestProp(color),
      currentMode: getColorType(color),
      colorModel: {
        hex: "",
        r: 0,
        g: 0,
        b: 0,
        h: 0,
        s: "",
        l: "",
        a: 0,
      },
      constrains: constrains(),
    };
  },
  watch: {
    color: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          //console.log('before', newVal, oldVal);
          try {
            let data = digestProp(newVal);
            //console.log('assign', data, {newVal, oldVal});
            Object.assign(this, data);
          } catch (err) {
            //console.log('Invalid NEW', newVal, oldVal);
            //console.log('my', err);
          }
          //console.log('after', newVal, oldVal);
        }
      },
    },
    rgba: {
      immediate: true,
      handler(newVal, oldVal) {
        if (`${newVal}` !== `${oldVal}`) {
          this.emitChange();
        }
      },
    },
    pos_s: {
      handler(val: { x: Ref<number>; y: Ref<number> }) {
        this.saturation = { x: val.x.value, y: val.y.value };
      },
      deep: true,
    },
    pos_h: {
      handler(val: { x: Ref<number>; y: Ref<number> }) {
        this.hue = 1 - val.x.value;
      },
      deep: true,
    },
    pos_a: {
      handler(val: { x: Ref<number>; y: Ref<number> }) {
        this.alpha = parseFloat(val.x.value.toFixed(2)); // format of alpha: `.2f` according to Chrome DevTool
      },
      deep: true,
    },
  },
  computed: {
    hsva(): ArrayHsva {
      const {
        hue,
        alpha,
        saturation: { x, y },
      } = this;
      return [hue * 360, x * 100, (1 - y) * 100, alpha];
    },
    rgba(): ArrayRgba {
      const { alpha, hsva } = this;
      const [r, g, b] = convert.hsv2rgb(hsva);
      return [Math.round(r), Math.round(g), Math.round(b), alpha];
    },
    hsla(): ArrayHsvaStr {
      const { alpha, hsva } = this;
      const [h, s, l] = convert.hsv2hsl(hsva);
      return [Math.round(h), `${Math.round(s)}%`, `${Math.round(l)}%`, alpha];
    },
    hex(): string {
      return convert.rgb2hex(this.rgba);
    },
    previewBorderColor(): string {
      const [r, g, b] = this.rgba;
      if ((r + g + b) / 3 > 235) {
        return `rgba(160,160,160,0.8)`;
      }
      return "transparent";
    },
    styles(): any {
      const { rgba, alpha, hue, saturation } = this;
      const strRGB = rgba.slice(0, 3).join(", ");
      const strHueRGB = convert
        .hsl2rgb(([hue * 360, 100, 50] as any) as ArrayHsl)
        .map((v) => Math.round(v))
        .join(", ");
      return {
        preview: {
          backgroundColor: `rgba(${rgba.join(", ")})`,
          borderColor: this.previewBorderColor,
        },
        saturationPane: {
          backgroundColor: `rgb(${strHueRGB})`,
        },
        saturationThumb: {
          left: toPercent(saturation.x),
          top: toPercent(saturation.y),
        },
        alphaTrack: {
          backgroundImage: `linear-gradient(to right, rgba(${strRGB}, 0) 0%, rgb(${strRGB}) 100%)`,
        },
        alphaThumb: {
          left: toPercent(alpha),
        },
        hueThumb: {
          left: toPercent(1 - hue),
        },
      };
    },
    colorModes() {
      return COLOR_MODES;
    },
  },
  methods: {
    emitChange() {
      const { alpha, hex, rgba, hsla } = this;
      const hexVal = simplifyHex(alpha === 1 ? hex.slice(0, 7) : hex);
      this.$emit("update:color", { rgba, hsla, hex: hexVal });
      // this ensures that every component in our model is up to date
      const [h, s, l] = hsla;
      const [r, g, b] = rgba;
      Object.assign(this.colorModel, {
        r,
        g,
        b,
        h,
        s,
        l,
        a: alpha,
        hex: hexVal,
      });
    },
    changecurrentMode() {
      const modes = Object.keys(COLOR_MODES);
      const index = modes.indexOf(this.currentMode);
      this.currentMode = modes[(index + 1) % modes.length];
    },
    handleInput(type: string, event: any) {
      const { currentMode, colorModel } = this;
      const {
        target: { value },
      } = event;
      let num = Number(value);
      let changed = false;
      switch (type) {
        case "a":
          if (colorModel[type] !== num && !isNaN(num)) {
            colorModel[type] = clamp(num, 0, 1);
            changed = true;
          }
          break;
        case "r":
        case "g":
        case "b":
          if (colorModel[type] !== num && !isNaN(num)) {
            colorModel[type] = clamp(num, 0, 255) | 0;
            changed = true;
          }
          break;
        case "h":
          if (colorModel[type] !== num && !isNaN(num)) {
            colorModel[type] = clamp(num, 0, 360) | 0;
            changed = true;
          }
          break;
        case "s":
        case "l":
          if (value.slice(-1) === "%" && colorModel[type] !== value) {
            num = parseFloat(value);
            colorModel[type] = `${clamp(num, 0, 360) | 0}%`;
            changed = true;
          }
          break;
        case "hex":
          if (value[0] === "#") {
            if (
              colorModel[type] !== value &&
              convert.parse2rgb(value).every((i) => !isNaN(i))
            ) {
              colorModel[type] = simplifyHex(value);
              changed = true;
            }
          }
          break;
      }
      if (changed) {
        const { h, s, l, r, g, b, a, hex } = colorModel;
        let literal = hex;
        if (currentMode === "rgba") {
          literal = `rgba(${[r, g, b, a]})`;
        } else if (currentMode === "hsla") {
          literal = `hsla(${[h, s, l, a]})`;
        }
        Object.assign(this, digestProp(literal));
      }
    },
  },
  created() {
    this.handleInput = debounce(this.handleInput.bind(this), 50);
  },
});
</script>
