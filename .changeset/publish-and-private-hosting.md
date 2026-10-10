---
'@lh-ui/vue3': patch
---

- `exports` 新增 `./dist/*` 与 `./style-css/*` 子路径，修复 `dist/index.css` 在 `exports` 封装下无法解析、按需引入强制要求消费侧安装 sass 的问题
- 新增发布指南与私有服务器 tarball 托管说明（中英双语）
- 安装文档补充 CDN 引入方式
