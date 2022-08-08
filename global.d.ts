declare type Nullable<T> = T | null
declare type NonNullable<T> = T extends null | undefined ? never : T
declare type Recordable<T = any> = Record<string, T>
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}
declare type Indexable<T = any> = {
  [key: string]: T
}
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
declare type EmitType = (event: string, ...args: any[]) => void
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type RefType<T> = T | null

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PdContainer: typeof import('pandora2')['PdContainer']
    PdForm: typeof import('pandora2')['PdForm']
    PdTable: typeof import('pandora2')['PdTable']
  }
}

export {}
