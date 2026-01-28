import { execSync } from 'node:child_process'
import fs from 'node:fs'

function run(command) {
  execSync(command, { stdio: 'inherit' })
}

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const version = pkg.version
if (!version || typeof version !== 'string') {
  console.error('Invalid package.json version')
  process.exit(1)
}

run('git add -A')
try {
  execSync('git diff --cached --quiet')
} catch {
  run('git commit -m "chore: prepare release"')
}

run('pnpm run test:ci')
run('pnpm run build:lib')

const tag = `v${version}`
try {
  execSync(`git rev-parse "${tag}"`, { stdio: 'ignore' })
  console.error(`Tag already exists: ${tag}`)
  console.error('Please bump version and create a new tag, e.g. run: pnpm run release:patch')
  process.exit(1)
} catch {}

run(`git tag ${tag}`)
run('git push origin HEAD --follow-tags')
