# @lh-ui/vue3

## 1.1.0

### Minor Changes

- 96e3ccb: 关闭存量无障碍债务 DEBT-3：表单控件读取所属 `LhFormItem` 的校验状态，校验失败时在控件上标记 `aria-invalid`，错误消除后属性自动移除；控件放在 `LhFormItem` 之外时不受影响。

  - 新增 form-item → 控件的上下文通道（`LH_FORM_ITEM_CONTEXT_KEY`），`item.vue` 以 reactive 代理暴露响应式错误文案
  - 覆盖十个表单控件：Input / Select / Checkbox / Radio / Switch / Slider / InputNumber / DatePicker / TimePicker / Cascader。有原生控件的（Input、Checkbox、Radio、InputNumber）标记在原生控件上；复合触发器的（Select 的 combobox、Switch 的 switch role、Slider 与三个 Picker 的根元素）标记在触发器上
  - Checkbox / Radio 置于 Group 内再嵌入 FormItem 时，上下文正常穿透
  - 屏幕阅读器配合 `LhFormItem` 既有的 `role="alert"` 错误播报与 `aria-describedby` 关联，形成完整的「字段 → 错误」可感知链路

- 96e3ccb: 存量组件无障碍债务补齐（`ai/组件扩充计划.md` §5.3）：

  - **LhFormItem**：错误文案带 `role="alert"`，校验失败时屏读立即播报；内容区经 `aria-describedby` 关联错误文案，无错误时自动移除关联。顺带修复一个 i18n 缺陷——`packages/core/form/logic.ts` 此前硬编码英文兜底 `'This field is required'`，现改为由组件层传入语言包 `form.required`（中「此项为必填」/英 "This field is required"），core 层不再含文案，`form.required` 死键随之激活；`LhForm.validateField()` 同步传入该兜底文案，避免表单级必填校验静默放行
  - **LhProgress**：根元素补 `role="progressbar"` + `aria-valuemin/max/now` + `aria-valuetext`（同步可见文案，含 `format` 自定义格式），对齐 WAI-ARIA progressbar 模式
  - **LhStatistic**：数值区补 `aria-live="polite"`，`value` 变化时温和播报
  - **LhTag**：纯图标的关闭按钮补 `aria-label`（取语言包 `tag.close`，`tag.close` 死键随之激活），图标 `<svg>` 标记 `aria-hidden`
  - **LhBadge**：小圆点模式的角标是纯装饰，标记 `aria-hidden`；数值模式文本保留可读
  - **LhAvatar**：字体图标标记 `aria-hidden`；图标 / 文字模式由根元素承担 `role="img"`，`alt` 作为无障碍名称
  - **LhDescriptions**：条目改用 `<dl>` / `<dt>` / `<dd>` 语义结构（样式类名不变，已重置 `dl` 与 `dd` 的 UA 默认外边距），补位元素标记 `aria-hidden`

  中英文档（form、tag、badge、avatar、statistic、progress、descriptions 共 14 页）新增「无障碍」小节。`aria-invalid` 需表单控件侧读取 form-item 上下文，登记为后续债务单独排期。

- 96e3ccb: Add the LhBreadcrumb and LhBreadcrumbItem navigation components: native `nav + ol` semantics, link items (vue-router aware when present, native anchors otherwise), custom separators via prop or per-item slot, and `maxItems` collapsing with an accessible expandable ellipsis. Ships core pure logic, unit and component tests, zh/en docs, and full registry wiring.
- 3b730c7: Add four data-display components (Stage 2 of the roadmap): LhAvatar (image/icon/text avatars with error fallback), LhProgress (line and circle progress with status, custom color and format), LhStatistic (numeric display with precision, grouping, prefix/suffix), and LhDescriptions (label/value lists with column span and border mode). Each ships with core pure logic, unit and component tests, a docs page, and a playground demo.
- 96e3ccb: Add the LhDrawer component: an edge-anchored sliding panel with four directions (`right` / `left` / `top` / `bottom`), configurable size, mask click and Escape dismissal, body scroll locking, header / body / footer slots, and dialog accessibility semantics — focus moves into the panel on open, Tab cycles inside, and focus returns to the trigger on close. Shares the new focus-trap and positioning infrastructure with the overlay family.
- 96e3ccb: 新增 Dropdown 下拉菜单组件

  - 提供 `LhDropdown` 与 `LhDropdownItem` 两个组件，触发器可以是任意元素，菜单项通过 `command` 标识并随 `command` 事件抛出
  - 支持 `hover` / `click` / `contextmenu` 三种触发方式，`contextmenu` 会阻止浏览器默认右键菜单
  - 键盘交互遵循 WAI-ARIA menu 模式：方向键循环（跳过禁用项）、Home/End 跳首尾、Enter/Space 触发并关闭、Esc 关闭并归还焦点
  - 禁用项使用 `aria-disabled` 以保留在无障碍树中，但方向键与回车均不触发事件
  - 支持 12 种 `placement`、`max-height` 菜单限高、`v-model:visible` 受控模式与编程式 `show` / `hide` / `toggle`

- 96e3ccb: Add the LhPagination component: pure-function page-window algorithm with edge snapping and ellipses, `v-model:current` / `v-model:pageSize`, size changer, jumper with a real label, total display and a compact simple mode. All controls carry localized aria-labels and the active page is marked with `aria-current="page"`.
- 96e3ccb: Add the LhPopconfirm component: a lightweight inline confirmation bubble built on the shared positioning engine, with `info` / `warning` / `danger` tones, `role="alertdialog"` semantics, focus landing on the confirm button, Tab cycling between the two actions, Escape treated as cancel, and confirm/cancel labels sourced from the locale (overridable via props).
- 96e3ccb: Add the LhPopover component: a rich floating panel with `click` / `hover` / `focus` / `manual` triggers, twelve placements backed by the new self-contained positioning engine (flip on main-axis overflow, shift on cross-axis overflow), configurable teleport target, arrow, and WAI-ARIA dialog semantics — the click trigger moves focus into the panel, Tab cycles inside it, and focus returns to the trigger on close.
- 96e3ccb: Add the LhSteps and LhStep components: wait/process/finish/error status machine with an optional global override, horizontal/vertical directions, clickable navigation (finished/current steps render as named buttons), title/description slots, and `aria-current="step"` on the active item.
- 96e3ccb: Add the LhTabs and LhTabPane components implementing the WAI-ARIA APG tabs pattern: `tablist/tab/tabpanel` role wiring, roving tabindex, arrow/Home/End navigation with automatic activation (skipping disabled panes), Delete-to-close, line/card appearances, top/bottom positions, and closable/addable modes with reactive pane registration.
- 3b730c7: Add four new components: LhTag (labels with closable support), LhBadge (count/dot badges, fixed to apply styles through the `lh-badge__content` element on the root container), LhCascader (multi-level cascading selection with search), and LhTimePicker (time selection with stepping). Each ships with core pure logic, unit and component tests, and a docs page.
- 96e3ccb: 新增 LhAlert 警告提示组件：info/success/warning/danger 四语义，可带图标、标题与关闭按钮，plain 朴素描边样式。**live region 角色随语义联动**（APG）：`warning`/`danger` 为 `role="alert"` 立即播报，`info`/`success` 为 `role="status"` 温和播报；关闭按钮为真实 `<button>`，aria-label 取语言包 `alert.close`（中「关闭警告」/英 "Dismiss alert"，6 份语言文件同步）。语义色浅底由 `color-mix()` 从语义色派生，自动跟随主题与明暗模式。接入 `useLhComponentTheme` 与 `sx`；ConfigProvider 的 `LhThemeableComponent` 白名单新增 `'alert'`。
- 96e3ccb: BackTop 新增 `scrollend` 事件：滚动停止时携带当前 scrollTop 抛出。原生 `scrollend` 优先（Chromium 114+ / Safari 18.2+，`supportsScrollEnd` 特性探测），旧浏览器退回 scroll + 150ms 防抖（新共享 composable `useLhScrollEnd`）。常用于锚点联动、数据懒加载。
- 96e3ccb: 新增 LhCard 卡片组件：header/cover/主体/footer 四区结构，阴影三档（always/hover/never）。`clickable` 时整卡承担 button 键盘语义（`role="button"` + `tabindex="0"` + Enter/Space 激活 + `:focus-visible` 焦点环，APG button pattern）；`loading` 时内容区以自绘骨架占位并输出 `aria-busy="true"`。接入 `useLhComponentTheme`（themeVars/bgPattern/componentTheme 全链路）与 `sx` 快速布局——sx 高频组件接入完成 **5/5**（Button、Input、Dialog、Tooltip、Card）。ConfigProvider 的 `LhThemeableComponent` 白名单新增 `'card'`。
- 96e3ccb: DatePicker 月份/年份面板与插槽自定义文案：

  - **DatePicker 月份/年份面板落地**：`mode` 的 `'month'` / `'year'` 此前声明但面板未实现（`toggleView` 为空壳）。现实现三层视图切换（日期 ⇄ 月份 ⇄ 年份）：面板标题可逐级下钻，月份/年份模式下打开即落在对应网格、点击直接选中并关闭（无底部按钮）。月份格文案消费语言包 `datepicker.month1~12` 死键（中文「1 月…12 月」/英文 Jan…Dec），年份网格复用 core 的 `generateYears`（此前无人消费）。core 的 `generateMonths`/`generateYears` 不再是死代码。
  - **插槽自定义文案**（降低对 i18n 的硬依赖）：
    - LhSelect 新增 `empty` 插槽——自定义下拉空状态内容，默认仍为语言包 `select.noData`；
    - LhCascader 新增 `no-match` 插槽——自定义过滤无匹配内容，默认仍为语言包 `cascader.noMatch`。
  - **文档**：date-picker 中英文档补「选择模式」小节与可运行示例；select/cascader 中英文档补 Slots 表；修正 EN cascader Slots 表此前列出的幽灵插槽（`default`/`option` 组件中不存在）与 EN date-picker Props 表漂移（`type`→`mode`、绑定值类型、format 默认值）。

  至此语言包 `datepicker` 组全部键（weeks/month1-12/year/month）均已接入组件，仅 `months` 数组保留为消费者便利别名。

