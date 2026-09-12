import{B as e,I as t,Q as n,p as r,u as i,v as a}from"./runtime-core.esm-bundler-yhW9eEjO.js";import o from"./pie02-CKDMCYh5.js";var s={class:`markdown-body`},c={__name:`pie02`,setup(c,{expose:l}){return l({frontmatter:{}}),(c,l)=>{let u=e(`Preview`);return t(),r(`div`,s,[l[0]||=i(`h1`,null,`Pie02 饼图示例2`,-1),a(u,{"comp-name":`PdCharts`,"demo-name":`pie/pie02`},{default:n(()=>[a(o)]),_:1}),l[1]||=i(`h2`,null,`示例：调用实例方法`,-1),l[2]||=i(`pre`,null,[i(`code`,{class:`language-ts`},`import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'pie',
  subChartType: 'pie02'
})

onMounted(() => {
  setProps({
    data: [
      { value: '2879', name: '北京TBD' },
      { value: '806', name: '上海TBD' }
    ]
  })
})
`)],-1)])}}};export{c as default};