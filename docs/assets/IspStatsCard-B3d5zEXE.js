import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./IspStatsCard-CiUvJHXQ.js";var c={class:`markdown-body`},l={__name:`IspStatsCard`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`IspStatsCard 运营商统计卡`,-1),u[1]||=a(`p`,null,`用于展示按运营商分组的统计数据卡片。`,-1),o(d,{"comp-name":`PdBiz`,"demo-name":`IspStatsCard`},{default:n(()=>[o(s)]),_:1}),u[2]||=r(`<h2>基础用法</h2><pre><code class="language-vue">&lt;template&gt;
  &lt;PdBizIspStatsCard :data=&quot;statsData&quot; /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;
import { PdBizIspStatsCard } from &#39;@pandora/components/PdBiz&#39;

const statsData = ref([
  { isp: &#39;1&#39;, count: 1250, flag: &#39;mobile&#39; },
  { isp: &#39;2&#39;, count: 980, flag: &#39;unicom&#39; },
  { isp: &#39;3&#39;, count: 1560, flag: &#39;telecom&#39; }
])
&lt;/script&gt;
</code></pre><h2>自定义运营商映射</h2><p>通过 <code>ispMap</code> 和 <code>ispOrder</code> 属性自定义运营商显示名称和顺序。</p><pre><code class="language-vue">&lt;PdBizIspStatsCard
  :data=&quot;statsData&quot;
  :ispMap=&quot;{
    &#39;1&#39;: &#39;中国移动&#39;,
    &#39;2&#39;: &#39;中国联通&#39;,
    &#39;3&#39;: &#39;中国电信&#39;,
    &#39;4&#39;: &#39;其他运营商&#39;
  }&quot;
  :ispOrder=&quot;[&#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;4&#39;]&quot;
/&gt;
</code></pre><h2>API</h2><h3>Props</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>data</td><td>统计数据</td><td><code>IIspStatItem[]</code></td><td><code>[]</code></td></tr><tr><td>ispMap</td><td>运营商映射表</td><td><code>Record&lt;string, string&gt;</code></td><td>默认映射</td></tr><tr><td>ispOrder</td><td>运营商显示顺序</td><td><code>string[]</code></td><td>-</td></tr></tbody></table><h3>IIspStatItem</h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>必填</th></tr></thead><tbody><tr><td>isp</td><td>运营商标识</td><td><code>string | number</code></td><td>是</td></tr><tr><td>count</td><td>统计数量</td><td><code>number</code></td><td>是</td></tr><tr><td>flag</td><td>运营商标志</td><td><code>string</code></td><td>是</td></tr></tbody></table>`,10)])}}};export{l as default};