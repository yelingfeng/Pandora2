import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel
} from './model/systemModel'
import { http } from '@/utils/axios'

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/getMenuList',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList'
}

export const getAccountList = (params: AccountParams) =>
  http.get<AccountListGetResultModel>({ url: Api.AccountList, params })

export const getDeptList = (params?: DeptListItem) =>
  http.get<DeptListGetResultModel>({ url: Api.DeptList, params })

export const getMenuList = (params?: MenuParams) =>
  http.get<MenuListGetResultModel>({ url: Api.MenuList, params })

export const getRoleListByPage = (params?: RolePageParams) =>
  http.get<RolePageListGetResultModel>({ url: Api.RolePageList, params })

export const getAllRoleList = (params?: RoleParams) =>
  http.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params })

export const setRoleStatus = (id: number, status: string) =>
  http.post({ url: Api.setRoleStatus, params: { id, status } })

export const isAccountExist = (account: string) =>
  http.post(
    { url: Api.IsAccountExist, params: { account } },
    { errorMessageMode: 'none' }
  )
