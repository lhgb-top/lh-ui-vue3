# lh-ui-react 组件库实施计划（React 18/19）

> 状态：**规划已交付（待启动），2026-10-01（v2 修订：share 化）**。总纲见 `ai/多端组件库规划.md` v2，共享层设计见 `ai/share包计划.md`；本文件只写 React 特化的实施细节。
>
> 定位：npm 包名 `@lh-ui/react`，独立仓库 `lh-ui/lh-ui-react/`，纯函数组件库；peerDeps `react ^18.0.0 || ^19.0.0`；**唯一运行时依赖 `@lh-ui/share`**。组件名/BEM 类名三库完全同构（`Lh*` / `lh-*` / `--lh-*`）；组件样式源唯一在 `@lh-ui/share/styles`（本库只编译，不持有样式副本）。

---

## 一、范围与组件优先级

- **P0 打样 12 个**：config-provider、button、icon、input、select、checkbox、radio、switch、dialog、tooltip、tag、form（与 vue2 打样同名单，便于交叉验证移植范式）。
- **P1/P2**：对齐 plus 能力面；`TransitionGroup`/虚拟滚动等复杂件排 P2。
- 每个组件移植前先填一行「Vue3 特性 → React 等价物」对照（见 §四 总表），再写 tsx。

---

## 二、技术选型与依赖清单

| 依赖 | 版本 | 角色 | 说明 |
| --- | --- | --- | --- |
| **@lh-ui/share** | `^0.1.0` | **dependencies（唯一运行时依赖）** | 共享层：core/theme/constants/locales/types/utils/styles；前置条件 share 0.1.0 已发布；本地联调 `pnpm link ../lh-ui-share` |
| react / react-dom | devDep 固定 `18.3.x`；peerDeps `^18.0.0 \|\| ^19.0.0` | 框架 | 以 18 类型开发，兼容 19 |
| @vitejs/plugin-react | latest | 构建 | esbuild 编译 tsx |
| vite | 5.x | JS 构建（lib mode 多入口） | 同 vue2 库 |
| rollup-plugin-dts | — | dts 聚合 | tsx 无需 SFC shim，链路比 vue2 简单 |
| sass | modern API | 样式 | 同 plus |
| vitest + jsdom + @testing-library/react | — | 测试 | 组件测试用 RTL；hooks 用 renderHook |
| typescript | ~5.x | 类型 | @types/react 版本随 devDep 的 react 18 锁定 |

**依赖红线（v2）**：唯一运行时依赖 `@lh-ui/share`；此外不引 `classnames/clsx`（用 share/core `getClassNames`）、不引 `react-transition-group`（自研 `useTransition`）、不引 `floating-ui`（用 share/core/shared/popper）。

---

## 三、目录树

```
lh-ui-react/                    # 独立仓库，D:\...\lh-ui\lh-ui-react\
├── package.json / vite.config.ts / tsconfig.json / tsconfig.build.json   # strict: true
├── scripts/                      # build-styles.mjs（从 share 源编译）/ verify-dts.mjs / build-docs.mjs
├── src/index.ts                  # barrel：命名导出全部组件 + locale 适配 + hooks（无 install 机制）
├── src/locale/index.tsx          # LhLocale 适配：useSyncExternalStore 订阅 share emitter（~30 行）
├── src/context/index.tsx         # LhConfigContext + LhConfigProvider + useLhConfigContext
├── src/hooks/index.ts            # useLh* hooks（§六；纯逻辑全部调 @lh-ui/share/core）
├── src/imperative/
│   ├── container.tsx             # createRoot 单例容器
│   └── message.ts / notification.ts / loading.ts   # 服务 API
├── src/components/
│   └── button/
│       ├── Button.tsx            # 组件（薄渲染）
│       ├── button.ts             # 纯胶水：props 加工 + share/core 调用组合（延续薄封装理念）
│       ├── types.ts              # LhButtonProps（与 plus 同构）+ 类型常量
│       └── index.ts              # re-export
├── tests/                        # 组件测试 + registry + 适配层（core 单测唯一一份在 share 仓库）
├── docs/                         # 独立 VitePress（DOCS_BASE=/react/）
└── dev/                          # vite react 沙箱

> 与 v1 的差异：库内不再有 core/theme/constants/locales/types/utils 目录与组件样式副本——共享层全部来自 `@lh-ui/share`。
```

---

## 四、概念映射总表（Vue3 → React）

