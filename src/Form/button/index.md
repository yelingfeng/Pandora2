---
map:
  path: /button
---

## Button

> VButton 

### 基础使用

<demo src="./demo/base.vue"
  language="vue"
  title="基础按钮"
  desc="这是一个基础按钮渲染示例">
</demo>

### 事件处理

<demo src="./demo/demo02.vue"
  language="vue"
  title="点击按钮"
  desc="查看控制台输出信息">
</demo>

### API


### 参数
| 参数    | 说明                      | 类型                   | 默认值 |
| ------- | ------------------------- | ---------------------- | ------ |
| value | 按钮名称       | `String`                 | -    |
| type  | 类型  (primary / success / warning / danger / info / text)     | `String`  | -      |
| size | 尺寸(medium / small / mini)       | `String`                 |  -  |
| icon | 图表类名       | `String`                 | -    |
| native-type | 原生type属性 (button / submit / reset )    | `String`                 | -    |
| disabled | 是否禁用状态       | `Boolean`                 | `false`    |
| click | click事件       | `Function`                 | -    |