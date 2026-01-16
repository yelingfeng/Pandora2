```js
    <PageLayout :button-config="buttonConfig" @import="handleExportData" @query="querySearchAction" @reset="cleanValue" :tableLoading="tableLoading">
      <!-- 表单插槽 -->
      <template #form>
        <VForm ref="form" :option="formConfig" />
      </template>
      <!-- 表格插槽 -->
      <template #table="{ height }">
        <VTable ref="pandoraTable" :option="tableOption" :height="height - 20" @handleCurrentPageChange="onLoad" @handleSizePageChange="onLoad" />
      </template>
    </PageLayout>




```
