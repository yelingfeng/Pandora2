---
map:
  path: /table
---

## VTable

> VTable for pandora2  

### 基础使用

<demo src="./demo/base.vue"
  language="vue"
  title="基础表格"
  desc="这是一个基础表格渲染示例">
</demo>


### 元编程
> AntDesignTable

<demo src="./demo/aTable.vue"
  language="vue"
  title="ATable表格"
  desc="元编程方式编写的AntDesignTable实例">
</demo>


### 事件处理

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