declare module 'vue' {
  export interface GlobalComponents {
    PdContainer: typeof import('@yelingfeng/pandora2')['PdContainer']
    PdForm: typeof import('@yelingfeng/pandora2')['PdForm']
    PdTable: typeof import('@yelingfeng/pandora2')['PdTable']
    ColorfulTable: typeof import('@yelingfeng/pandora2')['ColorfulTable']
    PdCharts: typeof import('@yelingfeng/pandora2')['PdCharts']
    PdPageLayout: typeof import('@yelingfeng/pandora2')['PdPageLayout']
    PdPageTreeLayout: typeof import('@yelingfeng/pandora2')['PdPageTreeLayout']
  }
}

export { }
