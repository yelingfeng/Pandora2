<template>
  <el-dialog
    :model-value="visible"
    title="日期筛选"
    width="480px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    class="pd-biz-date-filter-dialog"
    @update:model-value="onVisibleChange"
    @close="handleClose"
  >
    <div class="date-filter-content">
      <div class="filter-options">
        <el-radio-group v-model="selectedDateRange" @change="handleDateRangeChange">
          <el-radio
            v-for="option in dateRangeOptions"
            :key="option.value"
            :value="option.value"
            class="date-option"
            border
          >
            <div class="option-content">
              <div class="option-left">
                <el-icon class="option-icon"><Calendar /></el-icon>
                <span class="option-label">{{ option.label }}</span>
              </div>
              <span class="option-desc">{{ option.desc }}</span>
            </div>
          </el-radio>
        </el-radio-group>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="handleCancel">{{ cancelText }}</el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="selectedDateRange === '' || selectedDateRange === null || selectedDateRange === undefined"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Calendar } from '@element-plus/icons-vue'
import { getDefaultTimeValues } from '../../../shared/_utils/dateUtil'
import type { IDateFilterDialogProps, IDateRangeOption, ITimeRange } from './types'

defineOptions({ name: 'PdBizDateFilterDialog' })

const props = withDefaults(defineProps<IDateFilterDialogProps>(), {
  visible: false,
  options: () => [
    { label: '近1天', value: 1, desc: '最近24小时', days: 1 },
    { label: '近3天', value: 3, desc: '最近3天', days: 3 },
    { label: '近一周', value: 7, desc: '最近7天', days: 7 },
    { label: '近一个月', value: 30, desc: '最近30天', days: 30 }
  ],
  confirmText: '确定并查询',
  cancelText: '取消'
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'range-change': [data: { option: IDateRangeOption; timeRange: ITimeRange }]
  confirm: [data: { option: IDateRangeOption; timeRange: ITimeRange; startTime: string; endTime: string }]
  cancel: []
  close: []
}>()

const selectedDateRange = ref<number | string>('')
const previewTimeRange = ref<ITimeRange>({ start: '', end: '' })

const dateRangeOptions = computed(() => props.options)

const onVisibleChange = (val: boolean) => {
  emit('update:visible', val)
}

const handleDateRangeChange = (value: number | string) => {
  const selectedOption = dateRangeOptions.value.find((option) => option.value === value)
  if (selectedOption) {
    const { startTime, endTime } = getDefaultTimeValues(selectedOption.days)
    previewTimeRange.value = { start: startTime, end: endTime }
    emit('range-change', {
      option: selectedOption,
      timeRange: previewTimeRange.value
    })
  }
}

const handleConfirm = () => {
  if (selectedDateRange.value === '' || selectedDateRange.value === null) return

  const selectedOption = dateRangeOptions.value.find(
    (option) => option.value === selectedDateRange.value
  )
  if (selectedOption) {
    emit('confirm', {
      option: selectedOption,
      timeRange: previewTimeRange.value,
      startTime: previewTimeRange.value.start,
      endTime: previewTimeRange.value.end
    })
    emit('update:visible', false)
  }
}

const handleCancel = () => {
  emit('cancel')
  emit('update:visible', false)
}

const handleClose = () => {
  emit('close')
  resetDialog()
}

const resetDialog = () => {
  selectedDateRange.value = ''
  previewTimeRange.value = { start: '', end: '' }
}

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) resetDialog()
  }
)

defineExpose({ dateRangeOptions, selectedDateRange, handleConfirm, handleCancel, handleClose })
</script>

<style lang="scss" scoped>
.date-filter-content {
  .filter-options {
    :deep(.el-radio-group) {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .date-option {
      width: 100%;
      height: auto;
      margin: 0;
      padding: 14px 16px;
      border-radius: 8px;

      :deep(.el-radio__label) {
        width: 100%;
        padding-left: 8px;
        white-space: normal;
        line-height: 1.4;
      }

      .option-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 12px;

        .option-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;

          .option-icon {
            color: #409eff;
            flex-shrink: 0;
          }

          .option-label {
            font-weight: 500;
            color: #303133;
            font-size: 15px;
          }
        }

        .option-desc {
          font-size: 13px;
          color: #909399;
          flex-shrink: 0;
        }
      }
    }
  }
}

.dialog-footer {
  text-align: right;

  .el-button + .el-button {
    margin-left: 10px;
  }
}
</style>
