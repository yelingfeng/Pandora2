import{d as _,r as n,c,o as u,b as s,e,j as m,q as b,f as d,g as v,a as P,w as y}from"./index-DHDPi3Su.js";import{u as x}from"./useForm-C6oyatgO.js";import{u as k}from"./useTable-Byf_pHHO.js";const T={class:"demo-container"},F={style:{"margin-top":"30px"}},w={style:{height:"400px"}},C=_({__name:"demo",setup(g){const l=b({name:"",city:"",type:[]}),r=[{field:"name",component:"Input",label:"名称",componentProps:{placeholder:"请输入名称"},colProps:{span:8}},{field:"city",component:"Select",label:"城市",componentProps:{placeholder:"请选择城市",options:[{label:"北京",value:"beijing"},{label:"上海",value:"shanghai"}]},colProps:{span:8}},{field:"type",component:"CheckboxGroup",label:"类型",componentProps:{options:[{label:"选项1",value:"1"},{label:"选项2",value:"2"}]},colProps:{span:8}}],[i]=x({schemas:r,labelWidth:"100px",model:l,actionColOptions:{span:24}}),a=o=>{console.log("Form Submit:",o)},[p]=k({tableConfig:{stripe:!0,border:!0,pagination:!0,pageOpt:{total:30,currentPage:1,pageSize:10}},data:[{id:"1",username:"张三",role:"admin",createTime:"2023-01-01"},{id:"2",username:"李四",role:"user",createTime:"2023-01-02"},{id:"3",username:"王五",role:"user",createTime:"2023-01-03"}],columns:[{value:"id",name:"ID",width:"80"},{value:"username",name:"姓名",width:"120"},{value:"role",name:"角色",width:"100"},{value:"createTime",name:"创建时间",width:"180"},{value:"op",name:"操作",align:"center",render:o=>e("div",null,[e(n("el-button"),{type:"primary",link:!0,size:"small",onClick:()=>console.log("Edit",o)},{default:()=>[d("编辑")]}),e(n("el-button"),{type:"danger",link:!0,size:"small",onClick:()=>console.log("Delete",o)},{default:()=>[d("删除")]})])}]});return(o,t)=>{const h=n("PdForm"),f=n("PdTable");return u(),c("div",T,[t[1]||(t[1]=s("h3",null,"表单示例",-1)),e(h,{onRegister:m(i),schemas:r,onSubmit:a},null,8,["onRegister"]),s("div",F,[t[0]||(t[0]=s("h3",null,"表格示例",-1)),s("div",w,[e(f,{onRegister:m(p)},null,8,["onRegister"])])])])}}}),E=v(C,[["__scopeId","data-v-ce65113b"]]),S={class:"markdown-body"},R={__name:"README",setup(g,{expose:l}){return l({frontmatter:{}}),(i,a)=>{const p=n("Preview");return u(),c("div",S,[a[0]||(a[0]=P(`<h1>快速上手</h1><h2>环境要求</h2><ul><li>Node.js：建议 20+（本项目开发环境使用 Node 22.x）</li><li>包管理器：yarn</li></ul><h2>安装</h2><pre><code class="language-bash">yarn add element-plus @yelingfeng/pandora2
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
</code></pre><p>说明：</p><h2>使用示例</h2><p>成功引入后，就可以直接使用组件与业务 hooks（请点击 “查看代码” 查看完整示例）：</p>`,16)),e(p,{"comp-name":"Start","demo-name":"demo"},{default:y(()=>[e(E)]),_:1})])}}};export{R as default};
