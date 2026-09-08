<template>
  <el-drawer
    :model-value="visible"
    title="高级查询"
    direction="rtl"
    size="60%"
    append-to-body
    :close-on-click-modal="false"
    class="pd-biz-advanced-query-drawer"
    @update:model-value="onVisibleChange"
  >
    <div class="pd-biz-advanced-query">
      <div class="form-body">
        <el-form
          ref="queryFormRef"
          label-width="120px"
          label-position="right"
          :rules="formRules"
          :model="formData"
        >
          <el-form-item
            v-for="field in filterableFields"
            :key="field.fieldName"
            :label="field.label + '：'"
            :prop="field.fieldName"
          >
            <div class="form-item-flex">
              <el-select
                v-model="formData[field.fieldName].operator"
                placeholder="操作符"
                size="small"
                class="op"
                clearable
                @change="updateValidation(field.fieldName)"
              >
                <el-option
                  v-for="cond in field.conditions"
                  :key="cond"
                  :label="cond"
                  :value="cond"
                />
              </el-select>

              <el-select
                v-if="
                  field.inputType === 'select' &&
                  !isConditionNoValue(formData[field.fieldName].operator)
                "
                v-model="formData[field.fieldName].value"
                placeholder="请选择"
                size="small"
                class="val"
                clearable
              >
                <el-option
                  v-for="opt in field.selectOptions"
                  :key="String(opt.value)"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>

              <el-date-picker
                v-else-if="
                  field.inputType === 'date' &&
                  !isConditionNoValue(formData[field.fieldName].operator)
                "
                v-model="formData[field.fieldName].value"
                type="date"
                placeholder="请选择日期"
                size="small"
                class="val"
                value-format="YYYY-MM-DD"
              />

              <el-input
                v-else-if="!isConditionNoValue(formData[field.fieldName].operator)"
                v-model="formData[field.fieldName].value"
                :type="field.inputType === 'number' ? 'number' : 'text'"
                placeholder="请输入"
                size="small"
                class="val"
                clearable
              />
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div class="form-footer">
        <el-button size="small" @click="handleClose">关闭</el-button>
        <el-button type="primary" size="small" @click="handleSave">{{ confirmText }}</el-button>
        <el-button size="small" @click="handleReset">{{ cancelText === '重置' ? cancelText : '重置' }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import type {
  IAdvancedQueryProps,
  IQueryField,
  IQueryResult,
  IQueryCondition
} from './types'

defineOptions({ name: 'PdBizAdvancedQuery' })

export interface NormalizedField {
  fieldName: string
  label: string
  inputType: string
  conditions: string[]
  selectOptions: Array<{ label: string; value: string | number }>
  origin: IQueryField
}

const DEFAULT_CONDITIONS: Record<string, string[]> = {
  input: ['等于', '不等于', '包含', '不包含', '为空', '不为空'],
  number: ['等于', '不等于', '大于', '小于', '大于等于', '小于等于', '为空', '不为空'],
  select: ['等于', '不等于', '为空', '不为空'],
  date: ['等于', '大于', '小于', '大于等于', '小于等于', '为空', '不为空'],
  string: ['等于', '不等于', '包含', '不包含', '为空', '不为空']
}

const props = withDefaults(defineProps<IAdvancedQueryProps>(), {
  visible: false,
  fields: () => [],
  confirmText: '查询',
  cancelText: '重置'
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  save: [result: IQueryResult[]]
  confirm: [result: IQueryCondition[]]
  cancel: []
}>()

const queryFormRef = ref<FormInstance>()
const formData = ref<Record<string, any>>({})
const formRules = ref<Record<string, any>>({})

const getInputType = (dataType: string) => {
  const rawType = (dataType || 'input').toLowerCase()
  if (['number', 'uint32', 'float32'].includes(rawType)) return 'number'
  if (rawType === 'select') return 'select'
  if (rawType === 'date' || rawType === 'datetime') return 'date'
  return 'text'
}

const normalizeField = (field: IQueryField): NormalizedField | null => {
  if (field.isFilterable === false) return null

  const fieldName = field.fieldName || field.value || ''
  if (!fieldName) return null

  const rawType = (field.type || field.dataType || 'input').toLowerCase()
  let inputType = 'input'
  if (['number', 'uint32', 'float32'].includes(rawType)) inputType = 'number'
  else if (rawType === 'select') inputType = 'select'
  else if (rawType === 'date' || rawType === 'datetime') inputType = 'date'
  else if (rawType === 'string') inputType = 'input'

  const conditions =
    field.conditions && field.conditions.length > 0
      ? field.conditions
      : DEFAULT_CONDITIONS[inputType] || DEFAULT_CONDITIONS.input

  return {
    fieldName,
    label: field.label,
    inputType,
    conditions,
    selectOptions: field.options || [],
    origin: field
  }
}

const filterableFields = computed(() => {
  return props.fields.map(normalizeField).filter(Boolean) as NormalizedField[]
})

const isConditionNoValue = (op: string) => {
  return op === '为空' || op === '不为空'
}

const updateValidation = (fieldKey: string) => {
  queryFormRef.value?.validateField(fieldKey)
}

const onVisibleChange = (val: boolean) => {
  emit('update:visible', val)
}

const handleClose = () => {
  emit('update:visible', false)
}

const handleSave = async () => {
  const form = queryFormRef.value as any
  if (!form?.validate) {
    emitResults()
    return
  }

  // 兼容 Element Plus Promise 校验 与 测试中的 callback 写法
  try {
    let settled = false
    const maybePromise = form.validate((valid?: boolean) => {
      if (settled) return
      settled = true
      if (valid !== false) emitResults()
    })

    if (maybePromise && typeof maybePromise.then === 'function') {
      await maybePromise
      if (!settled) {
        settled = true
        emitResults()
      }
    }
  } catch {
    // 校验失败不关闭
  }
}

const emitResults = () => {
  const saveResult: IQueryResult[] = []
  const confirmResult: IQueryCondition[] = []

  for (const field of filterableFields.value) {
    const item = formData.value[field.fieldName]
    if (!item?.operator) continue

    saveResult.push({
      fieldName: field.fieldName,
      condition: item.operator,
      queryValue: item.value,
      originData: field.origin
    })

    confirmResult.push({
      field: field.fieldName,
      fieldLabel: field.label,
      condition: item.operator,
      conditionLabel: item.operator,
      value: item.value
    })
  }

  emit('save', saveResult)
  emit('confirm', confirmResult)
  handleClose()
}

const resetForm = () => {
  for (const key in formData.value) {
    formData.value[key].operator = ''
    formData.value[key].value = ''
  }
  queryFormRef.value?.clearValidate()
}

const handleReset = () => {
  resetForm()
  emit('save', [])
  emit('confirm', [])
  emit('cancel')
}

watch(
  () => props.visible,
  (val) => {
    if (!val) resetForm()
  }
)

watch(
  filterableFields,
  (fields) => {
    const nextData: Record<string, any> = {}
    const nextRules: Record<string, any> = {}

    fields.forEach((field) => {
      nextData[field.fieldName] = {
        operator: formData.value[field.fieldName]?.operator || '',
        value: formData.value[field.fieldName]?.value ?? '',
        originData: field.origin
      }

      nextRules[field.fieldName] = [
        {
          validator: (_rule: any, _value: any, callback: (err?: Error) => void) => {
            const item = formData.value[field.fieldName]
            const needsValue = item?.operator && !isConditionNoValue(item.operator)
            if (needsValue && (item.value === '' || item.value === null || item.value === undefined)) {
              return callback(new Error('请输入查询值'))
            }
            callback()
          },
          trigger: ['blur', 'change']
        }
      ]
    })

    formData.value = nextData
    formRules.value = nextRules
  },
  { immediate: true }
)

defineExpose({
  filterableFields,
  formData,
  queryFormRef,
  handleClose,
  handleSave,
  handleReset,
  isConditionNoValue,
  getInputType
})
</script>

<style lang="scss" scoped>
.pd-biz-advanced-query {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 360px;
  overflow: hidden;

  .form-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 8px 16px;
  }

  .form-footer {
    padding: 12px 8px;
    text-align: center;
    border-top: 1px solid #eee;
    background-color: #fff;
  }

  .form-item-flex {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    .op {
      width: 120px;
      flex-shrink: 0;
    }

    .val {
      flex: 1;
      min-width: 0;
    }
  }
}
</style>
