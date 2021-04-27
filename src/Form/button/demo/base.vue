<template>
  <div>
    <VButton :option="formConfig" />
    <el-divider></el-divider>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form label-position="right" label-width="80px" :model="formConfig">
        <el-form-item label="Type">
          <el-select
            v-model="formConfig.type"
            size="mini"
            placeholder="请选择"
            @change="typeOnChange"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Value">
          <el-input v-model="formConfig.value"  size="mini"></el-input>
        </el-form-item>
        <el-form-item label="Disabled">
          <el-switch v-model="formConfig.disabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VButton from 'pandora2/Form/button/index.vue'
export default defineComponent({
  components: {
    VButton
  },
  setup() {
    const formConfig = ref({
      type: 'primary',
      value : 'Button Test',
      disabled:false,
      buttonOption: {
        size: 'medium'
      },
    })
    const typeOptions = ref([
      {
        value: 'primary',
        label: 'primary'
      },
      {
        value: 'success',
        label: 'success'
      },
      {
        value: 'warning',
        label: 'warning'
      },
      {
        value: 'danger',
        label: 'danger'
      },
      {
        value: 'info',
        label: 'info'
      },
      {
        value: 'text',
        label: 'text'
      }
    ])


    const typeOnChange = (e: any) => {
      formConfig.value.type = e
    }

    return {
      formConfig,
      typeOnChange,
      typeOptions
    }
  }
})
</script>

<style scoped>
</style>