import{B as e,I as t,Q as n,p as r,u as i,v as a}from"./runtime-core.esm-bundler-yhW9eEjO.js";import o from"./basicBar-DgUFpg44.js";import s from"./numberBar-DZjwV2FE.js";import c from"./rateBar-Crsgglcc.js";var l={class:`markdown-body`},u={__name:`basicBar`,setup(u,{expose:d}){return d({frontmatter:{}}),(u,d)=>{let f=e(`Preview`);return t(),r(`div`,l,[d[0]||=i(`h1`,null,`BasicBar 基础柱形图`,-1),a(f,{"comp-name":`PdCharts`,"demo-name":`bar/basicBar`},{default:n(()=>[a(o)]),_:1}),d[1]||=i(`h2`,null,`基础用法`,-1),d[2]||=i(`pre`,null,[i(`code`,{class:`language-js`},`import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'basicBar',
  theme: 'ovilia-green'
})

onMounted(() => {
  setProps({
    data: [
      { category: 'A类', name: '1月', value: 3720 },
      { category: 'A类', name: '2月', value: 2920 },
      { category: 'B类', name: '1月', value: 1420 },
      { category: 'B类', name: '2月', value: 3200 }
    ]
  })
})
`)],-1),d[3]||=i(`h2`,null,`格式化处理 model number`,-1),a(f,{"comp-name":`PdCharts`,"demo-name":`bar/numberBar`},{default:n(()=>[a(s)]),_:1}),d[4]||=i(`h2`,null,`格式化处理 model rate`,-1),a(f,{"comp-name":`PdCharts`,"demo-name":`bar/rateBar`},{default:n(()=>[a(c)]),_:1})])}}};export{u as default};