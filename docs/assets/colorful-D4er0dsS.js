import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./colorful-CBEkDBxf.js";var c={class:`markdown-body`},l={__name:`colorful`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`彩色汇总表格 (ColorfulTable)`,-1),o(d,{"comp-name":`PdTable`,"demo-name":`colorful`},{default:n(()=>[o(s)]),_:1}),u[1]||=r(`<h2>使用说明</h2><p>ColorfulTable 是对 PdTable 的增强封装，核心能力：</p><ul><li>自动解析并渲染「汇总行 + 普通行」的颜色、高亮、趋势箭头、tooltip、单位格式化</li><li>支持汇总行点击（按列字段 prop 回传），用于联动钻取</li><li>支持服务端排序：点击表头排序图标后，统一抛出 <code>sort-change</code></li></ul><h3>快速开始</h3><pre><code class="language-vue">&lt;template&gt;
  &lt;ColorfulTable
    :data=&quot;tableData&quot;
    :columns=&quot;columns&quot;
    :tableConfig=&quot;tableConfig&quot;
    :summarySplitMode=&quot;true&quot;
    :summaryClickableProps=&quot;[&#39;req_match_rate&#39;, &#39;rsp_match_rate&#39;]&quot;
    @summary-click=&quot;onSummaryClick&quot;
    @sort-change=&quot;onSortChange&quot;
  /&gt;
&lt;/template&gt;
</code></pre><h2>属性说明（ColorfulTable 扩展部分）</h2><blockquote><p>其余 PdTable 原始属性保持一致（<code>data / columns / tableConfig / sortConfig ...</code>），这里仅列出扩展/默认行为相关的部分。</p></blockquote><table><thead><tr><th>属性名</th><th>类型</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td>totalRow</td><td>object | null</td><td>null</td><td>手动指定汇总行对象；优先级高于 <code>summarySplitMode</code> 推断</td></tr><tr><td>summaryEnabled</td><td>boolean</td><td>true</td><td>是否开启汇总行（基于 Element Plus <code>show-summary</code> + <code>summary-method</code>）</td></tr><tr><td>summaryLabel</td><td>string</td><td>全国</td><td>汇总行首列文案（默认展示在第一个存在 <code>property</code> 的列上）</td></tr><tr><td>summarySplitMode</td><td>boolean</td><td>false</td><td><code>true</code> 时认为 <code>data[0]</code> 是汇总行，表体展示 <code>data.slice(1)</code></td></tr><tr><td>summaryClickable</td><td>boolean</td><td>true</td><td>是否允许汇总行单元格点击</td></tr><tr><td>summaryClickableProps</td><td>string[]</td><td>[]</td><td>限制哪些列可点击；为空表示不限制（配合 <code>summaryClickable</code>）</td></tr><tr><td>highlightOnRowClick</td><td>boolean</td><td>true</td><td>点击任意行后追加高亮 class（不会影响原始 rowClassName）</td></tr><tr><td>serverSort</td><td>boolean</td><td>true</td><td>开启后把 sortService 的排序结果转成 <code>{orderFile, orderType}</code> 并 emit <code>sort-change</code></td></tr><tr><td>loading</td><td>boolean | undefined</td><td>undefined</td><td>自定义 loading（叠加遮罩），不传则不显示</td></tr></tbody></table><h2>事件说明</h2><table><thead><tr><th>事件名</th><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>summary-click</td><td>(prop: string)</td><td>点击汇总行某个指标单元格触发，回传列字段名</td></tr><tr><td>cell-click</td><td>({ prop: string, row: any, value: any })</td><td>点击表体普通单元格触发（需开启 <code>cellClickable</code>），回传字段/行/原始值</td></tr><tr><td>sort-change</td><td>({ orderFile: string, orderType: ‘asc’ | ‘desc’ })</td><td>开启 <code>serverSort</code> 后，点击排序图标触发</td></tr></tbody></table><h2>排序演示（serverSort）</h2><p>ColorfulTable 内部复用了 PdTable 的 sortService，自定义表头排序图标后会把排序状态统一转换成：</p><pre><code class="language-ts">{ orderFile: string; orderType: &#39;asc&#39; | &#39;desc&#39; }
</code></pre><p>在 docs demo 中，我们把最近一次排序状态展示在顶部：</p><pre><code class="language-vue">&lt;ColorfulTable
  :serverSort=&quot;true&quot;
  @sort-change=&quot;(payload) =&gt; { sortState = payload }&quot;
/&gt;
</code></pre><blockquote><p>在真实业务里，你通常会在 <code>sort-change</code> 里发起接口请求，并用返回的数据刷新 <code>data</code>。</p></blockquote><h2>单元格点击演示（cell-click）</h2><p>普通行单元格的点击事件默认关闭，开启后可对指定字段（列）生效：</p><pre><code class="language-vue">&lt;ColorfulTable
  :cellClickable=&quot;true&quot;
  :cellClickableProps=&quot;[&#39;req_match_rate&#39;, &#39;cdr_num_day&#39;]&quot;
  @cell-click=&quot;({ prop, row, value }) =&gt; {
    // docs demo 使用 ElMessageBox 弹窗展示
  }&quot;
/&gt;
</code></pre><h2>自动渲染规则（普通行 + 汇总行）</h2><p>ColorfulTable 会自动根据 row 中的「字段后缀」决定显示效果（无需在 columns 写 render）：</p><ul><li>颜色：<code>\${prop}_color</code>（例如 <code>req_match_rate_color</code>）</li><li>趋势箭头：<code>\${prop}_udFlag</code>（值为 <code>up/down</code> 时显示 Top/Bottom 图标）</li><li>Tooltip：<code>\${prop}_type</code>（存在时显示 i 图标，并用 Tooltip 展示）</li><li>单位格式化： <ul><li><code>prop</code> 包含 <code>_num</code>：数值自动转为 万 / 亿 / 万亿（保留 2 位小数）</li><li><code>prop</code> 包含 <code>_rate</code>：追加 <code>%</code></li><li><code>prop</code> 包含 <code>_traffic</code> 或 <code>_byte</code>：按 Kbps/Mbps/Gbps/Tbps 逻辑格式化（可按 prop 名推断输入单位）</li></ul></li></ul><blockquote><p>若某列你已经在 columns 中声明了 <code>render</code>，ColorfulTable 不会覆盖它（以你的自定义渲染为准）。</p></blockquote><h2>mock 数据说明</h2><p>demo 使用的 mock 数据：</p><p>数据结构约定：</p><pre><code class="language-ts">type Row = Record&lt;string, any&gt; &amp; {
  provName: string
  // 以 cdr_num_day 为例：
  cdr_num_day: number | string
  cdr_num_day_color?: string
  cdr_num_day_udFlag?: &#39;up&#39; | &#39;down&#39; | &#39;&#39;
  cdr_num_day_type?: string
}

type Mock = {
  code: number
  message: string
  data: {
    list: Row[]
  }
}
</code></pre><p>demo 默认开启 <code>summarySplitMode</code>，因此 <code>list[0]</code> 会被当作汇总行（例如 provName=综合），表体从 <code>list[1]</code> 开始展示。</p>`,28)])}}};export{l as default};