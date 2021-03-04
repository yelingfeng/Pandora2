<template>
  <el-select
    v-model="valueRef"
    :clearable="option.clearable"
    :disabled="option.disabled"
    :filterable="option.filterable"
    :multiple="option.multiple"
    :collapseTags="option.collapseTags"
    @change="changeHandler"
    @focus="focusHandler"
    @blur="blurHandler"
    :placeholder="option.placeholder"
    :style="widthStyle"
  >
    <el-option
      v-for="item in dataRef"
      :key="item.index"
      :label="item.name"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, onMounted, watch } from 'vue'
import { useFormItemMethod } from '@/hooks/component/useCommon'
import { IFormItemCompOpt } from '@/common/formItem.interface'
import { isFunction } from '@/utils/is'

type selectType = string | string[]

export default defineComponent({
  name: 'VSelect',
  props: {
    option: {
      type: Object as PropType<IFormItemCompOpt>,
      default: {
        disabled: false,
        placeholder: '',
        type: 'select',
        autocomplete: 'off',
        clearable: true
      }
    }
  },
  setup({ option }) {
    // 下拉框数据
    const dataRef = ref<Object[]>([])
    // 下拉框值
    const valueRef = ref<selectType>('')

    watch(
      () => option.data,
      (newVal = [], preVal) => {
        console.log(newVal)
        dataRef.value = newVal
      }
    )

    onMounted(() => {
      valueRef.value = option.multiple ? [] : ''
      dataRef.value = option.data || []
      valueRef.value = option.value
    })

    const changeHandler = function (val: string) {
      if (option.change && isFunction(option.change)) {
        let originData = Object.create(null)
        dataRef.value.forEach((item: any) => {
          if (item.value === val) originData = Object.assign({}, item)
        })
        option.change(val, originData)
      }
    }

    return {
      dataRef,
      valueRef,
      changeHandler,
      ...useFormItemMethod(option)
    }
  }
})
</script>
