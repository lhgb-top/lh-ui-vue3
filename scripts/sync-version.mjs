/**
 * 把 package.json 的 version 同步进 src/index.ts 的入口 version 字面量。
 *
 * src/index.ts 的 version 此前是手工硬编码：changeset version 只改 package.json，
 * 发版后入口 version 必然与包版本漂移。构建前跑一次本脚本保证产物版本一致（幂等）。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

const entryPath = join(root, 'src/index.ts')
const source = readFileSync(entryPath, 'utf8')
const next = source.replace(/(version:\s*)'[^']*'/, `$1'${pkg.version}'`)

if (next !== source) {
  writeFileSync(entryPath, next)
  console.log(`[sync-version] src/index.ts version -> ${pkg.version}`)
} else {
  console.log(`[sync-version] src/index.ts version 已是 ${pkg.version}，无需改动`)
}