- 96e3ccb: 新增 LhDivider 分割线组件：支持水平/垂直方向、虚线样式与带文案分割（文案左/中/右对齐）。带文案时输出 `role="separator"` 分组语义，垂直方向声明 `aria-orientation="vertical"`；纯装饰时 `role="presentation"` 移出无障碍树。含 core 纯逻辑、单元与组件测试、中英文文档与侧边栏（新增「布局组件」分组）。
- 81210a0: # Divider 竖向支持文案

  此前 `hasContent` 锁死为 `direction === 'horizontal' && !!slots.default`，导致 share 的
  `needsAriaOrientation(direction, hasContent)` 要求的「有文案且竖向」恒不可达，
  `aria-orientation="vertical"` 从未输出。本次放开横向门控：

  - 竖向分割线传入默认插槽时渲染文案，升级为 `role="separator"` 并声明 `aria-orientation="vertical"`
    （横向是 separator 的默认方向，仍不声明）
  - 竖向文案恒居中——`labelPosition` 是横向语义，不产出 `--label-*` 修饰类
  - 竖向文案的纵向布局（线段排在文案上下）由 `@lh-ui/share` 的 scss 承载
  - 中英文档「文案只支持水平方向」「垂直方向不渲染文案」等表述同步修正

  依赖 `@lh-ui/share` 的 divider scss 与 `getDividerClassNames` 同步改动。

- 96e3ccb: 文档站新增「主题预设」导航栏切换器：在顶部导航栏可一键切换 5 套国风预设（青花瓷/松花绿/朱砂/水墨/藤黄），站点外壳（品牌色、按钮、装饰）跟随预设主色变化，选择持久化到 localStorage 并通过 head 内联脚本防闪烁；预设与明暗模式保持两轴独立。同时补齐全部 49 个组件中英文文档的属性示例覆盖（含 Calendar 的 `mode="input"` / `:panels="2"` 新形态演示），并在主题指南中统一说明跨组件的 `themeVars` / `bgPattern` 通用属性；dev playground 补上 Calendar 与 Image 演示。
- 96e3ccb: 新增 LhEmpty 空状态组件：默认内联水墨插画（主题变量着色，跟随明暗模式），支持自定义描述、自定义图片与动作区插槽。容器 `role="status"` 自动播报空态；装饰性图片 `alt=""` 对屏读隐藏。语言包新增 `empty` 组（`empty.description`，中「暂无数据」/英 "No data"，6 份语言文件同步）。含 core 纯逻辑、单元与组件测试、中英文文档。
- 96e3ccb: Grid 阶段化增强（DEV-F8）：**响应式断点**——Col 新增 `xs/sm/md/lg/xl` 分档（Tailwind 阈值 640/768/1024/1280，`resolveBreakpoint` / `resolveResponsiveSize` 纯函数，未声明档位向下回退、xs 兜底），新增共享 `useLhBreakpoint` composable（matchMedia 模块级单例，SSR/jsdom 安全降级 xs）；**push/pull**——`getColStyle` 消费平移字段，起点钳制 ≥1。
- 96e3ccb: 国际化收口，语言包文案真正接入组件：

  - **LhSelect** 接入 `t()`：未传 `placeholder` 时兜底显示语言包文案（中文「请选择」/英文「Please select」），空状态硬编码的 `No options` 改为 `t('select.noData')`（中文「暂无数据」/英文「No data」），切换语言即时生效。
  - **LhInput** placeholder 兜底：未传时 fallback 到 `t('input.placeholder')`（「请输入」/「Please input」）；有 `label` 时仍保持空占位以避让浮动标签。
  - **LhCascader** placeholder 兜底改由组件层通过 `t('cascader.placeholder')` 提供，`@lh-ui/core/cascader` 中硬编码中文的 `getDefaultCascaderPlaceholder()` 一并移除（core 层不再放用户文案）。
  - **`lhlocale.t()` 键类型收紧**：由 zh-CN 的 `as const` 结构推导深路径联合类型，已知文案键获得自动补全与拼写校验；动态拼路径等场景仍可通过宽松重载使用，运行时行为不变。

  预留的 ja-JP / ko-KR / de-DE / fr-FR 仍为英文兜底骨架，`LH_LANGUAGE_CONST` 中的登记保持注释，避免放出名不副实的「已支持」语言。

- 81210a0: 命名规范收敛：非第三方公共符号补齐 `LH` 前缀（breaking rename），并补本地开发联动说明

  **公共 API 改名（breaking，需迁移）**

  - `usePresetTheme` → `useLhPresetTheme`（与 `useLhTheme` 同构，迁移全局预设主题切换的 import 即可）
  - `LocalePath` → `LhLocalePath`（本仓再导出的类型别名；`@lh-ui/share/locales` 侧原名保持不变）

  模块内部符号同步改名（不进公共入口，外部无感）：`mountComponent` → `mountLhComponent`、
  `createIconComponent` → `createLhIconComponent`、`CONFIG_PROVIDER_KEY` → `LH_CONFIG_PROVIDER_KEY`、
  `DropdownItemRecord` → `LhDropdownItemRecord`、`showLoading` / `closeLoading` / `closeLoadingOn`
  → `showLhLoading` / `closeLhLoading` / `closeLhLoadingOn`、message 与 notification store 的
  `messageConfig` / `messageRecords` / `openMessage` / `closeMessage` 等全部加 `lh` / `Lh` 前缀。

  **命名规范**（详见 `docs/project/development-guide.md`）：反域名根 `top.lhgb`（反写 `www.lhgb.top`）；
  npm 端包名维持 `@lh-ui/*`（npm 包名不允许点号，反域名只落 `homepage` / `repository` 等元信息）；
  非第三方符号必须带 `LH` 前缀——常量 `LH_XXX`、类型/接口 `LhXxx`、composable `useLhXxx`、
  模块级单例 `lhXxx`。原生端仓（android / ios / harmony / windows）的 applicationId / bundleId /
  package 才使用 `top.lhgb.*` 形式。

  **本地开发联动**：家族布局下 `pnpm typecheck` 现在也解析到同级 `lh-ui-share` 仓源码
  （`scripts/gen-dev-tsconfig.mjs` 生成 `tsconfig.dev.json`，带兄弟仓存在性守卫，
  CI 单仓 clone 时自动回退 npm 包类型）；新增 `pnpm build:local`
  （`scripts/link-local-share.mjs`），把 `node_modules/@lh-ui/share` 改挂到兄弟仓**已构建产物**——
  share 未发版时本地构建不再被 npm 产物滞后卡断，bare 引用与 external 语义不变
  （`pnpm build` / 发版链仍读 npm 包，保持「share 先发版」的家族红线）。根 `tsconfig.json` 与
  rollup 配置逐字节不动，发布声明仍保留 bare `@lh-ui/share/**` 引用。

