<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <VTable></VTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VTable from './components/Table.vue'

export default defineComponent({
  name: 'App',
  components: {
    VTable
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
