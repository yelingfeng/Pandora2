<template>
  <div class="pd-biz-room-selector">
    <el-popover
      v-model:visible="visible"
      placement="bottom-start"
      :width="400"
      trigger="click"
      popper-class="room-selector-popover"
      @show="handlePopoverShow"
    >
      <div class="room-content">
        <div class="search-box">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索机房名称或编码"
            size="small"
            clearable
            :prefix-icon="Search"
            @input="handleSearch"
          />
        </div>

        <el-table
          :data="filteredRoomList"
          highlight-current-row
          :height="300"
          size="small"
          class="room-table"
          v-loading="loading"
          element-loading-text="加载中..."
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="value"
            label="机房编码"
            align="center"
            width="100"
            show-overflow-tooltip
          />
          <el-table-column prop="name" label="机房名称" show-overflow-tooltip />
          <template #empty>
            <div class="table-empty">
              <el-icon :size="24"><InfoFilled /></el-icon>
              <span>暂无机房数据</span>
            </div>
          </template>
        </el-table>
      </div>

      <template #reference>
        <el-input
          :model-value="displayValue"
          :placeholder="placeholder"
          readonly
          class="room-input"
          :class="{ 'has-value': showClearable }"
        >
          <template #suffix>
            <el-icon
              v-if="showClearable"
              class="clear-icon"
              @click.stop="handleClear"
            >
              <CircleClose />
            </el-icon>
            <el-icon class="arrow-icon"><ArrowDown /></el-icon>
          </template>
        </el-input>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Search, ArrowDown, CircleClose, InfoFilled } from '@element-plus/icons-vue'
import type { IRoomSelectorProps, IRoomItem } from './types'

const props = withDefaults(defineProps<IRoomSelectorProps>(), {
  modelValue: '',
  placeholder: '请选择机房',
  isp: '',
  roomList: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number, room: IRoomItem | null]
  cleared: []
  'load-data': [isp: string | number]
}>()

const visible = ref(false)
const internalRoomList = ref<IRoomItem[]>([])
const loading = ref(false)
const searchKeyword = ref('')

const displayValue = computed(() => {
  if (props.modelValue === '' || props.modelValue === null || props.modelValue === undefined) {
    return ''
  }
  const room = internalRoomList.value.find((item) => item.value === props.modelValue)
  return room ? room.name : String(props.modelValue)
})

const showClearable = computed(() => {
  return props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined
})

const filteredRoomList = computed(() => {
  if (!searchKeyword.value) {
    return internalRoomList.value
  }
  const keyword = searchKeyword.value.toLowerCase()
  return internalRoomList.value.filter((item) => {
    const name = (item.name || '').toLowerCase()
    const value = (item.value || '').toString().toLowerCase()
    return name.includes(keyword) || value.includes(keyword)
  })
})

const loadRoomList = () => {
  if (props.roomList && props.roomList.length > 0) {
    internalRoomList.value = props.roomList
    loading.value = false
    return
  }

  loading.value = true
  emit('load-data', props.isp)
}

const handlePopoverShow = () => {
  if (internalRoomList.value.length === 0 && props.isp) {
    loadRoomList()
  }
}

const handleCurrentChange = (currentRow: IRoomItem | undefined) => {
  if (currentRow) {
    emit('update:modelValue', currentRow.value)
    emit('change', currentRow.value, currentRow)
    visible.value = false
  }
}

const handleClear = (event?: Event) => {
  if (event) {
    event.stopPropagation()
    event.preventDefault()
  }

  searchKeyword.value = ''
  emit('update:modelValue', '')
  emit('change', '', null)
  emit('cleared')
  visible.value = false
}

const handleSearch = () => {
  // filteredRoomList 会自动更新
}

watch(
  () => props.isp,
  (newVal, oldVal) => {
    // 跳过首次与 roomList 同步时的无效清空；仅在 isp 实际变化时清空
    if (oldVal === undefined) {
      if (newVal !== null && newVal !== undefined && newVal !== '') {
        loadRoomList()
      }
      return
    }
    handleClear()
    if (newVal !== null && newVal !== undefined && newVal !== '') {
      loadRoomList()
    } else {
      internalRoomList.value = []
    }
  }
)

watch(
  () => props.roomList,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      internalRoomList.value = [...newVal]
      loading.value = false
    } else if (!props.isp) {
      internalRoomList.value = []
      loading.value = false
    }
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  loadRoomList()
})

defineExpose({ loadRoomList, displayValue, showClearable, filteredRoomList })
</script>

<style lang="scss" scoped>
.pd-biz-room-selector {
  width: 100%;
  display: block;

  .room-input {
    width: 100%;
    cursor: pointer;

    :deep(.el-input__wrapper) {
      cursor: pointer;
    }

    :deep(.el-input__inner) {
      cursor: pointer;
    }
  }

  .clear-icon {
    margin-right: 4px;
    color: var(--el-text-color-placeholder);
    cursor: pointer;

    &:hover {
      color: var(--el-text-color-secondary);
    }
  }

  .arrow-icon {
    color: var(--el-text-color-placeholder);
  }
}

.room-content {
  .search-box {
    margin-bottom: 12px;
  }

  .room-table {
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 4px;

    :deep(.el-table__header) {
      background-color: var(--el-fill-color-light);
    }

    :deep(.el-table__row) {
      cursor: pointer;
    }
  }

  .table-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 40px 20px;
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }
}
</style>

<style lang="scss">
.room-selector-popover {
  padding: 12px !important;
}
</style>
