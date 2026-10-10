# lh-ui-uniapp 组件库实施计划（Vue3 版 uni-app）

> 状态：**规划已交付（待启动），2026-10-01（v2 修订：share 化）**。总纲见 `ai/多端组件库规划.md` v2，共享层设计见 `ai/share包计划.md`；本文件只写 uni-app 特化的实施细节。
>
> 定位：npm 包名 `@lh-ui/uniapp`，独立仓库 `lh-ui/lh-ui-uniapp/`，Vue3 版 uni-app（CLI 工程）；**首版平台 H5 + 微信小程序**；**唯一运行时依赖 `@lh-ui/share`**（使用方安装本库时自动带上，由使用方 uni 构建链解析 node_modules，vue3 vite 版原生支持）。支付宝/抖音等小程序后续按条件编译逐个验证；**nvue/App(nvue) 端不做**。

---

## 一、形态决策（与另两库的根本差异）

| 事项 | 决策 | 理由 |
| --- | --- | --- |
| 发布形态 | **`.vue` 源码分发**（components/ + core/ + theme scss），不做编译产物 | 小程序组件必须经使用方的 uni 编译链生成 WXML/WXSS；源码分发下 easycom 按需天然成立（uni-ui 同款惯例） |
| 安装方式 | ① npm 安装 + pages.json easycom 规则（主）；② uni_modules 拷贝（辅，同一份源码） | uni 生态两种惯例都兼容 |
| 组件目录布局 | `components/lh-button/lh-button.vue`（**文件名 = 标签名**） | easycom 解析约定 |
| 入口形态 | 仍提供 `src/index.ts` 全量命名导出 + install（H5 工程可用）；小程序端推荐 easycom 按需 | 兼顾两端 |

使用方 easycom 规则（写入本库文档）：

```json
"easycom": {
  "autoscan": false,
  "custom": { "^lh-(.*)": "@lh-ui/uniapp/components/lh-$1/lh-$1.vue" }
}
```

---

## 二、平台能力矩阵（M1 起逐组件填充，模板）

| 组件 | H5 | 微信小程序 | 降级策略 / 说明 |
| --- | --- | --- | --- |
| button | 完整 | 完整 | — |
| dialog | 完整 | 降级 | 无 Teleport：页内 fixed + root-portal（基础库 ≥2.25）条件编译 |
| tooltip | 完整 | 降级 | uni-popper 适配层（异步度量） |
| backtop | 完整 | 待定 | 页面滚动语义不同：改 scroll-view 变体或 v1 缺席 |
| menu/tree 键盘导航 | 完整 | 不适用 | 触屏环境无键盘焦点语义，aria/键盘仅 H5 |
| … | … | … | 打样期锁定全部 P0 行 |

规则：**每组件移植前必须先填该组件行**；「不支持」必须写明替代方案或文档声明；矩阵随组件卡归档。

---

## 三、技术选型与依赖清单

| 依赖 | 版本 | 角色 | 说明 |
| --- | --- | --- | --- |
| **@lh-ui/share** | `^0.1.0` | **dependencies（唯一运行时依赖）** | 共享层：core/theme/constants/locales/types/styles；前置条件 share 0.1.0 已发布；本地联调 `pnpm link ../lh-ui-share` |
| @dcloudio/uni-app 全家桶 | 3.0.x（CLI） | devDep | **锁 minor**：uni 编译器与 vue 版本强绑定，升级走 uni 发布说明，禁止单独升 vue |
| vue | uni-app 要求的对应版本 | devDep | 不独立选择版本 |
| sass | modern API | 样式 | 同 plus |
| vitest + jsdom + @vue/test-utils@2 | — | 测试 | **仅 H5 端组件测试** |
| typescript | ~5.x | 类型 | — |

- 本库 dev 环境：uni CLI——`pnpm dev:h5` / `pnpm dev:mp-weixin`（后者用微信开发者工具打开 `dist/dev/mp-weixin`）。
- **不引 uni-ui / uview 等依赖**（唯一运行时依赖 `@lh-ui/share`，红线不变）。

---

## 四、目录树