| Vue3（lh-ui-plus） | React（本库） | 备注 |
| --- | --- | --- |
| `defineProps` + `withDefaults` | `interface Props` + 解构默认参数 | **不用 defaultProps**（React 19 已移除函数组件支持） |
| `defineEmits` | `onXxx` 回调 props | 事件命名对照表进文档（click→onClick、change→onChange…）；每组件卡必填「事件对照」字段 |
| 默认插槽 | `children` | |
| 具名/作用域插槽 | render props / compound components | 如 Select 的 `optionRender`、Table 的 columns render |
| provide/inject（provide 必须 computed 包装） | Context + useContext | **Provider value 必须 `useMemo`**——同一教训的 React 形态（§八.7） |
| `v-model` | 受控 `value` + `onChange`；非受控 `defaultValue` | `useControlled` hook 统一（§六） |
| composables（ref/computed/watch） | hooks（useState/useMemo/useEffect） | 纯函数部分直接 import core，不复制逻辑 |
| `<Teleport to="body">` | `ReactDOM.createPortal` | 弹层挂 body，容器惰性创建 |
| `<Transition>` + 动画类 | 自研 `useTransition` | **动画类名与 SCSS 完全一致（`*-enter-from`），样式零改动**（§六） |
| `<TransitionGroup>` | v1 不支持 | 平台矩阵标注 |
| 命令式 Message/Notification/Loading | 模块级 createRoot 容器 + 队列 | §七 |
| `install` / `app.use` | 命名导出 barrel | React 无插件机制 |
| `void lhlocale.version.value` 惯用法 | `useLhLocale()` hook 内部订阅 version | LhLocale 的 `version = ref(0)` 在 react 侧适配层换事件订阅 / useSyncExternalStore |
| `themeVars` / `bgPattern` / `sx` props | 同名 props | `sxToStyle` 原样复用；CSS 变量键需 `as React.CSSProperties`（§八.5） |

---

## 五、组件范式（Button.tsx 示例）

```tsx
import { forwardRef, useMemo } from 'react'
import type { CSSProperties, MouseEventHandler } from 'react'
import { isClickable, getSize, getClassNames } from '@lh-ui/share/core/button'
import { sxToStyle } from '@lh-ui/share/core/shared/sx'
import { useLhComponentTheme } from '../../hooks'
import { useLhConfigContext } from '../../context'
import type { LhButtonProps } from './types'

const LhButton = forwardRef<HTMLButtonElement, LhButtonProps>((props, ref) => {
  const { type, size, loading, disabled, sx, themeVars, bgPattern, onClick, children } = props
  const ctx = useLhConfigContext()
  const effectiveSize = useMemo(() => getSize(size, ctx?.size), [size, ctx?.size])
  const { componentStyle } = useLhComponentTheme('button', props, ctx)
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isClickable({ loading, disabled })) onClick?.(e)
  }
  const cls = getClassNames({ type, size: effectiveSize, loading, disabled, ... }).join(' ')
  return (
    <button
      ref={ref}
      className={cls}
      style={{ ...componentStyle, ...sxToStyle(sx) } as CSSProperties}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {children}
    </button>
  )
})
LhButton.displayName = 'LhButton'
```

要点：

- **Props 接口与 plus 的 `LhButtonProps` 同名同义同构**——文档对照与用户迁移的基础。
- 类名统一走 core `getClassNames(state)`（plus 里已抽但模板未消费；react 版直接消费，保持「状态进 / 类名出」）；`useLhNamespace`（BEM）为纯字符串函数原样复用。
- 每组件保留一个 `button.ts` 纯胶水文件承载「props 加工 + core 调用组合」，tsx 只做渲染——延续 plus 薄封装理念，且让组件测试可以绕过 DOM。

---

## 六、hooks 设计

