import { MockMethod } from 'vite-plugin-mock'

const accountList = () => {
  const result: any[] = []
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      account: '@first',
      email: '@email',
      username: '@cname()',
      role: '@first',
      createTime: '@datetime',
      remark: '@cword(10,20)',
      'status|1': ['0', '1']
    })
  }
  return result
}

export default [
  {
    url: '/api/getTableData',
    method: 'get',
    response: () => {
      return {
        status: 200,
        data: accountList()
      }
    }
  }
] as MockMethod[]
