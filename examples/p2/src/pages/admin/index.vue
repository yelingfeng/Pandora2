<template>
  <div>
    <a-table :data-source="data" :columns="columns" />
    <a-divider dashed />
    <a-table :data-source="data2" :columns="columns2" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import {
  Person,
  OuterMan
} from '../../../../../src/table/meta-programming/model'
export default defineComponent({
  setup() {
    const columns = Person.getColumns<Person>()
    const data = ref<Array<Person>>([])

    const columns2 = OuterMan.getColumns<OuterMan>()
    const data2 = ref<Array<OuterMan>>([])

    const getData = async () => {
      const response = await Person.getList<Person>()
      data.value = response.list
      const { list } = await OuterMan.getDataList<OuterMan>()
      data2.value = list
    }
    console.log(columns)
    // const config = Person.getConfig();

    onMounted(() => {
      getData()
    })
    return {
      columns,
      columns2,
      data2,
      data
    }
  }
})
</script>
