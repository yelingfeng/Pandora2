declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PdContainer: typeof import('@yelingfeng/pandora2')['PdContainer']
    PdForm: typeof import('@yelingfeng/pandora2')['PdForm']
    PdTable: typeof import('@yelingfeng/pandora2')['PdTable']
  }
}

export {}
