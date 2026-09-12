import{B as e,I as t,Q as n,p as r,u as i,v as a}from"./runtime-core.esm-bundler-yhW9eEjO.js";import o from"./line01-B8L7jO10.js";var s={class:`markdown-body`},c={__name:`line01`,setup(c,{expose:l}){return l({frontmatter:{}}),(c,l)=>{let u=e(`Preview`);return t(),r(`div`,s,[l[0]||=i(`h1`,null,`Line01 折线图`,-1),a(u,{"comp-name":`PdCharts`,"demo-name":`line/line01`},{default:n(()=>[a(o)]),_:1}),l[1]||=i(`h2`,null,`用法`,-1),l[2]||=i(`pre`,null,[i(`code`,{class:`language-js`},`import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'line',
  subChartType: 'line01',
  chartConfig: {
    colors: ['#5AD8A6', '#5B8FF9'],
    smooth: true,
    legend: { show: true },
    themeMode: 'light',
  }
})

onMounted(() => {
  setProps({
    data: [
      { category: 'A类', name: '1月', value: 120 },
      { category: 'A类', name: '2月', value: 132 },
      { category: 'B类', name: '1月', value: 220 }
    ]
  })
})
`)],-1)])}}};export{c as default};