export const getPersonListFromServer: any = async (): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: [
          { key: 1, id: 10, name: 'veloma', age: 20, sex: 'male', address: '山东省青岛市' },
          { key: 2, id: 11, name: 'timer', age: 22, sex: 'female', address: '山东省青岛市' },
          { key: 3, id: 11, name: 'timer', age: 22, sex: 'female', address: '山东省青岛市' },
          { key: 4, id: 11, name: 'timer', age: 22, sex: 'female', address: '山东省青岛市' },
          { key: 5, id: 11, name: 'timer', age: 22, sex: 'female', address: '山东省青岛市' },
          { key: 6, id: 11, name: 'timer', age: 22, sex: 'female', address: '山东省青岛市' },
          { key: 7, id: 11, name: 'timer', age: 22, sex: 'female', address: '山东省青岛市' },
          { key: 8, id: 11, name: 'timer', age: 22, sex: 'female', address: '山东省青岛市' }
        ],
        count: 2
      })
    }, 500);
  });
}

export const getOutManListFromServer: any = async (): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: [
          { key: 1, id: 1, name: 'veloma', age: 122, sex: 'male', address: '奥特之星',light:'f1' },
          { key: 2, id: 2, name: '泰罗', age: 44, sex: 'female', address: '奥特之星',light:'f2'  },
          { key: 3, id: 3, name: '奥罗', age: 55, sex: 'female', address: '奥特之星',light:'f3'  },
          { key: 4, id: 4, name: '雷加', age: 66, sex: 'female', address: '奥特之星',light:'f4'  },
        ],
        count: 2
      })
    }, 200);
  });
}
