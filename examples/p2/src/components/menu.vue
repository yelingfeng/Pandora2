<template>
  <el-menu router unique-opened :collapse="isCollapse" ref="navMenu">
    <template v-for="(menu, index) in menuData">
      <!-- 二级 -->
      <template v-if="menu.sonmenu">
        <el-menu router unique-opened :collapse="isCollapse" ref="navMenu">
          <template v-if="menu.sonmenu && menu.sonmenu.length > 0">
            <el-submenu :index="index" :key="index">
              <template #title>
                <span>{{ menu.name }}</span>
              </template>
              <div v-for="(cMenu, cIndex) in menu.sonmenu">
                <el-menu-item
                  :index="`/${cMenu.url}`"
                  :key="cIndex"
                  @click="handleOpen(cIndex, $event, menu.id)"
                  >{{ cMenu.name }}</el-menu-item
                >
              </div>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="`/${menu.url}`" :key="index">
              <span slot="title">{{ menu.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </template>
      <!-- 一级 -->
      <template v-else>
        <el-menu-item :index="`/${menu.url}`" :key="index">
          <template>
            <span slot="title">{{ menu.name }}</span>
          </template>
        </el-menu-item>
      </template>
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
          }
        ]
      },
      {
        name: '表单',
        url: 'table',
        sonmenu: [
          {
            name: '按钮',
            url: 'button'
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
