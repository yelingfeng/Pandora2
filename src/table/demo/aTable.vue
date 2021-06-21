<template>
  <div>
    <a-table :data-source="data" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import { Person } from "@/table/meta-programming/model";
export default defineComponent({
  setup() {
    const columns = Person.getColumns<Person>();
    const data = ref<Array<Person>>([]);

    const getData = async () => {
      const response = await Person.getList<Person>();
      data.value = response.list;
    };

    onMounted(() => getData());
    return {
      columns,
      data,
    };
  },
});
</script>
