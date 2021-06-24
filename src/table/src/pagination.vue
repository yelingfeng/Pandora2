<template>
  <div class="vpandora-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:currentPage="option.currentPage"
      :page-sizes="option.pageSizes"
      v-model:page-size="option.pageSize"
      :pager-count="option.pageCount"
      :layout="option.layout"
      :total="option.total"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
export interface IPageOpt {
  // 分页高度
  height?: number;
  // 当前页
  currentPage?: number;
  // 总数
  total?: number;
  // 每页显示条数选择数组
  pageSizes?: number[];
  // 最大页码按钮数
  pageCount?: number;
  // 当前显示每页条数
  pageSize?: number;
  // 分页功能 默认显示完整功能 （可不传）
  layout?: string;
}

import { createNamespace } from "../../_utils/create";
import { defineComponent } from "vue";
import { propTypes } from "../../_utils/propTypes";
const [name] = createNamespace("Pagination");
export default defineComponent({
  name,
  props: {
    option: propTypes.object,
  },
  setup(props, { emit }) {
    const handleSizeChange = (val: number) => {
      emit("handleSizeChange", val);
    };
    const handleCurrentChange = (val: number) => {
      emit("handleCurrentChange", val);
    };
    return {
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>
