<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'

</script>
# 快速上手

## 环境要求

- Node.js：建议 20+（本项目开发环境使用 Node 22.x）
- 包管理器：yarn

## 安装

```bash
yarn add element-plus @yelingfeng/pandora2
```

如果你还没有安装 Element Plus：

```bash
yarn add element-plus
```

## 完整引入（推荐快速体验）

在 `main.ts` / `main.js` 中写入以下内容：

```js
import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

import '@yelingfeng/pandora2/dist/style.css'
import Pandora2 from '@yelingfeng/pandora2'

const app = createApp(App)

app.use(ElementPlus)
app.use(Pandora2)

app.mount('#app')
```

## 按需引入（组件 / hooks）

Pandora2 的组件和业务 hooks 都可以从包入口直接引入（不需要使用内部别名）。

```js
import { PdForm, PdTable, useForm, useTable } from '@yelingfeng/pandora2'
```

说明：

## 使用示例

成功引入后，就可以直接使用组件与业务 hooks（请点击 “查看代码” 查看完整示例）：

<Preview comp-name="Start" demo-name="demo">
  <demo />
</Preview>
