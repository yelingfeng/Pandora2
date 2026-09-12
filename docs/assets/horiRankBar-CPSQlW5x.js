import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./horiRankBar-DVS1T3OV.js";var c={class:`markdown-body`},l={__name:`horiRankBar`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`HoriRankBar 横向排名TOP柱形图`,-1),o(d,{"comp-name":`PdCharts`,"demo-name":`bar/horiRankBar`},{default:n(()=>[o(s)]),_:1}),u[1]||=r(`<h2>用法</h2><pre><code class="language-js">import { Charts, useCharts } from &#39;@pandora/components/PdCharts&#39;
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
</code></pre>`,8)])}}};export{l as default};