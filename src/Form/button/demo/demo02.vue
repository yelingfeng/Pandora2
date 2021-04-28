<template>
  <div>
    <Button
      :type="formConfig.type"
      :value="formConfig.value"
      :size ="formConfig.size"
      :disabled="formConfig.disabled"
      :click="clickHandler"
    />
    <el-divider></el-divider>
    <el-row type="flex" justify="center">
      <el-col :span="12">
          <p>{{clickValue}}</p> 
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Button from 'pandora2/Form/button/index'
export default defineComponent({
  components: {
    Button
  },
  setup() {
    const formConfig = ref({
      type: 'primary',
      value: 'Button Click 测试',
      disabled: false,
      size: 'mini'
    })
    const clickValue = ref('')

    const clickHandler = (e:any)=>{
      console.log(e)
      clickValue.value = JSON.parse(JSON.stringify(e))
    }

    return {
      formConfig,
      clickHandler,
      clickValue
    }
  }
})
</script>

<style scoped>
</style>