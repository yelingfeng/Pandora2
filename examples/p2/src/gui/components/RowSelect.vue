<template>
  <li class="control-row select">
    <label>
      <span class="ctrl-label" :title="title">{{ label }}</span>
      <div class="ctrl-value">
        <select :value="currentValue" @change="handleChange">
          <option v-for="item in items" :key="item.value" :value="item.value">
            {{ item.name }}
          </option>
        </select>
      </div>
    </label>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from "vue";
export type SelectItem = {
  name: string;
  value: string | number;
};
export default defineComponent({
  name: "RowSelect",
  // TODO: Array type checking is severely broken in Vue at runtime. The code below is fine, but the Vue runtime check throws a warning.
  // props: {
  //     value: [String, Number],
  //     items: {
  //         type: () => [] as SelectItem[]
  //     },
  //     label: String,
  //     title: String,
  // },
  props: ["value", "items", "label", "title"], // TODO: Add select by index (for localized string values)
  setup(props, { emit }) {
    const currentValue = ref(props.value);
    watch(
      () => props.value,
      () => (currentValue.value = props.value || "")
    );

    function handleChange(evt: any) {
      currentValue.value = evt.target.value;
      emit("update:value", currentValue.value);
    }
    return {
      currentValue,
      handleChange,
    };
  },
});
</script>
