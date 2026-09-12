import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./Loading-CAkH-XVz.js";var c={class:`markdown-body`},l={__name:`Loading`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`Loading 加载状态`,-1),u[1]||=a(`p`,null,`全局加载状态组件，用于覆盖容器显示加载动画。`,-1),o(d,{"comp-name":`PdBiz`,"demo-name":`Loading`},{default:n(()=>[o(s)]),_:1}),u[2]||=r(`<h2>基础用法</h2><pre><code class="language-vue">&lt;template&gt;
  &lt;div style=&quot;position: relative; height: 200px;&quot;&gt;
    &lt;PdBizLoading :loading=&quot;loading&quot; /&gt;
    &lt;div v-if=&quot;!loading&quot;&gt;
      &lt;!-- 内容 --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;
import { PdBizLoading } from &#39;@pandora/components/PdBiz&#39;

const loading = ref(true)

setTimeout(() =&gt; {
  loading.value = false
}, 2000)
&lt;/script&gt;
</code></pre><h2>自定义加载文本</h2><p>通过 <code>text</code> 属性自定义加载提示文本。</p><pre><code class="language-vue">&lt;PdBizLoading :loading=&quot;true&quot; text=&quot;数据加载中...&quot; /&gt;
</code></pre><h2>在卡片中使用</h2><p>常用于卡片、表格等容器组件的加载状态展示。</p><pre><code class="language-vue">&lt;el-card&gt;
  &lt;div style=&quot;position: relative; min-height: 150px;&quot;&gt;
    &lt;PdBizLoading :loading=&quot;loading&quot; /&gt;
    &lt;div v-if=&quot;!loading&quot;&gt;
      &lt;!-- 卡片内容 --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/el-card&gt;
</code></pre><h2>API</h2><h3>Props</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>loading</td><td>是否显示加载状态</td><td><code>boolean</code></td><td><code>false</code></td></tr><tr><td>text</td><td>加载提示文本</td><td><code>string</code></td><td><code>&#39;加载中...&#39;</code></td></tr></tbody></table><h2>使用说明</h2><h3>容器定位</h3><p>Loading 组件使用绝对定位覆盖父容器，因此父容器需要设置 <code>position: relative</code>。</p><pre><code class="language-vue">&lt;!-- ✅ 正确 --&gt;
&lt;div style=&quot;position: relative; height: 200px;&quot;&gt;
  &lt;PdBizLoading :loading=&quot;true&quot; /&gt;
&lt;/div&gt;

&lt;!-- ❌ 错误：父容器未设置 position --&gt;
&lt;div style=&quot;height: 200px;&quot;&gt;
  &lt;PdBizLoading :loading=&quot;true&quot; /&gt;
&lt;/div&gt;
</code></pre><h3>最小高度</h3><p>建议为父容器设置最小高度，避免加载状态时容器塌陷。</p><pre><code class="language-vue">&lt;div style=&quot;position: relative; min-height: 100px;&quot;&gt;
  &lt;PdBizLoading :loading=&quot;loading&quot; /&gt;
&lt;/div&gt;
</code></pre><h3>条件渲染</h3><p>配合 <code>v-if</code> 使用，在加载完成后显示内容。</p><pre><code class="language-vue">&lt;div style=&quot;position: relative;&quot;&gt;
  &lt;PdBizLoading :loading=&quot;loading&quot; /&gt;
  &lt;div v-if=&quot;!loading&quot;&gt;
    &lt;!-- 加载完成后显示的内容 --&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>`,21)])}}};export{l as default};