- 96e3ccb: Menu 阶段化增强（DEV-F3）：垂直内联模式 ↑/↓/Home/End **跨边界键盘遍历**——根节点事件委托（`moveMenuFocus` 纯函数循环跳禁用），焦点可跨「叶子项 ↔ 子菜单标题 ↔ 已展开面板内项」边界移动，收起面板内的项（`aria-hidden`）自动跳过；水平模式保留标题自身的 ←/→ 语义。中英文档无障碍章节同步修正（移除与实现不符的 roving tabindex 表述）。
- 96e3ccb: 迁移到 @lh-ui/share 共享层：框架无关的 core 逻辑、常量、语言包、主题与全部组件 SCSS 统一由
  `@lh-ui/share`（npm 依赖，已发 0.3.0）提供，本仓库不再持有这些源码。

  - 新增运行时依赖 `@lh-ui/share`；`@lh-ui/vue3/theme` 子路径改为转发 `@lh-ui/share/theme`
    （公开导出面不变：`getThemeVars` / `THEME_PRESETS` / 五个预设 / 主题类型）。
  - 删除 `packages/{core,constants,theme,locales,utils}` 与各组件 `style/` 目录；样式唯一源回归
    share，本仓库 build-styles 改为编译已安装包的 scss，`@lh-ui/vue3/style/<name>` 的 scss 拷贝
    修正了原先指向不存在目录的相对 `@use`。
  - 测试收敛：`tests/unit/core/`（53 组件 spec + shared/）与 `tests/unit/utils/css-var.spec.ts`
    全部删除——core 单测唯一一份在 share（迁移中补齐了 divider 的 `borderStyle` 用例）；
    本仓库单测只剩 Vue 专属层（composables / locale / 组件注册表 + 58 个组件集成测试）。
  - 样式导入统一为 `@lh-ui/share/styles/<name>`（不带 `/index.scss` 后缀，share 的 `./styles/*`
    导出已自动补全）；`CONTRIBUTING.md` / `MEMORY.md` / `.npmignore` 同步更新。
  - 行为改进（`packages/locale` 响应式壳）：`use()` 不再覆写已注册的内置语言包、`setLocale()`
    对未注册语言回退到默认包、新增 `tm()` 复数翻译；`version` 为 `ref`，组件内
    `void lhlocale.version.value` 即可订阅语言切换。
  - 构建配置跟进：rollup/dts/vite/vitest 别名清理、`@lh-ui/share` 保持 external、`verify-dts`
    白名单放行 `@lh-ui`；覆盖率阈值随 `packages/core` 单测迁出而清空，需重测后回填。

- 96e3ccb: DatePicker / TimePicker 语言包死键消费收口，组件文案不再硬编码：

  - **DatePicker 表头星期**：面板日历表头此前硬编码 `['日','一','二','三','四','五','六']`，现消费语言包 `datepicker.weeks.sun→sat`（英文 Sun…Sat），切换语言即时生效。
  - **DatePicker 占位符分层修正**：`@lh-ui/core/date-picker` 的 `getDefaultDatePickerPlaceholder()`（硬编码「年/月/日」）已删除，格式转义改由组件层结合 `t('datepicker.year'/'month')` 完成，未传 placeholder 时按 format 生成语言对应的占位符。
  - **TimePicker 列标题**：时/分/秒列标题此前硬编码，现消费 `timepicker.hour/minute/second`（新增键，中文「时/分/秒」、英文 H/M/S）。
  - **TimePicker 占位符分层修正**：`@lh-ui/core/time-picker` 的 `getDefaultTimePlaceholder()`（硬编码「时/分/秒」）已删除，同款改由组件层 `t()` 完成。
  - 6 份语言包（zh-CN / en-US / ja-JP / ko-KR / de-DE / fr-FR）同步新增 timepicker 列标题键；至此 `datepicker`/`timepicker` 两组语言键中仅 `datepicker.months`/`month1-12` 因月份列表面板尚未实现而保留为死键。

  **Breaking（类型层）**：`@lh-ui/core/date-picker` 与 `@lh-ui/core/time-picker` 不再导出 `getDefaultDatePickerPlaceholder` / `getDefaultTimePlaceholder`，如有消费者需自行在组件层组装占位文案。

- 96e3ccb: 主题切换收口：

  - **修复预设主题二次前缀 bug**：`getThemeVars()` 返回的键已带 `--lh-` 前缀，传入 `LhConfigProvider` 的 `themeVars` 后曾被拼成 `--lh---lh-primary-color`，预设主题切换在运行时静默失效。前缀逻辑收敛为幂等的 `toCssVarName()`（`packages/utils/css-var.ts`），ConfigProvider 与 `useLhComponentTheme` 统一改用，已带前缀的键不再二次拼接。**Breaking（类型层）**：`packages/utils` 的 `cssVars()` 现由 `css-var.ts` 重新导出，行为不变。
  - **新增 `usePresetTheme` composable**：与切换明暗的 `useLhTheme` 互补，用于切换国风预设色板。默认把预设变量写到 `:root`（全局生效、持久化到 localStorage，默认 key `lh-ui-preset`，优先级低于 ConfigProvider 局部覆盖）；传入 `applyToRoot: false` 可只取已去掉 `--lh-` 前缀的 `themeVars`，交给 `LhConfigProvider` 接管作用域。返回 `preset`、`setPreset`、`presets`、`themeVars`。
  - **导出**：`usePresetTheme` 从 `lh-ui`（`src/index.ts`）与 `~/utils` 命名导出。
  - **文档修正**：`docs/guide/themes.md`「编程式切换」示例改用 `usePresetTheme`，并说明全局（`:root`）与局部（ConfigProvider）两种机制的适用差异，英文站同步补齐该小节。

- 96e3ccb: 包名重命名为 `@lh-ui/vue3`（原 `@lh-ui/lh-ui-plus`），并同步 UMD 产物命名。

  - npm 包名：`@lh-ui/lh-ui-plus` → `@lh-ui/vue3`，安装命令变为 `npm install @lh-ui/vue3`，全量/按需引入路径前缀全部跟进
  - UMD 产物：`dist/lh-ui-plus.js` → `dist/vue3.js`，CDN 全局变量 `LhUIPlus` → `LhUI3`（`unpkg` / `jsdelivr` / `exports["./dist"]` 同步更新）
  - 内部别名 `lh-ui` → `@lh-ui/vue3`（tsconfig / vite / vitest / docs / 两个 rollup 配置），rollup 别名表补齐此前缺失的库入口条目
  - 文档站品牌名 `lh-ui-plus`（站点标题、SEO、GitHub 仓库地址、hostname）保持不变

  **升级方式**：旧名 `@lh-ui/lh-ui-plus` 不再发布新版本，请卸载后改装 `@lh-ui/vue3`，并全量替换代码中的包名引用。

- 96e3ccb: 新增 LhSkeleton 骨架屏与 LhSkeletonItem 独立占位块：文本行（末行自动缩短模拟段落）/矩形/圆形三种占位形状，可组合头像，`loading` 切换真实内容。占位块 `aria-hidden` 对屏读隐藏，容器输出 `aria-busy="true"` + `aria-live="polite"` 在加载完成时播报；呼吸动画尊重 `prefers-reduced-motion` 自动关闭。含 core 纯逻辑（含行宽算法）、单元与组件测试、中英文文档。
- 96e3ccb: 新增 LhSpace 间距组件：为子元素提供统一间距，基于原生 CSS `gap` 实现（无额外 DOM 包裹）。支持预设三档（映射 `--lh-spacing-*` token）、像素数字与 `[水平, 垂直]` 独立间距，以及换行与对齐。容器为 `role="presentation"` 纯布局元素。含 core 纯逻辑、单元与组件测试、中英文文档。
- 96e3ccb: LhDivider 与 LhSpace 接入 `sx` 快速布局属性：`sx` 声明进各自 Props，根元素转成内联样式（Divider 新增 `dividerStyle`；Space 合并进既有 `spaceStyle` 且展开在末尾，可覆盖 `alignment`）。sx 接入范围从高频五件扩展到 18 个组件，中英文档 Props 表同步补齐 `sx` 行。
- 96e3ccb: sx 快速布局属性完成顶层样式组件全覆盖：Avatar、Badge、Cascader、Checkbox、DatePicker、Descriptions、Form、InputNumber、Progress、Radio、Select、Slider、Statistic、Switch、Tag、TimePicker 共 16 个存量组件新增 `sx?: SxProps` prop，转内联样式作用于根元素。

  - `config-provider` 与 `icon` 无样式根，按设计不接入；至此 34 个顶层样式组件 34/34 支持 sx
  - Cascader / Select / DatePicker / TimePicker 四个带浮层的组件与 Tooltip 一致，sx 作用于触发器根元素，浮层面板不受影响
  - Avatar 复用既有根样式绑定；其余组件 sx 均绑定在根元素，不与组件内部布局样式（进度条宽度、描述列表列宽等）混算

- 81210a0: 跟随 share 仓命名规范收敛，同步本仓全部引用（breaking rename，机械替换）

  `@lh-ui/share` 已把非第三方公共符号补齐 `LH` 前缀（见 share 的 `lh-prefix-naming` changeset），
  本仓同步消费侧改名，本地联动即时生效：

  - `SxProps` → `LhSxProps`（约 150 处组件 Props 声明，`packages/components` 全量）
  - `ThemePresetName` → `LhThemePresetName`、`THEME_PRESETS` → `LH_THEME_PRESETS`
    （`packages/composables` 主题切换）
  - `Leaves` → `LhLeaves`、`LocaleOptions` → `LhLocaleOptions`（本仓 `types/locale.ts` 本地副本，
    与 share 同步）
  - `packages/locale/index.ts`：share 已直接导出 `LhLocalePath`，
    `type LocalePath as LhLocalePath` 的别名简化为 `type LhLocalePath`，外部导出面不变
  - docs 全量 props 表格与示例代码同步（`SxProps` → `LhSxProps`）

  用户侧迁移：从 `@lh-ui/vue3` 引入的类型名按上表改 import 即可；`zhCN` / `enUS` 不变。

