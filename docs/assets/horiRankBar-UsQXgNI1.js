import{g as h,j as T,h as W,c as $,o as M,b as n,e as k,n as e,i as d,t as P,k as B,l as R,a as y,w as F,r as N}from"./index-Dsokk0W_.js";import{u as V}from"./useCharts-CDoaWy0L.js";const A={class:"demo-charts"},L={class:"demo-ops"},j={class:"demo-tip"},E={class:"demo-ops"},H={class:"demo-ops"},I={class:"demo-ops"},O={__name:"horiRankBar",setup(D){const[c,{setProps:p}]=V({chartType:"bar",subChartType:"horiRankBar"}),s=d("auto"),t=d(3),r=d("green"),u=d("normal"),i=d("default"),b=d("总数"),l=d(""),v=d(!0);function x(m,o){const a=Number(m),g=Number.isFinite(a)?a:0,f=1024*1024,C=1024*1024*1024;return(o==="auto"?g>=C?"GB":"MB":o)==="GB"?`${(g/C).toFixed(2)}GB`:`${(g/f).toFixed(2)}MB`}function G(m){const a={compact:{minWidth:48,maxWidth:100,charWidth:12},normal:{minWidth:48,maxWidth:160,charWidth:14},wide:{minWidth:60,maxWidth:200,charWidth:16}}[u.value],f={default:[{backgroundColor:"rgba(242, 99, 123, 0.20)",borderColor:"rgba(242, 99, 123, 1)"},{backgroundColor:"rgba(251, 212, 55, 0.20)",borderColor:"rgba(251, 212, 55, 1)"},{backgroundColor:"rgba(78, 203, 115, 0.20)",borderColor:"rgba(78, 203, 115, 1)"}],red:[{backgroundColor:"rgba(255, 102, 102, 0.20)",borderColor:"rgba(255, 102, 102, 1)",color:"#4D4D4D"},{backgroundColor:"rgba(255, 153, 153, 0.20)",borderColor:"rgba(255, 153, 153, 1)",color:"#4D4D4D"},{backgroundColor:"rgba(255, 51, 51, 0.20)",borderColor:"rgba(255, 51, 51, 1)",color:"#4D4D4D"}],yellow:[{backgroundColor:"rgba(255, 204, 102, 0.20)",borderColor:"rgba(255, 204, 102, 1)",color:"#4D4D4D"},{backgroundColor:"rgba(255, 204, 51, 0.20)",borderColor:"rgba(255, 204, 51, 1)",color:"#4D4D4D"},{backgroundColor:"rgba(255, 204, 0, 0.20)",borderColor:"rgba(255, 204, 0, 1)",color:"#4D4D4D"}]}[i.value];return{bar:{rank:{topCount:t.value,topColors:f},color:r.value==="green"?"rgba(26, 213, 152, 1)":"rgba(255, 153, 0, 1)",backgroundColor:r.value==="green"?"rgba(26, 213, 152, 0.20)":"rgba(255, 153, 0, 0.20)",topColors:r.value==="green"?["rgba(242, 99, 123, 1)","rgba(251, 212, 55, 1)","rgba(78, 203, 115, 1)"]:["rgba(255, 153, 0, 1)","rgba(255, 204, 102, 1)","rgba(255, 102, 102, 1)"],rightLabel:v.value?{prefix:b.value,suffix:l.value,formatter:({rawValue:C})=>`${b.value}${x(C,m)}${l.value}`}:{prefix:b.value,suffix:l.value},label:a}}}const w=[{name:"A类-BAR-Bar-bar",value:8*1024*1024*1024},{name:"E类",value:6.2*1024*1024*1024},{name:"I类",value:5.8*1024*1024*1024},{name:"B类",value:3.2*1024*1024*1024},{name:"F类",value:2.6*1024*1024*1024},{name:"J类",value:2.2*1024*1024*1024},{name:"C类",value:1.6*1024*1024*1024},{name:"G类",value:1.2*1024*1024*1024},{name:"D类",value:820*1024*1024},{name:"H类",value:420*1024*1024}];return T([s,t,r,u,i,b,l,v],([m])=>{p({chartConfig:G(m)})},{immediate:!0}),W(()=>{p({data:w})}),(m,o)=>(M(),$("div",A,[n("div",L,[n("button",{class:e(["demo-btn",{active:s.value==="auto"}]),onClick:o[0]||(o[0]=a=>s.value="auto")}," 自动 ",2),n("button",{class:e(["demo-btn",{active:s.value==="MB"}]),onClick:o[1]||(o[1]=a=>s.value="MB")}," MB ",2),n("button",{class:e(["demo-btn",{active:s.value==="GB"}]),onClick:o[2]||(o[2]=a=>s.value="GB")}," GB ",2),n("span",j,"右侧文案单位："+P(s.value),1)]),n("div",E,[o[21]||(o[21]=n("span",{class:"ops-label"},"Top 数量",-1)),n("button",{class:e(["demo-btn",{active:t.value===2}]),onClick:o[3]||(o[3]=a=>t.value=2)},"2",2),n("button",{class:e(["demo-btn",{active:t.value===3}]),onClick:o[4]||(o[4]=a=>t.value=3)},"3",2),n("button",{class:e(["demo-btn",{active:t.value===5}]),onClick:o[5]||(o[5]=a=>t.value=5)},"5",2),o[22]||(o[22]=n("span",{class:"ops-label"},"配色主题",-1)),n("button",{class:e(["demo-btn",{active:r.value==="green"}]),onClick:o[6]||(o[6]=a=>r.value="green")},"Green",2),n("button",{class:e(["demo-btn",{active:r.value==="orange"}]),onClick:o[7]||(o[7]=a=>r.value="orange")},"Orange",2)]),n("div",H,[o[23]||(o[23]=n("span",{class:"ops-label"},"标签宽度",-1)),n("button",{class:e(["demo-btn",{active:u.value==="compact"}]),onClick:o[8]||(o[8]=a=>u.value="compact")},"紧凑",2),n("button",{class:e(["demo-btn",{active:u.value==="normal"}]),onClick:o[9]||(o[9]=a=>u.value="normal")},"标准",2),n("button",{class:e(["demo-btn",{active:u.value==="wide"}]),onClick:o[10]||(o[10]=a=>u.value="wide")},"宽",2)]),n("div",I,[o[24]||(o[24]=n("span",{class:"ops-label"},"Top 块样式",-1)),n("button",{class:e(["demo-btn",{active:i.value==="default"}]),onClick:o[11]||(o[11]=a=>i.value="default")},"默认",2),n("button",{class:e(["demo-btn",{active:i.value==="red"}]),onClick:o[12]||(o[12]=a=>i.value="red")},"红系",2),n("button",{class:e(["demo-btn",{active:i.value==="yellow"}]),onClick:o[13]||(o[13]=a=>i.value="yellow")},"黄系",2),o[25]||(o[25]=n("span",{class:"ops-label"},"右侧文案",-1)),n("button",{class:e(["demo-btn",{active:v.value}]),onClick:o[14]||(o[14]=a=>v.value=!0)},"格式化",2),n("button",{class:e(["demo-btn",{active:!v.value}]),onClick:o[15]||(o[15]=a=>v.value=!1)},"原值",2),o[26]||(o[26]=n("span",{class:"ops-label"},"前后缀",-1)),n("button",{class:e(["demo-btn",{active:b.value==="总数"}]),onClick:o[16]||(o[16]=a=>b.value="总数")},"总数",2),n("button",{class:e(["demo-btn",{active:b.value==="流量:"}]),onClick:o[17]||(o[17]=a=>b.value="流量:")},"流量:",2),n("button",{class:e(["demo-btn",{active:l.value===""}]),onClick:o[18]||(o[18]=a=>l.value="")},"无后缀",2),n("button",{class:e(["demo-btn",{active:l.value==="MB"}]),onClick:o[19]||(o[19]=a=>l.value="MB")},"MB",2),n("button",{class:e(["demo-btn",{active:l.value==="GB"}]),onClick:o[20]||(o[20]=a=>l.value="GB")},"GB",2)]),k(B(R),{class:"demo-echarts",onRegister:B(c)},null,8,["onRegister"])]))}},S=h(O,[["__scopeId","data-v-d84a47eb"]]),z={class:"markdown-body"},Q={__name:"horiRankBar",setup(D,{expose:c}){return c({frontmatter:{}}),(s,t)=>{const r=N("Preview");return M(),$("div",z,[t[0]||(t[0]=n("h1",null,"HoriRankBar 横向排名TOP柱形图",-1)),k(r,{"comp-name":"PdCharts","demo-name":"bar/horiRankBar"},{default:F(()=>[k(S)]),_:1}),t[1]||(t[1]=y(`<h2>用法</h2><pre><code class="language-js">import { Charts, useCharts } from &#39;@pandora/components/PdCharts&#39;
import { onMounted, ref, watch } from &#39;vue&#39;

const [register, { setProps }] = useCharts({
  chartType: &#39;bar&#39;,
  subChartType: &#39;horiRankBar&#39;,
})

const unitMode = ref(&#39;auto&#39;)

function formatTraffic(bytes, mode) {
  const n = Number(bytes)
  const v = Number.isFinite(n) ? n : 0
  const MB = 1024 * 1024
  const GB = 1024 * 1024 * 1024
  const realMode = mode === &#39;auto&#39; ? (v &gt;= GB ? &#39;GB&#39; : &#39;MB&#39;) : mode
  if (realMode === &#39;GB&#39;) return \`\${(v / GB).toFixed(2)}GB\`
  return \`\${(v / MB).toFixed(2)}MB\`
}

function makeChartConfig(mode) {
  return {
    rank: {
      topCount: 3,
      topColors: [
        { backgroundColor: &#39;rgba(242, 99, 123, 0.20)&#39;, borderColor: &#39;rgba(242, 99, 123, 1)&#39; },
        { backgroundColor: &#39;rgba(251, 212, 55, 0.20)&#39;, borderColor: &#39;rgba(251, 212, 55, 1)&#39; },
        { backgroundColor: &#39;rgba(78, 203, 115, 0.20)&#39;, borderColor: &#39;rgba(78, 203, 115, 1)&#39; },
      ],
    },
    bar: {
      color: &#39;rgba(26, 213, 152, 1)&#39;,
      backgroundColor: &#39;rgba(26, 213, 152, 0.20)&#39;,
      topColors: [&#39;rgba(242, 99, 123, 1)&#39;, &#39;rgba(251, 212, 55, 1)&#39;, &#39;rgba(78, 203, 115, 1)&#39;],
    },
    rightLabel: {
      formatter: ({ rawValue }) =&gt; formatTraffic(rawValue, mode),
    },
  }
}

const echartData = [
  {
    name: &#39;A类-BAR-Bar-bar&#39;,
    value: 8 * 1024 * 1024 * 1024,
  },
  {
    name: &#39;E类&#39;,
    value: 6.2 * 1024 * 1024 * 1024,
  },
  {
    name: &#39;I类&#39;,
    value: 5.8 * 1024 * 1024 * 1024,
  },
  {
    name: &#39;B类&#39;,
    value: 3.2 * 1024 * 1024 * 1024,
  },
  {
    name: &#39;F类&#39;,
    value: 2.6 * 1024 * 1024 * 1024,
  },
  {
    name: &#39;J类&#39;,
    value: 2.2 * 1024 * 1024 * 1024,
  },
  {
    name: &#39;C类&#39;,
    value: 1.6 * 1024 * 1024 * 1024,
  },
  {
    name: &#39;G类&#39;,
    value: 1.2 * 1024 * 1024 * 1024,
  },
  {
    name: &#39;D类&#39;,
    value: 820 * 1024 * 1024,
  },
  {
    name: &#39;H类&#39;,
    value: 420 * 1024 * 1024,
  },
]

watch(unitMode, (mode) =&gt; {
  setProps({
    bizConfig: makeChartConfig(mode),
  })
}, { immediate: true })

onMounted(() =&gt; {
  setProps({
    data: echartData,
  })
})
</code></pre><h2>属性说明（chartConfig.bar）</h2><ul><li>rank.topCount：Top 排名数（默认 3）</li><li>rank.topColors：Top 排名块颜色数组（对象包含 backgroundColor/borderColor/color 等）</li><li>color：柱子主色</li><li>backgroundColor：背景条颜色</li><li>topColors：TopN 柱子颜色数组（按排名索引）</li><li>rightLabel.formatter：右侧文案渲染函数，入参对象包含 { rawValue, value, name, index }</li><li>label.minWidth/label.maxWidth/label.charWidth：左侧名称自适应宽度计算</li></ul><h3>动态配置示例</h3><p>Demo 页顶部提供：</p><ul><li>单位切换（自动/MB/GB）</li><li>Top 数量切换（2/3/5）</li><li>配色主题切换（Green/Orange）</li></ul><pre><code class="language-js">const chartConfig = {
  bar: {
    rank: { topCount: 3, topColors: [{ backgroundColor: &#39;#eee&#39;, borderColor: &#39;#f00&#39; }] },
    color: &#39;#1AD598&#39;,
    backgroundColor: &#39;rgba(26, 213, 152, 0.20)&#39;,
    topColors: [&#39;#f2637b&#39;, &#39;#fbd437&#39;, &#39;#4ecb73&#39;],
    rightLabel: { formatter: ({ rawValue }) =&gt; formatTraffic(rawValue, unitMode) },
    label: { minWidth: 48, maxWidth: 160, charWidth: 14 }
  }
}
</code></pre>`,8))])}}};export{Q as default};
