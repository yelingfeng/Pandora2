declare module 'vue' {
  export interface GlobalComponents {
    PdContainer: typeof import('pandora2')['PdContainer']
    PdForm: typeof import('pandora2')['PdForm']
    PdTable: typeof import('pandora2')['PdTable']
  }
}
