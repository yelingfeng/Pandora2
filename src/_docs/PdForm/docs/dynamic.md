## 动态表单使用

PdForm 支持在运行时对 schema 做增删改，典型场景：

- 根据接口返回动态生成表单项
- 根据用户输入联动显示/隐藏/禁用某些字段
- 切换不同“表单模式”时快速替换部分字段

常用方法：

- `updateSchema(partial | partial[])`：按 field 更新已有 schema
- `resetSchema(partial | partial[])`：重置/覆盖 schema（用于大范围改动）
- `appendSchemaByField(schema, prefixField?, first?)`：在某个字段前/后插入
- `removeSchemaByFiled(field | field[])`：按 field 删除

<Preview comp-name="PdForm" demo-name="dynamic">
  <dynamic/>
</Preview>

<script setup>
import dynamic from './dynamic.vue'
</script>
