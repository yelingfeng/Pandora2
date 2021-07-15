<template>
  <VTable :option="pandoraTablCfg"></VTable>
  <GuiCom :state="tableConfig"></GuiCom>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VTable from '../components/Table.vue'
import GuiCom from '../gui/Gui.vue'
import { color4Background } from '../gui/utils/colors'
export default defineComponent({
  name: 'GuiTable',
  components: {
    VTable,
    GuiCom
  },
  setup() {
    const stripeRef = ref(false)
    const HeightRef = ref(400)
    const FontSizeRef = ref(12)
    const pagerRef = ref(true)
    const borderRef = ref(false)
    const sizeRef = ref('medium')

    const pandoraTablCfg = {
      stripe: stripeRef,
      pagination: pagerRef,
      border: borderRef,
      size: sizeRef,
      height: HeightRef
    }

    // testConfig
    const tableConfig = {
      type: 'Folder',
      label: 'Table Props',
      title: 'This is Element Table Props',
      components: [
        {
          type: 'Boolean',
          title: '是否带斑马纹表格',
          label: 'stripe',
          model: stripeRef
        },
        {
          type: 'Boolean',
          title: '是否带Border',
          label: 'border',
          model: borderRef
        },
        {
          type: 'Boolean',
          title: '是否分页表格',
          label: 'pagination',
          model: pagerRef
        },
        {
          type: 'String',
          label: '表格高度',
          title: 'String',
          model: HeightRef
        },
        {
          type: 'Select',
          label: 'size',
          model: sizeRef,
          items: [
            { value: 'medium', name: 'medium' },
            { value: 'small', name: 'small' },
            { value: 'mini', name: 'mini' }
          ]
        }
        // {
        //   type: 'Title',
        //   label: '标题',
        //   background: 'olivedrab',
        //   color: '#fff'
        // },
        // {
        //   type: 'String',
        //   label: '文本',
        //   title: 'String',
        //   value: '请输入……'
        // },
        // {
        //   type: 'Number',
        //   value: 100,
        //   minNumber: -100,
        //   maxNumber: 100,
        //   step: 2,
        //   label: 'Number'
        // },
        // {
        //   type: 'Color',
        //   label: 'Color',
        //   value: '#fff'
        // }
      ]
    }

    // function buttonClicked(evt: MouseEvent) {
    //   console.log(
    //     `buttonClicked: What to do with trusted(${evt.isTrusted}) click event`,
    //     evt
    //   )
    // }
    // function findSelectedValue() {
    //   let item = state.testItems.find((_) => _.value === state.testSelect)
    //   return item?.name || 'none'
    // }
    function selectColor(...args: any[]) {
      console.log('select', ...args)
    }

    return {
      pandoraTablCfg,
      // ...toRefs(tableConfig),
      tableConfig,
      // buttonClicked,
      // findSelectedValue,
      color4Background,
      selectColor
    }
  }
})
</script>

<style></style>
