import { execSync } from 'node:child_process'

function run(command) {
  execSync(command, { stdio: 'inherit' })
}

const bump = process.argv[2]
if (!['patch', 'minor', 'major'].includes(bump)) {
  console.error('Usage: node script/release.js <patch|minor|major>')
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

run(`npm version ${bump}`)