```
lh-ui-uniapp/                    # 独立仓库，D:\...\lh-ui\lh-ui-uniapp\
├── package.json            # name: @lh-ui/uniapp；deps: @lh-ui/share；files 白名单：components/ src/
├── pages.json / manifest.json   # dev 演示工程配置
├── vite.config.ts          # uni 插件 + px→rpx postcss 转译（编译 share 样式源时生效）
├── scripts/build-styles.mjs    # 从 @lh-ui/share/styles 源生成 rpx 版 components/<name>/style.scss 产物入包
├── src/theme/var-uni.scss  # page 选择器包装（仅包装；令牌值唯一来自 @lh-ui/share/theme/scss）
├── components/
│   └── lh-button/
│       ├── lh-button.vue   # easycom SFC（文件名=标签名）
│       ├── style.scss      # 构建产物：share 源 px→rpx 转译生成（禁止手改）
│       ├── logic.ts        # 胶水（调 @lh-ui/share/core + 适配层）
│       └── types.ts        # Props（与 plus 同构）
├── uni-adapter/
│   ├── uni-popper.ts       # MP 定位适配（uni.createSelectorQuery → DOMRectLike）
│   ├── platform.ts         # isH5 判断 / 系统信息封装
│   └── locale.ts           # lhlocale emitter → ref 适配（与 vue2 同款）
├── src/index.ts            # 全量导出 + install（H5 用）
├── tests/                  # H5 组件测试 + 适配层测试（core 单测唯一一份在 share 仓库）
├── docs/                   # 独立 VitePress（DOCS_BASE=/uniapp/）
└── dev/                    # uni 演示工程（H5 + 微信双端）

> 与 v1 的差异：库内不再有 core/constants/locales/types 拷贝层——共享层全部来自 `@lh-ui/share`；组件样式不手写，由构建从 share 源生成 rpx 版。
```

---

## 五、主题与样式策略

1. **`:root` 不可用**：`src/theme/var-uni.scss` 作 page 选择器**包装**（默认变量挂 `page`，微信/H5 均支持）——令牌值唯一来自 `@lh-ui/share/theme/scss/variables`（`@use` 引入，本库不重复一份）；ConfigProvider 根 view **内联 CSS 变量**的机制照常可用（inline style 支持自定义属性）。
2. **暗色**：`[data-theme]` 属性选择器在 MP 不可靠 → 统一 class 方案（根 view / page 挂 `.dark`，变量挂 `page.dark`）；微信原生 darkmode（theme.json / 媒体查询）作为可选增强走条件编译。
3. **单位 rpx**：样式源唯一在 `@lh-ui/share/styles`（px 基准）；本库构建时从同一源生成 rpx 版 `components/<name>/style.scss` 产物入包（postcss 插件 px→rpx，750 基准，1px=2rpx，`/* hairline */` 标记跳过保留 px）——**使用方零配置**；本库不手写任何组件样式。
4. **WXSS 选择器白名单（红线，写入 AGENTS.md）**：只用 class 选择器、后代选择器、`::before/::after`；**禁用**：`*`、属性选择器、`:not()`、`:nth-*`、`body/html` 标签选择器；`:hover` 仅 H5 有效（条件编译或容忍）；`prefers-reduced-motion`/`prefers-contrast` MP 端删除。BEM 天然合规。
5. **keyframes / box-shadow / linear-gradient**：WXSS 支持；`patterns.scss` 的 data-URI base64 背景图微信支持——打样期冒烟验证。
6. **样式隔离**：小程序端 Vue 组件编译为自定义组件，**外部 class 合并行为与 H5 不同**（涉及 `options.virtualHost`、styleIsolation、externalClasses）——打样第一优先验证项（§八.2），方案定死后写入 AGENTS.md。
7. **icon 字体**：@font-face 本地字体路径在 MP 有限制——v1 用 base64 内嵌或网络字体，打样验证后定案。

---

## 六、core 复用与适配层设计

