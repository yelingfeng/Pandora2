import{c as d,a as o,o as r}from"./index-D2W91eA5.js";/* empty css                                                              */const c={class:"markdown-body"},l={__name:"README",setup(a,{expose:e}){return e({frontmatter:{}}),(n,t)=>(r(),d("div",c,[...t[0]||(t[0]=[o(`<h1>PdCharts</h1><p>Pandora2 的图表组件，基于 ECharts 封装，核心目标：</p><ul><li>提供一个统一的 <code>&lt;Charts&gt;</code> 组件，约定 <code>data + chartType + subChartType</code> 即可渲染常见图表</li><li>通过 <code>useCharts()</code> 暴露 ECharts 实例的常用控制能力（setOptions / resize / loading / clear / dispose 等）</li></ul><h2>快速开始</h2><h3>组件使用</h3><pre><code class="language-vue">&lt;template&gt;
  &lt;div style=&quot;height: 400px&quot;&gt;
    &lt;Charts :data=&quot;data&quot; chartType=&quot;pie&quot; subChartType=&quot;ring&quot; /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
import { Charts } from &#39;@pandora/components/PdCharts&#39;

const data = [
  { name: &#39;Search Engine&#39;, value: 1048 },
  { name: &#39;Direct&#39;, value: 735 }
]
&lt;/script&gt;
</code></pre><h3>useCharts Hook</h3><pre><code class="language-ts">import { Charts, useCharts } from &#39;@pandora/components/PdCharts&#39;

const [register, { setOptions, resize, showLoading, hideLoading }] = useCharts()
</code></pre><h2>Charts 组件属性（部分）</h2><p>完整类型：<code>ChartsProps</code></p><table><thead><tr><th>属性名</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>data</td><td><code>any[]</code></td><td>原始数据，内部会根据 <code>chartType/subChartType</code> 转成 option</td></tr><tr><td>options</td><td><code>ChartsOption</code></td><td>直接传入 ECharts option（<code>manualUpdate=true</code> 时可手动 setOptions）</td></tr><tr><td>chartType</td><td><code>string</code></td><td>业务图表类型（如 <code>&#39;pie&#39;</code>、未来可扩展 line/bar 等）</td></tr><tr><td>subChartType</td><td><code>string</code></td><td>子类型（如 <code>&#39;ring&#39;</code>、<code>&#39;pie01&#39;</code> 等，交由 transform 层解析）</td></tr><tr><td>theme</td><td><code>Theme</code></td><td>ECharts 主题</td></tr><tr><td>manualUpdate</td><td><code>boolean</code></td><td>是否手动更新 options（配合 <code>setOptions</code> 使用）</td></tr><tr><td>autoresize</td><td><code>AutoresizeProp</code></td><td>是否根据容器自动 resize（支持节流配置）</td></tr><tr><td>loading</td><td><code>boolean</code></td><td>是否显示 loading</td></tr><tr><td>loadingOptions</td><td><code>LoadingOptions</code></td><td>loading 配置（颜色、文案、大小等）</td></tr><tr><td>initOptions</td><td><code>InitOptions</code></td><td>ECharts 初始化参数</td></tr><tr><td>updateOptions</td><td><code>UpdateOptions</code></td><td>调用 <code>setOption</code> 时的更新参数</td></tr><tr><td>group</td><td><code>string</code></td><td>图表 group，同组图表可进行联动</td></tr></tbody></table><h2>useCharts 返回值</h2><p><code>useCharts(props?)</code> 返回 <code>[register, methods]</code>：</p><ul><li><code>register(instance)</code>：绑定到 <code>&lt;Charts @register=&quot;register&quot; /&gt;</code></li><li><code>methods</code>：图表实例方法（<code>ChartsActionType</code>）</li></ul><p>常用方法：</p><ul><li><code>setProps(props)</code>：动态修改 Charts 组件 props，如 <code>setProps({ loading: true })</code></li><li><code>setOptions(options)</code>：调用 ECharts <code>setOption</code>（内部处理 manualUpdate/init 逻辑）</li><li><code>resize()</code>：手动触发重绘</li><li><code>getInstance()</code>：获取原始 ECharts 实例（方便访问 addGraphic 等高级能力）</li><li><code>showLoading(type?, opts?)</code> / <code>hideLoading()</code></li><li><code>clear()</code>：清空图表</li><li><code>dispose()</code>：销毁实例</li></ul><h2>事件绑定（ECharts Events）</h2><p>Charts 支持把 ECharts 事件以 Vue 事件形式直接监听（例如 <code>@click</code>、<code>@legendselectchanged</code>、<code>@zr:click</code> 等），事件名与 ECharts 保持一致；另有一个组件事件：</p><ul><li><code>register</code>：回传 <code>ChartsActionType</code>（给 useCharts 使用）</li></ul><pre><code class="language-vue">&lt;Charts
  :data=&quot;data&quot;
  chartType=&quot;pie&quot;
  @click=&quot;(params) =&gt; console.log(&#39;click&#39;, params)&quot;
  @legendselectchanged=&quot;() =&gt; console.log(&#39;legend changed&#39;)&quot;
/&gt;
</code></pre>`,20)])]))}};export{l as default};
