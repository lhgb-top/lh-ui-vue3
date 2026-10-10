---
"@lh-ui/vue3": minor
---

Tree 阶段化增强（DEV-F5）：**懒加载**——`lazy` + `load(node, resolve, reject)`，展开未加载节点先请求（箭头旋转 loading 态），resolve 后不可变合并子树（`mergeLoadedChildren` 纯函数）并展开、发 `nodeLoad` 事件，reject/同步异常取消；**checkStrictly**——父子勾选不联动（只增删自身键，无级联与半选），`getNodeCheckState` / `toggleCheckKeys` 纯函数带选项透传。
