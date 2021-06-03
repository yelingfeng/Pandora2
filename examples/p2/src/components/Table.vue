<template>
  <div>
    <VTable :rowsData="testData" :columns="columns"></VTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VTable from "../../../../src/table/src/index.vue";

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
  { prop: "name", label: "姓名", width: "180" },
  { prop: "date", label: "日期", width: "180" },
  { prop: "address", label: "地址", width: "180" },
];
</script>

<style scoped></style>
