<template>
  <el-drawer
    :model-value="visible"
    :title="title"
    direction="rtl"
    size="30%"
    append-to-body
    @update:model-value="onVisibleChange"
    @close="handleClose"
  >
    <div class="pd-biz-dynamic-checkbox-selector">
      <div class="main-content-area">
        <template v-if="groupedSections.length > 0">
          <div v-for="section in groupedSections" :key="section.type" class="type-section">
            <h3>{{ section.type }}</h3>
            <div class="checkbox-group">
              <el-checkbox-group v-model="selectedMap[section.type]">
                <div class="checkbox-row">
                  <el-checkbox
                    v-for="item in section.items"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label || item.value }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <div class="section-actions">
              <el-button size="small" @click="toggleSection(section.type, true)">全选</el-button>
              <el-button size="small" @click="toggleSection(section.type, false)">清空</el-button>
            </div>
          </div>
        </template>

        <div v-else class="type-section">
          <div class="checkbox-group">
            <el-checkbox-group v-model="flatSelected">
              <div class="checkbox-row">
                <el-checkbox
                  v-for="item in normalizedOptions"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label || item.value }}
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
          <div class="section-actions">
            <el-button size="small" @click="toggleFlat(true)">全选</el-button>
            <el-button size="small" @click="toggleFlat(false)">清空</el-button>
          </div>
        </div>
      </div>

      <div class="footer">
        <el-button size="small" type="primary" @click="handleConfirm">{{ confirmText }}</el-button>
        <el-button size="small" @click="handleCancel">{{ cancelText }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import type { IDynamicCheckboxSelectorProps, ICheckboxOption } from './types'

defineOptions({ name: 'PdBizDynamicCheckboxSelector' })

const props = withDefaults(defineProps<IDynamicCheckboxSelectorProps>(), {
  visible: false,
  options: () => [],
  selected: () => [],
  allOptions: () => [],
  typeList: () => [],
  value: () => ({}),
  defaultType: '',
  title: '高级筛选',
  confirmText: '确认',
  cancelText: '重置'
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'update:selected': [value: string[]]
  confirm: [value: string[]]
  cancel: []
}>()

const flatSelected = ref<string[]>([])
const selectedMap = reactive<Record<string, string[]>>({})

const normalizedOptions = computed<ICheckboxOption[]>(() => {
  if (props.options && props.options.length > 0) return props.options
  return props.allOptions || []
})

const hasTypeGrouping = computed(() => {
  return normalizedOptions.value.some((item) => !!item.type)
})

const groupedSections = computed(() => {
  if (!hasTypeGrouping.value) {
    if (props.typeList && props.typeList.length > 0) {
      return props.typeList.map((type) => {
        const values = props.value?.[type] || []
        const items = values
          .map((v) => normalizedOptions.value.find((o) => o.value === v))
          .filter(Boolean) as ICheckboxOption[]
        const byType = normalizedOptions.value.filter((o) => o.type === type)
        return {
          type,
          items: items.length > 0 ? items : byType
        }
      })
    }
    return []
  }

  const map = new Map<string, ICheckboxOption[]>()
  normalizedOptions.value.forEach((item) => {
    const key = item.type || '其他'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  })
  return Array.from(map.entries()).map(([type, items]) => ({ type, items }))
})

const combinedSelections = computed(() => {
  if (groupedSections.value.length === 0) {
    return [...flatSelected.value]
  }
  const set = new Set<string>()
  groupedSections.value.forEach((section) => {
    ;(selectedMap[section.type] || []).forEach((v) => set.add(v))
  })
  return Array.from(set)
})

const syncFromSelected = (list: string[]) => {
  flatSelected.value = [...list]
  if (groupedSections.value.length > 0) {
    groupedSections.value.forEach((section) => {
      const values = section.items.map((i) => i.value)
      selectedMap[section.type] = list.filter((v) => values.includes(v))
    })
  }
}

watch(
  () => props.selected,
  (val) => {
    syncFromSelected(val || [])
  },
  { immediate: true, deep: true }
)

watch(
  () => props.value,
  (val) => {
    if (!val || Object.keys(val).length === 0) return
    const all: string[] = []
    Object.values(val).forEach((arr) => {
      if (Array.isArray(arr)) all.push(...arr)
    })
    syncFromSelected(all)
  },
  { immediate: true, deep: true }
)

watch(
  groupedSections,
  (sections) => {
    sections.forEach((section) => {
      if (!selectedMap[section.type]) {
        selectedMap[section.type] = []
      }
    })
  },
  { immediate: true }
)

const toggleSection = (type: string, selectAll: boolean) => {
  const section = groupedSections.value.find((s) => s.type === type)
  if (!section) return
  selectedMap[type] = selectAll ? section.items.map((i) => i.value) : []
}

const toggleFlat = (selectAll: boolean) => {
  flatSelected.value = selectAll ? normalizedOptions.value.map((i) => i.value) : []
}

const onVisibleChange = (val: boolean) => {
  emit('update:visible', val)
}

const handleConfirm = () => {
  const result = combinedSelections.value
  emit('update:selected', result)
  emit('confirm', result)
  emit('update:visible', false)
}

const handleCancel = () => {
  flatSelected.value = []
  Object.keys(selectedMap).forEach((k) => {
    selectedMap[k] = []
  })
  emit('update:selected', [])
  emit('cancel')
}

const handleClose = () => {
  emit('update:visible', false)
}

const handleReset = () => {
  handleCancel()
}

defineExpose({
  handleClose,
  handleConfirm,
  handleReset,
  combinedSelections,
  flatSelected,
  selectedMap,
  groupedSections,
  toggleSection,
  toggleFlat
})
</script>

<style lang="scss" scoped>
.pd-biz-dynamic-checkbox-selector {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  position: relative;
  min-height: 320px;

  .main-content-area {
    flex: 1;
    overflow-y: auto;
    padding: 10px 16px 72px;
  }

  .type-section {
    margin-bottom: 16px;
    border: 1px solid #eee;
    padding: 12px;
    border-radius: 4px;

    h3 {
      margin: 0 0 10px;
      color: #333;
      font-size: 15px;
      border: none;
      padding: 0;
    }
  }

  .checkbox-row {
    display: flex;
    flex-wrap: wrap;

    :deep(.el-checkbox) {
      width: 33.33%;
      margin: 8px 0;
      margin-right: 0;
    }
  }

  .section-actions {
    margin-top: 10px;
    text-align: right;
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-top: 1px solid #dcdfe6;
    padding: 12px 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 1;
  }
}
</style>
