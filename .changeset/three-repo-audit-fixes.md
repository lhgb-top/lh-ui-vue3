---
'@lh-ui/vue3': minor
---

三库审计修复批次（2026-10 审计报告 P-02 ~ P-16）：

**修复（P1）**

- **uid 反模式**：date-picker / cascader / time-picker 的 `let nextUid=0; nextUid++` 写在 setup 内导致 uid 恒 1——多实例 panelId 全部撞名（aria-controls / getElementById / closest 歧义）、z-index 恒 3001。统一改 `generateId()` + `useLhZIndex()`
- **Dialog 关闭链三连**：watch 补状态守卫（遮罩/Esc 关闭后 close/beforeClose/unlockScroll 不再双发）；Esc 监听补 `isVisible` 守卫（已关闭实例不再解掉别的弹层的滚动锁）；初始 `modelValue=true` 补滚动锁与焦点圈（对齐 Drawer）；滚动锁加状态跟踪（未锁不解）；拖拽监听补卸载清理
- **cascader**：受控清空 `[]` 现在会同步清掉已选 tag；`<Transition>` name 改 `lh-cascader-panel`（旧 name 与 share 双写类名错配，面板动画整体失效）；handleClear 的无效三元清理
- **form**：provide 上下文改 getter 注入（旧实现 reactive 拍快照，运行时改 rules / labelPosition / labelWidth 不传导）；`model` 去快照；initialValues 随 rules 到达增量补拍（异步 rules 的字段现在可以 reset）
- **tree**：键盘焦点查询限定组件根内（document 级 querySelector 在多实例时聚焦到别的树）
- **select**：弹层重开强制重算定位（依赖 isOpen，修复 stale 矩形）；zIndex 走 useLhZIndex；选项 key 用 option.value；补 aria-activedescendant 关联
- **date-picker**：外部已是区间值时确认不再用单个 Date 覆盖（防数据丢失）；datetime/range 未实现已在 docs 标注（补实现为产品决策项）
- **slider**：受控值变化回显（表单 reset / 程序赋值跟随）；拖拽监听补卸载清理

**修复（P2）**

- **弹层 Esc 协调**：新增 `useLhOverlayStack` 打开顺序栈，Dialog / Drawer / Popover / Dropdown / Popconfirm 只在栈顶响应 Esc
- **tooltip**：彩底文字色写死 `#fff` 换 `var(--lh-color-on-primary, #fff)`
- **composables**：useLhScrollEnd 卸载清理改用挂载时留档的目标（元素被替换时不再泄漏）；删除零消费者的 `useLhSize` / `useLhDisabled` / `useLhNamespace` / `useLhVModel`（AGENTS.md 清单同步）
- **form item**：label 点击聚焦内容区首个可聚焦控件；focusout 在 item 内部移动焦点时不再触发校验（不闪错误态）
- **table**：行补 tabindex 与 Enter/Space 键盘触发
- **工程**：新增 `scripts/sync-version.mjs` 并接入 build（消灭入口 version 硬编码漂移）；README 移除 Popper.js 表述；vitest 空 thresholds 与过期注释清理（阈值待实测基线回填）
