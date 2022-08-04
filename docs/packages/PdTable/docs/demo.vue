<template>
  <PdContainer title="VTable基本用法">
    <PdTable ref="table" :data="testData" :columns="columns"></PdTable>
  </PdContainer>
</template>

<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  setup() {
    // const { stripe, pagination } = toRefs<any>(props.option)
    // console.log(stripe)

    // const clickTag = (e: Event, row: any) => {
    //   console.log(e, row)
    // }

    let testData: any = ref([])

    const columns = [
      { value: 'id', name: '序号', width: '50', type: 'selection' },
      { value: 'username', name: '姓名', width: '100', sortable: true },
      { value: 'account', name: '账号', width: '180' },
      { value: 'email', name: '邮箱', width: '200' },
      { value: 'role', name: '权限', width: '60' },
      { value: 'createTime', name: '创建时间', width: '200', sortable: true }
    ]

    onMounted(() => {
      testData.value = [
        {
          id: '1',
          username: '张三',
          account: 'asdasd@111.com',
          email: 'asdasd@123123.com',
          role: 'addmin',
          createTime: '2022-01-01'
        }
      ]
    })

    return {
      columns,
      testData
    }
  }
})
</script>

<style scoped>
</style>
