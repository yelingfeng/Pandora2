import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./TabSwitcher-C9I9C3PR.js";var c={class:`markdown-body`},l={__name:`TabSwitcher`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`TabSwitcher 标签切换器`,-1),u[1]||=a(`p`,null,`标签式的切换组件，支持数量统计和禁用状态。`,-1),o(d,{"comp-name":`PdBiz`,"demo-name":`TabSwitcher`},{default:n(()=>[o(s)]),_:1}),u[2]||=r(`<h2>基础用法</h2><pre><code class="language-vue">&lt;template&gt;
  &lt;PdBizTabSwitcher
    v-model=&quot;activeTab&quot;
    :tabs=&quot;tabs&quot;
    @change=&quot;handleChange&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;
import { PdBizTabSwitcher } from &#39;@pandora/components/PdBiz&#39;

const activeTab = ref(&#39;all&#39;)
const tabs = [
  { label: &#39;全部&#39;, value: &#39;all&#39; },
  { label: &#39;进行中&#39;, value: &#39;doing&#39; },
  { label: &#39;已完成&#39;, value: &#39;done&#39; }
]

const handleChange = (value) =&gt; {
  console.log(&#39;切换到:&#39;, value)
}
&lt;/script&gt;
</code></pre><h2>带数量统计</h2><p>通过设置 <code>count</code> 属性显示统计数量。</p><pre><code class="language-vue">&lt;PdBizTabSwitcher
  v-model=&quot;activeTab&quot;
  :tabs=&quot;[
    { label: &#39;在线&#39;, value: &#39;online&#39;, count: 125 },
    { label: &#39;离线&#39;, value: &#39;offline&#39;, count: 38 },
    { label: &#39;告警&#39;, value: &#39;alarm&#39;, count: 5 }
  ]&quot;
/&gt;
</code></pre><h2>禁用状态</h2><p>通过设置 <code>disabled</code> 属性禁用特定标签。</p><pre><code class="language-vue">&lt;PdBizTabSwitcher
  v-model=&quot;activeTab&quot;
  :tabs=&quot;[
    { label: &#39;标签1&#39;, value: &#39;tab1&#39; },
    { label: &#39;标签2&#39;, value: &#39;tab2&#39;, disabled: true },
    { label: &#39;标签3&#39;, value: &#39;tab3&#39; }
  ]&quot;
/&gt;
</code></pre><h2>API</h2><h3>Props</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>modelValue</td><td>当前选中的标签值</td><td><code>string</code></td><td>-</td></tr><tr><td>tabs</td><td>标签数据</td><td><code>ITabItem[]</code></td><td><code>[]</code></td></tr></tbody></table><h3>Events</h3><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>change</td><td>切换标签时触发</td><td><code>(value: string)</code></td></tr><tr><td>update:modelValue</td><td>更新绑定值</td><td><code>(value: string)</code></td></tr></tbody></table><h3>ITabItem</h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>必填</th></tr></thead><tbody><tr><td>label</td><td>标签文本</td><td><code>string</code></td><td>是</td></tr><tr><td>value</td><td>标签值</td><td><code>string</code></td><td>是</td></tr><tr><td>count</td><td>统计数量</td><td><code>number</code></td><td>否</td></tr><tr><td>disabled</td><td>是否禁用</td><td><code>boolean</code></td><td>否</td></tr></tbody></table>`,15)])}}};export{l as default};