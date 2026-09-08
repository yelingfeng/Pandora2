# RoomSelector 机房选择器

机房选择器组件，支持搜索、按运营商筛选和异步加载数据。

<Preview comp-name="PdBiz" demo-name="RoomSelector">
  <RoomSelectorDemo />
</Preview>

## 基础用法

```vue
<template>
  <PdBizRoomSelector
    v-model="selectedRoom"
    :roomList="roomList"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { PdBizRoomSelector } from '@pandora/components/PdBiz'

const selectedRoom = ref('')
const roomList = [
  { value: 'bj-yd-01', name: '北京移动机房1', isp: '1' },
  { value: 'sh-lt-01', name: '上海联通机房1', isp: '2' },
  { value: 'gz-dx-01', name: '广州电信机房1', isp: '3' }
]

const handleChange = (value, room) => {
  console.log('选中机房:', value, room)
}
</script>
```

## 按运营商筛选

通过 `isp` 属性可以筛选指定运营商的机房。通常配合外部筛选器使用。

```vue
<template>
  <el-radio-group v-model="currentIsp">
    <el-radio-button label="">全部</el-radio-button>
    <el-radio-button label="1">移动</el-radio-button>
    <el-radio-button label="2">联通</el-radio-button>
    <el-radio-button label="3">电信</el-radio-button>
  </el-radio-group>
  
  <PdBizRoomSelector
    v-model="selectedRoom"
    :roomList="filteredRooms"
    :isp="currentIsp"
  />
</template>

<script setup>
import { computed } from 'vue'

const filteredRooms = computed(() => {
  if (!currentIsp.value) return roomList
  return roomList.filter(room => room.isp === currentIsp.value)
})
</script>
```

## 搜索功能

组件内置搜索功能，可以根据机房名称或编码进行过滤。

```vue
<PdBizRoomSelector
  v-model="selectedRoom"
  :roomList="roomList"
  placeholder="输入机房名称或编码搜索"
/>
```

## 异步加载数据

通过监听 `load-data` 事件实现异步加载机房数据。

```vue
<template>
  <PdBizRoomSelector
    v-model="selectedRoom"
    :isp="currentIsp"
    :roomList="asyncRoomList"
    @load-data="handleLoadData"
  />
</template>

<script setup>
import { ref } from 'vue'

const asyncRoomList = ref([])

const handleLoadData = async (isp) => {
  // 模拟异步请求
  const response = await fetch(`/api/rooms?isp=${isp}`)
  asyncRoomList.value = await response.json()
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / v-model | 绑定值（机房编码） | `string \| number` | `''` |
| roomList | 机房列表数据 | `IRoomItem[]` | `[]` |
| isp | 运营商筛选 | `string \| number` | `''` |
| placeholder | 占位符 | `string` | `'请选择机房'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选择变化时触发 | `(value: string \| number, room: IRoomItem \| null)` |
| update:modelValue | v-model 值更新 | `(value: string \| number)` |
| cleared | 清空选择时触发 | `()` |
| load-data | 需要加载数据时触发 | `(isp: string \| number)` |

### IRoomItem

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| value | 机房编码（唯一标识） | `string \| number` | 是 |
| name | 机房名称 | `string` | 是 |
| isp | 运营商标识 | `string \| number` | 否 |
| province | 省份 | `string` | 否 |

## 功能说明

### 搜索过滤

- 支持按机房名称搜索
- 支持按机房编码搜索
- 搜索不区分大小写

### 数据加载流程

1. 如果传入 `roomList` prop，直接使用该数据
2. 如果未传入 `roomList` 且设置了 `isp`，触发 `load-data` 事件
3. 外部通过监听 `load-data` 事件异步获取数据后，更新 `roomList` prop

### 交互说明

- 点击输入框展开下拉选择面板
- 支持点击清除按钮清空选择
- 选择机房后自动关闭下拉面板
- 支持键盘操作（上下键选择，回车确认）

<script setup>
import RoomSelectorDemo from '../demos/RoomSelector.vue'
</script>
