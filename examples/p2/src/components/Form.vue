<template>
  <div>
    <VForm></VForm>
  </div>
</template>

<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import VForm from '../../../../src/form/src/index.vue'
export default defineComponent({
  components: {
    VForm
  },
  props: {
    option: Object
  },
  setup() {
    onMounted(() => {})

    return {}
  }
})
</script>

<style scoped></style>