| hook | 来源 | 设计要点 |
| --- | --- | --- |
| useLhSize / useLhDisabled | core 纯函数包装 | useMemo；入参出参同 plus |
| useLhNamespace | plus 纯字符串函数 | 原样（无 Vue 依赖） |
| useControlled | `useLhVModel` 等价 | `value ?? defaultValue` + 内部 state 缓存 + onChange；受控/非受控切换时开发态警告 |
| useLhZIndex | 模块级计数器 | 全局 counter（2000 起）+ useRef |
| useLhBreakpoint | matchMedia 单例 | useSyncExternalStore；SSR 返回默认断点 |
| useLhComponentTheme | plus 同名逻辑 | 入参 ctx 改普通对象；useMemo 产出 componentStyle（含 themeVars 三级优先级：组件 prop > Context[name] > 全局） |
| useLhTheme / usePresetTheme | plus DOM 侧逻辑 | `document.documentElement` + `data-theme` + localStorage；全部在 useEffect 内执行，SSR 守卫 |
| useClickOutside | 外壳重写 | useEffect + document listener + cleanup；依赖数组正确（handler 用 ref 稳定） |
| usePopper | 外壳重写 | useLayoutEffect 调 core/shared/popper 几何计算 + ResizeObserver；SSR 不执行 |
| useFocusTrap | 外壳重写 | useEffect 调 core/shared/focus-trap；cleanup 归还焦点 |
| useTrigger | 外壳重写 | hover/click/focus/manual 状态机 + 双 timer；effect cleanup 清 timer；受控模式 |
| useTransition | 新增 | mounted + phase 状态（`enter-from` → `enter-active` → `enter-to`）；双 rAF 切类名；监听 transitionend/animationend 清理；严格模式安全 |

弹层组件统一组合「usePopper + useClickOutside + useFocusTrap + useTrigger」，差异只在 JSX 结构——与 plus 的 Wave C/D 外壳一一对应。

---

## 七、命令式服务（Message/Notification/Loading）

```
imperative/
├── container.tsx   # createRoot(document.createElement('div')).render(<MessageHost/>)，单例惰性初始化
└── message.ts      # message.success(text, opts) → container.dispatch({type:'add',...})；返回 { close }
```

- **惰性初始化**：首次调用才创建 root 并 append 容器 div；SSR 环境调用时 warn + no-op。
- **单容器原则**：服务函数只投递 action，host 组件内部 state 管理队列（避免多次 createRoot 导致 StrictMode/并发下多实例）。
- 卸载：`root.unmount()` 只在 `destroyAll()`（测试/热更用）中显式触发。
- 行为对齐 plus：duration、closable、多次调用堆叠、z-index 递增（useLhZIndex）。

---

## 八、注意点全集

1. **StrictMode 双调用**：render 零副作用（不写外部变量、不创建订阅）；effect 幂等且 cleanup 完整；开发期双 mount 不应产生重复 DOM/监听。
2. **render 必须纯**：`generateId()`、`Date.now()` 等放事件处理器或 effect 内，不放 render 主体（并发特性下 render 可能重放）。
3. **forwardRef**：所有可聚焦/可定位组件（button/input/select/dialog/tooltip…）都转发 ref；React 18/19 通用；**不使用 React 19 的 ref-as-prop**。
4. **不用 defaultProps**（函数组件，React 19 移除）→ 全部解构默认参数。
5. **CSS 变量键**：`style={{ ['--lh-primary-color']: x } as React.CSSProperties}`；封装 `cssVarsStyle(record)` 工具统一处理，避免每个组件散写类型断言。
6. **受控/非受控**：统一 useControlled；文档标注每个表单组件是否支持 `defaultValue`。
7. **Context value 必须 useMemo**（对应 plus「provide 必须 computed」的实测教训）：否则每次 render 新对象导致全子树重渲染。
8. **UMD 用 classic JSX**：esm/cjs 产物用 automatic runtime（`react/jsx-runtime` external）；UMD 构建切 `jsx: 'transform'`（`React.createElement`），避免 `react/jsx-runtime` 的全局名映射问题；`globals: { react: 'React', 'react-dom': 'ReactDOM' }`。
9. **事件对照**：Vue `@change/@click.stop` 等到 React 的映射表进文档；`.stop` → `e.stopPropagation()` 需组件内显式处理。
10. **样式一致**：类名/结构对齐 plus（BEM 完全同名）；组件样式源唯一在 `@lh-ui/share/styles`（过渡类名双写已兼容），本库构建时编译进包，零样式副本。
11. **Testing Library**：优先 `getByRole` 可访问性查询；portal 内容用 `baseElement` 断言；duration 类行为用 fake timers。
12. **peerDeps**：`react: ^18.0.0 || ^19.0.0`、`react-dom` 同；devDep 用 18 固定（兼容面下限）；CI 可选 19 冒烟。
13. **SSR**：useLayoutEffect 在 SSR 有警告——布局类 effect 封装 `useIsomorphicLayoutEffect`；文档标注各组件 SSR 适用度。
14. **依赖红线**：唯一运行时依赖 `@lh-ui/share`，其余见 §二；AGENTS.md 固化。

