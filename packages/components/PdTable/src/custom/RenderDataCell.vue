<template>
  <div class="render-data-cell" :style="{ 'justify-content': justifyContent }">
    <span class="data-value" @click="handleClick" :style="{ color: arrowColor }">
      {{ formattedValue }}
    </span>
    <i v-if="showArrow" :class="['arrow-icon', arrowIcon]" :style="{ color: arrowColor }"></i>
  </div>
</template>

<script>
import { formatNumberValueOnly, isTimeString } from './biz';

export default {
  name: 'RenderDataCell',
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    colorField: {
      type: String,
      required: true,
    },
    justifyContent: {
      type: String,
      default: 'center',
    },
    typeField: {
      type: String,
      required: true,
    },
    keyField: {
      type: String,
      required: false,
    },
    row: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      colors: {
        green: '#218939',
        red: '#F9170B',
      },
      udFlag: {
        up: 'up',
        down: 'down',
      },
    }
  },
  computed: {
    formattedValue() {
      const originValue = this.value
      // console.log('originValue->', originValue)
      if (isTimeString(originValue)) {
        return originValue
      }
      const isNumFormatProp = (p) => typeof p === 'string' && p.includes('_num')
      if (typeof originValue === 'number' && Number.isFinite(originValue) && isNumFormatProp(this.keyField)) {
        return formatNumberValueOnly(originValue, 2)
      }
      return originValue
    },
    showArrow() {
      // const color = this.row[this.colorField]
      const udFlag = this.row[`${this.keyField}_udFlag`]
      // console.log(udFlag)
      // const value = this.value
      // console.log('RenderDataCell - showArrow:', {
      //   colorField: this.colorField,
      //   color: color,
      //   value: value,
      //   shouldShow: (color === this.colors.green || color === this.colors.red) && value !== 0,
      // })
      return udFlag === this.udFlag.down || udFlag === this.udFlag.up
    },
    arrowIcon() {
      // const color = this.row[this.colorField]
      const udFlag = this.row[`${this.keyField}_udFlag`]
      if (udFlag === this.udFlag.down) {
        return 'el-icon-bottom'
      } else if (udFlag === this.udFlag.up) {
        return 'el-icon-top'
      }
      return null
    },

    arrowColor() {
      const color = this.row[this.colorField]
      if (color === this.colors.green) {
        return this.colors.green
      } else if (color === this.colors.red) {
        return this.colors.red.toLowerCase()
      }
      return color
    },
  },
  mounted() {
    // console.log('RenderDataCell mounted:', {
    //   value: this.value,
    //   colorField: this.colorField,
    //   typeField: this.typeField,
    //   row: this.row,
    //   index: this.index,
    // })
  },
  methods: {
    handleClick() {
      // console.log('RenderDataCell clicked:', this.row, this.column, this.index)
      this.$emit('click', this.row, this.column, this.index)
    },
    getUnit(value, index) {
      if (index === 0 && value) {
        return '（' + value + '）'
      } else {
        return ''
      }
    },
  },
}
</script>

<style scoped>
.render-data-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 8px;
}

.render-data-cell.center-layout {
  justify-content: center;
}

.data-value {
  cursor: pointer;
}

.arrow-icon {
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
