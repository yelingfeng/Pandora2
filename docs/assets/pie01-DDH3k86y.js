import{d as l,h as c,c as p,o as i,e as n,i as m,j as d,g as _,b as a,w as v,r as h}from"./index-D2W91eA5.js";import{u as f}from"./useCharts-BytgQAft.js";const C={class:"demo-charts"},g=l({__name:"pie01",setup(u){const[t,{setProps:s}]=f({chartType:"pie",subChartType:"pie01",theme:"ovilia-green"}),o=[{name:"A类",value:"3720"},{name:"B类",value:"2920"},{name:"C类",value:"2200"},{name:"D类",value:"1420"},{name:"E类",value:"3200"},{name:"F类",value:"2420"},{name:"G类",value:"2200"},{name:"H类",value:"1420"},{name:"I类",value:"3200"},{name:"J类",value:"2420"}];return c(()=>{s({data:o})}),(e,r)=>(i(),p("div",C,[n(m(d),{onRegister:m(t)},null,8,["onRegister"])]))}}),P=_(g,[["__scopeId","data-v-d7cea798"]]),x={class:"markdown-body"},b={__name:"pie01",setup(u,{expose:t}){return t({frontmatter:{}}),(o,e)=>{const r=h("Preview");return i(),p("div",x,[e[0]||(e[0]=a("h1",null,"Pie01 基础饼图",-1)),n(r,{"comp-name":"PdCharts","demo-name":"pie/pie01"},{default:v(()=>[n(P)]),_:1}),e[1]||(e[1]=a("h2",null,"调用实例方法",-1)),e[2]||(e[2]=a("pre",null,[a("code",{class:"language-ts"},`import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'pie',
  subChartType: 'pie01',
  theme: 'ovilia-green'
})

`)],-1))])}}};export{b as default};