- **直接复用（全平台）**：`@lh-ui/share/core/*` 的绝大多数 logic（表单校验、select 导航、date、grid 断点、sx、pt）与 locales/constants——纯数据纯函数，子路径 import 消费。
- **仅 H5**：share 的 core/shared/focus-trap、core/backtop、core/loading 的 window/document 逻辑——经 `uni-adapter/platform.ts`（`isH5`）守卫或 `#ifdef H5` 条件编译；MP 端对应能力降级或不支持（按 §二 矩阵）。
- **uni-popper 适配层**：core/shared/popper 的几何入参是 DOMRectLike 纯数据——MP 端：
  - 触发元素矩形：`uni.createSelectorQuery().in(instance).boundingClientRect()` → 字段映射为 DOMRectLike（top/left/right/bottom/width/height）；
  - 视口矩形：`uni.getWindowInfo()`（windowWidth/windowHeight）；
  - 异步时序：query 是异步的——适配层暴露 `measureRect(selector): Promise<DOMRectLike>`，弹层打开流程改为「measure → 定位 → 显示」，防闪烁用 visibility 延迟。
- **share 包内容只读（红线）**——禁止修改 `@lh-ui/share` 的任何源；平台差异全部收在 `uni-adapter/` 与组件胶水层。

---

## 七、组件移植范式（lh-button 为例）

```vue
<!-- components/lh-button/lh-button.vue -->
<template>
  <button class="lh-button" :class="[`lh-button--${effectiveSize}`, `lh-button--${type}`]"
          :style="buttonStyle" @click="handleClick">
    <slot />
  </button>
</template>

<script lang="ts" setup>
// uni-app Vue3 完整支持 script setup
import { useLhButton } from './logic'   // 胶水：调 core + adapter，与 plus 的 useLhButton 同构
const props = withDefaults(defineProps<LhButtonProps>(), { type: 'default', size: 'medium' })
const emit = defineEmits(['click'])
const { effectiveSize, handleClick, buttonStyle } = useLhButton(props, emit)
</script>

<style lang="scss">
@use './style.scss';   /* 构建时从 @lh-ui/share/styles 源 px→rpx 生成的产物，禁止手改 */
</style>
```

- **事件**：模板 `@click` 由 uni 编译为小程序 `bindtap`（H5 端仍是 click），统一用 `@click`。
- **标签**：直接用 `view/text/button/scroll-view` 等 uni 内置组件书写（H5 端由 uni 映射回 HTML）；plus 的语义化标签优势在 MP 端丢失，aria 属性 MP 支持有限（微信基础库支持部分 role），文档标注。
- **资源**：组件内不放静态资源路径引用，全部 data-URI / CSS 变量。
- **class 合并**：视 §五.6 验证结果决定是否声明 `options: { virtualHost: true }`。

---

## 八、注意点全集（小程序雷区）

1. **样式四件套**：`:root`→`page` 变体、暗色 class 方案、WXSS 选择器白名单、rpx 换算（见 §五）。
2. **class 透传与 virtualHost**（P0 验证项）：外部传入 class/sx 能否落到组件内部根节点，打样第一项验证；必要时的降级方案是「外部样式走 `custom-class` prop」。
3. **无 Teleport**：H5 端可用 `<Teleport to="body">`（uni Vue3 H5 编译支持）；MP 端弹层用「页内 fixed 遮罩 + root-portal（微信基础库 ≥2.25，条件编译）」；z-index 沿用 useLhZIndex 移植版。
4. **滚动语义**：页面滚动监听不存在——backtop/吸顶/无限滚动改 `scroll-view`（`@scrolltolower`/`@scroll`）或页面级 `onPageScroll`；组件文档声明「需置于 scroll-view 内」的约束。
5. **fixed 与软键盘**：输入法弹起时 fixed 元素行为各端不一；dialog+input 组合需提示 `adjust-position`/`cursor-spacing`。
6. **异步度量**：所有 getBoundingClientRect 等价操作是异步（SelectorQuery）——popper/tooltip 先 measure 后定位（§六）。
7. **系统信息 API**：`uni.getSystemInfoSync` 处于弃用链——按 uni 版本封装 `getWindowInfo` 等新 API 到 `uni-adapter/platform.ts`，组件层只调适配层。
8. **安全区域**：底部弹层需 `env(safe-area-inset-bottom)`（CSS 支持），列入 dialog/action-sheet 样式。
9. **provide/inject 与响应式**：Vue 层机制全端可用；「provide 必须 computed 包装」经验照搬；lhlocale 的 ref 响应式全端可用。
10. **包体积**：easycom 按需天然友好；`files` 白名单严格（components/core/theme/locale/constants/src）；`.npmignore` 排除 docs/dev/测试/演示工程；零依赖。
11. **条件编译规范**：模板 `<!-- #ifdef H5 -->`、JS `// #ifdef`、SCSS `/* #ifdef */`；使用口径——优先 `#ifdef H5` 做增强、MP 基线兜底；写入 AGENTS.md。
12. **动画关闭时序**：`transitionend` 监听在 MP 不可靠——弹层关闭动画用 setTimeout 时长对齐 SCSS transition 时长（时长常量抽到 core 共享，避免两处漂移）。
13. **测试分层**：core 单测 node/jsdom 直跑；hooks/组件测试仅 H5（jsdom + VTU2）；MP 端人工回归清单——每组件四项基线（打开/关闭/暗色/中英切换）+ 真机抽查。
14. **版本锁定**：uni-app 编译器与 vue 版本强绑定（§三）。
15. **小程序平台扩展**：支付宝/抖音等端首版不声明支持；后续逐端验证条件编译差异后，在平台矩阵加列。