- 96e3ccb: Table 阶段化增强（DEV-F4）：**多级表头**——列配置嵌套 `children` 即得（可无限嵌套），`buildHeaderCells` 纯函数展开 colspan/rowspan 布局，表体按叶子列对齐，组表头在其叶子区间全部 fixed 同侧时继承 sticky 偏移；**列筛选**——列配置 `filters`（+ 可选 `filterMethod` / `filterMultiple`），表头筛选触发器弹层（复用 popper 引擎），勾选 + 确定/重置草稿式交互，`filterChange` / `update:filteredValues` 事件，数据链为 过滤 → 排序 → 虚拟切片；**列宽拖拽**——`resizable` 总开关 + 列级 `resizable`，手柄 `role="separator"` 可聚焦 ←/→ ±10px，拖动下限 40px，`columnResize` 事件。i18n 六语言新增 `table.filterTitle` / `filterConfirm` / `filterReset` / `resizeLabel`。
- 81210a0: # 主题定制台 + 本地联动 alias + docs 示例规范

  ## docs 站（用户可见）
  - **新增「主题定制台」页**（中英双语，`guide/theme-studio`）：选预设作起点 →
    按语义令牌分组调色 → 预览区 `document.documentElement.style.setProperty` 实时生效
    （含明/暗切换）→ 导出一份 scss（`:root { --lh-* }` + 暗色块 +
    `@use '@lh-ui/share/styles/index.scss'`），一键复制。页面复用 share 的
    `THEME_PRESETS` / `getThemeVars` / `buildPresetStyleText` 原语，仅依赖
    vue + vitepress + `@lh-ui/share/theme`。
    （修复控制台告警：颜色输入框 `v-model` 会把空串（可选令牌跟随默认链路）和
    `getComputedStyle` 取回的 `color-mix(...)` 计算值直接写进 `<input type="color">`，
    被浏览器拒绝并刷 "does not conform to the required format"。改为只采纳 hex 初始化 +
    颜色输入框取值经 `colorInputValue` 保护，非 hex 一律回退占位色。）
  - **示例代码统一 npm 包名**：`theme-studio` 页中 4 处误写的 `lh-ui-plus`（仓库名）
    改为实际包名 `@lh-ui/vue3`。

  ## 开发体验（不发版，docs/scripts 均不在 files 内）
  - **带守卫的本地联动 alias**：`vite.config.ts` / `vitest.config.ts` /
    `docs/.vitepress/config.ts` 在家族布局下把 `@lh-ui/share/**` 解析到同级 share 仓的
    **源码**（改 share 即时热更新，无需构建或发版）；兄弟仓不存在时（CI 单仓 clone）
    守卫返回空、自动回退 npm 包，两种布局都能跑。bare `@lh-ui/share` 排在子路径正则之后，
    避免前缀匹配吞掉子路径。
    （修复：styles alias 此前把 `@lh-ui/share/styles/<name>` 映射到 `styles/<name>`，
    但 share 源码布局是 `styles/<name>/index.scss`——exports 用 `"./styles/*": "./styles/*/index.scss"`
    补了这层而 alias 没有，导致 docs 里 58 条无后缀样式 import 解析失败。已按 exports 语义
    拆成三条有序规则：带扩展名原样落盘 / `theme/common/<x>` 补 `.scss` / 组件名补 `/index.scss`。）
  - **`verify:docs-sync`**（`scripts/verify-docs-sync.mjs`）：
    ① 校验与 lh-ui-vue2 共享的 docs 组件（`ThemeStudio.vue`）逐字节一致；
    ② 校验展示围栏的 import 只用 npm 包名，禁止 `~/` / `@/` 库内部 alias
    （页面级 `<script setup>` 走站点自身 alias，不受限）。
  - AGENTS.md 补充示例代码规范、共享 docs 组件以本仓为源头的约定与 Commands 表入口。

  > 发布顺序：先发 @lh-ui/share（本次 0.4.0），本仓随后 `pnpm up @lh-ui/share` 回归。

- 81210a0: # ThemeStudio 重写为双兼容 Options API（行为不变）

  `docs/.vitepress/components/ThemeStudio.vue` 与 lh-ui-vue2 侧逐字节共享。vue2 docs 已于
  2026-10-10 迁移 VuePress 1.x（Vue 2.7 原生运行时，vue-loader 15 不支持 `<script setup>`），
  共享组件统一改为**双兼容 Options API**（Vue 3 与 Vue 2.7 均可运行）：

  - 去 `vitepress` 的 `useData` 依赖：语言检测改 `$lang`（VuePress 原生）+ pathname 前缀兜底
    （VitePress 侧）；英文页 SSR 首帧可能先以中文渲染、水合后纠正（单页影响，可接受）。
  - 模板不使用 TS 断言（`as`）/ v-model 参数等 Vue3 专属语法；模块常量经 computed 暴露给模板。
  - `Vue.extend` → `defineComponent`：Vue 3.5 已移除 `extend` 导出，`import Vue from 'vue'` +
    `Vue.extend(...)` 在 VitePress 构建期直接报 `"default" is not exported by vue`，
    `docs:build` 全线失败；`defineComponent` 两代都有，双兼容成立。
  - 预设选择、逐令牌编辑、明暗预览、SCSS 导出等功能与交互完全不变。

  > 共享约定已登记 plus AGENTS.md「与 vue2 共享的 docs 组件」条目；
  > `pnpm verify:docs-sync` 继续守护两仓逐字节一致。docs 组件不在 npm 产物内。

- 81210a0: 三库审计修复批次（2026-10 审计报告 P-02 ~ P-16）：

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

- 96e3ccb: Roll out the `sx` quick-layout prop across the four high-frequency components: `LhButton`, `LhInput`, `LhDialog`, and `LhTooltip`. The prop accepts Tailwind-style shorthand (`mt`, `px`, `flex`, …) scaled on an 8px base and compiles to inline styles on the component root element, so common spacing and sizing tweaks no longer need a wrapping element or custom CSS.
- 96e3ccb: Tree 阶段化增强（DEV-F5）：**懒加载**——`lazy` + `load(node, resolve, reject)`，展开未加载节点先请求（箭头旋转 loading 态），resolve 后不可变合并子树（`mergeLoadedChildren` 纯函数）并展开、发 `nodeLoad` 事件，reject/同步异常取消；**checkStrictly**——父子勾选不联动（只增删自身键，无级联与半选），`getNodeCheckState` / `toggleCheckKeys` 纯函数带选项透传。
- 96e3ccb: 新增 Wave D 命令式全局反馈三组件：

  - **LhMessage 全局轻提示**：服务式 API（`LhMessage.success/info/warning/danger/loading(content, options?)` 与 `LhMessage(options)`），队列渲染在独立 `createApp` 容器；`duration` / `max` / `offset` / `appendTo` 全局配置，返回 `{ close }` 句柄
  - **LhNotification 通知**：四角堆叠通知卡片，标题 / 正文 / 语义图标 / 可关闭 / 自动消失；`onClick` 卡片具备按钮语义
  - **LhLoading 加载**：服务（`LhLoading.show({ target?, text?, lock? })`，全屏或指定容器）+ `v-loading` 指令双形态；`inert` 渐进增强防止操作底层内容
  - **LhSpinner 旋转图形**：基础旋转图形，loading 遮罩内部同由它呈现

  激活 `message.close` 死键，新增 `notification` / `loading` 语言组（六语言同步）。live region 语义对齐 APG（`role="status"` / `role="alert"` / `role="region"`），动效尊重 `prefers-reduced-motion`。

- 96e3ccb: 新增 Wave E 数据与媒体增强八组件：

  - **LhTimeline(+Item) 时间线**：语义 `<ol>` 事件流，四语义节点 / 空心节点 / 自定义圆点，左右交替布局
  - **LhCollapse(+Item) 折叠面板**：APG accordion pattern（`button[aria-expanded]` + `role="region"`），手风琴约束，CSS `grid-template-rows` 高度过渡（零 JS 测高）
  - **LhRate 评分**：radiogroup 语义 + roving tabindex 键盘调分（半星 0.5 步进），只读输出星级文本，半星用 background-clip 文字渐变
  - **LhSegmented 分段选择器**：radiogroup 互斥选择，方向键跳过禁用项，选中底色 CSS 过渡
  - **LhCalendar 日历面板**：复用 DatePicker core 月网格算法，`range` 范围约束，APG grid pattern 方向键导航（±1 天 / ±7 天 / 翻月）
  - **LhAffix 固钉**：IntersectionObserver 越界检测（无 IO 环境回退 scroll），吸顶 / 吸底
  - **LhBackTop 返回顶部**：阈值显隐，原生平滑滚动（reduced-motion 降级 auto）
  - **LhImage(+LhImageViewer) 图片**：`alt` 类型层必填，原生懒加载，失败占位插槽；预览器 dialog 语义 + 焦点圈 + Esc/方向键，工具按钮全命名

  新增 `collapse` / `rate` / `backtop` / `image` 语言组（六语言同步）；全部组件接入 sx 与 `--lh-*` 主题变量。

