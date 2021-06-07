<template>
  <div>
    <VTable
      :data="testData"
      :sortConfig="sortConfig"
      :tableConfig="tableConfig"
      :columns="columns"
    ></VTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VTable from "../../../../src/table/src/index.vue";

const tableConfig = {};

const sortConfig = {
  sortMode: "multi",
  // 排序回调事件
  sortChange: (row: any) => {
    console.log(row);
  },
  // 排序
  defaultSorts: [
    { prop: "date", order: "descending" },
    { prop: "address", order: "ascending" },
  ],
};

const testData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
  },
];

const columns = [
  { value: "name", name: "姓名", width: "180" },
  { value: "date", name: "日期", width: "180", sortable: true },
  { value: "address", label: "地址", width: "200", sortable: true },
];
</script>

<style scoped></style>
