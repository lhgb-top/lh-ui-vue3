---
"@lh-ui/vue3": minor
---

Grid 阶段化增强（DEV-F8）：**响应式断点**——Col 新增 `xs/sm/md/lg/xl` 分档（Tailwind 阈值 640/768/1024/1280，`resolveBreakpoint` / `resolveResponsiveSize` 纯函数，未声明档位向下回退、xs 兜底），新增共享 `useLhBreakpoint` composable（matchMedia 模块级单例，SSR/jsdom 安全降级 xs）；**push/pull**——`getColStyle` 消费平移字段，起点钳制 ≥1。
