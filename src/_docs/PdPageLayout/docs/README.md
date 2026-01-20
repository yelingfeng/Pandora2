<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demoTree from './demo-tree.vue'
</script>

<!-- 加载 demo 组件 end -->

# PdPageLayout 页面布局

用于构建典型的“上部表单搜索 + 下部表格展示”的页面布局。自动处理高度自适应和折叠逻辑。

## 基础用法

<Preview comp-name="PdPageLayout" demo-name="demo">
  <demo />
</Preview>

## 左侧树形布局 (PdPageTreeLayout)

适用于左侧有目录树、组织架构树等导航结构的场景。

<Preview comp-name="PdPageLayout" demo-name="demo-tree">
  <demoTree />
</Preview>
