declare module 'vue' {
  export interface GlobalComponents {
    PdContainer: typeof import('@ylf521/pandora2')['PdContainer']
    PdForm: typeof import('@ylf521/pandora2')['PdForm']
    PdTable: typeof import('@ylf521/pandora2')['PdTable']
  }
}

export { }
