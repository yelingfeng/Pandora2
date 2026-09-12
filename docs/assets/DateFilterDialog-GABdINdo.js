import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./DateFilterDialog-Bzj7jeVX.js";var c={class:`markdown-body`},l={__name:`DateFilterDialog`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`DateFilterDialog 日期筛选对话框`,-1),u[1]||=a(`p`,null,`日期范围快速筛选对话框，提供预设的时间范围选项。`,-1),o(d,{"comp-name":`PdBiz`,"demo-name":`DateFilterDialog`},{default:n(()=>[o(s)]),_:1}),u[2]||=r(`<h2>基础用法</h2><pre><code class="language-vue">&lt;template&gt;
  &lt;el-button type=&quot;primary&quot; @click=&quot;visible = true&quot;&gt;打开日期筛选&lt;/el-button&gt;
  
  &lt;PdBizDateFilterDialog
    :visible=&quot;visible&quot;
    @update:visible=&quot;visible = $event&quot;
    @confirm=&quot;handleConfirm&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;
import { PdBizDateFilterDialog } from &#39;@pandora/components/PdBiz&#39;

const visible = ref(false)

const handleConfirm = (result) =&gt; {
  console.log(&#39;选择:&#39;, result.option.label)
  console.log(&#39;开始时间:&#39;, result.startTime)
  console.log(&#39;结束时间:&#39;, result.endTime)
}
&lt;/script&gt;
</code></pre><h2>默认选项</h2><p>组件内置了常用的日期范围选项：</p><ul><li>近1天</li><li>近3天</li><li>近7天</li><li>近30天</li></ul><h2>自定义选项</h2><p>通过 <code>options</code> 属性自定义日期范围选项。</p><pre><code class="language-vue">&lt;PdBizDateFilterDialog
  :visible=&quot;visible&quot;
  :options=&quot;[
    { label: &#39;今天&#39;, value: 0, desc: &#39;今天的数据&#39;, days: 0 },
    { label: &#39;近3天&#39;, value: 3, desc: &#39;最近3天&#39;, days: 3 },
    { label: &#39;近一周&#39;, value: 7, desc: &#39;最近7天&#39;, days: 7 },
    { label: &#39;近半个月&#39;, value: 15, desc: &#39;最近15天&#39;, days: 15 },
    { label: &#39;近一个月&#39;, value: 30, desc: &#39;最近30天&#39;, days: 30 }
  ]&quot;
  @confirm=&quot;handleConfirm&quot;
/&gt;
</code></pre><h2>自定义按钮文本</h2><pre><code class="language-vue">&lt;PdBizDateFilterDialog
  :visible=&quot;visible&quot;
  confirmText=&quot;确定&quot;
  cancelText=&quot;取消&quot;
  @confirm=&quot;handleConfirm&quot;
  @cancel=&quot;handleCancel&quot;
/&gt;
</code></pre><h2>API</h2><h3>Props</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>visible</td><td>是否显示对话框</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td>options</td><td>日期范围选项</td><td><code>IDateRangeOption[]</code></td><td>默认选项</td></tr><tr><td>confirmText</td><td>确认按钮文本</td><td><code>string</code></td><td><code>&#39;确认&#39;</code></td></tr><tr><td>cancelText</td><td>取消按钮文本</td><td><code>string</code></td><td><code>&#39;取消&#39;</code></td></tr></tbody></table><h3>Events</h3><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>confirm</td><td>点击确认时触发</td><td><code>({ option, startTime, endTime })</code></td></tr><tr><td>cancel</td><td>点击取消时触发</td><td><code>()</code></td></tr><tr><td>update:visible</td><td>更新显示状态</td><td><code>(value: boolean)</code></td></tr></tbody></table><h3>IDateRangeOption</h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>必填</th></tr></thead><tbody><tr><td>label</td><td>选项文本</td><td><code>string</code></td><td>是</td></tr><tr><td>value</td><td>选项值</td><td><code>number</code></td><td>是</td></tr><tr><td>desc</td><td>描述信息</td><td><code>string</code></td><td>否</td></tr><tr><td>days</td><td>天数</td><td><code>number</code></td><td>是</td></tr></tbody></table><h3>返回数据格式</h3><pre><code class="language-typescript">{
  option: IDateRangeOption,
  startTime: string, // 格式: YYYY-MM-DD HH:mm:ss
  endTime: string    // 格式: YYYY-MM-DD HH:mm:ss
}
</code></pre>`,19)])}}};export{l as default};