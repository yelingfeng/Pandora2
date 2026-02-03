import{g,h as c,c as b,o as u,e,i as l,j as d,b as a,w as p,r as C}from"./index-D2W91eA5.js";import{u as i}from"./useCharts-BytgQAft.js";const _={class:"demo-charts"},v={__name:"bar01",setup(m){const[o,{setProps:n}]=i({chartType:"bar",subChartType:"bar01",chartConfig:{rank:{topCount:3,topColors:[{backgroundColor:"rgba(242, 99, 123, 0.20)",borderColor:"rgba(242, 99, 123, 1)"},{backgroundColor:"rgba(251, 212, 55, 0.20)",borderColor:"rgba(251, 212, 55, 1)"},{backgroundColor:"rgba(78, 203, 115, 0.20)",borderColor:"rgba(78, 203, 115, 1)"}]},bar:{color:"rgba(26, 213, 152, 1)",backgroundColor:"rgba(26, 213, 152, 0.20)",topColors:["rgba(242, 99, 123, 1)","rgba(251, 212, 55, 1)","rgba(78, 203, 115, 1)"]},rightLabel:{formatter:({rawValue:r})=>`总数${r}`}}}),t=[{name:"A类-BAR-Bar-bar",value:"3720"},{name:"E类",value:"3200"},{name:"I类",value:"3200"},{name:"B类",value:"2920"},{name:"F类",value:"2420"},{name:"J类",value:"2420"},{name:"C类",value:"2200"},{name:"G类",value:"2200"},{name:"D类",value:"1420"},{name:"H类",value:"1420"}];return c(()=>{n({data:t})}),(r,s)=>(u(),b("div",_,[e(l(d),{onRegister:l(o)},null,8,["onRegister"])]))}},f=g(v,[["__scopeId","data-v-10f6af58"]]),h={class:"markdown-body"},w={__name:"bar01",setup(m,{expose:o}){return o({frontmatter:{}}),(t,r)=>{const s=C("Preview");return u(),b("div",h,[r[0]||(r[0]=a("h1",null,"Bar01 排行柱形图",-1)),e(s,{"comp-name":"PdCharts","demo-name":"bar/bar01"},{default:p(()=>[e(f)]),_:1}),r[1]||(r[1]=a("h2",null,"用法",-1)),r[2]||(r[2]=a("pre",null,[a("code",{class:"language-js"},`import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'bar01',
  theme: 'ovilia-green',
  chartConfig: {
    rank: {
      topCount: 3,
      topColors: [
        { backgroundColor: 'rgba(242, 99, 123, 0.20)', borderColor: 'rgba(242, 99, 123, 1)' },
        { backgroundColor: 'rgba(251, 212, 55, 0.20)', borderColor: 'rgba(251, 212, 55, 1)' },
        { backgroundColor: 'rgba(78, 203, 115, 0.20)', borderColor: 'rgba(78, 203, 115, 1)' }
      ]
    },
    bar: {
      topColors: ['rgba(242, 99, 123, 1)', 'rgba(251, 212, 55, 1)', 'rgba(78, 203, 115, 1)']
    },
    rightLabel: {
      formatter: ({ rawValue }) => \`总数\${rawValue}\`
    }
  }
})

onMounted(() => {
  setProps({
    data: [
      { name: 'A类', value: 3720 },
      { name: 'B类', value: 2920 }
    ]
  })
})
`)],-1))])}}};export{w as default};