---

## 九、测试策略

| 层 | 方案 |
| --- | --- |
| core 单测 | **唯一一份在 `@lh-ui/share` 仓库**（node/jsdom 直跑，本库不拷贝） |
| hooks/胶水单测 | H5 环境 vitest + VTU2 |
| 组件测试 | 仅 H5（jsdom）；断言点从 plus tests/components 移植 |
| MP 回归 | 微信开发者工具人工回归清单（每组件：打开/关闭/暗色/中英四项基线）+ 真机抽查；不在 CI |

---

## 十、docs 站要点

- 壳同总纲 §6.2；`DOCS_BASE=/uniapp/`；无 ApiStyleToggle。
- demo 呈现 v1：单围栏 `vue` 代码块 + 关键交互静态截图（小程序组件无法在 VitePress 内直接运行）；v2 可选独立 uni-app H5 demo 子站 iframe。
- 文档必含：easycom 安装引导、**平台支持标记**（复用 §二 矩阵）、与 Vue3 版的 API 差异说明（降级项列表）。

---

## 十一、启动清单

1. 前置：`@lh-ui/share 0.1.0` 已发布；本地 `pnpm link ../lh-ui-share` 联调。
2. `lh-ui-uniapp` 仓库脚手架（AGENTS.md 红线 + 独立 CI）+ uni CLI 工程骨架 + H5/微信双端空页面跑通。
3. px→rpx postcss 插件 + build-styles（share 源 → rpx 版 style.scss 产物）+ `var-uni.scss` 包装 + ConfigProvider 移植（**含 virtualHost/class 合并验证**）。
4. `uni-adapter/`（platform / uni-popper / locale 适配）。
5. P0 打样（与 vue2 同名单）：每组件移植前先填平台矩阵行。
6. 微信开发者工具回归 + H5 测试。
7. docs 站 + `npm pack --dry-run` 包内容白名单演练。
8. CI：lint / typecheck / H5 构建冒烟（MP 行为人工）。

---

## 十二、验证命令清单（用户手动执行）

```
pnpm lint
pnpm typecheck
pnpm vitest run              # core + H5 组件测试
pnpm dev:h5                  # H5 冒烟
pnpm dev:mp-weixin           # 微信开发者工具人工回归
pnpm build:h5                # H5 产物
npm pack --dry-run           # 包内容白名单检查
pnpm docs:build              # DOCS_BASE=/uniapp/ 冒烟
```

---

## 十三、风险

| # | 风险 | 对策 |
| --- | --- | --- |
| R1 | class 合并/virtualHost 行为与预期不符 | 打样第一项验证；降级方案 custom-class prop |
| R2 | root-portal 依赖微信基础库 ≥2.25 | 文档声明最低基础库；低版本降级路径（页内 fixed） |
| R3 | uni-app 编译器升级破坏性变更 | 锁 minor；升级走专项 + 双端回归 |
| R4 | MP 端定位/动画时序闪烁 | measure→定位→显示时序 + visibility 延迟；逐组件验收 |
| R5 | 平台矩阵口径漂移 | 矩阵随组件卡归档，docs 与代码注释引用同一份 |
