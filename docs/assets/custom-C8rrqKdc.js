import{B as e,I as t,Q as n,g as r,p as i,v as a}from"./runtime-core.esm-bundler-yhW9eEjO.js";import o from"./custom-CRXTbmlF.js";var s={class:`markdown-body`},c={__name:`custom`,setup(c,{expose:l}){return l({frontmatter:{}}),(c,l)=>{let u=e(`Preview`);return t(),i(`div`,s,[l[0]||=r(`<h2>自定义组件</h2><p>当内置 <code>ComponentType</code> 不满足需求时，可以把业务组件注册到 PdForm 的组件映射里，然后在 schema 中通过 <code>component</code> 使用它。</p><pre><code class="language-ts">import { useComponentRegister } from &#39;@pandora/components/PdForm&#39;
import MyCustomInput from &#39;./MyCustomInput.vue&#39;

useComponentRegister(&#39;Input&#39; as any, MyCustomInput)
</code></pre><p>建议使用一个“不会与内置 ComponentType 冲突”的名称（例如 <code>BizSelect</code>），并在 schema 中引用：</p><pre><code class="language-ts">const schemas = [
  { field: &#39;biz&#39;, label: &#39;业务组件&#39;, component: &#39;BizSelect&#39; as any }
]
</code></pre>`,5),a(u,{"comp-name":`PdForm`,"demo-name":`custom`},{default:n(()=>[a(o)]),_:1})])}}};export{c as default};