# Pandora2


## 安装

推荐使用 `pnpm` 的方式安装，它能更好地和 `vite` 等打包工具配合使用。

（ * 如果您已搭建好项目，可直接进行 " Step 3 " ）

## 环境

先搭建vue3环境,推荐安装最新Vite (全局安装过旧版本的请先卸载它)

```js

npm init @vitejs/app
//o r 
yarn create @vitejs/app

```
##  创建模板
新建项目、选择模版（本项目推荐使用 Vue3 + TypeScript，所以我们选择 vue-ts，会自动安装 Vue3 和 TypeScript。）

```shell
npm init vite <project-name>
```

enter之后，根据项目提示，接下来会让你选择预设, `npm install`初始化, 这里就不展开赘述，大家可以到官网查看相关文档。

##  安装

构建完成后，安装`Pandora2`

```js
  npm install @ylf521/pandora2 / yarn add @ylf521/pandora2 / pnpm add @ylf521/pandora2

```

## 引用 

在项目中引用

```js
import { createApp } from 'vue'
import App from './App.vue'

import Pandora2 from '@ylf521/pandora2'
import '@ylf521/pandora2/dist/style.css'

const app = createApp(App)
app.use(Pandora2)
app.mount('#app')

```
