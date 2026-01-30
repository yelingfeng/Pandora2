## 动态设置属性（setProps）

通过 `useForm()` 拿到 `setProps()` 后，可以在运行时修改表单配置（例如 label 位置、表单尺寸、禁用状态、是否显示展开按钮、操作按钮列 span 等）。

```ts
const [register, { setProps }] = useForm({ schemas: [] })

setProps({
  labelWidth: 140,
  labelPosition: 'left',
  inline: true
})
```

## 示例：按钮驱动修改属性

<Preview comp-name="PdForm" demo-name="props">
  <props/>
</Preview>


<script setup>
import props from './props.vue'
</script>