- 96e3ccb: 新增 Wave F 首个组件 **LhMenu 导航菜单**（+ LhMenuItem / LhSubMenu / LhMenuItemGroup）：

  - **两种布局**：垂直（`role="menu"`，子菜单内联展开）与水平（`role="menubar"`，子菜单飞出面板）
  - **嵌套子菜单**：LhSubMenu 可递归嵌套，provide/inject 上下文传递激活态 / 展开态 / 深度；飞出定位复用 popper 引擎（flip / shift / 触发器滚出视口自动收起）
  - **受控 / 非受控双模**：`v-model` 激活项、`openeds`（或 `defaultOpeneds`）展开态；`uniqueOpened` 手风琴约束
  - **折叠态**：`collapse` 把垂直菜单收成图标条，子菜单改为飞出面板
  - **分组**：LhMenuItemGroup 提供不可选的分组标题（`role="group"`）
  - **无障碍**：APG menu pattern——Enter/Space/→ 展开并聚焦首项、← 收起、Esc 关闭，roving tabindex，禁用项保留焦点位；内联展开用 CSS `grid-template-rows: 0fr/1fr` 零测高过渡
  - 主题变量 `--lh-menu-*`（三处 + 暗色）、i18n `menu.submenuLabel`（六语言同步）、sx 接入

- 96e3ccb: Wave F 剩余九组件落地（按用户指定顺序）：

  - **LhTable 表格**：列配置式 + 排序（`aria-sort` 三态循环）+ CSS `position: sticky` 固定列 + 斑马纹/边框/尺寸 + 单元格作用域插槽 + **虚拟滚动**（`height` 启用，窗口计算为 core 纯函数）
  - **LhLayout + LhLayoutHeader/Aside/Main/Footer**：语义标签骨架（`header`/`aside`/`main`/`footer`），含 Aside 时自动垂直；`aria-label` 命名 landmark
  - **LhRow + LhCol 栅格**：24 栅格制**用 CSS Grid 实现**，span/offset 映射 `grid-column`，无 flex 百分比换算
  - **LhTree 树形控件**：扁平化 + 勾选级联 + 半选态（真实 `indeterminate`）全在 core 纯函数；APG tree pattern 键盘（↑↓/→←/Home/End 循环跳过禁用）；受控展开/选中/勾选三组双模
  - **LhTreeSelect 树选择**：触发器 + Tree 面板；单选返回 string、多选返回 string[]；`aria-haspopup="tree"`，点击外部/Esc 关闭并归还焦点
  - **LhTransfer 穿梭框**：双 `role="listbox"` + APG pattern，不可变分区与移动在 core；每侧独立搜索、全选跳过禁用
  - **LhUpload 上传**：原生 input + 拖拽区；**请求由使用方 `request` prop 提供**（零运行时依赖）；大小/数量/类型校验，进度 `role="progressbar"`、失败 `role="alert"`
  - **LhAnchor 锚点**：`<nav>` + `aria-current="location"`，滚动联动高亮，`prefers-reduced-motion` 降级即时跳转
  - **LhVirtualList 虚拟列表**：定高与动态高度双模式（动态走预计算偏移 + 二分查找），`itemSize` 由调用方提供

  新增 i18n 组 `table` / `tree` / `treeSelect` / `transfer` / `upload` / `anchor`（六语言同步）；全部组件接入 `sx` 与 `--lh-*` 主题变量（含暗色）。

### Patch Changes

- 96e3ccb: Improve accessibility of Button and Tooltip. Button ships a unified `:focus-visible` keyboard focus ring (previously `outline: none` with no focus indicator), stops the loading spinner under `prefers-reduced-motion`, and documents the aria-label convention for icon-only buttons. Tooltip now links the trigger to the popper via `aria-describedby` while visible and shows on keyboard focus (`focusin`) for the hover/focus trigger modes, aligned with the WAI-ARIA APG tooltip pattern. Note: the `click` value of Tooltip `trigger` is documented as not implemented yet.
- 96e3ccb: 文档站全站 API 表与源码对齐：以 `packages/components/*/src/types.ts` 的 Props 接口与各组件 `withDefaults` 默认值为事实来源，重建 72 个中英文档的主组件 Props 表（补齐 Input、Dialog、Tooltip 等长期缺失的属性行、校正漂移的默认值与类型展开式，保留人工说明文案）。新增 `pnpm api:check` / `pnpm api:fix` 两个脚本（自研 TS compiler API 解析，无新依赖）用于持续核对，避免 API 表再次漂移。
- 70c53ef: Add LhCheckbox and LhCheckboxGroup with boolean and array v-model modes, disabled states, indeterminate styling, and group change events.
- 70c53ef: Add ESLint, Prettier, TypeScript typecheck, and Changesets quality gates. Improve core logic types and clarify optional dialog close behavior.
- 70c53ef: Centralize component registration and exports to make future component additions consistent across full installation and individual entry points.
- 70c53ef: Fix dev and documentation component registration/styles, correct Dialog API examples, and strengthen locale message typing.
- 96e3ccb: 全站组件文档示例补全 `<script>` 并区分 API 风格：中英双语 116 页中 264 处仅有 `<template>` 的示例全部转为 `vue composition`（`<script setup lang="ts">`）+ `vue options`（`export default`）相邻成对——静态示例配空脚本、含状态示例补类型化 `ref` 与 `data()`/`methods`（状态名与页面级演示脚本一致），另为 122 处未打标的既有 script 块补齐风格标签，未标记围栏清零，「API 风格」切换器在每个示例上均生效；`check-api-style-pairs.mjs` 新增纯模板块缺口检查并固化新约定，`fix-docs-demo-state.mjs` 修正 v-for/插槽局部量与字面量误报。
- 96e3ccb: 全站组件文档示例适配 API 风格切换：为 55 个组件文档页（中英双语）中含逻辑的示例补齐 Options API 代码变体（130 处），与 Composition API 变体相邻成对，导航栏「API 风格」切换器现可在全部组件页正常工作；新增 `scripts/check-api-style-pairs.mjs` 配对检查脚本（--check/--fix）作为文档门禁。
- 96e3ccb: 文档站构建优化：

  - **消除 Sass 弃用警告**：`docs/.vitepress/config.ts` 启用 modern Sass API（`scss.api = 'modern'`），消除全部 34 条 `legacy-js-api` Deprecation Warning。项目 SCSS 全部使用 `@use` 现代语法，已逐一用 modern API 编译验证 43 个样式文件均通过。
  - **支持子路径部署**：新增 `DOCS_BASE` / `DOCS_HOSTNAME` 环境变量，`base`、sitemap hostname、`og:url` 与 JSON-LD `url` 全部跟随配置，无需改动源码即可部署到子路径。
  - **`robots.txt` 动态生成**：新增 `scripts/build-docs.mjs`，在 `docs:build` 末尾按部署配置重写 Sitemap 地址（静态文件无法读取环境变量）。
  - **修复 LhHome 语言切换的硬编码路径**：改用 `withBase('/en/')` / `withBase('/')`，子路径部署下中英文切换不会跳错。
  - 贡献指南中英文版新增「文档站部署」一节，说明环境变量用法及 Windows Git Bash 的 MSYS 路径转换注意事项。

