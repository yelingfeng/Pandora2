import{B as e,I as t,Q as n,g as r,p as i,v as a}from"./runtime-core.esm-bundler-yhW9eEjO.js";import o from"./demo-BoUHRsjT.js";var s={class:`markdown-body`},c={__name:`README`,setup(c,{expose:l}){return l({frontmatter:{}}),(c,l)=>{let u=e(`Preview`);return t(),i(`div`,s,[l[0]||=r(`<h1>快速上手</h1><h2>环境要求</h2><ul><li>Node.js：建议 20+（本项目开发环境使用 Node 22.x）</li><li>包管理器：yarn</li></ul><h2>安装</h2><pre><code class="language-bash">yarn add element-plus @yelingfeng/pandora2
</code></pre><p>如果你还没有安装 Element Plus：</p><pre><code class="language-bash">yarn add element-plus
</code></pre><h2>完整引入（推荐快速体验）</h2><p>在 <code>main.ts</code> / <code>main.js</code> 中写入以下内容：</p><pre><code class="language-js">import { createApp } from &#39;vue&#39;
import App from &#39;./App.vue&#39;

import &#39;element-plus/dist/index.css&#39;
import ElementPlus from &#39;element-plus&#39;

import &#39;@yelingfeng/pandora2/dist/style.css&#39;
import Pandora2 from &#39;@yelingfeng/pandora2&#39;

const app = createApp(App)

app.use(ElementPlus)
app.use(Pandora2)

app.mount(&#39;#app&#39;)
</code></pre><h2>按需引入（组件 / hooks）</h2><p>Pandora2 的组件和业务 hooks 都可以从包入口直接引入（不需要使用内部别名）。</p><pre><code class="language-js">import { PdForm, PdTable, useForm, useTable } from &#39;@yelingfeng/pandora2&#39;
</code></pre><p>说明：</p><h2>使用示例</h2><p>成功引入后，就可以直接使用组件与业务 hooks（请点击 “查看代码” 查看完整示例）：</p>`,16),a(u,{"comp-name":`Start`,"demo-name":`demo`},{default:n(()=>[a(o)]),_:1})])}}};export{c as default};