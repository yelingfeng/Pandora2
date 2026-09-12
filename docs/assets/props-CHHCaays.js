import{B as e,I as t,Q as n,_ as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./props-8IqSshdy.js";var c={class:`markdown-body`},l={__name:`props`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h2`,null,`动态设置属性（setProps）`,-1),u[1]||=a(`p`,null,[r(`通过 `),a(`code`,null,`useForm()`),r(` 拿到 `),a(`code`,null,`setProps()`),r(` 后，可以在运行时修改表单配置（例如 label 位置、表单尺寸、禁用状态、是否显示展开按钮、操作按钮列 span 等）。`)],-1),u[2]||=a(`pre`,null,[a(`code`,{class:`language-ts`},`const [register, { setProps }] = useForm({ schemas: [] })

setProps({
  labelWidth: 140,
  labelPosition: 'left',
  inline: true
})
`)],-1),u[3]||=a(`h2`,null,`示例：按钮驱动修改属性`,-1),o(d,{"comp-name":`PdForm`,"demo-name":`props`},{default:n(()=>[o(s)]),_:1})])}}};export{l as default};