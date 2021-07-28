<template>
  <div>
    <VForm :schemas="schemas" :formProps="getProps"></VForm>
    <GuiCom :state="GuiConfig"></GuiCom>
  </div>
</template>

<script lang="tsx">
import { defineComponent, onMounted, ref, computed } from 'vue'
import VForm from '../../../../src/form/src/index.vue'
import GuiCom from '../gui/Gui.vue'
export default defineComponent({
  components: {
    VForm,
    GuiCom
  },
  props: {
    option: Object
  },
  setup() {
    // const formModel = reactive<Recordable>({
    //   name: '',
    //   region: '',
    //   city: '',
    //   type: []
    // })

    const inlineRef = ref(false)
    const sizeRef = ref('mini')
    const labelPositionRef = ref('right')
    const labelWidthRef = ref('100')
    const getProps = computed(() => {
      return {
        size: sizeRef.value,
        inline: inlineRef.value,
        labelPosition: labelPositionRef.value,
        labelWidth: labelWidthRef.value + 'px'
      }
    })

    const GuiConfig = {
      type: 'Folder',
      label: 'Form Props',
      title: 'This is PandoraForm Props',
      components: [
        {
          type: 'Boolean',
          title: '是否内联formItem',
          label: 'inline',
          model: inlineRef
        },
        // {
        //   type: 'Boolean',
        //   title: '是否带Border',
        //   label: 'border',
        //   model: borderRef
        // },
        // {
        //   type: 'Boolean',
        //   title: '是否分页表格',
        //   label: 'pagination',
        //   model: pagerRef
        // },
        {
          type: 'String',
          label: 'label-width',
          title: 'String',
          model: labelWidthRef
        },
        {
          type: 'Select',
          label: 'label-Position',
          model: labelPositionRef,
          items: [
            { value: 'right', name: 'right' },
            { value: 'left', name: 'left' },
            { value: 'top', name: 'top' }
          ]
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
      ]
    }

    const schemas = [
      {
        field: 'name',
        component: 'Input',
        label: '名称',
        // model: formModel,
        defaultValue: '斗罗大陆'
      },
      {
        field: 'region',
        component: 'Input',
        label: '活动区域',
        // model: formModel,
        defaultValue: '海神岛'
      },
      {
        field: 'city',
        component: 'Select',
        label: '活动城市',
        // model: formModel,
        defaultValue: 'beijing',
        componentProps: {
          placeholder: '请选择城市',
          clearable: true,
          options: [
            {
              label: '北京',
              value: 'beijing'
            },
            {
              label: '上海',
              value: 'shanghai'
            },
            {
              label: '沈阳',
              value: 'shenyang'
            },
            {
              label: '广州',
              value: 'guangzhou'
            }
          ]
        }
      },
      {
        field: 'type',
        component: 'CheckboxGroup',
        label: '活动形式',
        // model: formModel,
        defaultValue: ['1', '2'],
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1'
            },
            {
              label: '选项2',
              value: '2'
            },
            {
              label: '选项3',
              value: '3'
            },
            {
              label: '选项4',
              value: '4'
            }
          ]
        }
      }
    ] as any[]
    onMounted(() => {})

    return {
      schemas,
      getProps,
      GuiConfig
    }
  }
})
</script>

<style scoped></style>
