import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./DynamicCheckboxSelector-BWL9UCsj.js";var c={class:`markdown-body`},l={__name:`DynamicCheckboxSelector`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`DynamicCheckboxSelector 动态多选选择器`,-1),u[1]||=a(`p`,null,`基于抽屉的动态多选组件，支持分组和全选功能。`,-1),o(d,{"comp-name":`PdBiz`,"demo-name":`DynamicCheckboxSelector`},{default:n(()=>[o(s)]),_:1}),u[2]||=r(`<h2>基础用法</h2><pre><code class="language-vue">&lt;template&gt;
  &lt;el-button type=&quot;primary&quot; @click=&quot;visible = true&quot;&gt;打开选择器&lt;/el-button&gt;
  
  &lt;PdBizDynamicCheckboxSelector
    v-model:visible=&quot;visible&quot;
    v-model:selected=&quot;selected&quot;
    :options=&quot;options&quot;
    @confirm=&quot;handleConfirm&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;
import { PdBizDynamicCheckboxSelector } from &#39;@pandora/components/PdBiz&#39;

const visible = ref(false)
const selected = ref([])

const options = [
  { label: &#39;苹果&#39;, value: &#39;apple&#39; },
  { label: &#39;香蕉&#39;, value: &#39;banana&#39; },
  { label: &#39;橙子&#39;, value: &#39;orange&#39; }
]

const handleConfirm = (values) =&gt; {
  console.log(&#39;已选择:&#39;, values)
}
&lt;/script&gt;
</code></pre><h2>分组选项</h2><p>通过设置选项的 <code>type</code> 属性可以实现分组显示。</p><pre><code class="language-vue">&lt;PdBizDynamicCheckboxSelector
  v-model:visible=&quot;visible&quot;
  v-model:selected=&quot;selected&quot;
  :options=&quot;[
    { label: &#39;路由器&#39;, value: &#39;router&#39;, type: &#39;网络设备&#39; },
    { label: &#39;交换机&#39;, value: &#39;switch&#39;, type: &#39;网络设备&#39; },
    { label: &#39;服务器&#39;, value: &#39;server&#39;, type: &#39;计算设备&#39; },
    { label: &#39;存储&#39;, value: &#39;storage&#39;, type: &#39;计算设备&#39; }
  ]&quot;
/&gt;
</code></pre><h2>默认选中</h2><p>通过 <code>v-model:selected</code> 设置默认选中项。</p><pre><code class="language-vue">&lt;PdBizDynamicCheckboxSelector
  v-model:visible=&quot;visible&quot;
  v-model:selected=&quot;[&#39;apple&#39;, &#39;banana&#39;]&quot;
  :options=&quot;options&quot;
/&gt;
</code></pre><h2>自定义标题和按钮</h2><pre><code class="language-vue">&lt;PdBizDynamicCheckboxSelector
  v-model:visible=&quot;visible&quot;
  v-model:selected=&quot;selected&quot;
  :options=&quot;options&quot;
  title=&quot;选择设备类型&quot;
  confirmText=&quot;确认选择&quot;
  cancelText=&quot;取消&quot;
  @confirm=&quot;handleConfirm&quot;
  @cancel=&quot;handleCancel&quot;
/&gt;
</code></pre><h2>API</h2><h3>Props</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>visible</td><td>是否显示抽屉</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td>selected</td><td>已选中的值</td><td><code>string[]</code></td><td><code>[]</code></td></tr><tr><td>options</td><td>选项数据</td><td><code>ICheckboxOption[]</code></td><td><code>[]</code></td></tr><tr><td>title</td><td>抽屉标题</td><td><code>string</code></td><td><code>&#39;选择&#39;</code></td></tr><tr><td>confirmText</td><td>确认按钮文本</td><td><code>string</code></td><td><code>&#39;确定&#39;</code></td></tr><tr><td>cancelText</td><td>取消按钮文本</td><td><code>string</code></td><td><code>&#39;取消&#39;</code></td></tr></tbody></table><h3>Events</h3><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>confirm</td><td>点击确认时触发</td><td><code>(values: string[])</code></td></tr><tr><td>cancel</td><td>点击取消时触发</td><td><code>()</code></td></tr><tr><td>update:visible</td><td>更新显示状态</td><td><code>(value: boolean)</code></td></tr><tr><td>update:selected</td><td>更新选中值</td><td><code>(values: string[])</code></td></tr></tbody></table><h3>ICheckboxOption</h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>必填</th></tr></thead><tbody><tr><td>label</td><td>选项文本</td><td><code>string</code></td><td>是</td></tr><tr><td>value</td><td>选项值</td><td><code>string</code></td><td>是</td></tr><tr><td>type</td><td>分组类型</td><td><code>string</code></td><td>否</td></tr></tbody></table><h2>功能说明</h2><ul><li><strong>全选/取消全选</strong>：点击&quot;全选&quot;按钮可以选中/取消所有选项</li><li><strong>分组选择</strong>：设置 <code>type</code> 属性后，同类型选项会显示在同一组，支持按组全选</li><li><strong>其他分组</strong>：未设置 <code>type</code> 的选项会归入&quot;其他&quot;分组</li></ul>`,19)])}}};export{l as default};