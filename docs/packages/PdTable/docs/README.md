<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
</script>

<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

## PdTable 组件

Pandora2 的table组件

### 基础使用
<Preview comp-name="PdTable" demo-name="demo">
  <demo />
</Preview>


### 参数
| 参数    | 说明    | 类型    | 默认值 |
| :--| :-- | :-- | :-- |
| value | 按钮名称       | `String`                 | -    |
| type  | 类型  (primary / success / warning / danger / info / text)     | `String`  | -      |
| size | 尺寸(medium / small / mini)       | `String`                 |  -  |
| icon | 图表类名       | `String`                 | -    |
| native-type | 原生type属性 (button / submit / reset )    | `String`                 | -    |
| disabled | 是否禁用状态       | `Boolean`                 | `false`    |
| click | click事件       | `Function`                 | -    |