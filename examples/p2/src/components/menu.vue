<template>
  <el-menu router unique-opened ref="navMenu">
    <template v-for="(menu, index) in menuData">
      <!-- 二级 -->
      <template v-if="menu.sonmenu && menu.sonmenu.length > 0">
        <el-sub-menu :index="index" :key="index">
          <template #title>
            <span>{{ menu.name }}</span>
          </template>
          <div v-for="(cMenu, cIndex) in menu.sonmenu" :key="cIndex">
            <el-menu-item :index="`/${cMenu.url}`" :key="cIndex">{{
              cMenu.name
            }}</el-menu-item>
          </div>
        </el-sub-menu>
      </template>
      <!-- 一级 -->
      <el-menu-item :index="`/${menu.index}`" :key="index" v-else>
        <template>
          <span slot="title">{{ menu.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const menuData: any = ref([])

const load = () => {
  setTimeout(() => {
    menuData.value = [
      {
        name: '表格',
        url: 'table',
        sonmenu: [
          {
            name: '配置表格',
            url: 'guiTable'
          },
          {
            name: 'antDesign表格',
            url: 'antDTable'
          }
        ]
      },
      {
        name: '表单',
        url: 'table',
        sonmenu: [
          {
            name: '基础表单测试',
            url: 'form'
          }
        ]
      }
    ]
  }, 200)
}

onMounted(() => {
  load()
})
</script>

<style scoped></style>
