import{g as L,j as O,h as R,c as g,o as k,b as e,e as c,n,i as v,k as f,l as T,w as E,r as Z}from"./index-BhAAOAfY.js";import{u as j}from"./useCharts-yhuqGrI9.js";const I={class:"demo-charts"},N={class:"demo-ops"},V={class:"ops-row"},z={class:"ops-row"},G={class:"ops-row"},H={class:"ops-row"},K={class:"ops-row"},q={__name:"line01",setup($){const[p,{setProps:b}]=j({chartType:"line",subChartType:"line01"}),r=v("light"),o=v(!0),a=v(!0),u=v("light"),i=v(!0),l=v(80),w=["#6efbbf","#40c057","#ffd351","#ff8e43","#f56b6d"],y=["#FF0087","#FFBF00","#E8684A","#6DC8EC","#9270CA","#FF99C3"];function M(){const d=u.value==="dark"?y:w;b({chartConfig:{themeMode:r.value,colors:d,smooth:o.value,legend:{show:a.value},dataZoom:{show:i.value,start:l.value}}})}O([r,o,a,u,i,l],M,{immediate:!0});function h(d=180){const t=["A类","B类","C类","D类"],s=[];return t.forEach((F,C)=>{const A=100+C*40;for(let m=1;m<=d;m++){const P=`Day${String(m).padStart(3,"0")}`,x=(Math.random()-.5)*20,B=Math.sin(m/12+C)*25,S=Math.max(0,Math.round(A+B+x));s.push({category:F,name:P,value:S})}}),s}const D=h(180);return R(()=>{b({data:D})}),(d,t)=>(k(),g("div",I,[e("div",N,[e("div",V,[t[13]||(t[13]=e("span",{class:"ops-label"},"主题",-1)),e("button",{class:n(["demo-btn",{active:r.value==="light"}]),onClick:t[0]||(t[0]=s=>r.value="light")},"Light",2),e("button",{class:n(["demo-btn",{active:r.value==="dark"}]),onClick:t[1]||(t[1]=s=>r.value="dark")},"Dark",2)]),e("div",z,[t[14]||(t[14]=e("span",{class:"ops-label"},"平滑",-1)),e("button",{class:n(["demo-btn",{active:o.value}]),onClick:t[2]||(t[2]=s=>o.value=!0)},"开",2),e("button",{class:n(["demo-btn",{active:!o.value}]),onClick:t[3]||(t[3]=s=>o.value=!1)},"关",2)]),e("div",G,[t[15]||(t[15]=e("span",{class:"ops-label"},"图例",-1)),e("button",{class:n(["demo-btn",{active:a.value}]),onClick:t[4]||(t[4]=s=>a.value=!0)},"显示",2),e("button",{class:n(["demo-btn",{active:!a.value}]),onClick:t[5]||(t[5]=s=>a.value=!1)},"隐藏",2)]),e("div",H,[t[16]||(t[16]=e("span",{class:"ops-label"},"配色",-1)),e("button",{class:n(["demo-btn",{active:u.value==="light"}]),onClick:t[6]||(t[6]=s=>u.value="light")},"主题1",2),e("button",{class:n(["demo-btn",{active:u.value==="dark"}]),onClick:t[7]||(t[7]=s=>u.value="dark")},"主题2",2)]),e("div",K,[t[17]||(t[17]=e("span",{class:"ops-label"},"缩放",-1)),e("button",{class:n(["demo-btn",{active:i.value}]),onClick:t[8]||(t[8]=s=>i.value=!0)},"开",2),e("button",{class:n(["demo-btn",{active:!i.value}]),onClick:t[9]||(t[9]=s=>i.value=!1)},"关",2),t[18]||(t[18]=e("span",{class:"ops-label"},"起始",-1)),e("button",{class:n(["demo-btn",{active:l.value===0}]),onClick:t[10]||(t[10]=s=>l.value=0)},"0",2),e("button",{class:n(["demo-btn",{active:l.value===60}]),onClick:t[11]||(t[11]=s=>l.value=60)},"60",2),e("button",{class:n(["demo-btn",{active:l.value===80}]),onClick:t[12]||(t[12]=s=>l.value=80)},"80",2)])]),c(f(T),{class:"demo-echarts",onRegister:f(p)},null,8,["onRegister"])]))}},J=L(q,[["__scopeId","data-v-4aea4840"]]),Q={class:"markdown-body"},X={__name:"line01",setup($,{expose:p}){return p({frontmatter:{}}),(r,o)=>{const a=Z("Preview");return k(),g("div",Q,[o[0]||(o[0]=e("h1",null,"Line01 折线图",-1)),c(a,{"comp-name":"PdCharts","demo-name":"line/line01"},{default:E(()=>[c(J)]),_:1}),o[1]||(o[1]=e("h2",null,"用法",-1)),o[2]||(o[2]=e("pre",null,[e("code",{class:"language-js"},`import { Charts, useCharts } from '@pandora/components/PdCharts'
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
`)],-1))])}}};export{X as default};
