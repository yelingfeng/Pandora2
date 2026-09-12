import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./AdvancedQuery-1QE4rPrZ.js";var c={class:`markdown-body`},l={__name:`AdvancedQuery`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`AdvancedQuery 高级查询`,-1),u[1]||=a(`p`,null,`高级查询构造器，支持多字段、多条件的动态查询。`,-1),o(d,{"comp-name":`PdBiz`,"demo-name":`AdvancedQuery`},{default:n(()=>[o(s)]),_:1}),u[2]||=r(`<h2>基础用法</h2><pre><code class="language-vue">&lt;template&gt;
  &lt;el-button type=&quot;primary&quot; @click=&quot;visible = true&quot;&gt;打开高级查询&lt;/el-button&gt;
  
  &lt;PdBizAdvancedQuery
    v-model:visible=&quot;visible&quot;
    :fields=&quot;fields&quot;
    @confirm=&quot;handleConfirm&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;
import { PdBizAdvancedQuery } from &#39;@pandora/components/PdBiz&#39;

const visible = ref(false)

const fields = [
  { label: &#39;IP地址&#39;, value: &#39;ip&#39;, type: &#39;input&#39; },
  { label: &#39;机房&#39;, value: &#39;room&#39;, type: &#39;input&#39; },
  { label: &#39;状态&#39;, value: &#39;status&#39;, type: &#39;input&#39; }
]

const handleConfirm = (conditions) =&gt; {
  console.log(&#39;查询条件:&#39;, conditions)
}
&lt;/script&gt;
</code></pre><h2>支持的条件类型</h2><p>组件支持以下查询条件：</p><ul><li><strong>等于</strong>：字段值等于指定值</li><li><strong>不等于</strong>：字段值不等于指定值</li><li><strong>包含</strong>：字段值包含指定文本</li><li><strong>大于</strong>：字段值大于指定值（数值类型）</li><li><strong>小于</strong>：字段值小于指定值（数值类型）</li><li><strong>为空</strong>：字段值为空（无需输入值）</li><li><strong>不为空</strong>：字段值不为空（无需输入值）</li></ul><h2>多字段类型</h2><p>支持不同类型的字段输入：</p><pre><code class="language-vue">&lt;PdBizAdvancedQuery
  v-model:visible=&quot;visible&quot;
  :fields=&quot;[
    { label: &#39;IP地址&#39;, value: &#39;ip&#39;, type: &#39;input&#39; },
    { label: &#39;端口&#39;, value: &#39;port&#39;, type: &#39;number&#39; },
    {
      label: &#39;状态&#39;,
      value: &#39;status&#39;,
      type: &#39;select&#39;,
      options: [
        { label: &#39;在线&#39;, value: &#39;1&#39; },
        { label: &#39;离线&#39;, value: &#39;0&#39; },
        { label: &#39;异常&#39;, value: &#39;2&#39; }
      ]
    },
    { label: &#39;创建时间&#39;, value: &#39;createTime&#39;, type: &#39;date&#39; }
  ]&quot;
  @confirm=&quot;handleConfirm&quot;
/&gt;
</code></pre><h2>自定义按钮文本</h2><pre><code class="language-vue">&lt;PdBizAdvancedQuery
  v-model:visible=&quot;visible&quot;
  :fields=&quot;fields&quot;
  confirmText=&quot;应用筛选&quot;
  cancelText=&quot;重置&quot;
  @confirm=&quot;handleConfirm&quot;
  @cancel=&quot;handleCancel&quot;
/&gt;
</code></pre><h2>API</h2><h3>Props</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>visible</td><td>是否显示对话框</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td>fields</td><td>字段配置</td><td><code>IQueryField[]</code></td><td><code>[]</code></td></tr><tr><td>confirmText</td><td>确认按钮文本</td><td><code>string</code></td><td><code>&#39;确定&#39;</code></td></tr><tr><td>cancelText</td><td>取消按钮文本</td><td><code>string</code></td><td><code>&#39;取消&#39;</code></td></tr></tbody></table><h3>Events</h3><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>confirm</td><td>点击确认时触发</td><td><code>(conditions: IQueryCondition[])</code></td></tr><tr><td>cancel</td><td>点击取消时触发</td><td><code>()</code></td></tr><tr><td>update:visible</td><td>更新显示状态</td><td><code>(value: boolean)</code></td></tr></tbody></table><h3>IQueryField</h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>必填</th></tr></thead><tbody><tr><td>label</td><td>字段显示名称</td><td><code>string</code></td><td>是</td></tr><tr><td>value</td><td>字段值</td><td><code>string</code></td><td>是</td></tr><tr><td>type</td><td>字段类型</td><td><code>&#39;input&#39; | &#39;number&#39; | &#39;select&#39; | &#39;date&#39;</code></td><td>是</td></tr><tr><td>options</td><td>下拉选项（type为select时）</td><td><code>Array&lt;{label: string, value: string}&gt;</code></td><td>否</td></tr></tbody></table><h3>IQueryCondition</h3><p>返回的查询条件对象：</p><table><thead><tr><th>属性</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>field</td><td>字段值</td><td><code>string</code></td></tr><tr><td>fieldLabel</td><td>字段显示名称</td><td><code>string</code></td></tr><tr><td>condition</td><td>条件值</td><td><code>string</code></td></tr><tr><td>conditionLabel</td><td>条件显示名称</td><td><code>string</code></td></tr><tr><td>value</td><td>查询值</td><td><code>any</code></td></tr></tbody></table><h2>使用场景</h2><p>适用于需要复杂筛选条件的场景，如：</p><ul><li>数据表格的高级筛选</li><li>日志查询系统</li><li>报表数据筛选</li><li>资源管理系统的条件查询</li></ul>`,23)])}}};export{l as default};