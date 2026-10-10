# lh-ui-vue2 组件库实施计划（Vue 2.7）

> 状态：**M2 进行中（Wave1-5 完成，剩 Wave6 复杂数据 9 组件 + Wave7 docs/demo；2026-10-02 用户要求先夯实 share/plus 再继续）**——Wave1 纯展示 14 组件（194 用例全绿，commit 0b63db9 之后新增）与 Wave2 导航+表单 8 组件（256 用例全绿，commit 8d1c886）已提交；Wave3-5 已全部提交（cfadd43：弹层族/命令式三件/布局容器 34 目录，53 文件 381 用例全绿，build/verify-dts 过；受控 dropdown 解除 skip 真实生效）。**M2 新沉淀**：2.7 实战红线 12 条已固化进 lh-ui-vue2/AGENTS.md（reactive 根值数组不可追踪 / getCurrentInstance 只有 proxy / 模板单根 display:contents 方案 / false 值 aria 属性移除 / updated 签名比对防死循环 / jsdom 离场过渡靠 rAF / VTU v1 宿主组件范式等）。M1 状态：M1 全部完成（P0 12 组件 + docs 站 + dev 沙箱），2026-10-01（AI 代跑，用户当日授权）**——仓库 `lh-ui/lh-ui-vue2/`（提交 d708e9e → 6c5e82a → c3bc442 → 0b63db9）。**M1 交付**：P0 12 组件（87 用例 / 16 文件全过）、弹层基建 overlay.ts、表单校验链贯通、VitePress docs 站（base=/vue2/，12 组件页 + guide 三篇 + 首页）、dev 沙箱（vite 多页 + 12 个 live demo，经 build:demo 拷入 docs public，DemoBlock 以 iframe 加载）。**docs 架构结论**：VitePress 是 Vue3，无法直接渲染 Vue2 SFC → live demo 走 iframe 沙箱；vitepress+vue3 独立安装在 docs/ 子包避免 vue2.7 冲突（docs 主题不引用 Vue2 组件）；vitepress publicDir 默认是 `docs/public`（非 .vitepress/public）。验证：lint 0/0、strict typecheck 0 error、build 全链 EXIT=0、docs:build EXIT=0 且 dist 含 12 demo 页。**下一里程碑 M2**：P1/P2 全量移植（58 组件能力对等）→ 随后 M3 react / M4 uniapp / M5 三站部署 + 0.1.0 发布。总纲见 `ai/多端组件库规划.md` v2。
>
> 定位：npm 包名 `@lh-ui/vue2`，独立仓库 `D:\MyProgrammingLanguagesWorkspace\MyPersonalProject\lh-ui\lh-ui-vue2\`；面向存量 Vue2 项目；**明确不支持 Vue 2.6 及以下、不支持 IE11**（Vue 2.x 已 EOL，2.7 为终点版本）。唯一运行时依赖 `@lh-ui/share`。

---

## 一、范围与组件优先级

- **P0 打样 12 个**（M1）：config-provider、button、icon、input、select、checkbox、radio、switch、dialog、tooltip、tag、form——覆盖「主题链 + 表单链 + 弹层链」三条主干，验证全部移植范式。
- **P1/P2**：对齐 lh-ui-plus 其余能力面（终态 58 组件目录能力对等），逐个按 §五 范式移植。
- 每个组件移植前先填一行「Vue3 特性 → Vue2 等价物」对照（Teleport / v-model / slots / Transition / defineProps…），再动模板。

---

## 二、技术选型与依赖清单

| 依赖 | 版本 | 角色 | 说明 |
| --- | --- | --- | --- |
| **@lh-ui/share** | `^0.1.0` | **dependencies（唯一运行时依赖）** | 共享层：core/theme/constants/locales/types/utils/styles；**前置条件：share 0.1.0 已发布**（`ai/share包计划.md`） |
| vue | `2.7.16` | devDep（精确 pin）+ peerDeps `vue@^2.7.0` | 2.7 终点版本；不追新 |
| @vitejs/plugin-vue2 | latest | SFC 编译插件 | 官方 Vue2.7 支持；**不装 vue-template-compiler、不装 @vue/composition-api**（2.7 内置 `vue/compiler-sfc` 与 Composition API） |
| vite | 5.x | JS 构建（lib mode 多入口） | external: `vue` + `@lh-ui/share` |
| rollup-plugin-dts | 与 plus 同款 | dts 聚合 | 沿用 `.vue.d.ts` shim 方案 |
| sass（dart-sass） | modern API | 样式 | 从 share 样式源编译（§七.3） |
| vitest + jsdom | — | 测试 | `globals: true`，沿用显式 import 风格 |
| @vue/test-utils | `^1`（≥1.3.6） | 组件测试 | **VTU v1 支持 2.7**（v2 只支持 Vue3，勿装错） |
| typescript | ~5.x | 类型 | 严格模式（`strict: true`） |
| eslint + eslint-plugin-vue | flat config | lint | **vue2 规则集**（plus 用 vue3 规则集，直接复制会误报） |

**本地联调**：`pnpm link ../lh-ui-share`（同父目录平级布局天然支持）；联调结束 `pnpm unlink @lh-ui/share` 恢复 npm 版本。`file:` 协议仅限临时，禁止写入 package.json 提交。

---

## 三、目录树

```
lh-ui-vue2/
├── package.json            # name: @lh-ui/vue2；deps: @lh-ui/share；peerDeps: vue@^2.7.0
├── vite.config.ts          # lib mode 多入口
├── tsconfig.json / tsconfig.build.json   # strict: true
├── rollup.dts.config.js    # dts 聚合（含 .vue.d.ts shim 解析）
├── scripts/
│   ├── build-styles.mjs    # 从 @lh-ui/share/styles 源编译组件 css + theme css 进 dist（§七.3）
│   ├── verify-dts.mjs
│   └── build-docs.mjs      # robots.txt base 重写
├── src/
│   ├── index.ts            # 全量入口：install 注册表 + locale 适配导出 + 类型转发 + 每组件样式 import 表
│   ├── locale/index.ts     # LhLocale 响应式适配：lhlocale emitter → ref + t()（§六.15）
│   ├── composables/index.ts# useLh* Vue2 版（纯逻辑全部调 @lh-ui/share/core，本库只写响应式胶水）
│   ├── imperative.ts       # Vue2 命令式挂载：new Vue().$mount() + mountToBody 工具
│   └── components/
│       └── button/
│           ├── src/index.vue        # Vue2 SFC（script setup + 并列 <script> 声明 name）
│           ├── src/index.ts         # useLhButton(props, emit) 胶水
│           ├── src/types.ts         # LhButtonProps + LH_BUTTON_TYPE_CONST（常量引 @lh-ui/share/constants）
│           ├── src/index.vue.d.ts   # SFC 类型 shim
│           ├── types.ts             # re-export
│           └── index.ts             # install 挂载
├── tests/                  # 组件测试 + registry 测试 + locale/composables 适配层测试（core 单测唯一一份在 share）
├── docs/                   # 独立 VitePress（DOCS_BASE=/vue2/）
└── dev/                    # Vue2 沙箱（vite + plugin-vue2）
```

> 与 v1 的差异：库内不再有 `core/ theme/ constants/ locales/ types/ utils/` 目录——共享层全部来自 `@lh-ui/share`。

---

## 四、职责划分（share 已含 / 本库职责）

| 内容 | 所在 | 本库侧工作 |
| --- | --- | --- |
| core 全部 logic/types + shared（sx/pt/popper/focus-trap） | `@lh-ui/share/core/*` | 零，import 消费 |
| theme SCSS 令牌 + TS 预设 | `@lh-ui/share/theme` | 零 |
| constants / locales 消息 / types | `@lh-ui/share/{constants,locales,types}` | 零 |
| 组件样式源 | `@lh-ui/share/styles/*` | 仅构建期编译（含过渡类名双写，已兼容 Vue2） |
| LhLocale | share（纯 emitter 版） | `src/locale/index.ts` 适配：ref 包装 + t()（~30 行） |
| createNamespace（BEM 纯函数） | `@lh-ui/share/utils` | composables 里薄包装为 useLhNamespace |
| composables 纯逻辑（getSize/isClickable/校验/键盘导航…） | share/core | 本库只写响应式接线（computed/emit/inject） |
| SFC 模板 / install / 命令式服务 / Teleport 替代 | 本库 | 全量实现（§五/§六） |

---

## 五、组件移植范式（以 Button 为例）

### 5.1 src/components/button/src/types.ts

```ts
import { LH_SIZE_CONST, LH_TYPES_CONST } from '@lh-ui/share/constants'
import type { LhComponentSize } from '@lh-ui/share/core/shared/types'
import type { SxProps } from '@lh-ui/share/core/shared/sx'

export interface LhButtonProps {
  type?: LhButtonType
  size?: LhComponentSize
  loading?: boolean
  disabled?: boolean
  themeVars?: Record<string, string>
  bgPattern?: boolean
  sx?: SxProps
}
export const LH_BUTTON_TYPE_CONST = { ...LH_TYPES_CONST, default: 'default', primary: 'primary' } as const
export type LhButtonType = (typeof LH_BUTTON_TYPE_CONST)[keyof typeof LH_BUTTON_TYPE_CONST]
```

### 5.2 src/components/button/src/index.ts —— 胶水 composable

```ts
import { computed } from 'vue'   // 2.7 直接从 'vue' 导出 Composition API
import { getSize, isClickable } from '@lh-ui/share/core/button'
import { sxToStyle } from '@lh-ui/share/core/shared/sx'
import { useLhComponentTheme, useLhConfigContext } from '../../../composables'

export function useLhButton(props, emit) {
  const configContext = useLhConfigContext()   // inject 形态与 plus 相同（必须是 ComputedRef）
  const effectiveSize = computed(() => getSize(props.size, configContext?.value.size))
  const handleClick = (e: MouseEvent) => {
    if (isClickable({ loading: props.loading, disabled: props.disabled })) emit('click', e)
  }
  const { componentStyle } = useLhComponentTheme('button', props, configContext)
  const buttonStyle = computed(() => ({ ...componentStyle.value, ...sxToStyle(props.sx ?? {}) }))
  return { effectiveSize, handleClick, buttonStyle }
}
```

差异点：setup 收到的 props 是普通对象（无 `.value`），直接读属性；`emit` 由 setup 第二参传入。

### 5.3 src/components/button/src/index.vue —— 模板要点

```vue
<script lang="ts">
export default { name: 'LhButton' }   <!-- 2.7 无 defineOptions：并列普通 <script> 声明 name -->
</script>
<script lang="ts" setup>
import { useLhButton } from './index'
const props = withDefaults(defineProps<LhButtonProps>(), {
  type: LH_BUTTON_TYPE_CONST.default,
  size: LH_SIZE_CONST.medium,
})
const emit = defineEmits(['click'])
const { effectiveSize, handleClick, buttonStyle } = useLhButton(props, emit)
</script>
<template>
  <button class="lh-button" :class="[`lh-button--${effectiveSize}`, `lh-button--${props.type}`]"
          :style="buttonStyle" @click="handleClick">
    <!-- 与 plus 模板同构，仅改 Vue2 语法差异点（§六） -->
  </button>
</template>
```

- 2.7 script setup 支持：defineProps / withDefaults / defineEmits / defineExpose；**不支持 defineOptions**、顶层 await。
- 兜底：宏边界案例退回 `defineComponent({ name, props, emits, setup(props, { emit }) })`，两种写法共存（写入本仓库 AGENTS.md）。
- 类型严格要求：所有组件/胶水/composables 开启 `strict: true`，禁止 `any` 逃逸（`noImplicitAny`），emits 用具名签名声明。

### 5.4 样式

本库**不持有组件样式文件**——`styles/<name>/index.scss` 唯一存在于 share（过渡类名双写已兼容 Vue2 的 `-enter/-leave`）；构建期编译进 `es/<name>/style/index.css`（§七.3）。

### 5.5 index.ts（install）—— Vue2 插件形态

```ts
import LhButton from './src/index.vue'
LhButton.install = (Vue) => { Vue.component('LhButton', LhButton) }
export default LhButton
```

入口 `src/index.ts` 沿用 plus 的「优先调用组件自带 install（服务对象），否则 `Vue.component(name, c)`」约定。

---

## 六、注意点全集

### 6.1 响应式系统（defineProperty，非 Proxy）
- 动态新增/删除对象属性**不响应**：必须 `Vue.set / this.$set` 或整对象替换；数组索引赋值与 `length` 修改不响应；不支持 reactive Map/Set。
- 红线写入本仓库 AGENTS.md：组件胶水禁止「先取对象再加属性」写法；share 的 core 是纯函数不受影响；2.7 的 `reactive()` 同样有此限制。

### 6.2 v-model 语义
- 默认 `value` prop + `input` 事件；自定义模型用组件选项 `model: { prop: 'visible', event: 'change' }`。
- 文档与示例：双绑写 `:visible.sync="show"`（Vue2 无 `v-model:visible`）；`.sync` 即 `update:xxx` 事件约定。
- `useLhVModel` 重写：`computed(get/set)` 指向实际 model prop + `emit(model.event)`，按各组件的 model 选项参数化。

### 6.3 无 Teleport（弹层类组件）
- 方案：手动 body 容器——mounted 时 `document.createElement('div')` 挂到 body，组件内容渲染进该容器（与命令式服务共用 `src/imperative.ts` 的 `mountToBody` 工具），beforeDestroy 时 `$destroy()` 并移除容器。
- **不引入 portal-vue**（运行时依赖只有 @lh-ui/share）。
- 影响面：dialog/drawer/dropdown/popover/toast 类组件模板外层结构；z-index 沿用 `useLhZIndex`（2.7 可用）。
- SSR：容器创建必须在 mounted（客户端）内。

### 6.4 过渡类名
- Vue2 是 `*-enter` / `*-enter-active` / `*-enter-to`；share 样式源已**双写** `-enter` 与 `-enter-from`，本库样式零适配。
- `<Transition>` JS 钩子名（@before-enter 等）两代一致，可保留。

### 6.5 defineOptions 缺失
- 组件 name 用并列普通 `<script lang="ts">` 块声明；registry 测试依赖 name，两块 script 的 name 与注册名必须一致。

### 6.6 provide/inject
- 2.7 的 `provide(key, value)` / `inject(key, default)` 可用，`InjectionKey` 有导出。
- 沿用 plus 实测经验：**provide 的必须是 computed ref 本身**（不能解包、不能传 reactive 快照），消费方 `.value` 读取。
- ConfigProvider `watch(locale, …, { immediate: true })` 同步 lhlocale 的写法 2.7 一致。

### 6.7 命令式服务（Message/Notification/Loading）
- `new Vue({ render: h => h(Comp, { props }) }).$mount()`；关闭时 `vm.$destroy(); vm.$el.remove()`。
- `new Vue` 挂载的是独立实例树：ConfigProvider 的 provide/inject 上下文**不会**继承——服务组件读全局 size/locale 走 lhlocale 单例与默认值，不走 inject（与 plus 的 Vue3 服务同款约束）。

### 6.8 作用域插槽
- 模板内 `v-slot`（2.6+）与 Vue3 写法一致。
- render 函数内：Vue2 走 `this.$scopedSlots`；2.7 setup 里 `h` 可从 'vue' 导入；不确定处优先模板写法。

### 6.9 attrs / listeners
- Vue2 透传分 `$attrs` 与 `$listeners` 两包：`v-bind="$attrs" v-on="$listeners"` 才等效 Vue3 的 `v-bind="$attrs"`。
- 「根元素非目标元素」的组件（input 包 label 等）逐个显式绑定。

### 6.10 TypeScript 差异
- 2.7 的 defineComponent 泛型推导弱于 Vue3：Props 保持显式 interface（plus 已如此，成本低）。
- 避免 Vue3 专属类型（`ExtractPropTypes` 行为差异、`Slot` 泛型等）。
- 全库 `strict: true`；SFC 内类型靠显式标注 + `.vue.d.ts` shim。

### 6.11 scoped 深度选择器
- `:deep()` → `::v-deep`；`:slotted()` / `:global()` 无对应（本库样式源在 share，此问题仅影响极少数 SFC 内联样式）。

### 6.12 编译与工具链
- 不装 vue-template-compiler（2.7 内置 `vue/compiler-sfc`），@vitejs/plugin-vue2 自动对接；vitest 走 vite 配置，插件对 test 环境同样生效。

### 6.13 产物与 exports
- `dist/lh-ui-vue2.js`，global `LhUIVue2`，`globals: { vue: 'Vue', '@lh-ui/share': 'LhUIShare' }`。
- exports 对齐 plus 结构：`.`、`./es/*`、`./lib/*`、`./style/*`、`./theme`（re-export share theme 便捷入口）、`./locale`、`./constants`（re-export share），便于用户跨库迁移。

### 6.14 IE11 不支持
- 产物 ES2020（vite target）；需 IE11 的项目不在服务范围。

### 6.15 locale 适配层（新增，share 化引入）
- share 的 LhLocale 是纯 emitter（`version` 数字 + `subscribe`）；本库 `src/locale/index.ts` 用 ref 包装恢复响应式：

```ts
const version = ref(lhlocale.version)
lhlocale.subscribe((v) => { version.value = v })
export const t = (path: string, fallback?: string) => { void version.value; return lhlocale.t(path, fallback) }
```

- 组件内消费惯用法与 plus 完全一致（`void lhlocale.version.value` 建立依赖）；ConfigProvider 的 `locale` prop watch 后调 `lhlocale.setLocale`。

---

## 七、构建与 dts 管线

### 7.1 Vite lib mode（JS）

```ts
// vite.config.ts 要点
import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue2()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs', 'umd'],
      name: 'LhUIVue2',
      fileName: 'lh-ui-vue2',
    },
    rollupOptions: {
      external: ['vue', '@lh-ui/share'],
      // 多入口：每组件 src/components/<name>/index.ts；具体形态 M1 定型
    },
  },
})
```

### 7.2 dts（最大技术风险，M1 首个组件即验证）

1. `tsc -p tsconfig.build.json --emitDeclarationOnly`（SFC 类型靠 `.vue.d.ts` shim）；
2. `rollup-plugin-dts` 按入口聚合 → `es/<name>/index.d.ts`；
3. `.vue.d.ts` shim 约定沿 plus：每个 SFC 旁置同名 `.vue.d.ts`；
4. d.ts 对 `@lh-ui/share` 的类型引用由 share 发布包自带 d.ts 满足（external，不内联）；
5. `scripts/verify-dts.mjs`：校验产物无裸导入、声明完整。

回退方案：按文件 d.ts 不聚合，先保证可用。

### 7.3 样式编译（从 share 源，产物随本库）

- `scripts/build-styles.mjs`：
  1. 从 `node_modules/@lh-ui/share/styles/<name>/index.scss` 编译每组件 css → `es|lib/<name>/style/index.css`；
  2. 从 share 的 theme scss 源编译 `theme/index.css`（:root + dark）→ 本库 dist；
  3. 用户单包自足：装 `@lh-ui/vue2` 即够，无需显式装 share 的 css。
- sass 解析 share 裸包名：vite 配 `css.preprocessorOptions.scss` 的 NodePackageImporter（sass ≥1.70，`pkg:` 语法）或 loadPaths——**M0b 第一项验证**，回退 loadPaths。
- CI 门禁：grep 禁止本仓库出现组件样式手写副本（只能来自编译产物）。

---

## 八、测试策略

| 层 | 方案 |
| --- | --- |
| core 单测 | **唯一一份在 `lh-ui-share` 仓库**（本库不拷贝、不重测） |
| locale/适配层测试 | share emitter → ref 包装的行为用例（切语言触发重渲染） |
| composables 适配测试 | useLhVModel（Vue2 语义）、useLhComponentTheme（inject 形态）等 |
| 组件测试 | @vue/test-utils@1：`mount(Comp, { attachTo: document.body })`；断言点从 plus `tests/components/**` 移植（BEM 选择器同名，可大量复用） |
| registry 测试 | `components-registry.spec` 移植：断言注册表清单 + 反向校验 components 目录全覆盖 |

---

## 九、docs 站要点

- 壳模板来自总纲 §八；`DOCS_BASE=/vue2/`。
- `ApiStyleToggle` 保留：2.7 同时支持 Composition（script setup）与 Options API，双围栏机制原样适用。
- 文档示例安装代码统一 `@lh-ui/vue2`；双绑示例按 `.sync`（§六.2）；主题/预设章节内容引 share 能力（`@lh-ui/share/theme`）。
- 组件注册：docs 主题里 `app.use(...)` 全量注册（文档站无需按需）。

---

## 十、启动清单（M0b + M1）

**前置：`@lh-ui/share 0.1.0` 已发布（`ai/share包计划.md` §七）。**

1. 建 `lh-ui-vue2` 仓库：package.json（deps @lh-ui/share / peer vue@^2.7.0）/ tsconfig（strict）/ eslint（vue2 规则集）/ vitest / .changeset（access public）/ AGENTS.md（§六 红线固化 + 验证手动约定）/ CI workflow。
2. `pnpm link ../lh-ui-share` 联调链路打通。
3. vite.config / rollup.dts.config / build-styles.mjs（**NodePackageImporter 解析 share 样式源先行验证**）。
4. 写 `src/locale/index.ts`（emitter→ref 适配）与 `src/imperative.ts`（Vue2 mount + mountToBody）。
5. 写 `src/composables/index.ts`：useLhSize/Disabled/Namespace（包装 share createNamespace）/ZIndex/Breakpoint/ComponentTheme + Vue2 版 useLhVModel + useLhConfigContext（inject）。
6. 先移植 **config-provider**（provide/inject 链 + locale 接线）——其余组件的地基。
7. 按 §五 范式移植 P0 打样 12 组件，每组件五件套：types → 胶水 → SFC + shim → install → registry/单测/组件测试（样式编译自动覆盖）。
8. `docs/` 建站 + P0 文档页；`dev/` 沙箱接全量。
9. 交用户跑 §十一 验证清单；通过后开始 M2 全量。

---

## 十一、验证命令清单（用户手动执行，AI 不自动跑）

```
pnpm lint                        # 预期 0 errors 0 warnings（vue2 规则集）
pnpm typecheck                   # 预期通过（strict）
pnpm vitest run                  # 组件 + registry + 适配层
pnpm docs:build                  # DOCS_BASE=/vue2/ 冒烟
pnpm build                       # es/lib/dist + dts EXIT=0
node scripts/verify-dts.mjs      # dts 产物校验
npm pack --dry-run               # files 白名单检查
```

---

## 十二、风险与开放问题

| # | 风险 | 对策 |
| --- | --- | --- |
| R1 | dts shim 生成与聚合（2.7 无 vue-tsc） | M1 首组件验证；回退按文件 d.ts 不聚合 |
| R2 | script setup 宏边界案例 | 允许退回 defineComponent，写入 AGENTS.md |
| R3 | 弹层组件手动挂载后的焦点圈/滚动锁定回归 | focus-trap 内核（share）照用；逐组件列验收清单 |
| R4 | `$attrs/$listeners` 透传遗漏 | 加「透传冒烟测试」模板（每组件必测 attrs 落点） |
| R5 | sass 解析 share 裸包名失败 | M0b 先行验证 NodePackageImporter；回退 loadPaths |
| R6 | share 版本升级破坏本库 | 升级纪律（share 发版 → 本库 up + 回归 → 再发版）；lockfile 锁定 |