---

## 九、构建与 dts

- Vite lib mode 多入口（同 vue2 计划 §7.1）；external：`react`、`react-dom`、`react/jsx-runtime`（esm/cjs）、`@lh-ui/share`。
- dts：`tsc --emitDeclarationOnly` + `rollup-plugin-dts` 聚合，**无需 SFC shim**；d.ts 对 `@lh-ui/share` 的类型引用由其发布包自带 d.ts 满足。
- 样式：`build-styles.mjs` 从 `@lh-ui/share/styles/<name>` 编译每组件 css + 从 share theme 源编译 `theme/index.css` 进本库 dist（单包自足）；sass 裸包名解析用 vite NodePackageImporter（M1 验证，回退 loadPaths）。exports 结构对齐 vue2 计划 §6.13。
- UMD：`dist/lh-ui-react.js`，global `LhUIReact`。

---

## 十、测试策略

| 层 | 方案 |
| --- | --- |
| core 单测 | **唯一一份在 `@lh-ui/share` 仓库**（本库不拷贝、不重测） |
| hooks 单测 | renderHook + act；useTransition 用 fake timers 断言 phase 序列 |
| 组件测试 | RTL：`getByRole` + userEvent 键盘；断言点从 plus `tests/components/**` 移植（BEM 同名可大量复用） |
| 服务测试 | message.success 后在容器断言 DOM；fake timers 推进 duration |

---

## 十一、docs 站要点

- 壳同总纲 §6.2；`DOCS_BASE=/react/`；无 ApiStyleToggle。
- **ReactDemo 包装组件**（VitePress 是 Vue 应用，页面内跑 React——本库 docs 最大的非显然坑）：

```ts
// docs/.vitepress/components/ReactDemo.vue 要点
let root: Root | null = null
onMounted(() => {
  root = createRoot(elRef.value!)
  root.render(createElement(DemoComponent, demoProps))
})
onBeforeUnmount(() => { root?.unmount(); root = null })
```

- demo 页面结构沿用 DemoBlock + fenced tsx 源码；页尾页面级 script 只管理传给 ReactDemo 的示例状态。
- 新增「迁移指南」页：Vue3 版 ↔ React 版 API 对照（从 §四 总表展开）。

---

## 十二、启动清单

1. 前置：`@lh-ui/share 0.1.0` 已发布（见 `ai/share包计划.md`）；本地 `pnpm link ../lh-ui-share` 联调。
2. `lh-ui-react` 仓库脚手架：package.json（deps @lh-ui/share / peer react）/ tsconfig（strict）/ eslint / vitest / changesets / CI / AGENTS.md。
3. context（ConfigProvider + useMemo 纪律）→ locale 适配（useSyncExternalStore）→ hooks 前半 → useControlled → useTransition → 弹层四件套 hooks。
4. build-styles（从 share 源编译 + theme css 进 dist）→ imperative 服务骨架（container + message）。
5. P0 12 组件按 §五 范式移植，每组件四件套：types → 胶水 button.ts → tsx → 单测/RTL 测试（样式编译自动覆盖）。
6. docs 站 + ReactDemo + 迁移指南页。
7. CI matrix 加 react 项；交用户跑验证清单。

---

## 十三、验证命令清单（用户手动执行）

```
pnpm lint
pnpm typecheck
pnpm vitest run
pnpm docs:build      # DOCS_BASE=/react/ 冒烟
pnpm build           # es/lib/dist + dts EXIT=0
node scripts/verify-dts.mjs
```

---

## 十四、风险

| # | 风险 | 对策 |
| --- | --- | --- |
| R1 | useTransition 动画时序与 Vue 版视觉不一致 | 打样期逐组件类名快照对比（Vue 版 vs React 版 phase 序列） |
| R2 | StrictMode/并发下弹层重复挂载 | hooks 全部 effect+cleanup；服务单例容器原则 |
| R3 | React 19 类型变更（RefObject、JSX namespace） | devDep 锁 18 与对应 @types/react；19 兼容靠 peerDeps + 可选 CI 冒烟 |
| R4 | 事件对照遗漏导致文档失真 | 每组件卡必填「事件对照」字段，CI 文档校验可后补 |
| R5 | Context 泄漏性能问题 | ConfigProvider value useMemo + lint 规则提示 |
