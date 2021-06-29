<template>
  <!-- <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <template #title>导航二</template>
    </el-menu-item>
  </el-menu> -->

  <el-menu router unique-opened :collapse="isCollapse" ref="navMenu">
    <template v-for="(menu, index) in menuData">
      <template v-if="menu.sonmenu">
        <el-menu router unique-opened :collapse="isCollapse" ref="navMenu">
          <template v-for="(menu, index) in menuData">
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
          </template>
        </el-menu>
      </template>
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
        url: 'table'
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
