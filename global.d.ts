declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PdContainer: typeof import('@yelingfeng/pandora2')['PdContainer']
    PdForm: typeof import('@yelingfeng/pandora2')['PdForm']
    PdTable: typeof import('@yelingfeng/pandora2')['PdTable']
  }
}

// 全局类型定义（解决 Recordable / Nullable 未定义问题）
declare global {
  type Recordable<T = any> = Record<string, T>
  type Nullable<T> = T | null
  type NonNullable<T> = T extends null | undefined ? never : T
  type Arrayable<T> = T | T[]
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

export {}
