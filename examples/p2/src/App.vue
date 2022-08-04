<template>
  <div>
    <el-row>
      <el-col :span="3">
        <Menu></Menu>
      </el-col>
      <el-col :span="14">
        <div class="container">
          <router-view :key="key"></router-view>
        </div>
      </el-col>
    </el-row>
    <!-- <PropsHelp :state="state" /> -->

    <!-- <div class="results">
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
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue'
import Menu from './components/menu.vue'
// import VTable from './components/Table.vue'
// import GuiCom from './gui/Gui.vue'
// import ATable from './components/AntDTable.vue'
// import PropsHelp from './gui/PandoraPropsHelp.vue'
// import { color4Background } from './gui/utils/colors'
export default defineComponent({
  name: 'App',
  components: {
    Menu
    // VTable,
    // ATable,
    // PropsHelp,
    // GuiCom
  },
  setup() {
    // const state = reactive({
    //   testNumber: 70,
    //   testBoolean: true,
    //   testString: 'ABC',
    //   testSelect: 'one',
    //   testItems: [
    //     { name: 'First option', value: 'one' },
    //     { name: 'Second option', value: 'two' }
    //   ],
    //   testColor: ''
    // })

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
    // function selectColor(...args: any[]) {
    //   console.log('select', ...args)
    // }
    const key = computed(() => {
      const vm: any = getCurrentInstance()
      return vm.proxy.$route.path
    })

    return {
      // ...toRefs(state),
      // pandoraTablCfg,
      // state,
      // ...toRefs(tableConfig),
      // tableConfig,
      // buttonClicked,
      // findSelectedValue,
      // color4Background,
      // selectColor,
      key
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
  width: 100%;
  margin: 10px;
}
</style>
