import{c as n,o as a,b as o}from"./index-Ca5sUyDB.js";const t={class:"markdown-body"},i={__name:"README",setup(r,{expose:p}){return p({frontmatter:{}}),(s,e)=>(a(),n("div",t,[...e[0]||(e[0]=[o(`<h1>Pandora2</h1><h2>安装</h2><p>推荐使用 <code>pnpm</code> 的方式安装，它能更好地和 <code>vite</code> 等打包工具配合使用。</p><p>（ * 如果您已搭建好项目，可直接进行 &quot; Step 3 &quot; ）</p><h2>环境</h2><p>先搭建vue3环境,推荐安装最新Vite (全局安装过旧版本的请先卸载它)</p><pre><code class="language-js">
npm init @vitejs/app
//o r 
yarn create @vitejs/app

</code></pre><h2>创建模板</h2><p>新建项目、选择模版（本项目推荐使用 Vue3 + TypeScript，所以我们选择 vue-ts，会自动安装 Vue3 和 TypeScript。）</p><pre><code class="language-shell">npm init vite &lt;project-name&gt;
</code></pre><p>enter之后，根据项目提示，接下来会让你选择预设, <code>npm install</code>初始化, 这里就不展开赘述，大家可以到官网查看相关文档。</p><h2>安装</h2><p>构建完成后，安装<code>Pandora2</code></p><pre><code class="language-js">  npm install @yelingfeng/pandora2 / yarn add @yelingfeng/pandora2 / pnpm add @yelingfeng/pandora2

</code></pre><h2>引用</h2><p>在项目中引用</p><pre><code class="language-js">import { createApp } from &#39;vue&#39;
import App from &#39;./App.vue&#39;

import Pandora2 from &#39;@yelingfeng/pandora2&#39;
import &#39;@yelingfeng/pandora2/dist/style.css&#39;

const app = createApp(App)
app.use(Pandora2)
app.mount(&#39;#app&#39;)

</code></pre>`,17)])]))}};export{i as default};
