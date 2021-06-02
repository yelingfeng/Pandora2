const { resolve } = require('path');
const { getRouterConfig } = require('./router');
// console.log(getRouterConfig())

const base = process.env.NODE_ENV === 'production' ? '/Pandora2' : '';
module.exports = {
  title: 'Pandora2',
  description: 'Pandora2 基础vue-pandroa升级版本,基于vue3.0 vite2 typescript element-plus',
  alias: {
    // 为了能在demo中正确的使用  import { X } from 'pandora2'
   'pandora2' : resolve('./src/'),
   '@': resolve('./src/')
  },
  base,
  themeConfig: {
    repo: 'yelingfeng/pandora2',
    repoLabel: 'Github',
    lastUpdated: '最近更新',
    prevLink: true,
    nextLink: true,
    nav: [
      { text: '指南', link: '/' },
      { text: '文档', link: '/docs/' },
    ],
    sidebar: getRouterConfig()
  }
};
