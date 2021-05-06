
<template>
  <div>
    <h1>{{ msg }}</h1>
    <Button
      :type="formConfig.type"
      :value="formConfig.value"
      :size="formConfig.size"
      :disabled="formConfig.disabled"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Button } from '../../../../lib/pandora2.es'
export default defineComponent({
  name: 'Demo-Button',
  components: {
    Button
  },
  setup: () => {
    const count = ref(0)
    const formConfig = {
      type: 'primary',
      value: 'Button Test',
      disabled: false,
      size: 'mini'
    }

    return { count, formConfig }
  }
})
</script>

<style scoped>
</style>
