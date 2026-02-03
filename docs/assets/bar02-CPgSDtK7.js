import{g as p,h as d,c as m,o as u,e as n,i as c,j as _,b as a,w as i,r as g}from"./index-D2W91eA5.js";import{u as v}from"./useCharts-BytgQAft.js";const b={class:"demo-charts"},h={__name:"bar02",setup(l){const[t,{setProps:r}]=v({chartType:"bar",subChartType:"bar02"}),o=[{category:"A类",name:"1月",value:"3720"},{category:"A类",name:"2月",value:"2920"},{category:"A类",name:"3月",value:"2200"},{category:"B类",name:"1月",value:"1420"},{category:"B类",name:"2月",value:"3200"},{category:"B类",name:"3月",value:"2420"}];return d(()=>{r({data:o})}),(e,s)=>(u(),m("div",b,[n(c(_),{onRegister:c(t)},null,8,["onRegister"])]))}},y=p(h,[["__scopeId","data-v-dba788ab"]]),f={class:"markdown-body"},P={__name:"bar02",setup(l,{expose:t}){return t({frontmatter:{}}),(o,e)=>{const s=g("Preview");return u(),m("div",f,[e[0]||(e[0]=a("h1",null,"Bar02 多系列柱形图",-1)),n(s,{"comp-name":"PdCharts","demo-name":"bar/bar02"},{default:i(()=>[n(y)]),_:1}),e[1]||(e[1]=a("h2",null,"用法",-1)),e[2]||(e[2]=a("pre",null,[a("code",{class:"language-js"},`import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'bar02',
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
`)],-1))])}}};export{P as default};
