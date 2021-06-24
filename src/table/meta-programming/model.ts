import 'reflect-metadata';
import { ref } from 'vue'
import { TableBase, Column } from "./type";
import { getConfigMap } from "./../../_utils/";
import { getPersonListFromServer,getOutManListFromServer } from "./service";
import { ColumnPropertyConfig, columnConfig, TableColumu, ClassConfig, Paginabale } from './type';


// 2.类装饰器, 处理通过装饰器收集上来的元数据
export function EnhancedTableClass(config: ClassConfig) {
  const cacheColumnConfigKey = Symbol('cacheColumnConfigKey');
  const tableConfigKey = Symbol('config');
  return function (Target:any) {
    return class EnhancedTableClass extends Target {

      constructor(data:any) {
        super(data);
        Reflect.defineMetadata(tableConfigKey,ref<ClassConfig>(config),Target)
      }

      // 获取列上的元数据
      static get columnConfig(): Map<string, ColumnPropertyConfig> {
        return getConfigMap<ColumnPropertyConfig>(EnhancedTableClass, cacheColumnConfigKey, columnConfig.metaKey);
      }

      // 获取表格列
      static getColumns(): TableColumu[] {
        const list: TableColumu[] = [];
        EnhancedTableClass.columnConfig.forEach(config => list.push(config as TableColumu));
        return list;
      }

      // 获取表格数据
      static async getList<T>(): Promise<Paginabale<T>> {
        const result = await getPersonListFromServer();

        return {
          total: result.count,
          list: result.data.map((item: T) => new EnhancedTableClass(item))
        }
      }

      static async getDataList<T>():Promise<Paginabale<T>>{
        const result = await  getOutManListFromServer()
        return {
          total : result.count,
          list: result.data.map((item:T)=> new EnhancedTableClass(item))
        }
      }

      // 获取类上的元数据
      static getConfig():ClassConfig{
        const config = Reflect.getMetadata(tableConfigKey,Target)
        return config
      }

    }
  }
}


// @ts-ignore
@EnhancedTableClass({
  size:'small',
  bordered:true,
  pagination:{
    'show-less-items':true,
    pageSize:5,
    total:8,
    current:1
  }
})
export class Person extends TableBase {

  @Column({
    title: '唯一标识',
    dataIndex: 'id',
    key: '0'
  })
  id: number = 0;

  @Column({
    title: '姓名',
    dataIndex: 'name',
    key: '1'
  })
  name: string = '';

  @Column({
    title: '年龄',
    dataIndex: 'age',
    key: '2'
  })
  age: number = 0;

  @Column({
    title: '性别',
    dataIndex: 'sex',
    key: '3'
  })
  sex: 'male' | 'female' | 'unknow' = 'unknow';

  @Column({
    title: '地址',
    dataIndex: 'address',
    key: '4'
  })
  address: string = '';

  @Column({
    title: 'key',
    dataIndex: 'key',
    key: '5'
  })
  key: string | number = '0';

  constructor({ key, id, name, age, sex, address }) {
    super();
    this.id = id;
    this.key = key;
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.address = address;
  }
}


// @ts-ignore
@EnhancedTableClass({
  size:'small',
  bordered:true,
  pagination:{
    'show-less-items':true,
    pageSize:5,
    total:8,
    current:1
  }
})
export class OuterMan extends Person {
  @Column({
    title: 'light',
    dataIndex: 'light',
    key: '6'
  })
  light: string ='';

  constructor(option:any){
    super(option)
    this.light = option.light
  }


}
