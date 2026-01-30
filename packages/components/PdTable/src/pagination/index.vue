<template>
  <div class="vpandora-pagination">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      v-model:currentPage="option.currentPage" :page-sizes="option.pageSizes" v-model:page-size="option.pageSize"
      :pager-count="option.pageCount" :layout="option.layout" :total="option.total"></el-pagination>
  </div>
</template>

<script lang="ts">
import { createNamespace } from '@pandora/shared/_utils/create';
import { defineComponent } from 'vue';
import { getPagerProps } from './config';
const [name] = createNamespace('Pagination')
export default defineComponent({
  name,
  inheritAttrs: false,
  props: getPagerProps(),
  setup(_, { emit }) {
    const handleSizeChange = (val: number) => {
      emit('handleSizeChange', val)
    }
    const handleCurrentChange = (val: number) => {
      emit('handleCurrentChange', val)
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style>
.vpandora-pagination {
  margin-top: 10px;
}
</style>
