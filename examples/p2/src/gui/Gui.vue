<script lang="tsx">
import { defineComponent, withModifiers, PropType, toRefs } from 'vue'
import DatGui from './DatGui.vue'
import RowTitle from './components/RowTitle.vue'
import RowFolder from './components/RowFolder.vue'
import RowNumber from './components/RowNumber.vue'
import RowString from './components/RowString.vue'
import RowBoolean from './components/RowBoolean.vue'
import RowButton from './components/RowButton.vue'
import RowSelect from './components/RowSelect.vue'
import RowColor from './components/RowColor.vue'

interface IGuiProps {
  label?: string
  type?: string
  title?: string
  components?: []
}

export default defineComponent({
  name: 'GuiPropsHelper',
  props: {
    state: {
      type: Object as Partial<PropType<IGuiProps>>,
      default() {
        return {}
      }
    }
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
          singleCom = (
            <RowSelect label={comp.label}
                      items={comp.items}
                     v-model={[comp.model, 'value']}
                     />
                     )
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
        case 'Boolean':
          singleCom = (
            <RowBoolean
              v-model={[comp.model, 'checked']}
              label={comp.label}
              title={comp.title}
            />
          )
        default:
          break
      }
      return singleCom
    }

    const getComponentsNode = (comps: Array<any>) => {
      return comps.map((it: any) => {
        return getGuiComp(it)
      })
    }
    const { type, label, title, components } = toRefs(props.state) as IGuiProps

    // const FolderNode = config.map((item: any) => {
    //   const type = item.type
    //   if (type === 'Folder') {
    //     const f = <RowTitle label={item.label} background="#000" color="#FFF" />
    //     const child = getComponentsNode(item.components)
    //     return [f, child]
    //   }
    // })

    // 遍历渲染组件
    // const GuiCom = props.option.components.map((it: any, index: number) => {
    //   const box = getGuiComp(it)
    //   // console.log('box0', box)
    //   const boxArr: any = []
    //   boxArr.push(box)
    //   return boxArr
    // })
    // 渲染页面
    return () => {
      let folder
      if (type.value === 'Folder') {
        folder = (
          <RowFolder label={label.value} title={title.value}>
            {getComponentsNode(components.value)}
          </RowFolder>
        )
      }
      return (
        // @ts-ignore
        <DatGui {...DGProps}>{folder}</DatGui>
      )
    }
  }
})
</script>

<style scoped></style>
