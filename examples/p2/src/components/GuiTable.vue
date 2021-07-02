<template></template>
<script lang="tsx">
import { defineComponent, withModifiers } from 'vue'
import VTable from '../../../../src/table/src/index.vue'
import DatGui from '../gui/DatGui.vue'
import RowTitle from '../gui/components/RowTitle.vue'
import RowFolder from '../gui/components/RowFolder.vue'
import RowNumber from '../gui/components/RowNumber.vue'
import RowString from '../gui/components/RowString.vue'
import RowBoolean from '../gui/components/RowBoolean.vue'
import RowButton from '../gui/components/RowButton.vue'
import RowSelect from '../gui/components/RowSelect.vue'
import RowColor from '../gui/components/RowColor.vue'

export default defineComponent({
  components: {
    VTable,
    DatGui,
    RowTitle,
    RowFolder,
    RowNumber,
    RowString,
    RowBoolean,
    RowButton,
    RowSelect,
    RowColor
  },
  props: {
    option: Object
  },

  setup(props) {
    function selectColor(...args: any[]) {
      console.log('select', ...args)
    }
    const DGProps = {
      foldPosition: 'top'
    }
    const getGuiComp = (comp: any) => {
      let singleCom
      switch (comp.type) {
        case 'Title':
          singleCom = (
            <RowTitle
              label={comp.label}
              background={comp.background}
              color={comp.color}
            />
          )
          break
        case 'Folder':
          singleCom = <RowTitle label="Title" background="olivedrab" />
          break
        case 'Number':
          singleCom = (
            <RowNumber
              v-model={[comp.value, 'value']}
              label={comp.label}
              min={comp.minNumber}
              max={comp.maxNumber}
              step={comp.stepNumber}
              title={comp.title}
            />
          )
          break
        case 'String':
          singleCom = (
            <RowString
              v-model={[comp.value, 'value']}
              label={comp.label}
              title={comp.title}
            />
          )
          break
        case 'Select':
          singleCom = <RowTitle label="Title" background="olivedrab" />
          break
        case 'Color':
          singleCom = (
            <RowColor
              label={comp.label}
              v-model={[comp.value, 'color']}
              onUpdate={withModifiers(selectColor.value, ['selectColor'])}
              color="#f29305"
            />
          )
          break
        default:
          break
      }
      return singleCom
    }

    // 遍历渲染组件
    const GuiCom = props.option.components.map((it: any, index: number) => {
      const box = getGuiComp(it)
      console.log('box0', box)
      const boxArr: any = []
      boxArr.push(box)
      return boxArr
    })
    // 渲染页面
    return () => {
      return (
        // @ts-ignore
        <DatGui {...DGProps}>{GuiCom}</DatGui>
      )
    }

    // return {
    //   sortConfig,
    //   tableConfig,
    //   columns,
    //   testData,
    //   handleSizePageChange
    // }
  }
})
</script>

<style scoped></style>
