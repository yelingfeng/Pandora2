import{d as h,r as m,p as g,_,i as c,o as n,h as b,k as t,j as d,c as f,m as l,a as v}from"./index.e5c683c0.js";const w=h({setup(){let e=m([]);const o=[{value:"id",name:"\u5E8F\u53F7",width:"50",type:"selection"},{value:"username",name:"\u59D3\u540D",width:"100",sortable:!0},{value:"account",name:"\u8D26\u53F7",width:"180"},{value:"email",name:"\u90AE\u7BB1",width:"200"},{value:"role",name:"\u6743\u9650",width:"60"},{value:"createTime",name:"\u521B\u5EFA\u65F6\u95F4",width:"200",sortable:!0}];return g(()=>{e.value=[{id:"1",username:"\u5F20\u4E09",account:"asdasd@111.com",email:"asdasd@123123.com",role:"addmin",createTime:"2022-01-01"}]}),{columns:o,testData:e}}});function y(e,o,a,u,s,i){const r=c("PdTable"),p=c("PdContainer");return n(),b(p,{title:"VTable\u57FA\u672C\u7528\u6CD5"},{default:t(()=>[d(r,{ref:"table",data:e.testData,columns:e.columns},null,8,["data","columns"])]),_:1})}const P=_(w,[["render",y]]),B={class:"markdown-body"},C=l("h1",null,"PdTable \u7EC4\u4EF6",-1),O=l("p",null,"Pandora2 \u7684table\u7EC4\u4EF6",-1),k=l("h2",null,"\u57FA\u7840\u4F7F\u7528",-1),x=v(`<h2><code>stripe</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>Boolean</code></li><li>\u9ED8\u8BA4\uFF1A <code>false</code></li></ul><p>\u662F\u5426\u9694\u884C\u53D8\u8272</p><h2><code>loading</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>Boolean</code></li><li>\u9ED8\u8BA4\uFF1A <code>false</code></li></ul><p>\u662F\u5426\u663E\u793A<code>loading</code></p><h2><code>isHeader</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>Boolean</code></li><li>\u9ED8\u8BA4\uFF1A <code>true</code></li></ul><p>\u662F\u5426\u663E\u793A\u8868\u5934</p><h2><code>border</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>Boolean</code></li><li>\u9ED8\u8BA4\uFF1A <code>false</code></li></ul><p>\u662F\u5426\u5E26\u6709\u7EB5\u5411\u8FB9\u6846</p><h2><code>fix</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>Boolean</code></li><li>\u9ED8\u8BA4\uFF1A <code>true</code></li></ul><p>\u5217\u7684\u5BBD\u5EA6\u662F\u5426\u81EA\u6491\u5F00</p><h2><code>size</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>String</code></li><li>\u9ED8\u8BA4\uFF1A <code>-</code></li><li>\u53EF\u9009\u503C\uFF1A <code>medium / small / mini</code></li></ul><p>Table \u7684\u5C3A\u5BF8</p><h2><code>selection</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>Boolean</code></li><li>\u9ED8\u8BA4\uFF1A <code>false</code></li></ul><p>\u662F\u5426\u663E\u793A<code>selection</code>\u5217 \u5305\u62EC\u590D\u9009\u6216\u8005\u5355\u9009</p><h2><code>selectionMode</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>string</code></li><li>\u9ED8\u8BA4\u503C\uFF1A <code>\u7A7A</code></li><li>\u53EF\u9009\u503C: <code>single</code>|<code>multi</code></li></ul><p>\u9009\u62E9\u6A21\u5F0F \u5355\u9009\u8FD8\u662F\u591A\u9009 \u642D\u914D <code>selection</code> \u5C5E\u6027\u4F7F\u7528</p><h2><code>selectionPos</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>string</code></li><li>\u9ED8\u8BA4\u503C\uFF1A <code>\u7A7A</code></li><li>\u53EF\u9009\u62E9: <code>top</code> \u9996\u5217 | <code>end</code> \u5C3E\u5217</li></ul><p>\u590D\u73B0\u6846\u7684\u4F4D\u7F6E \u5728\u5217\u524D\u8FD8\u662F\u5217\u540E \u642D\u914D <code>selection</code> \u5C5E\u6027\u4F7F\u7528</p><p>\u4F8B\u5B50</p><pre><code class="language-ts">const tableOption = {
  selection: true,
  selectionPos: &#39;top&#39;,
  selectionMode: &#39;multi&#39;
}
</code></pre><h2><code>selectable</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>{Function} (row: object, index: number) =&gt; void</code></li><li><code>row</code> \u884C\u6570\u636E</li><li><code>index</code> \u5217 index</li></ul><p><code>selection</code>\u5217 \u56DE\u8C03\u5904\u7406 \u53EF\u7EC6\u5316\u6BCF\u884C\u7684<code>selection</code>\u9879</p><p>\u4F8B\u5B50</p><pre><code class="language-ts">  selectable: function(row: any, index: any) {
    return index !== 4
  }
</code></pre><h2><code>sortMode</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>string</code></li><li>\u9ED8\u8BA4\u503C\uFF1A <code>\u7A7A</code></li><li>\u53EF\u9009\u503C: <code>&#39;single&#39;</code> | <code>&#39;multi&#39;</code></li></ul><p>\u6392\u5E8F\u6A21\u5F0F \u652F\u6301\u4E8C\u79CD\u6392\u5217\u6A21\u5F0F \u591A\u5217\u548C\u5355\u5217</p><h2><code>defaultSort</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>Array</code></li></ul><p>\u9ED8\u8BA4\u6392\u5E8F\u5B57\u6BB5\u5217\u914D\u7F6E</p><pre><code class="language-ts">defaultSort: [
  { prop: &#39;age&#39;, order: &#39;descending&#39; },
  { prop: &#39;user&#39;, order: &#39;ascending&#39; },
  { prop: &#39;phone&#39;, order: &#39;ascending&#39; }
]
</code></pre><h2><code>defaultOrder</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>string</code></li><li>\u9ED8\u8BA4\u503C:<code>&#39;descending&#39;</code></li></ul><p>\u9ED8\u8BA4\u6392\u5E8F\u65B9\u5411 \u914D\u7F6E\u4F18\u5148\u7EA7</p><blockquote><p><code>defaultSort</code> &gt; <code>defaultOrder</code></p></blockquote><h2><code>sortChange</code></h2><ul><li><p>\u7C7B\u578B\uFF1A <code>{Function} (column: object) =&gt; void</code></p></li><li><p><code>column</code>\u503C: <code>{Object} key:</code>\u6392\u5E8F\u5217\u5B9A\u4E49 ,<code>value:</code>\u5BF9\u5E94\u6392\u5E8F\u503C <code>descending</code> \u8FD8\u662F <code>ascending</code> \u642D\u914D<code>defaultSort</code>\u4F7F\u7528</p></li></ul><p>\u6392\u5E8F\u56DE\u8C03\u4E8B\u4EF6</p><h2><code>highlightCurrentRow</code></h2><ul><li>\u7C7B\u578B: \u540C<code>element-ui</code></li></ul><h2><code>rowClick</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>{Function} (row: any, column: object, event: any) =&gt; void</code></li></ul><p>\u884C\u70B9\u51FB\u4E8B\u4EF6</p><h2><code>handleSelectionChange</code></h2><ul><li>\u7C7B\u578B\uFF1A <code>{Function} (val: any)</code></li></ul><p>\u590D\u9009\u6846\u56DE\u8C03\u4E8B\u4EF6</p><h2><code>pagination</code></h2><ul><li>\u7C7B\u578B: <code>Boolean</code></li><li>\u9ED8\u8BA4\u503C: <code>true</code></li></ul><p>\u662F\u5426\u663E\u793A\u5206\u9875</p><h2><code>pageOpt</code></h2><ul><li>\u7C7B\u578B: <code>IPageOpt</code></li><li>\u9ED8\u8BA4\u503C: <code>{}</code></li></ul><p>\u5206\u9875\u5C5E\u6027\u914D\u7F6E\u5BF9\u8C61</p><h2><code>column</code></h2><ul><li>\u7C7B\u578B: <code>Array{Object}</code></li><li>\u9ED8\u8BA4\u503C: <code>[]</code></li></ul><p>Table <code>Column</code> \u6570\u636E\u914D\u7F6E\u8BF4\u660E</p><h2><code>data</code></h2><ul><li>\u7C7B\u578B: <code>Array{Object}</code></li><li>\u9ED8\u8BA4\u503C: <code>[]</code></li></ul><p>\u6570\u636E</p><h2><code>summary</code></h2><ul><li>\u7C7B\u578B: <code>Object{} ISummaryOption</code></li><li>\u9ED8\u8BA4\u503C\uFF1A <code>{}</code></li></ul><p>\u6C47\u603B\u884C\u5C5E\u6027</p>`,71),j={__name:"README",setup(e,{expose:o}){return o({frontmatter:{}}),(u,s)=>{const i=c("Preview");return n(),f("div",B,[C,O,k,d(i,{"comp-name":"PdTable","demo-name":"demo"},{default:t(()=>[d(P)]),_:1}),x])}}};export{j as default};
