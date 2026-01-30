import{d as f,r as n,c as m,o as u,a as s,e,h as d,i as _,f as c,g as P,b as v,w as y}from"./index-Ca5sUyDB.js";import{u as k}from"./useForm-MQrnak0M.js";import{u as x}from"./useTable-DHNpPUe7.js";const T={class:"demo-container"},F={style:{"margin-top":"30px"}},C={style:{height:"400px"}},w=f({__name:"demo",setup(h){const l=_({name:"",city:"",type:[]}),r=[{field:"name",component:"Input",label:"名称",componentProps:{placeholder:"请输入名称"},colProps:{span:8}},{field:"city",component:"Select",label:"城市",componentProps:{placeholder:"请选择城市",options:[{label:"北京",value:"beijing"},{label:"上海",value:"shanghai"}]},colProps:{span:8}},{field:"type",component:"CheckboxGroup",label:"类型",componentProps:{options:[{label:"选项1",value:"1"},{label:"选项2",value:"2"}]},colProps:{span:8}}],[i]=k({schemas:r,labelWidth:"100px",model:l,actionColOptions:{span:24}}),t=o=>{console.log("Form Submit:",o)},[p]=x({tableConfig:{stripe:!0,border:!0,pagination:!0,pageOpt:{total:30,currentPage:1,pageSize:10}},data:[{id:"1",username:"张三",role:"admin",createTime:"2023-01-01"},{id:"2",username:"李四",role:"user",createTime:"2023-01-02"},{id:"3",username:"王五",role:"user",createTime:"2023-01-03"}],columns:[{value:"id",name:"ID",width:"80"},{value:"username",name:"姓名",width:"120"},{value:"role",name:"角色",width:"100"},{value:"createTime",name:"创建时间",width:"180"},{value:"op",name:"操作",align:"center",render:o=>e("div",null,[e(n("el-button"),{type:"primary",link:!0,size:"small",onClick:()=>console.log("Edit",o)},{default:()=>[c("编辑")]}),e(n("el-button"),{type:"danger",link:!0,size:"small",onClick:()=>console.log("Delete",o)},{default:()=>[c("删除")]})])}]});return(o,a)=>{const g=n("PdForm"),b=n("PdTable");return u(),m("div",T,[a[1]||(a[1]=s("h3",null,"表单示例",-1)),e(g,{onRegister:d(i),schemas:r,onSubmit:t},null,8,["onRegister"]),s("div",F,[a[0]||(a[0]=s("h3",null,"表格示例",-1)),s("div",C,[e(b,{onRegister:d(p)},null,8,["onRegister"])])])])}}}),A=P(w,[["__scopeId","data-v-ce65113b"]]),E={class:"markdown-body"},R={__name:"README",setup(h,{expose:l}){return l({frontmatter:{}}),(i,t)=>{const p=n("Preview");return u(),m("div",E,[t[0]||(t[0]=v(`<h1>快速上手</h1><h2>环境要求</h2><ul><li>Node.js：建议 20+（本项目开发环境使用 Node 22.x）</li><li>包管理器：yarn</li></ul><h2>安装</h2><pre><code class="language-bash">yarn add element-plus @yelingfeng/pandora2
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
</code></pre><p>说明：</p><ul><li><code>useForm</code> / <code>useTable</code> 属于业务 hooks，统一从包入口导出</li><li>一些底层通用工具 hooks（例如 <code>useAttrs</code> / <code>useContext</code> / <code>useBreakpoint</code> 等）不作为对外 API 输出</li></ul><h2>使用示例</h2><p>成功引入后，就可以直接使用组件与业务 hooks（请点击 “查看代码” 查看完整示例）：</p>`,17)),e(p,{"comp-name":"Start","demo-name":"demo"},{default:y(()=>[e(A)]),_:1})])}}};export{R as default};
