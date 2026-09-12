import{B as e,I as t,Q as n,g as r,p as i,u as a,v as o}from"./runtime-core.esm-bundler-yhW9eEjO.js";import s from"./RoomSelector-CpUPq7wu.js";var c={class:`markdown-body`},l={__name:`RoomSelector`,setup(l,{expose:u}){return u({frontmatter:{}}),(l,u)=>{let d=e(`Preview`);return t(),i(`div`,c,[u[0]||=a(`h1`,null,`RoomSelector 机房选择器`,-1),u[1]||=a(`p`,null,`机房选择器组件，支持搜索、按运营商筛选和异步加载数据。`,-1),o(d,{"comp-name":`PdBiz`,"demo-name":`RoomSelector`},{default:n(()=>[o(s)]),_:1}),u[2]||=r(`<h2>基础用法</h2><pre><code class="language-vue">&lt;template&gt;
  &lt;PdBizRoomSelector
    v-model=&quot;selectedRoom&quot;
    :roomList=&quot;roomList&quot;
    @change=&quot;handleChange&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;
import { PdBizRoomSelector } from &#39;@pandora/components/PdBiz&#39;

const selectedRoom = ref(&#39;&#39;)
const roomList = [
  { value: &#39;bj-yd-01&#39;, name: &#39;北京移动机房1&#39;, isp: &#39;1&#39; },
  { value: &#39;sh-lt-01&#39;, name: &#39;上海联通机房1&#39;, isp: &#39;2&#39; },
  { value: &#39;gz-dx-01&#39;, name: &#39;广州电信机房1&#39;, isp: &#39;3&#39; }
]

const handleChange = (value, room) =&gt; {
  console.log(&#39;选中机房:&#39;, value, room)
}
&lt;/script&gt;
</code></pre><h2>按运营商筛选</h2><p>通过 <code>isp</code> 属性可以筛选指定运营商的机房。通常配合外部筛选器使用。</p><pre><code class="language-vue">&lt;template&gt;
  &lt;el-radio-group v-model=&quot;currentIsp&quot;&gt;
    &lt;el-radio-button label=&quot;&quot;&gt;全部&lt;/el-radio-button&gt;
    &lt;el-radio-button label=&quot;1&quot;&gt;移动&lt;/el-radio-button&gt;
    &lt;el-radio-button label=&quot;2&quot;&gt;联通&lt;/el-radio-button&gt;
    &lt;el-radio-button label=&quot;3&quot;&gt;电信&lt;/el-radio-button&gt;
  &lt;/el-radio-group&gt;
  
  &lt;PdBizRoomSelector
    v-model=&quot;selectedRoom&quot;
    :roomList=&quot;filteredRooms&quot;
    :isp=&quot;currentIsp&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { computed } from &#39;vue&#39;

const filteredRooms = computed(() =&gt; {
  if (!currentIsp.value) return roomList
  return roomList.filter(room =&gt; room.isp === currentIsp.value)
})
&lt;/script&gt;
</code></pre><h2>搜索功能</h2><p>组件内置搜索功能，可以根据机房名称或编码进行过滤。</p><pre><code class="language-vue">&lt;PdBizRoomSelector
  v-model=&quot;selectedRoom&quot;
  :roomList=&quot;roomList&quot;
  placeholder=&quot;输入机房名称或编码搜索&quot;
/&gt;
</code></pre><h2>异步加载数据</h2><p>通过监听 <code>load-data</code> 事件实现异步加载机房数据。</p><pre><code class="language-vue">&lt;template&gt;
  &lt;PdBizRoomSelector
    v-model=&quot;selectedRoom&quot;
    :isp=&quot;currentIsp&quot;
    :roomList=&quot;asyncRoomList&quot;
    @load-data=&quot;handleLoadData&quot;
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from &#39;vue&#39;

const asyncRoomList = ref([])

const handleLoadData = async (isp) =&gt; {
  // 模拟异步请求
  const response = await fetch(\`/api/rooms?isp=\${isp}\`)
  asyncRoomList.value = await response.json()
}
&lt;/script&gt;
</code></pre><h2>API</h2><h3>Props</h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>value / v-model</td><td>绑定值（机房编码）</td><td><code>string | number</code></td><td><code>&#39;&#39;</code></td></tr><tr><td>roomList</td><td>机房列表数据</td><td><code>IRoomItem[]</code></td><td><code>[]</code></td></tr><tr><td>isp</td><td>运营商筛选</td><td><code>string | number</code></td><td><code>&#39;&#39;</code></td></tr><tr><td>placeholder</td><td>占位符</td><td><code>string</code></td><td><code>&#39;请选择机房&#39;</code></td></tr></tbody></table><h3>Events</h3><table><thead><tr><th>事件名</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>change</td><td>选择变化时触发</td><td><code>(value: string | number, room: IRoomItem | null)</code></td></tr><tr><td>update:modelValue</td><td>v-model 值更新</td><td><code>(value: string | number)</code></td></tr><tr><td>cleared</td><td>清空选择时触发</td><td><code>()</code></td></tr><tr><td>load-data</td><td>需要加载数据时触发</td><td><code>(isp: string | number)</code></td></tr></tbody></table><h3>IRoomItem</h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>必填</th></tr></thead><tbody><tr><td>value</td><td>机房编码（唯一标识）</td><td><code>string | number</code></td><td>是</td></tr><tr><td>name</td><td>机房名称</td><td><code>string</code></td><td>是</td></tr><tr><td>isp</td><td>运营商标识</td><td><code>string | number</code></td><td>否</td></tr><tr><td>province</td><td>省份</td><td><code>string</code></td><td>否</td></tr></tbody></table><h2>功能说明</h2><h3>搜索过滤</h3><ul><li>支持按机房名称搜索</li><li>支持按机房编码搜索</li><li>搜索不区分大小写</li></ul><h3>数据加载流程</h3><ol><li>如果传入 <code>roomList</code> prop，直接使用该数据</li><li>如果未传入 <code>roomList</code> 且设置了 <code>isp</code>，触发 <code>load-data</code> 事件</li><li>外部通过监听 <code>load-data</code> 事件异步获取数据后，更新 <code>roomList</code> prop</li></ol><h3>交互说明</h3><ul><li>点击输入框展开下拉选择面板</li><li>支持点击清除按钮清空选择</li><li>选择机房后自动关闭下拉面板</li><li>支持键盘操作（上下键选择，回车确认）</li></ul>`,25)])}}};export{l as default};