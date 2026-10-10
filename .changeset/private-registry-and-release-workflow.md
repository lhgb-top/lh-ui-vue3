---
'@lh-ui/vue3': patch
---

- 新增 `scripts/pack-private.mjs`：以私有包名 `@lhgb/vue3` 打包同一份构建产物并伪造 npm registry 元数据，支持 `--dry-run` 与 `--incremental`
- 新增 `scripts/nginx-private-registry.conf.example`：Nginx 静态目录充当只读私有 registry 的 location 示例
- 新增 `.github/workflows/release.yml`：推送到 main 且 changeset 有变动时自动执行 version + publish，支持 workflow_dispatch 手动触发
- 修正私服文档里过期的 tarball 文件名（`lh-ui-lh-ui-plus-*.tgz` → `lh-ui-vue3-*.tgz`），跟进包名重命名后的 npm pack 产物名
- 收尾包名残留：`packages/utils` 与 `packages/core` 的描述文案、样式构建脚本注释、文档站 hostname 兜底值
- 修复 `pack-private.mjs` 四个缺陷：`execFileSync('npm')` 在 Windows 下必挂（补 `shell: true`）；`--incremental` 仍整体删除输出目录导致历史版本 tarball 丢失；registry 元数据版本文档缺 `peerDependencies` / `engines`，消费侧解析依赖树时拿不到 peer 声明；tarball 与元数据文件同名导致 `EISDIR`，tarball 移入 `tarballs/` 子目录
