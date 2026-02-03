import{d as c,h as l,c as m,o as i,e as n,i as p,j as d,g as _,b as t,w as h,r as v}from"./index-D2W91eA5.js";import{u as f}from"./useCharts-BytgQAft.js";/* empty css                                                              */const C={class:"demo-charts"},T=c({__name:"pie02",setup(u){const[a,{setProps:s}]=f({chartType:"pie",subChartType:"pie02"}),o=[{value:"2879",name:"北京TBD"},{value:"806",name:"上海TBD"},{value:"723",name:"天津TBD"},{value:"546",name:"宁夏TBD"},{value:"454",name:"青岛TBD"},{value:"344",name:"沈阳TBD"},{value:"244",name:"新疆TBD"}];return l(()=>{s({data:o})}),(e,r)=>(i(),m("div",C,[n(p(d),{onRegister:p(a)},null,8,["onRegister"])]))}}),B=_(T,[["__scopeId","data-v-5338ee43"]]),g={class:"markdown-body"},w={__name:"pie02",setup(u,{expose:a}){return a({frontmatter:{}}),(o,e)=>{const r=v("Preview");return i(),m("div",g,[e[0]||(e[0]=t("h1",null,"Pie01 饼图示例2",-1)),n(r,{"comp-name":"PdCharts","demo-name":"pie/pie02"},{default:h(()=>[n(B)]),_:1}),e[1]||(e[1]=t("h2",null,"示例：调用实例方法",-1)),e[2]||(e[2]=t("pre",null,[t("code",{class:"language-ts"},`import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'pie',
  subChartType: 'pie02',
  theme: 'ovilia-green'
})

`)],-1))])}}};export{w as default};
