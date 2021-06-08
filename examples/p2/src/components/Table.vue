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
import axios from "axios";
import { ref, onMounted } from "vue";
import VTable from "../../../../src/table/src/index.vue";

const tableConfig = {};

const sortConfig = {
  sortMode: "multi",
  // 排序回调事件
  sortChange: (row: any) => {
    console.log(row);
  },
  defaultSort: "descending",
  // 排序
  defaultSorts: [
    { prop: "date", order: "descending" },
    { prop: "address", order: "ascending" },
  ],
};

const testData: any = ref([]);

const columns = [
  { value: "name", name: "姓名", width: "180" },
  { value: "date", name: "日期", width: "180", sortable: true },
  { value: "address", label: "地址", width: "200", sortable: true },
];

const load = () => {
  setTimeout(() => {
    testData.value = [
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
  }, 200);
};

onMounted(() => {
  load();
});
</script>

<style scoped></style>
