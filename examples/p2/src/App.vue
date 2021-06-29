<template>
  <div>
    <el-row>
      <el-col :span="4">
        <Menu></Menu>
      </el-col>
      <div class="container">
        <el-col :span="20">
          <VTable></VTable>
        </el-col>
      </div>
    </el-row>
    <PropsHelp :state="state" />

    <div class="results">
      <pre>
        Test results:
          Number : {{ testNumber }}
          Boolean: {{ testBoolean }}
          Text   : {{ testString }}
          Select : {{ testSelect }} -> {{ findSelectedValue() }}
          Color  : {{ testColor }}
      </pre>
      <!-- <span
        class="results-color"
        :style="{
          color: color4Background(testColor),
          'background-color': testColor,
        }"
        >&nbsp;&nbsp;{{ testColor }}&nbsp;&nbsp;</span
      > -->
    </div>
    <!--     
    <DatGui foldPosition="top">
      <RowTitle
        label="Title"
        background="olivedrab"
        :color="testBoolean ? '#f5dd05' : testColor"
      />
      <RowColor
        label="Color"
        v-model:color="testColor"
        @update:selectColor="selectColor"
        color="#f29305"
      />
      <RowColor label="Color" v-model:color="testColor" />
      <RowSelect label="Select" :items="testItems" v-model:value="testSelect" />
      <RowBoolean
        v-model:checked="testBoolean"
        label="Boolean"
        title="I can explain that"
      />
      <RowString v-model:value="testString" label="Text" title="... or not" />
      <RowNumber
        v-model:value="testNumber"
        label="Number slider slider"
        :min="-100"
        :max="100"
        :step="1"
        title="Here is how it works"
      />
      <RowNumber v-model:value="testNumber" label="Number" />
      <RowButton
        label="Button"
        title="This handler invoked with isTrusted = true"
        @clicked="buttonClicked"
      />
      <RowFolder label="Folder" closed>
        <RowColor label="Color" v-model:color="testColor" />
        <RowNumber
          v-model:value="testNumber"
          label="Number slider"
          :min="-100"
          :max="100"
          :step="1"
          title="Here is how it works"
        />
        <RowNumber
          v-model:value="testNumber"
          label="Number slider"
          :min="-100"
          :max="100"
          :step="1"
          title="Here is how it works"
        />
        <RowFolder label="Nested Folder" closed>
          <RowNumber
            v-model:value="testNumber"
            label="Number slider"
            :min="-100"
            :max="100"
            :step="1"
            title="Here is how it works"
          />
          <RowNumber
            v-model:value="testNumber"
            label="Number slider"
            :min="-100"
            :max="100"
            :step="1"
            title="Here is how it works"
          />
          <RowFolder label="Nested Folder" closed>
            <RowNumber
              v-model:value="testNumber"
              label="Number slider"
              :min="-100"
              :max="100"
              :step="1"
              title="Here is how it works"
            />
            <RowNumber
              v-model:value="testNumber"
              label="Number slider"
              :min="-100"
              :max="100"
              :step="1"
              title="Here is how it works"
            />
          </RowFolder>
        </RowFolder>
      </RowFolder>
    </DatGui> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Menu from "./components/menu.vue";
import VTable from "./components/Table.vue";
import ATable from "./components/AntDTable.vue";
import PropsHelp from "./gui/PandoraPropsHelp.vue";
import { color4Background } from "./gui/utils/colors";
export default defineComponent({
  name: "App",
  components: {
    Menu,
    VTable,
    ATable,
    PropsHelp,
  },
  setup() {
    const state = reactive({
      testNumber: 70,
      testBoolean: true,
      testString: "ABC",
      testSelect: "one",
      testItems: [
        { name: "First option", value: "one" },
        { name: "Second option", value: "two" },
      ],
      testColor: "",
    });
    function buttonClicked(evt: MouseEvent) {
      console.log(
        `buttonClicked: What to do with trusted(${evt.isTrusted}) click event`,
        evt
      );
    }
    function findSelectedValue() {
      let item = state.testItems.find((_) => _.value === state.testSelect);
      return item?.name || "none";
    }
    function selectColor(...args: any[]) {
      console.log("select", ...args);
    }
    return {
      // ...toRefs(state),
      state,
      buttonClicked,
      findSelectedValue,
      color4Background,
      selectColor,
    };
  },
});
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