- 96e3ccb: 文档站首页打磨：「组件预览」区改为**分组组件总览**（7 组 58 项全量导航 chip，点击直达文档页，中英文站联动）；横幅「组件」计数由 `docs/.vitepress/data/components.ts` 数据源派生（不再硬编码，与侧边栏对齐）；新增 Table 多级表头/筛选/列宽拖拽、Tree 懒加载/checkStrictly、Grid 响应式断点/push-pull、BackTop scrollend 示例（中英同步）；修复 tooltip 页实时示例引用未声明状态的 demo-state 缺陷（中英）。
- 96e3ccb: 组件文档 API 表与「类型定义」章节双向关联：Props 表中整格为单个类型名（含 `[]` 后缀）或 `LH_*` 常量的单元格转为页内锚点链接，点击直达页尾对应展开条目；类型定义章节新增「常量」小节，自动提取 core 模块与 lh-constants 中该组件用到的公开常量（名称、取值、JSDoc 说明），此前 API 表默认值列裸露的 `LH_VIRTUAL_OVERSCAN` 等常量现可点击查看定义。
- 96e3ccb: 全部 58 个组件的中英文文档新增「类型定义」章节：自动提取组件 Props 接口与 `@lh-ui/core/*` 相关类型（含别名再导出与二级转发解析）的源码原文，以可展开的 `<details>` 列表呈现，用户可直接查看完整 TS 类型结构；新增 `pnpm types:check` / `types:fix` 门禁脚本（`scripts/gen-type-docs.mjs`）防止文档与源码漂移。
- 3b730c7: Fix the build pipeline: move inline SFC styles of date-picker/time-picker/cascader/config-provider into their canonical `style/index.scss` entries, generate real CSS artifacts via `scripts/build-styles.mjs` (the previous `outputDir` option was silently ignored and produced empty files), build the UMD bundle as part of `pnpm build`, and de-duplicate the `:root` token blocks emitted by the theme.
- 96e3ccb: 修复 Cascader 面板无法展示子级列的关键缺陷：`panels` 计算使用恒为空的 `expandedValues[0]` 推进列数据源，导致面板永远只渲染第一列、深层节点无法到达（「只有一层」的根源）；同族修复 `isPanelActive` 高亮下标错位、`onItemHover` 写入单值而非完整值路径、`onItemClick` 展开分支 slice 越界一位。

  另修复四项缺陷：`check-strictly` 此前未生效（现在点击任意层级节点可直接选中）；搜索结果面板分隔符硬编码为 `/`，现遵循 `separator` prop；`filterable` 开启时 `readonly` 失效（现在只读输入框不可编辑、聚焦不弹面板）；`emit-path=false` 时单选绑定末级值但输入框无法回显完整路径（现从叶值还原路径回显，搜索结果高亮同步修复）。同时 `item-config` 字段别名现在对路径回显、搜索、标签等全部代码路径生效（新增 core 归一化函数 `normalizeCascaderNodes`）。

  文档「路径显示与搜索」一节重写：示例预置选中值、数据加深为三级省市区、补全含完整数据的 composition/options 双版本代码块（中英文档同步）。

- 3b730c7: Fix ConfigProvider context reactivity: injected consumers now receive a computed ref, so prop changes on the provider (size, locale, themeVars, patternComponents, componentTheme) propagate to children. Previously the context was captured once at setup and never updated.
- 96e3ccb: 修复 DatePicker 点击「今天」按钮后面板未跳转到今天所在月份的问题：`selectToday` 现在会同步移动面板年月并回到日期视图。顺带修复点击相邻月份填充格不翻面、重新打开面板仍停留在上次浏览月份的问题。
- 96e3ccb: 接线此前文档中「声明但未在组件源码生效」的死属性：select、tree、tree-select、date-picker、tabs 等组件的Props 表与 `packages/components/*/src` 实现对齐，props 声明、默认值与透传全部落地，`pnpm api:check` 57 个组件 × 2 种语言 0 漂移。文档 Props 表由 `gen-api-tables.mjs` 依据 `types.ts` 全量重建后保持自动核对。
- 96e3ccb: 修复文档「示例与代码块不同步」：70 个文档页共 383 处漂移全部修正，`check-api-style-pairs.mjs --check-demos` 归零。DemoBlock 视觉示例为唯一真相，成对的 `vue composition / `vue options 代码块逐元素（属性、placeholder、icon、type、title）对齐；孤儿节补齐缺失的 DemoBlock 与页级状态（`locale`/`messages` 等），孤儿行删除；中英文成对同步。另外补齐 24 个组件的中英文 Events 事件表（含 dialog opened/closed、dropdown click、input keydown 缺行与 LhImageViewer Props 小节）。
- 96e3ccb: 修复焦点圈（Dialog / Drawer / Popover / Popconfirm 共用的 `getFocusableElements`）两处 Tab 序列枚举缺陷：

  - `tabindex="-1"` 的元素原本仍会被计入焦点圈——选择器只在 `[tabindex]` 通用分支排除了 `-1`，`button` 等标签名分支不看 tabindex。这类元素可用脚本聚焦但不在 Tab 序列中，Tab 循环会把焦点送到一个键盘永远到不了的位置
  - `hidden` / `aria-hidden="true"` / `display:none` / `visibility:hidden` 只检查了元素自身，挂在祖先节点上时整棵子树仍被当作可落入目标，`aria-hidden` 子树内的按钮会成为 Tab 落点

- 81210a0: GUI 回归测试发现的七项缺陷修复 + Form 异步校验缺陷。

  - **Slider 标量 v-model**（BUG-01）：`modelValue` 传标量时未归一化为二元组，填充条宽度与
    `aria-valuenow` 失效；watch 层面统一 `Array.isArray(val) ? [...val] : [val, val]`，单滑块
    恢复「从左起填充」语义，range 模式不受影响。
  - **Form 必填文案优先级**（BUG-02）：组件层在 `required` 为真时会合成一条无 `message` 的
    `{ required: true }` 规则并排在用户规则之前，旧实现的 `find` 命中合成规则、回退通用文案，
    吞掉用户自定义 `message`。现改为先取「带 message 的必填规则」，取不到再回退首个必填规则
    （逻辑在 `@lh-ui/share/core/form`，随 share 发版生效）。
  - **Table maxHeight 单位归一化**（BUG-03）：`max-height="200"` 这类无单位值未补 `px`，
    `bodyStyle` 对纯数字（数字与纯数字字符串）统一补 `px`，其余合法 CSS 值原样透传。
  - **Table 表头/表体列错位**（BUG-04）：表体竖向滚动条吃掉的宽度让两侧 grid 区域不同宽，
    `fr` 列解析结果不同、列边界错位。现按 `offsetWidth - clientWidth` 给表头补等宽右内边距，
    并在表体/幻影节点上挂 `ResizeObserver` 在容器缩放、`max-height` 切换、数据增减时重算；
    表头横向滚动条在 SCSS 中隐藏（样式在 share）。
  - **Form 异步校验**：`validateFormField` 返回 Promise 时未 `await` 就写错误信息，
    异步 validator 的结果被渲染成 `[object Promise]` 且校验结果恒 false；`item.vue` /
    `form/index.vue` 两处改为 `await` 后再写 `errorMessage`。
  - **docs demo 状态串扰**（BUG-05）：VitePress 页级 `<script setup>` 在全页共享一个作用域，
    menu 页的 `active`/`active2`、transfer 页的 `source` 被多个 demo 共用导致互相覆盖；
    拆成每个 demo 独立 ref，顺手删掉 segmented 页泄漏在 `</script>` 外的裸代码行（中英拷贝同步）。
  - **en 站组件文案**（BUG-06）：站点主题未跟随 VitePress 的 `lang` 切换 `lhlocale`，
    英文站组件文案恒为中文；`theme/index.ts` 加 `watchEffect` 按 `lang` 切 `zh-CN`/`en-US`。
  - **深主色预设暗色不可见**（BUG-07）：水墨等深主色预设切暗色后，主色对暗色页面底对比度
    不足 3:1，主要按钮近乎不可见。预设样式现在按相对亮度判定，低对比深主色自动提亮
    `color-mix(in srgb, <主色> 55%, #fff)` 并改用墨字（逻辑在 `@lh-ui/share/theme`）。
  - **ThemeStudio 预设下拉与站点不同步**（F-10）：挂载时采集令牌后反查命中的预设，
    下拉框不再恒显默认项；反查按站点明暗状态走一遍与站点同源的暗色适配，只比较两边都能以
    hex 观测的令牌（暗色下被 `color-mix` 覆盖的派生令牌采集不到，参与比较会误判成自定义）；
    预览区暗色块改调 share 的 `buildPresetDarkVars`，与导出文本同源。vue2 docs 副本同步。
  - **Calendar 面板标题**（F-03）：标题改用新增的 `datepicker.panelTitle` locale 模板拼装，
    中文「2026年10月」、英文「Oct 2026」，月份名复用既有 `month1~12`。
  - **Form demo 成功反馈**（F-07）：`submitForm` 校验通过后补 `LhMessage.success`，
    避免「点提交无任何可见反馈」的误判（中英拷贝同步）。
  - **playground 筛选缺项**（F-01）：`dev/app.vue` 的城市过滤项补上「北京」，
    「陆离·设计·北京」这一行原本筛不出来。

- 96e3ccb: 修复 Steps / Button / Input / Avatar 四个组件的 `icon` 类属性不生效的问题。

  原先这些属性被渲染成一个空 `<i :class="icon">`，但本库没有任何图标字体，所以图标永远显示不出来。现在统一改为渲染内置的 `LhIcon` 组件：

  - `LhStep` / `LhButton` 的 `icon`、`LhInput` 的 `prefix-icon` / `suffix-icon`、`LhAvatar` 的 `icon` 均接受内置图标名（`LhIconName`，如 `user`、`search`、`date`），由 `LhIcon` 渲染对应 SVG 图标
  - 上述属性的类型从 `string` 收紧为 `LhIconName`，编辑器可自动补全
  - `LhStep` 新增 `#icon` 插槽，可完全自定义步骤图标的渲染
  - Steps 的完成/错误状态色、Avatar 的字号缩放（新增 `svg` 跟随 `em` 缩放的样式）均自动套用到图标上

