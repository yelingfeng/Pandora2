<template>
  <div>
    <el-row>
      <el-col :span="4">
        <Menu></Menu>
      </el-col>
      <div class="container">
        <el-col :span="20">
          <!-- <VTable></VTable> -->
          <GuiTable :option="tableConfig"></GuiTable>
        </el-col>
      </div>
    </el-row>
    <!-- <PropsHelp :state="state" /> -->

    <div class="results">
      <pre>
        Test results:
          Number : {{ testNumber }}
          Boolean: {{ testBoolean }}
          Text   : {{ testString }}
          Select : {{ testSelect }} -> {{ findSelectedValue() }}
          Color  : {{ testColor }}
      </pre>
      <span
        class="results-color"
        :style="{
          color: color4Background(testColor),
          'background-color': testColor
        }"
        >&nbsp;&nbsp;{{ testColor }}&nbsp;&nbsp;</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import Menu from './components/menu.vue'
import VTable from './components/Table.vue'
import GuiTable from './components/GuiTable.vue'
import ATable from './components/AntDTable.vue'
import PropsHelp from './gui/PandoraPropsHelp.vue'
import { color4Background } from './gui/utils/colors'
export default defineComponent({
  name: 'App',
  components: {
    Menu,
    VTable,
    ATable,
    PropsHelp,
    GuiTable
  },
  setup() {
    const state = reactive({
      testNumber: 70,
      testBoolean: true,
      testString: 'ABC',
      testSelect: 'one',
      testItems: [
        { name: 'First option', value: 'one' },
        { name: 'Second option', value: 'two' }
      ],
      testColor: ''
    })

    const stripeRef = ref('stripe')
    const HeightRef = ref(200)
    const FontSizeRef = ref(12)

    // testConfig
    const tableConfig = {
      type: 'Folder',
      label: 'Table Props',
      components: [
        {
          type: 'Boolean',
          label: 'stripe',
          model: stripeRef
        },
        {
          type: 'Title',
          label: '标题',
          background: 'olivedrab',
          color: '#fff'
        },
        {
          type: 'String',
          label: '文本',
          title: 'String',
          value: '请输入……'
        },
        {
          type: 'Number',
          value: 100,
          minNumber: -100,
          maxNumber: 100,
          step: 2,
          label: 'Number'
        },
        {
          type: 'Color',
          label: 'Color',
          value: '#fff'
        }
      ]
    }

    function buttonClicked(evt: MouseEvent) {
      console.log(
        `buttonClicked: What to do with trusted(${evt.isTrusted}) click event`,
        evt
      )
    }
    function findSelectedValue() {
      let item = state.testItems.find((_) => _.value === state.testSelect)
      return item?.name || 'none'
    }
    function selectColor(...args: any[]) {
      console.log('select', ...args)
    }
    return {
      ...toRefs(state),
      state,
      // ...toRefs(tableConfig),
      tableConfig,
      buttonClicked,
      findSelectedValue,
      color4Background,
      selectColor
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 1000px;
  margin: 10px auto;
}
</style>
