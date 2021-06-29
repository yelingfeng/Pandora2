<script lang="tsx">
import DatGui from "./DatGui.vue";
import RowTitle from "./components/RowTitle.vue";
import RowFolder from "./components/RowFolder.vue";
import RowNumber from "./components/RowNumber.vue";
import RowString from "./components/RowString.vue";
import RowBoolean from "./components/RowBoolean.vue";
import RowButton from "./components/RowButton.vue";
import RowSelect from "./components/RowSelect.vue";
import RowColor from "./components/RowColor.vue";
import { defineComponent, toRefs, withModifiers } from "vue";

export default defineComponent({
  components: {
    DatGui,
    RowTitle,
    RowFolder,
    RowNumber,
    RowString,
    RowBoolean,
    RowButton,
    RowSelect,
    RowColor,
  },
  props: {
    option: Object,
  },
  setup(props) {
    const DGProps = {
      foldPosition: "top",
    };
    function selectColor(...args: any[]) {
      console.log("select", ...args);
    }

    const currentOption = toRefs(props.option);

    const titleComp = (
      <RowTitle
        label="Title"
        background="olivedrab"
        color={currentOption.testBoolean ? "#f5dd05" : currentOption.testColor}
      />
    );
    const colorComp = (
      <RowColor
        label="Color"
        v-model={[currentOption.testColor, "color"]}
        onUpdate={withModifiers(selectColor, ["selectColor"])}
        color="#f29305"
      />
    );
    // <RowColor
    //   label="Color"
    //   v-model:color="testColor"
    //   @update:selectColor="selectColor"
    //   color="#f29305"
    // />
    // <RowColor label="Color" v-model:color="testColor" />
    // <RowSelect label="Select" :items="testItems" v-model:value="testSelect" />
    // <RowBoolean
    //   v-model:checked="testBoolean"
    //   label="Boolean"
    //   title="I can explain that"
    // />
    // <RowString v-model:value="testString" label="Text" title="... or not" />
    // <RowNumber
    //   v-model:value="testNumber"
    //   label="Number slider slider"
    //   :min="-100"
    //   :max="100"
    //   :step="1"
    //   title="Here is how it works"
    // />
    // <RowNumber v-model:value="testNumber" label="Number" />
    // <RowButton
    //   label="Button"
    //   title="This handler invoked with isTrusted = true"
    //   @clicked="buttonClicked"
    // />
    // <RowFolder label="Folder" closed>
    //  <RowColor label="Color" v-model:color="testColor" />
    //   <RowNumber
    //     v-model:value="testNumber"
    //     label="Number slider"
    //     :min="-100"
    //     :max="100"
    //     :step="1"
    //     title="Here is how it works"
    //   />
    //   <RowNumber
    //     v-model:value="testNumber"
    //     label="Number slider"
    //     :min="-100"
    //     :max="100"
    //     :step="1"
    //     title="Here is how it works"
    //   />
    //   <RowFolder label="Nested Folder" closed>
    //     <RowNumber
    //       v-model:value="testNumber"
    //       label="Number slider"
    //       :min="-100"
    //       :max="100"
    //       :step="1"
    //       title="Here is how it works"
    //     />
    //     <RowNumber
    //       v-model:value="testNumber"
    //       label="Number slider"
    //       :min="-100"
    //       :max="100"
    //       :step="1"
    //       title="Here is how it works"
    //     />
    //     <RowFolder label="Nested Folder" closed>
    //       <RowNumber
    //         v-model:value="testNumber"
    //         label="Number slider"
    //         :min="-100"
    //         :max="100"
    //         :step="1"
    //         title="Here is how it works"
    //       />
    //       <RowNumber
    //         v-model:value="testNumber"
    //         label="Number slider"
    //         :min="-100"
    //         :max="100"
    //         :step="1"
    //         title="Here is how it works"
    //       />
    //     </RowFolder>
    //   </RowFolder>
    // </RowFolder>
    return () => {
      return (
        // @ts-ignore
        <DatGui {...DGProps}>
          {titleComp}
          {colorComp}
        </DatGui>
      );
    };
  },
});
</script>

<style scoped></style>
