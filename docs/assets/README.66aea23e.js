import{o,c as a,a as n}from"./index.5c776037.js";const t={class:"markdown-body"},p=n(`<h1>Pandora2</h1><h2>\u5B89\u88C5</h2><p>\u63A8\u8350\u4F7F\u7528 <code>pnpm</code> \u7684\u65B9\u5F0F\u5B89\u88C5\uFF0C\u5B83\u80FD\u66F4\u597D\u5730\u548C <code>vite</code> \u7B49\u6253\u5305\u5DE5\u5177\u914D\u5408\u4F7F\u7528\u3002</p><p>\uFF08 * \u5982\u679C\u60A8\u5DF2\u642D\u5EFA\u597D\u9879\u76EE\uFF0C\u53EF\u76F4\u63A5\u8FDB\u884C &quot; Step 3 &quot; \uFF09</p><h2>\u73AF\u5883</h2><p>\u5148\u642D\u5EFAvue3\u73AF\u5883,\u63A8\u8350\u5B89\u88C5\u6700\u65B0Vite (\u5168\u5C40\u5B89\u88C5\u8FC7\u65E7\u7248\u672C\u7684\u8BF7\u5148\u5378\u8F7D\u5B83)</p><pre><code class="language-js">
npm init @vitejs/app
//o r 
yarn create @vitejs/app

</code></pre><h2>\u521B\u5EFA\u6A21\u677F</h2><p>\u65B0\u5EFA\u9879\u76EE\u3001\u9009\u62E9\u6A21\u7248\uFF08\u672C\u9879\u76EE\u63A8\u8350\u4F7F\u7528 Vue3 + TypeScript\uFF0C\u6240\u4EE5\u6211\u4EEC\u9009\u62E9 vue-ts\uFF0C\u4F1A\u81EA\u52A8\u5B89\u88C5 Vue3 \u548C TypeScript\u3002\uFF09</p><pre><code class="language-shell">npm init vite &lt;project-name&gt;
</code></pre><p>enter\u4E4B\u540E\uFF0C\u6839\u636E\u9879\u76EE\u63D0\u793A\uFF0C\u63A5\u4E0B\u6765\u4F1A\u8BA9\u4F60\u9009\u62E9\u9884\u8BBE, <code>npm install</code>\u521D\u59CB\u5316, \u8FD9\u91CC\u5C31\u4E0D\u5C55\u5F00\u8D58\u8FF0\uFF0C\u5927\u5BB6\u53EF\u4EE5\u5230\u5B98\u7F51\u67E5\u770B\u76F8\u5173\u6587\u6863\u3002</p><h2>\u5B89\u88C5</h2><p>\u6784\u5EFA\u5B8C\u6210\u540E\uFF0C\u5B89\u88C5<code>Pandora2</code></p><pre><code class="language-js">  npm install Pandora2 / yarn install Pandora2  / pnpm install Pandora2

</code></pre><h2>\u5F15\u7528</h2><p>\u5728\u9879\u76EE\u4E2D\u5F15\u7528</p><pre><code class="language-js">import Pandora2 from &quot;pandora2&quot;;
import &quot;pandora2/lib/style.css&quot;;

Vue.use(Pandora2)

</code></pre>`,17),r=[p],u={__name:"README",setup(c,{expose:e}){return e({frontmatter:{}}),(d,l)=>(o(),a("div",t,r))}};export{u as default};
