<template>
  <div>
    <Button
      :type="formConfig.type"
      :value="formConfig.value"
      :size ="formConfig.size"
      :disabled="formConfig.disabled"
    />
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
            <el-input v-model="formConfig.value" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="Size">
            <el-select
              v-model="formConfig.size"
              size="mini"
              placeholder="请选择"
              @change="sizeOnChange"
            >
              <el-option
                v-for="item in sizeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Disabled">
            <el-switch
              v-model="formConfig.disabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Button from 'pandora2/button/src/index.vue'
export default defineComponent({
  components: {
    Button
  },
  setup() {
    const formConfig = ref({
      type: 'primary',
      value: 'Button Test',
      disabled: false,
      size: 'mini'
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

    const sizeOptions = ref([
      { value: 'medium', label: 'medium' },
      { value: 'small', label: 'small' },
      { value: 'mini', label: 'mini' }
    ])

    const typeOnChange = (e: any) => {
      formConfig.value.type = e
    }

    const sizeOnChange = (e: any) => {
      formConfig.value.size = e
    }
    return {
      formConfig,
      typeOnChange,
      typeOptions,
      sizeOptions,
      sizeOnChange
    }
  }
})
</script>

<style scoped>
</style>