import{d as v,r as l,c as d,o as c,a as n,e as o,h as u,i as P,f as r,g as _,w as y}from"./index-BMICFpJw.js";import{u as x}from"./useForm-ROmJr_xM.js";import{u as h}from"./useTable-xqLaQEJz.js";import"./env-B8mCLz8K.js";const T={class:"demo-container"},k={style:{"margin-top":"30px"}},w={style:{height:"400px"}},C=v({__name:"demo",setup(g){const s=P({name:"",city:"",type:[]}),p=[{field:"name",component:"Input",label:"名称",componentProps:{placeholder:"请输入名称"},colProps:{span:8}},{field:"city",component:"Select",label:"城市",componentProps:{placeholder:"请选择城市",options:[{label:"北京",value:"beijing"},{label:"上海",value:"shanghai"}]},colProps:{span:8}},{field:"type",component:"CheckboxGroup",label:"类型",componentProps:{options:[{label:"选项1",value:"1"},{label:"选项2",value:"2"}]},colProps:{span:8}}],[m]=x({schemas:p,labelWidth:"100px",model:s,actionColOptions:{span:24}}),e=t=>{console.log("Form Submit:",t)},[i]=h({tableConfig:{stripe:!0,border:!0,pagination:!0,pageOpt:{total:30,currentPage:1,pageSize:10}},data:[{id:"1",username:"张三",role:"admin",createTime:"2023-01-01"},{id:"2",username:"李四",role:"user",createTime:"2023-01-02"},{id:"3",username:"王五",role:"user",createTime:"2023-01-03"}],columns:[{value:"id",name:"ID",width:"80"},{value:"username",name:"姓名",width:"120"},{value:"role",name:"角色",width:"100"},{value:"createTime",name:"创建时间",width:"180"},{value:"op",name:"操作",align:"center",render:t=>o("div",null,[o(l("el-button"),{type:"primary",link:!0,size:"small",onClick:()=>console.log("Edit",t)},{default:()=>[r("编辑")]}),o(l("el-button"),{type:"danger",link:!0,size:"small",onClick:()=>console.log("Delete",t)},{default:()=>[r("删除")]})])}]});return(t,a)=>{const f=l("PdForm"),b=l("PdTable");return c(),d("div",T,[a[1]||(a[1]=n("h3",null,"表单示例",-1)),o(f,{onRegister:u(m),schemas:p,onSubmit:e},null,8,["onRegister"]),n("div",k,[a[0]||(a[0]=n("h3",null,"表格示例",-1)),n("div",w,[o(b,{onRegister:u(i)},null,8,["onRegister"])])])])}}}),F=_(C,[["__scopeId","data-v-0316780b"]]),E={class:"markdown-body"},z={__name:"README",setup(g,{expose:s}){return s({frontmatter:{}}),(m,e)=>{const i=l("Preview");return c(),d("div",E,[e[0]||(e[0]=n("h1",null,"快速上手",-1)),e[1]||(e[1]=n("h3",null,"引入 Pandora2",-1)),e[2]||(e[2]=n("p",null,"你可以引入整个 Pandora2，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Pandora2。",-1)),e[3]||(e[3]=n("p",null,"完整引入 在 main.js 中写入以下内容：",-1)),e[4]||(e[4]=n("pre",null,[n("code",{class:"language-javascript"},`import { createApp } from 'vue'
import App from './App.vue'

// 引入Element plus
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

// 引入Pandora2
import '@yelingfeng/pandora2/dist/style.css'
import Pandora2 from '@yelingfeng/pandora2'

const app = createApp(App)

app.use(ElementPlus)
app.use(Pandora2)

app.mount('#app')
`)],-1)),e[5]||(e[5]=n("h3",null,"使用方法",-1)),e[6]||(e[6]=n("p",null,[r("成功引入整个 Pandora2 后，就可以直接使用啦！（请点击"),n("code",null,"查看代码"),r("进行查看）")],-1)),o(i,{"comp-name":"Start","demo-name":"demo"},{default:y(()=>[o(F)]),_:1})])}}};export{z as default};
