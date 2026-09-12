# 全局样式主题使用示例

## 示例 1：标准列表页

```vue
<template>
  <div class="pd-page-container">
    <!-- 查询表单区域 -->
    <div class="pd-form-section">
      <div class="pd-form-content">
        <el-form inline :model="queryForm">
          <el-form-item label="用户名">
            <el-input v-model="queryForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="queryForm.status" placeholder="请选择">
              <el-option label="全部" value="" />
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      
      <div class="pd-button-group">
        <div class="pd-button-section">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="pd-table-section">
      <div class="pd-table-toolbar">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="handleBatchDelete">批量删除</el-button>
      </div>
      
      <div class="pd-table-body">
        <el-table :data="tableData" :height="tableHeight">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="status" label="状态" />
          <el-table-column label="操作" width="180">
            <template #default="{ row }">
              <el-button link @click="handleEdit(row)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const queryForm = ref({
  username: '',
  status: ''
})

const tableData = ref([])
const tableHeight = ref(400)

const handleSearch = () => {
  console.log('查询', queryForm.value)
}

const handleReset = () => {
  queryForm.value = { username: '', status: '' }
}

const handleAdd = () => {
  console.log('新增')
}

const handleEdit = (row: any) => {
  console.log('编辑', row)
}

const handleDelete = (row: any) => {
  console.log('删除', row)
}

const handleBatchDelete = () => {
  console.log('批量删除')
}

onMounted(() => {
  // 计算表格高度
  tableHeight.value = window.innerHeight - 300
})
</script>

<style scoped>
/* 引入全局样式后，几乎不需要额外样式 */
</style>
```

## 示例 2：Tabs 内嵌页面

```vue
<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="用户列表" name="users">
      <!-- 使用 tabs 模式，去掉灰色背景 -->
      <div class="pd-page-container pd-page-container--tabs">
        <div class="pd-form-section">
          <div class="pd-form-content">
            <el-form inline>
              <el-form-item label="用户名">
                <el-input placeholder="请输入" />
              </el-form-item>
            </el-form>
          </div>
          <div class="pd-button-group">
            <div class="pd-button-section">
              <el-button type="primary">查询</el-button>
            </div>
          </div>
        </div>

        <div class="pd-table-section">
          <div class="pd-table-body">
            <el-table :data="[]">
              <el-table-column prop="name" label="姓名" />
            </el-table>
          </div>
        </div>
      </div>
    </el-tab-pane>

    <el-tab-pane label="角色列表" name="roles">
      <div class="pd-page-container pd-page-container--tabs">
        <!-- 角色列表内容 -->
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('users')
</script>
```

## 示例 3：卡片布局

```vue
<template>
  <div class="pd-page-container">
    <div class="pd-flex pd-gap-lg" style="flex-wrap: wrap;">
      <!-- 统计卡片 -->
      <div class="pd-card pd-flex-1" style="min-width: 200px;">
        <h3>总用户数</h3>
        <div style="font-size: 32px; color: var(--pd-color-primary);">1,234</div>
      </div>

      <div class="pd-card pd-flex-1" style="min-width: 200px;">
        <h3>活跃用户</h3>
        <div style="font-size: 32px; color: #67c23a;">856</div>
      </div>

      <div class="pd-card pd-flex-1" style="min-width: 200px;">
        <h3>今日新增</h3>
        <div style="font-size: 32px; color: #e6a23c;">42</div>
      </div>
    </div>

    <!-- 详情卡片 -->
    <div class="pd-card" style="margin-top: 16px;">
      <h3 style="margin-bottom: 16px;">用户详情</h3>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="用户名">admin</el-descriptions-item>
        <el-descriptions-item label="邮箱">admin@example.com</el-descriptions-item>
        <el-descriptions-item label="角色">管理员</el-descriptions-item>
        <el-descriptions-item label="状态">启用</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
```

## 示例 4：自定义主题

```vue
<template>
  <div class="pd-page-container custom-theme">
    <!-- 使用自定义主题的页面内容 -->
    <div class="pd-form-section">
      <div class="pd-button-section">
        <el-button type="primary">主题色按钮</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-theme {
  /* 自定义主题色 */
  --pd-color-primary: #9c27b0;
  --pd-color-primary-hover: #7b1fa2;
  
  /* 调整间距 */
  --pd-form-padding: 20px 24px;
  --pd-button-height: 36px;
  
  /* 调整圆角 */
  --pd-radius-sm: 8px;
}
</style>
```

## 示例 5：表单展开收起

```vue
<template>
  <div class="pd-page-container">
    <div 
      class="pd-form-section" 
      :class="{ 'pd-form-section--expanded': isExpanded }"
    >
      <div class="pd-form-content">
        <el-form inline>
          <el-form-item label="字段1">
            <el-input />
          </el-form-item>
          <el-form-item label="字段2">
            <el-input />
          </el-form-item>
          <el-form-item label="字段3">
            <el-input />
          </el-form-item>
          <el-form-item label="字段4" v-show="isExpanded">
            <el-input />
          </el-form-item>
          <el-form-item label="字段5" v-show="isExpanded">
            <el-input />
          </el-form-item>
        </el-form>
      </div>
      
      <div class="pd-button-group">
        <div class="pd-button-section">
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
          <el-button link @click="isExpanded = !isExpanded">
            {{ isExpanded ? '收起' : '展开' }}
          </el-button>
        </div>
      </div>
    </div>

    <div class="pd-table-section">
      <!-- 表格内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isExpanded = ref(false)
</script>
```

## 示例 6：响应式主题

```vue
<template>
  <div class="pd-page-container responsive-layout">
    <!-- 页面内容 -->
  </div>
</template>

<style>
.responsive-layout {
  /* 默认样式 */
  --pd-form-padding: 10px 18px;
  --pd-button-height: 32px;
}

/* 平板 */
@media (max-width: 1024px) {
  .responsive-layout {
    --pd-form-padding: 8px 12px;
    --pd-layout-gap: 8px;
  }
}

/* 手机 */
@media (max-width: 768px) {
  .responsive-layout {
    --pd-form-padding: 6px 10px;
    --pd-button-height: 28px;
    --pd-button-font-size: 11px;
  }
}
</style>
```

## 对比：PdPageLayout vs 全局样式类

### 使用 PdPageLayout（推荐用于标准场景）

```vue
<template>
  <PdPageLayout
    :button-config="buttonConfig"
    @search="handleSearch"
    @reset="handleReset"
  >
    <template #form>
      <el-form inline>
        <!-- 表单项 -->
      </el-form>
    </template>
    
    <template #toolbar>
      <el-button>新增</el-button>
    </template>
    
    <template #table="{ height }">
      <el-table :height="height">
        <!-- 表格列 -->
      </el-table>
    </template>
  </PdPageLayout>
</template>
```

**优势**：
- ✅ 自动计算表格高度
- ✅ 自动响应式布局
- ✅ 内置展开收起功能
- ✅ 代码更简洁

### 使用全局样式类（推荐用于灵活场景）

```vue
<template>
  <div class="pd-page-container">
    <div class="pd-form-section">
      <!-- 完全自定义布局 -->
    </div>
    <div class="pd-table-section">
      <!-- 完全自定义表格 -->
    </div>
  </div>
</template>
```

**优势**：
- ✅ 更灵活的自定义
- ✅ 无额外 JS 逻辑
- ✅ 更容易理解和调试
- ✅ 可用于非 Vue 项目
