import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./Stats-Cqj2rkWA.js";var c={class:`markdown-body`},l={__name:`Stats`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`Stats 统计数据展示`,-1),u[1]||=a(`p`,null,`用于展示多个统计数据指标的组件。`,-1),o(d,{"comp-name":`PdBiz`,"demo-name":`Stats`},{default:n(()=>[o(s)]),_:1}),u[2]||=r(`<h2>基础用法</h2><pre><code class="language-vue">&lt;template&gt;
  &lt;PdBizStats :renderData=&quot;statsData&quot; layout=&quot;auto&quot; /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;
import { PdBizStats } from &#39;@pandora/components/PdBiz&#39;

const statsData = ref([
  { label: &#39;总用户数&#39;, value: 12580, icon: &#39;icon-user&#39; },
  { label: &#39;活跃用户&#39;, value: 8960, icon: &#39;icon-active&#39; },
  { label: &#39;新增用户&#39;, value: 456 }
])
&lt;/script&gt;
</code></pre><h2>自动布局</h2><p>组件支持 1-4 个数据项时的自动布局优化。</p><pre><code class="language-vue">&lt;!-- 2个数据项：自动 50% 宽度 --&gt;
&lt;PdBizStats
  :renderData=&quot;[
    { label: &#39;总数&#39;, value: 1000 },
    { label: &#39;完成&#39;, value: 800 }
  ]&quot;
  layout=&quot;auto&quot;
/&gt;

&lt;!-- 3个数据项：自动 33.33% 宽度 --&gt;
&lt;PdBizStats
  :renderData=&quot;[
    { label: &#39;总数&#39;, value: 1000 },
    { label: &#39;进行中&#39;, value: 200 },
    { label: &#39;完成&#39;, value: 800 }
  ]&quot;
  layout=&quot;auto&quot;
/&gt;
</code></pre><h2>Flex 布局</h2><p>超过 4 个数据项时，建议使用 <code>flex</code> 布局。</p><pre><code class="language-vue">&lt;PdBizStats
  :renderData=&quot;statsData&quot;
  layout=&quot;flex&quot;
/&gt;
</code></pre><h2>API</h2><h3>Props</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>renderData</td><td>统计数据</td><td><code>IStatsItem[]</code></td><td><code>[]</code></td></tr><tr><td>layout</td><td>布局方式</td><td><code>&#39;auto&#39; | &#39;flex&#39;</code></td><td><code>&#39;auto&#39;</code></td></tr></tbody></table><h3>IStatsItem</h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>必填</th></tr></thead><tbody><tr><td>label</td><td>标签文本</td><td><code>string</code></td><td>是</td></tr><tr><td>value</td><td>统计值</td><td><code>number</code></td><td>是</td></tr><tr><td>icon</td><td>图标类名</td><td><code>string</code></td><td>否</td></tr></tbody></table>`,13)])}}};export{l as default};