- 3b730c7: Fix `lhlocale.t()` crashing when detached from the instance (`const t = lhlocale.t`), which broke the Cascader empty-search branch; it is now an arrow-function property. DatePicker and TimePicker now consume `datepicker.today`/`datepicker.confirm` and `timepicker.now`/`timepicker.confirm` from the locale packs instead of hardcoded Chinese strings.
- 81210a0: 修复 `LhMessage.success/info/warning/danger/loading` 快捷方法的 `options` 参数误要求 `content` 的问题。

  这些快捷方法的首参已是 `content`（如 `LhMessage.success('已保存', { showClose: true })`），
  但第二个参数的类型仍沿用必填 `content` 的 `LhMessageOptions`，导致传 options 时编译报
  “缺少属性 content”。现收紧为 `Omit<LhMessageOptions, 'content'>`，与实际调用形态一致。

- 96e3ccb: 修复覆盖层组件在受控模式下的滚动残留问题，并完善下拉菜单示例

  - Popover / Popconfirm / Tooltip / Dropdown：触发器整体滚出视口时，受控模式（`manual` 或外部传入 `visible`）同样收起弹出层。弹出层为 `fixed` 定位，触发器离开视口后不会再随之移动，旧实现因保留「显隐由外部决定」而把面板留在了页面顶部，观感上层级过高。现在统一收起并抛出 `update:visible`，外部状态保持同步
  - Dropdown 文档与开发预览示例：选中菜单项后触发器按钮文字同步更新为所选标签。`command` 事件只抛出命令值，触发器文案由使用者维护，示例补上了这层绑定。文档页各示例原本共用同一个 `onCommand` 与日志 ref，一个示例里的操作会改写另一个示例的按钮文案与「最近指令」；现已为全部五个示例（基础、hover、contextmenu、禁用与分割线、位置与最大高度）各自拆出独立状态，互不干扰

- 96e3ccb: 修复 Popover / Popconfirm / Dropdown / Tooltip 在 grid / flex 容器中定位偏移的问题。触发器根元素之前会被容器默认的 `stretch` 拉伸，定位锚点比内部触发器宽，导致弹出层与箭头按格中心对齐而非按触发器对齐；四个组件的根元素现加上 `justify-self: center; align-self: center`，保持收缩包裹。同时修复弹出层在进出过渡（`transform: scale(0.96)`）期间被 `getBoundingClientRect` 量出缩放尺寸、过渡结束后位置 stale 的问题，定位改用不受 transform 影响的 `offsetWidth / offsetHeight`。
- 96e3ccb: 修复文档站切换预设主题后内容区域不响应、必须刷新页面才生效的问题。根因：FOUC（首屏防闪）脚本写的是 `documentElement` 内联样式（优先级 1,0,0,0），而运行时 `usePresetTheme` 写的是普通样式表（优先级 0,1,0），切换时新样式被内联样式压过，只有刷新重建页面才重新应用。

  统一为同一机制：新增 `packages/theme/src/themes` 导出 `buildPresetStyleText(vars)` 与 `PRESET_THEME_STYLE_ID`，构建期把每个预设序列化为 `:root { --lh-primary-* }` 样式文本（含暗色块），FOUC 与 `applyPreset` 运行时共用同一个 `<style id="lh-preset-theme">` 元素；`applyPreset` 每次应用后把该元素挪到 `head` 末尾，保证开发模式 Vite 运行时注入的组件样式之后（生产构建 CSS 为静态 `<link>` 且在脚本之前，无此问题）。顺带修复 `.gitignore` 中 `theme/` 未锚定根目录、误伤 `packages/theme/src/themes/` 源码目录的问题（改为 `/theme/`）。

- 96e3ccb: 修复发布链路的四个问题：

  - **发布包瘦身**：`files` 白名单由 `["packages"]` 改为 `["es", "lib", "dist", "packages/components/*/style"]`，不再把 `packages/components/*/src/` 下的 Vue/SCSS 源码打进 npm 包（`files` 优先级高于 `.npmignore`，旧排除规则实际已失效），按需引入所需的 style scss 仍在包内。
  - **`lh-ui/theme` 子路径可用**：rollup 新增 `packages/theme/index.ts` 构建入口（产出 `es/theme`、`lib/theme` 及对应 `.d.ts`），package.json `exports` 补上 `"./theme"`，`import { getThemeVars } from 'lh-ui/theme'` 在 npm 消费侧可解析。
  - **产物模块类型声明**：根 package.json 不含 `"type"` 字段导致 `es/*.js` 被 Node 按 CJS 解释；构建脚本现在在 `es/` 写入嵌套 `{"type":"module"}`、`lib/` 写入 `{"type":"commonjs"}`，不污染源码目录、不影响 `dist/` 的 UMD 产物。
  - **d.ts 冒烟检查**：新增 `node scripts/verify-dts.mjs`（`pnpm verify:dts`），校验 `es/`、`lib/` 的声明文件存在、相对导入路径可解析、裸导入仅允许 `vue`；CI 在 `pnpm build` 后自动执行。

  另修复 `.gitignore` 中 `./theme/` 的非法前缀语法（应为 `theme/`）。

- 96e3ccb: 响应式修复（窄屏 320px 布局异常）：

  - **LhInput**：`.lh-input__wrapper` 固定 `width: 240px` 无上限，表单项内容区/窄屏容器里溢出（表单 min-content 因此被撑到 320px）。补 `max-width: 100%`，默认宽度不变、可随容器收缩。
  - **LhSelect / LhDatePicker / LhTimePicker / LhCascader**：同类问题，根元素补 `max-width: 100%`；LhSelect 触发器文本与 LhCascader 输入框补 `min-width: 0`，省略号在窄容器里真正生效，不再顶出右侧箭头。
  - **LhForm**：根元素补 `min-width: 0`，解开 flex 子项的 min-content 下限；LhConfigProvider 同理（包裹表单时它才是被撑破的那一层）。
  - **LhSlider**：轨道 `width: 100%` 与右侧 `showInput` 数值列相加溢出，改 `flex: 1; min-width: 0`；同时移除轨道上残留的 `padding-left/right: X%` 内联样式（按钮与进度条均为绝对定位、自带百分比，该 padding 只会破坏 flex 尺寸计算）。
  - **LhSpace**：`wrap` 默认值 `false` → `true`（仅水平方向生效，与 Element Plus 一致），窄屏自动换行而非溢出；文档 API 表同步更新。
  - **docs 示例**：input.md 固定 `width: 300px/260px` 的输入框改为 `width: 100%; max-width`/`flex` 形态，`.demo-row` 占满行宽并允许换行；dev 示例卡片 `width: 280px` 同样改为 `width: 100%; max-width: 280px`。

- 96e3ccb: 重排主题 token 并补齐面板类组件的对比度：统一 hover/selected 的文字与底色 token（`--lh-hover-bg-color`、`--lh-selected-color`、`--lh-primary-color-bg`），hover 不再与选中态仅靠字色区分。五个预设主题（cerblue/songhua/zhusha/shuimo/golden）在明暗两色下复算 52 组文字/底色对比度均 ≥ 4.5:1：songhua/golden 属浅主色，新增预设级 `--lh-color-on-primary`（墨字替代白字，白字仅 3.9/3.25:1）；songhua/golden 选中态文字单独加深（`#456F44` / `#82600A`，active 色在悬停底上仅 4.19/4.44:1，按钮 active 底色不受影响）；songhua/golden 按压态底色提亮（`#4F8F4C` / `#A87F0A`，原值墨字对比仅 3.64/3.94:1）；菜单/树激活文字统一引用 `--lh-selected-color`（默认解析值不变，浅主色预设跟随之）；暗色 selected 改为主色 40% 掺白（60% 在暗色面板上仅 3.86:1，50% 在悬停底上也只有 4.03:1）。
- 3b730c7: Fix theme token leakage: component styles referenced Element-Plus-style variables (`--lh-text-color-primary`, `--lh-border-color`, `--lh-*-color-light-5/9`, …) that are not defined in this library, so hardcoded fallback colors always won and theming silently failed. They are now mapped to the real tokens (`--lh-text-primary`, `--lh-border-color-base`, `--lh-*-color-bg`, …).
- 96e3ccb: 全面修正文档示例与描述的一致性错误（中英文同步）：

  - **`guide/themes`**：开头改为同时说明全局（`usePresetTheme`）与局部（`LhConfigProvider`）两种切换方式；为松花绿/朱砂/水墨/藤黄四个小节补齐缺失的 template 与预设名；修复「局部作用域切换」代码示例把切换按钮错误放进 Provider 内部（与实际 DemoBlock 行为相反）；统一前缀写法说明（`getThemeVars` 带前缀、`usePresetTheme.themeVars` 去前缀，均可直传 `:theme-vars`）；合并重复 import；主题对比表列名改为明确 CSS 变量名并注明预设仅覆盖主色色板。
  - **不可运行的示例**：删除 `installation` 中不存在的 `LhUiPlusResolver` 自动按需引入章节；修复 `getting-started` 的 `:config` prop（不存在）、`size: 'default'`（非法值）与 `zhCn` 导入；修复 `faq` 的 `toggleDark`（应为 `toggleTheme`）、无效 `sx` 的 `bg` 属性、`patternComponents` 的 `LhButton` 大小写错误及缺失的 `###` 标题；修复 `button` 国际化示例 `computed` 未导入；补全 `button` Props 的 `error` 类型。
  - **DemoBlock 渲染空白**：`config-provider` 的花纹演示 `bg-pattern="willow"` 是无效 CSS（不渲染），改为 `var(--lh-pattern-willow)`；同步修复 `theme-patterns` 的同类写法与未定义的 `visible` 变量。
  - **虚构的 API/属性**：移除 `LhConfigProvider` 的 `zIndex` prop（不存在）及 `:z-index` 示例；修复 `LhSlot`（不存在）、`sx` 的 `maxWidth`（不受支持）；`accessibility` 的 ARIA 示例改为真实 DOM 输出，并将未实现的焦点管理标注为待实现。
  - **错误的取值与术语**：`design-philosophy` 配色表 4 处色值与源码不符、花纹名 `wave`/`mountain` 不存在（实为 `water`/`snow`）、"零 any" 表述不实、i18n 支持范围与 `comparison`/`migration` 的第三方对比错误（Element Plus/Ant Design Vue 均有暗色模式，Naive UI 无 sx/PassThrough）。
  - **导入路径**：全库示例统一为真实包名 `@lh-ui/vue3`（80 处 `lh-ui/locales/*` 子路径不存在、39 处裸 `lh-ui` 在消费者项目中不可解析），修正 `zhCn`/`enUs` 大小写。

