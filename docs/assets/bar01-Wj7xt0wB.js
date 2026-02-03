import{g as B,h,i as _,c as v,o as g,b as o,e as c,n as b,j as k,t as M,k as i,l as G,w,r as x}from"./index-CoyfXqC8.js";import{u as $}from"./useCharts-CxQWh7dr.js";const y={class:"demo-charts"},F={class:"demo-ops"},P={class:"demo-tip"},T={__name:"bar01",setup(C){const[s,{setProps:u}]=$({chartType:"bar",subChartType:"bar01"}),a=k("auto");function e(r,n){const t=Number(r),m=Number.isFinite(t)?t:0,f=1024*1024,d=1024*1024*1024;return(n==="auto"?m>=d?"GB":"MB":n)==="GB"?`${(m/d).toFixed(2)}GB`:`${(m/f).toFixed(2)}MB`}function l(r){return{rank:{topCount:3,topColors:[{backgroundColor:"rgba(242, 99, 123, 0.20)",borderColor:"rgba(242, 99, 123, 1)"},{backgroundColor:"rgba(251, 212, 55, 0.20)",borderColor:"rgba(251, 212, 55, 1)"},{backgroundColor:"rgba(78, 203, 115, 0.20)",borderColor:"rgba(78, 203, 115, 1)"}]},bar:{color:"rgba(26, 213, 152, 1)",backgroundColor:"rgba(26, 213, 152, 0.20)",topColors:["rgba(242, 99, 123, 1)","rgba(251, 212, 55, 1)","rgba(78, 203, 115, 1)"]},rightLabel:{formatter:({rawValue:n})=>e(n,r)}}}const p=[{name:"A类-BAR-Bar-bar",value:8*1024*1024*1024},{name:"E类",value:6.2*1024*1024*1024},{name:"I类",value:5.8*1024*1024*1024},{name:"B类",value:3.2*1024*1024*1024},{name:"F类",value:2.6*1024*1024*1024},{name:"J类",value:2.2*1024*1024*1024},{name:"C类",value:1.6*1024*1024*1024},{name:"G类",value:1.2*1024*1024*1024},{name:"D类",value:820*1024*1024},{name:"H类",value:420*1024*1024}];return h(a,r=>{u({chartConfig:l(r)})},{immediate:!0}),_(()=>{u({data:p})}),(r,n)=>(g(),v("div",y,[o("div",F,[o("button",{class:b(["demo-btn",{active:a.value==="auto"}]),onClick:n[0]||(n[0]=t=>a.value="auto")}," 自动 ",2),o("button",{class:b(["demo-btn",{active:a.value==="MB"}]),onClick:n[1]||(n[1]=t=>a.value="MB")}," MB ",2),o("button",{class:b(["demo-btn",{active:a.value==="GB"}]),onClick:n[2]||(n[2]=t=>a.value="GB")}," GB ",2),o("span",P,"右侧文案单位："+M(a.value),1)]),c(i(G),{class:"demo-echarts",onRegister:i(s)},null,8,["onRegister"])]))}},D=B(T,[["__scopeId","data-v-ba01c984"]]),N={class:"markdown-body"},E={__name:"bar01",setup(C,{expose:s}){return s({frontmatter:{}}),(a,e)=>{const l=x("Preview");return g(),v("div",N,[e[0]||(e[0]=o("h1",null,"Bar01 排行柱形图",-1)),c(l,{"comp-name":"PdCharts","demo-name":"bar/bar01"},{default:w(()=>[c(D)]),_:1}),e[1]||(e[1]=o("h2",null,"用法",-1)),e[2]||(e[2]=o("pre",null,[o("code",{class:"language-js"},`import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted, ref, watch } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'bar01',
})

const unitMode = ref('auto')

function formatTraffic(bytes, mode) {
  const n = Number(bytes)
  const v = Number.isFinite(n) ? n : 0
  const MB = 1024 * 1024
  const GB = 1024 * 1024 * 1024
  const realMode = mode === 'auto' ? (v >= GB ? 'GB' : 'MB') : mode
  if (realMode === 'GB') return \`\${(v / GB).toFixed(2)}GB\`
  return \`\${(v / MB).toFixed(2)}MB\`
}

function makeChartConfig(mode) {
  return {
    rank: {
      topCount: 3,
      topColors: [
        { backgroundColor: 'rgba(242, 99, 123, 0.20)', borderColor: 'rgba(242, 99, 123, 1)' },
        { backgroundColor: 'rgba(251, 212, 55, 0.20)', borderColor: 'rgba(251, 212, 55, 1)' },
        { backgroundColor: 'rgba(78, 203, 115, 0.20)', borderColor: 'rgba(78, 203, 115, 1)' },
      ],
    },
    bar: {
      color: 'rgba(26, 213, 152, 1)',
      backgroundColor: 'rgba(26, 213, 152, 0.20)',
      topColors: ['rgba(242, 99, 123, 1)', 'rgba(251, 212, 55, 1)', 'rgba(78, 203, 115, 1)'],
    },
    rightLabel: {
      formatter: ({ rawValue }) => formatTraffic(rawValue, mode),
    },
  }
}

const echartData = [
  {
    name: 'A类-BAR-Bar-bar',
    value: 8 * 1024 * 1024 * 1024,
  },
  {
    name: 'E类',
    value: 6.2 * 1024 * 1024 * 1024,
  },
  {
    name: 'I类',
    value: 5.8 * 1024 * 1024 * 1024,
  },
  {
    name: 'B类',
    value: 3.2 * 1024 * 1024 * 1024,
  },
  {
    name: 'F类',
    value: 2.6 * 1024 * 1024 * 1024,
  },
  {
    name: 'J类',
    value: 2.2 * 1024 * 1024 * 1024,
  },
  {
    name: 'C类',
    value: 1.6 * 1024 * 1024 * 1024,
  },
  {
    name: 'G类',
    value: 1.2 * 1024 * 1024 * 1024,
  },
  {
    name: 'D类',
    value: 820 * 1024 * 1024,
  },
  {
    name: 'H类',
    value: 420 * 1024 * 1024,
  },
]

watch(unitMode, (mode) => {
  setProps({
    chartConfig: makeChartConfig(mode),
  })
}, { immediate: true })

onMounted(() => {
  setProps({
    data: echartData,
  })
})
`)],-1))])}}};export{E as default};
