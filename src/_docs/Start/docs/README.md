<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'

</script>
# 快速上手

### 引入 Pandora2
你可以引入整个 Pandora2，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 Pandora2。

完整引入
在 main.js 中写入以下内容：

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 引入Element plus
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

// 引入Pandora2
import '@ylf521/pandora2/dist/style.css'
import Pandora2 from '@ylf521/pandora2'

const app = createApp(App)

app.use(ElementPlus)
app.use(Pandora2)

app.mount('#app')
```

### 使用方法
成功引入整个 Pandora2 后，就可以直接使用啦！（请点击`查看代码`进行查看）
<Preview comp-name="Start" demo-name="demo">
  <demo />
</Preview>