- 81210a0: 补齐 LhUpload 到 @lh-ui/share 0.3.0 的破坏性变更迁移：`isExtensionRejected(fileName, accept)` →
  `isFileRejected(file, accept)`。漏改导致 VitePress 文档站预构建 `@lh-ui/share/core/upload` 时报
  「does not provide an export named 'isExtensionRejected'」，组件运行时校验亦失效。

  - `packages/components/upload/src/index.vue`：import 改名，调用改为传整个 `File`（与 lh-ui-vue2 对齐）
  - 行为修正：accept 为 `image/*` 等通配规则时不再恒真放行，改为比对 `file.type`——core 层是类型校验的
    最后一道防线，不能依赖原生 `<input accept>` 的建议性过滤

- 96e3ccb: 修复 VirtualList 在 flex 等收缩容器下宽度塌陷为 0 的问题（列表根元素补充 `width: 100%`），并为定高模式的项包裹层增加 `overflow: hidden`，防止插槽内容超出 `itemHeight` 时相邻行文字叠压。
- 70c53ef: Add LhForm and LhFormItem with model validation, required rules, nested field lookup, resetFields, and label layout support.
- 3b730c7: Normalize all imports to the tsconfig alias table: component `src/types.ts` now import core types from `@lh-ui/core/<name>` + `@lh-ui/core/shared` instead of the root barrel, tests use `~/` instead of `../../packages/...`, and `src/index.ts`/`dev`/`docs` entries import via `~/` and `lh-ui`. Also add the Badge playground demo, export the previously missing `LhTagProps`/`LhTagSize` types from the package root, and add a CI workflow plus conservative coverage thresholds.
- 96e3ccb: 修正 Card 与 Skeleton 的视觉表现，使其贴合国风主题：

  - Card 阴影由冷蓝黑（rgba(16,24,40)）改为与主题同源的暖墨色（rgba(26,26,26)），不再与宣纸底色冲突；边框改用 `--lh-border-color-light`，卡片轮廓可感知。
  - Card 头部/底部分隔线改为两端对称渐隐的墨痕，底部去掉浑浊的半透明叠色。
  - Card 加载占位与 Skeleton 占位块底色改用可感知的灰度，新增 `--lh-card-loading-bg` / `--lh-card-loading-highlight` 两个组件级变量。
  - Skeleton 占位底色由 `--lh-border-color-lighter` 改为墨色（text-regular）10% 透明混合，明暗主题下都能保持对比度，不再是暗色主题里“看不见的占位”。

- 96e3ccb: - 新增 `scripts/pack-private.mjs`：以私有包名 `@lhgb/vue3` 打包同一份构建产物并伪造 npm registry 元数据，支持 `--dry-run` 与 `--incremental`
  - 新增 `scripts/nginx-private-registry.conf.example`：Nginx 静态目录充当只读私有 registry 的 location 示例
  - 新增 `.github/workflows/release.yml`：推送到 main 且 changeset 有变动时自动执行 version + publish，支持 workflow_dispatch 手动触发
  - 修正私服文档里过期的 tarball 文件名（`lh-ui-lh-ui-plus-*.tgz` → `lh-ui-vue3-*.tgz`），跟进包名重命名后的 npm pack 产物名
  - 收尾包名残留：`packages/utils` 与 `packages/core` 的描述文案、样式构建脚本注释、文档站 hostname 兜底值
  - 修复 `pack-private.mjs` 四个缺陷：`execFileSync('npm')` 在 Windows 下必挂（补 `shell: true`）；`--incremental` 仍整体删除输出目录导致历史版本 tarball 丢失；registry 元数据版本文档缺 `peerDependencies` / `engines`，消费侧解析依赖树时拿不到 peer 声明；tarball 与元数据文件同名导致 `EISDIR`，tarball 移入 `tarballs/` 子目录
- 96e3ccb: 修复 provide 快照注入（红线 #6）：checkbox group 与 radio group 的 `disabled`/`name`/`size`、menu 的 `mode`/`collapse`、collapse 的 `accordion`、timeline 的 `mode` 原以 props 快照 provide，动态修改父级 prop 不传导——现统一改为 computed ref 本体注入，子项动态响应（如整组动态禁用、时间线动态切换 alternate）。同步收紧上下文类型为 `Ref`。移除全仓无引用的 `core/config` 死代码（mergeConfig/getEffective* 为废弃方向，config-provider 本地 computed 实现已正确）。
- 96e3ccb: - `exports` 新增 `./dist/*` 与 `./style-css/*` 子路径，修复 `dist/index.css` 在 `exports` 封装下无法解析、按需引入强制要求消费侧安装 sass 的问题
  - 新增发布指南与私有服务器 tarball 托管说明（中英双语）
  - 安装文档补充 CDN 引入方式
- 70c53ef: Add LhSelect with option lists, keyboard navigation, disabled options, clearing, and v-model support.
- 81210a0: # LhSteps 标题换行修复 + 横向定宽折行

  此前横向步骤条在容器宽度不足时会把 `title` 挤压换行（步骤项 `flex:1`、标题无 `white-space`
  规则），连接线与圆圈错位。本次让标题保持一行、由步骤项整体承担折行，横向纵向都不再换标题。

  ## 修复内容
  - **标题一行**：标题始终单行显示，超长以省略号截断（样式在 `@lh-ui/share/styles/steps`，
    红线 2，本仓不持有）
  - **横向定宽折行**：容器放得下时各步等分一行（视觉不变），放不下时整步折到下一行；折行位置
    以 `--lh-steps-item-basis`（默认 `160px`）为基准，可通过组件新增的 `themeVars` prop 或
    `LhConfigProvider` 的 `componentTheme.steps` 覆盖
  - **行末连接线隐藏**：`LhSteps` 挂载后以 `ResizeObserver`（不可用时守卫跳过）测量各步骤项
    `offsetTop`，经 share 的 `getStepsLineLastIndices` 算出每行最后一项，打
    `lh-steps__item--line-last` 类，其连接线由样式隐藏，不指向行尾空白
  - **`LhSteps` 新增 `themeVars` prop**：与 button/card 等同构，走 `useLhComponentTheme`；
    `LhThemeableComponent` 相应补 `steps`，`componentTheme.steps` 类型可用
  - **顺带修复「末项连接线首屏全漏画」**：连接线的「非末项」判定原本依赖 JS 类
    `lh-steps__item--last`，而该类基于子项注册总数计算——子项在各自 setup 阶段渲染，
    此时后续兄弟尚未注册，导致**每一个步骤在首屏（含 SSR/SSG 快照）都被判为末项**，
    连接线全部被隐藏，一个 tick 后才自纠正。现由 share 侧改为结构性 `:last-child`，
    纯 CSS、任意渲染时机都正确；本仓 `step.vue` 的 `total`/`isLast` 计算与
    `lh-steps__item--last` 类随之移除（vue2 仓无 steps 组件，无下游影响）

  ## 文档与测试
  - `docs/components/steps.md`（中英）补「定宽折行」示例与「组件级变量」小节，类型块与 API 表
    已按生成器口径同步（`types:check`/`api:check` 本组件无漂移）
  - `tests/components/steps.spec.ts` 补行末标记、纵向不标记、themeVars 下发三个用例；
    原「仅末项标记 `--last`」用例改为「不再输出 last 类」

  > 样式与判定函数的改动在 `@lh-ui/share`（见 share 仓 changeset），本仓随其后发版。

- 70c53ef: Strengthen shared TypeScript contracts for component sizes, types, languages, and core state helpers.
