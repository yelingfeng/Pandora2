import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./ButtonPicker-DGgXbhjl.js";var c={class:`markdown-body`},l={__name:`ButtonPicker`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`ButtonPicker 按钮选择器`,-1),u[1]||=a(`p`,null,`按钮形式的选择器组件，基于 Element Plus 的 Segmented 组件封装，支持单选和禁用状态。`,-1),o(d,{"comp-name":`PdBiz`,"demo-name":`ButtonPicker`},{default:n(()=>[o(s)]),_:1}),u[2]||=r(`<h2>基础用法</h2><pre><code class="language-vue">&lt;template&gt;
  &lt;PdBizButtonPicker
    v-model=&quot;selected&quot;
    :options=&quot;options&quot;
    @change=&quot;handleChange&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;
import { PdBizButtonPicker } from &#39;@pandora/components/PdBiz&#39;

const selected = ref(&#39;&#39;)
const options = [
  { label: &#39;选项1&#39;, value: &#39;1&#39; },
  { label: &#39;选项2&#39;, value: &#39;2&#39; },
  { label: &#39;选项3&#39;, value: &#39;3&#39; }
]

const handleChange = (value) =&gt; {
  console.log(&#39;选中值:&#39;, value)
}
&lt;/script&gt;
</code></pre><h2>禁用选项</h2><p>通过设置选项的 <code>disabled</code> 属性可以禁用特定选项。</p><pre><code class="language-vue">&lt;PdBizButtonPicker
  v-model=&quot;selected&quot;
  :options=&quot;[
    { label: &#39;选项1&#39;, value: &#39;1&#39; },
    { label: &#39;选项2&#39;, value: &#39;2&#39;, disabled: true },
    { label: &#39;选项3&#39;, value: &#39;3&#39; }
  ]&quot;
/&gt;
</code></pre><h2>时间范围选择</h2><p>配合 <code>timeRange</code> 属性可以实现时间范围的快速选择。</p><pre><code class="language-vue">&lt;PdBizButtonPicker
  v-model=&quot;selected&quot;
  :options=&quot;[
    { label: &#39;近7天&#39;, value: &#39;7&#39;, timeRange: true },
    { label: &#39;近30天&#39;, value: &#39;30&#39;, timeRange: true },
    { label: &#39;近90天&#39;, value: &#39;90&#39;, timeRange: true }
  ]&quot;
  @change=&quot;handleTimeRangeChange&quot;
/&gt;
</code></pre><h2>API</h2><h3>Props</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>modelValue / value</td><td>绑定值</td><td><code>string | number</code></td><td>-</td></tr><tr><td>options</td><td>选项数据</td><td><code>IButtonOption[]</code></td><td><code>[]</code></td></tr></tbody></table><h3>Events</h3><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>change</td><td>选中值变化时触发</td><td><code>(value: string | number)</code></td></tr><tr><td>input</td><td>更新绑定值（v-model）</td><td><code>(value: string | number)</code></td></tr></tbody></table><h3>IButtonOption</h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>必填</th></tr></thead><tbody><tr><td>label</td><td>显示文本</td><td><code>string</code></td><td>是</td></tr><tr><td>value</td><td>选项值</td><td><code>string | number</code></td><td>是</td></tr><tr><td>disabled</td><td>是否禁用</td><td><code>boolean</code></td><td>否</td></tr><tr><td>timeRange</td><td>是否为时间范围选项</td><td><code>boolean</code></td><td>否</td></tr></tbody></table><h2>技术说明</h2><p>本组件基于 Element Plus 2.7+ 的 <code>el-segmented</code> 组件封装，提供了统一的样式和交互体验。相比直接使用 <code>el-tabs</code>，<code>el-segmented</code> 提供了更好的分段控制器 UI 表现。</p>`,17)])}}};export{l as default};