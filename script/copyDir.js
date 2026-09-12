const fs = require('fs')
const path = require('path')
const child_process = require('child_process')

const docsDir = path.resolve(__dirname, '../docs')

// GitHub Pages 默认启用 Jekyll，会忽略 _ 开头的资源（Vite 产物常见），需禁用
fs.writeFileSync(path.join(docsDir, '.nojekyll'), '')

const copyDir = (src, dist) => {
  child_process.spawnSync('cp', ['-r', src, dist], { stdio: 'inherit' })
}

copyDir('./packages', './docs')
