# PdBiz 业务组件

PdBiz 是 Pandora2 组件库中的业务组件集合，提供了一系列常用的业务场景组件。

## 组件列表

### 数据展示

- **ButtonPicker** - 按钮选择器：按钮形式的选择器组件，支持单选和时间范围选择
- **CommonCard** - 通用卡片：通用的卡片容器组件，支持标题、跳转链接和加载状态
- **IspStatsCard** - 运营商统计卡：用于展示按运营商分组的统计数据卡片
- **Stats** - 统计数据展示：用于展示多个统计数据指标的组件
- **TabSwitcher** - 标签切换器：标签式的切换组件，支持数量统计和禁用状态
- **Loading** - 加载状态：全局加载状态组件，用于覆盖容器显示加载动画

### 数据录入

- **RoomSelector** - 机房选择器：机房选择器组件，支持按运营商筛选和搜索
- **DateFilterDialog** - 日期筛选对话框：日期范围快速筛选对话框，提供预设的时间范围选项
- **DynamicCheckboxSelector** - 动态多选选择器：基于抽屉的动态多选组件，支持分组和全选功能
- **AdvancedQuery** - 高级查询：高级查询构造器，支持多字段、多条件的动态查询

## 安装

```bash
npm install @yelingfeng/pandora2
# or
pnpm add @yelingfeng/pandora2
# or
yarn add @yelingfeng/pandora2
```

## 使用

### 全局注册

```ts
import { createApp } from 'vue'
import Pandora2 from '@yelingfeng/pandora2'
import '@yelingfeng/pandora2/dist/style.css'
import '@yelingfeng/pandora2/dist/business.css'

const app = createApp(App)
app.use(Pandora2)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <PdBizButtonPicker v-model="selected" :options="options" />
</template>

<script setup>
import { ref } from 'vue'
import { PdBizButtonPicker } from '@yelingfeng/pandora2'

const selected = ref('')
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' }
]
</script>
```

## 组件特性

### 类型安全

所有组件都提供完整的 TypeScript 类型定义：

```ts
import type {
  IButtonPickerOption,
  IIspStatItem,
  IStatsItem,
  ITabItem,
  ICheckboxOption,
  IQueryField,
  IQueryCondition,
  IRoomItem,
  IDateRangeOption
} from '@yelingfeng/pandora2'
```

### 响应式设计

组件支持响应式布局，自动适配不同屏幕尺寸。

### 主题定制

支持通过 CSS 变量自定义主题样式。

## 文档

完整的组件文档和示例请访问 [Pandora2 文档站点](https://github.com/yelingfeng/Pandora2)。

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 构建
pnpm build
```

## 测试覆盖率

PdBiz 组件包含完整的单元测试：
- 组件属性测试
- 事件触发测试
- 用户交互测试
- 基于属性的测试（Property-based testing）

运行测试并查看覆盖率：

```bash
pnpm test:coverage
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 协议

MIT
