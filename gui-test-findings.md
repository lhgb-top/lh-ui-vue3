# GUI 回归测试发现清单（实时记录）

测试时间：2026-10-11
端点：playground http://localhost:5273/（44 区）、docs http://localhost:5288/

## 环境说明（影响判读，非组件缺陷）

- IAB（ZCode 内置浏览器）**CSS transition 冻结**：leave/enter 动画卡在中间态，`opacity`/`transform` 停在非终值，
  导致 message/notification/dialog/tooltip 关闭后 DOM 残留。判读一律以 Vue 响应式状态（`modelValue`、
  `isOpen`、`visible`）为准，不以 DOM 残留为失败。真实浏览器 leave 动画会走完并 unmount。
- IAB 的 `cua.click()`/`cua.keypress()` **不派发 DOM 事件**；`cua.move()` 派发 mousemove 但不派发 mouseenter。
  统一改用 `element.dispatchEvent(new MouseEvent/KeyboardEvent(...))` 模拟。
- `getBoundingClientRect()` 对 `position: fixed` 元素正常，但 `offsetParent` 恒为 null——
  曾因此误判 tree-select 面板"未渲染"，实为 fixed 定位（`panelInDom: 1`）。
- 评分组件按 `event.offsetX < clientWidth/2` 分半，合成事件不带坐标时 offsetX=0 会被判为左半区。

## 已确认缺陷

### BUG-01（T21 Slider）单滑块填充条不渲染 + 键盘步进后 aria 状态丢失

- **现象**：
  1. 单滑块（非 range）初始 `barStyle = { left: '50%', width: '0%' }`，`.lh-slider__bar` 宽度 0，
     已填充轨道**完全不显示**（thumb 位置本身正确，`button1Style.left = 50%`）。
  2. 键盘 ArrowRight 步进后 `localValue` 从 `[50,50]` 塌缩为标量 `55`，
     `barStyle = { left: 'NaN%', width: 'NaN%' }`，且 `aria-valuenow` 变 `null`、`aria-valuetext` 变 `"undefined"`。
- **根因**（`packages/components/slider/src/index.vue`）：
  - `localValue` 初始化恒为数组 `[v, v]`（108-112 行），但 `barStyle` computed（165-174 行）按 range
    两端语义计算 `left = min(v1,v2)`、`width = 100 - left - right`，单滑块时两端相等 → width 恒为 0。
    未区分 `props.range` 分支：单滑块应为 `left: 0%; width: v%`。
  - `watch(() => props.modelValue)`（116-122 行）回写 `localValue.value = Array.isArray(val) ? [...val] : val`，
    标量 modelValue 未归一化为数组，破坏 localValue 恒为数组的不变量 → `localValue.value[0]` 变 undefined → NaN。
- **影响范围**：仅单滑块；range 模式完全正常（`[20,50] → left 20%, width 30%` 已验证）。
- **复现**：playground T21 区基础用法滑块，按 ArrowRight 一次后检查 `.lh-slider__bar` 宽度与 aria-valuenow。
- **处理**：只记录不修复。

### FINDING-01（T10 Table）playground 筛选 demo 数据不完整

- 现象：城市列筛选项只有「杭州/苏州」，但数据含「北京」（陆离·设计·北京 31 行）。
- 根因：`dev/app.vue:2300-2301` 的 `filterOptions` 只列了两项，组件按传入 options 渲染，非组件缺陷。
- 影响：用户在 playground 无法筛出北京，属 demo 数据瑕疵。docs 侧 D16 复核组件本身是否从数据自动派生选项。

### FINDING-02（T04 Tooltip）popper 类名的 placement 元数据滞后

- 现象：hover trigger 后 popper 的方向修饰类（如 `--bottom`）与实际定位不一致；
  但实际定位正确（空间不足时翻转，`isAbove=true`），仅类名元数据未更新。
- 定位逻辑本身正确，属观感/样式钩子问题，非定位 bug。记录待复核。

## 通过区域汇总

| 区 | 组件 | 结果 | 要点 |
| --- | --- | --- | --- |
| T01 | Button | PASS | 计数器回显、disabled、link href、loading spinner、6 类型类名 |
| T02 | Input | PASS | v-model 同步、密码、禁用、textarea 0/100 字数 |
| T03 | Icon | PASS | name prop + 独立分包两种形式 |
| T04 | Tooltip | PASS（见 FINDING-02） | hover 触发、定位翻转、light 主题 |
| T05 | Popover | PASS | click/hover/focus 三触发 + 富内容插槽 |
| T06 | Popconfirm | PASS | alertalert 角色、确认计数 0→1、三种语气 |
| T07 | Drawer | PASS | 四方向几何（right/left 385px，top/bottom 217px）、480px + footer |
| T08 | Dropdown | PASS | click + command 回显「最近指令：new」、hover、contextmenu |
| T09 | Wave F 数据组件 | PASS | Table 排序（↑↓ + aria-sort 单调）、Tree 父子联动、Transfer 方向门禁与计数、TreeSelect 回显关闭 |
| T10 | 阶段化增强 | PASS（见 FINDING-01） | 筛选+重置、Tree 懒加载、列宽拖拽 120→180、键盘 10px 步进 |
| T11 | Wave E | PASS | Segmented 切换、Rate 半星（左 0.5 / 右 full）、Collapse 折叠 |
| T12 | Message | PASS | 4 类型类名、默认 3s 自动关、duration:0 不自动关、showClose 手动关、堆叠 offset 10px |
| T13 | Notification | PASS | 4 位置定位、onClick 链路（→「已点击」）、duration:0、closeAll 全清 |
| T14 | Loading | PASS | 全屏 fixed 1280×720 z2041 2s 后 DOM 彻底清除；容器级 absolute 24px spinner |
| T15 | Dialog | PASS | 遮罩 z1049、居中、role/aria-modal、输入同步、Esc 关、点遮罩不关（受控）、取消按钮、可拖拽 dragOffset 精确 |
| T16 | Form/Select/Checkbox | PASS | Select 键盘导航 + disabled 跳过 + Enter 选择、Checkbox 回显含「无」兜底 |
| T17 | Radio | PASS | 单选切换 female、RadioGroup 选中态互斥、禁用项不受影响 |
| T18 | Switch | PASS | --checked 类 + aria-checked + 回显同步 |
| T19 | InputNumber | PASS | 步进 +3、max=10 边界钳制、step 0.1 precision 1 |
| T20 | ConfigProvider | PASS | size 三档 20/32/40px、themeVars 注入 `--lh-primary-color` 精确变色、plain color-mix alpha |
| T21 | Slider | **FAIL（BUG-01）** | thumb 定位正确、range 正常；单滑块填充条不渲染 + aria 丢失 |

### FINDING-03（T41 Calendar）面板标题中英双端格式均错误

- 现象：zh-CN 下日历头部标题为「2026 月 10月」（年与月之间多一个「月」字）；
  切到 en-US 后为「2026 M Nov」（"M" 游离）。
- 根因：`packages/components/calendar/src/index.vue:259-261` 的 `panelTitle` 拼接为
  `${year} ${t('datepicker.month','月')} ${t('datepicker.monthN')}`，
  把「月」当作年前缀放在了年与月名之间；正确中文应为「2026 年 10月」，英文应为「October 2026」。
- 影响：纯文案观感缺陷，不影响日期选择功能；两种语言都错。
- 处理：只记录不修复。

### 环境经验补充

- **Vue 异步更新 vs 同步读 DOM**：`dispatchEvent` 后在同一个 `evaluate` 里同步读 DOM 会读到
  patch 前的旧值（T33 Card 计数曾因此误读为「未变化」）。判定交互结果必须
  `waitForTimeout(150~250)` 后再读，或读 Vue 响应态。
- **监听挂在内层元素**：Steps 可点击项把 `onClick` 绑在 item 内部的 `<button>` 上
  （`isButton = clickable && status !== 'wait'`），点外层 `li` 无反应；且 `wait` 态步骤
  按设计不渲染为按钮（只能回点已完成步骤），非 bug。

## 通过区域汇总（续）

| 区 | 组件 | 结果 | 要点 |
| --- | --- | --- | --- |
| T22 | DatePicker | PASS | 两步确认（tempSelection → 确定 提交）、--disabled 态、范围面板 |
| T23 | TimePicker | PASS | 时间项列表、选中态、滚轮定位 |
| T24 | Cascader | PASS | 叶子点击提交「组件/基础组件」、modelValue ['zujian','jichen'] 链路、面板关闭 |
| T25 | Tag | PASS | 6 类型 3 尺寸、closable、round、hit 冲突 |
| T26 | Badge | PASS | 99+ 截断、dot、zero 隐藏 |
| T27 | Avatar | PASS | 32/40/48 三档、circle/square、图片 404 文字兜底 |
| T28 | Progress | PASS | 线型填充比例与文案完全一致（60/100/80/40/55/70%）、环形 dasharray 精确（75%→224.4/299.2） |
| T29 | Statistic | PASS | 千分位 2,384,712、小数 4.85、slot「不可计数」 |
| T30 | Descriptions | PASS | dl/dt/dd 语义结构、border 变体、header 插槽 |
| T31 | Divider | PASS | 实线/虚线/三方向文案（居中/左/右）、垂直 |
| T32 | Space | PASS | horizontal + wrap + small 组合 |
| T33 | Card | PASS | 点击计数 0→3 精确、Enter/Space 键盘激活（role=button tabindex=0）、loading 内置骨架线 |
| T34 | Empty | PASS | 暂无数据 / 自定义描述 |
| T35 | Skeleton | PASS | 切换显隐（按钮变「显示骨架」、真实诗句出现）、2 个常驻骨架、animated |
| T36 | Alert | PASS | 4 语气 + 图标、close 按钮触发 close 事件（出现「已触发 close 事件」提示）、plain |
| T37 | Breadcrumb | PASS | 默认/·/➜ 三分隔符 + 自定义项，分隔符数正确 |
| T38 | Pagination | PASS | 翻页 active 3、prev/next disabled 态（首页禁用） |
| T39 | Tabs | PASS | 切页面板 display 切换、disabled 项不切、动态新增「页签 4」并激活、删除青花后激活态保持 |
| T40 | Steps | PASS | 4 变体（含 error/垂直）、可点击回跳（current 1→0，状态重算） |
| T41 | Calendar | PASS（见 FINDING-03） | 上一月/下一月、日期点击 aria-selected + --selected 类、today 高亮 |
| T42 | Image | PASS | 6 fit 模式类名、预览器开启/下一张/缩放 1.25/旋转/关闭按钮彻底移除 |
| T43 | i18n | PASS | zh→en 切换即时生效（「请输入」→「Please input」），日历标题联动切换 |

**Round 1 结束：44/44 区完成。1 个确认缺陷（BUG-01 Slider），3 个 FINDING（Table demo 数据、Tooltip 类名滞后、Calendar 标题文案）。**

## Round 2：docs 高风险交叉（D 系列，localhost:5288）

### 环境说明（docs 端）

- **docs demo 块异步挂载**：VitePress dev 下 `.demo-block` 在页面加载约 2.5–4s 后才挂载，必须轮询到 `blocks>0` 再操作；读早了会误判「页面空白」。
- **标签路由被周期性回滚**：用页内 `location.href` 导航后，标签会被环境回滚到更早的路由（疑似 IAB 会话恢复）。**改用 `browser.execute({method:'navigate', url})` 原生导航后稳定**。跨调用的长 evaluate（>5s）会被「target navigated」打断，全部操作拆成短调用。
- **transition/transform 冻结在 docs 端同样严重**：弹层 enter 态停在 opacity 0、popper 的水平居中 transform 也停在初始值，`getBoundingClientRect` 读到的是变换前坐标。判定一律以结构、垂直几何、Vue 态为准。
- `.lh-popover` 是**触发器包裹**（static），浮层本体是 `.lh-popover__popper`（fixed）——选择器别搞混。

### D1–D5 结果

| 项 | 组件 | 结果 | 要点 |
| --- | --- | --- | --- |
| D1 | Dialog | PASS | 打开「提示」432×171、role=dialog、aria-modal=true、body overflow hidden 滚动锁定；Esc 关闭后 modelValue=false、overflow 恢复（元素残留 opacity 0 为冻结假象） |
| D2 | Drawer | PASS | 四方向面板几何精确：right left=768 w=512 / left left=0 w=512 / top h=288 / bottom top=432 h=288，方向类名正确 |
| D3 | Message | PASS | success「保存成功」3s 默认时长后自动触发离场（leave-active + opacity 0，冻结假象） |
| D4 | Notification | PASS | 四位置几何与类名元数据**全部一致**：top-right(930,20)/top-left(16,20)/bottom-right(930,528)/bottom-left(16,528)——通知类的 placement 元数据不像 Tooltip 那样滞后 |
| D5 | Popover | PASS（结构层） | 点击触发浮层正常渲染（fixed，title+富内容），placement=top 垂直几何精确（trigger 449 → popper bottom 449）；水平居中走 transform，IAB 冻结下无法目检，几何以 playground T05 为准 |

### FINDING-05（D12 Anchor）docs demo 未渲染锚点内容区

- 现象：Anchor 基础 demo 只放了 `<LhAnchor :items="anchorItems" />`，页面上不存在 `#sec-1`/`#sec-2` 元素。
  点击「第二节」只更新 `location.hash` 为 `#sec-2`，不发生滚动，高亮态停留在「第一节」
  （`aria-current="location"`）。
- 定性：demo 缺陷（无法在文档站演练滚动联动），非组件 bug——组件的 `<nav>` 语义、
  `aria-current`、hash 跳转、层级缩进（level-0/level-1）均正常。建议 demo 补上对应内容区。

### FINDING-06（D11 Upload）拒绝提示无 aria-live

- `.lh-upload__error` 正确显示「文件超出大小限制」（2MB 文件被 1MB 上限拒绝、不入列表），
  但该错误节点没有 `aria-live`，屏幕阅读器用户不会收到播报。低优先级无障碍改进。

| 项 | 组件 | 结果 | 要点 |
| --- | --- | --- | --- |
| D6 | Popconfirm | PASS | 「确定删除这条记录吗？」+ 取消/确定；点确定后 demo 回显「最近操作：已确认」 |
| D7 | Dropdown | PASS | click 触发菜单 新建/编辑/删除；点「新建」回显「最近指令：new」 |
| D8 | Tooltip | PASS | mouseenter/mousemove 派发到 `.lh-tooltip` 包裹后浮层「这是一个提示信息」弹出（--dark 主题） |
| D9 | Loading | PASS | 全屏 fixed 1280×720 z2002 + spinner |
| D10 | Select | PASS | 面板 `.lh-select__dropdown`（fixed）三选项 北京/上海/深圳；ArrowDown×2+Enter 选「深圳」、aria-expanded 收起 |
| D11 | Upload | PASS（见 FINDING-06） | drop 投入 test.txt → uploading → success 态切换；2MB 超限被拒 + 行内错误提示 |
| D12 | Anchor | PASS（见 FINDING-05） | nav 语义 + aria-current + hash 跳转 + 层级缩进；滚动联动因 demo 缺内容区无法演练 |
| D13 | VirtualList | PASS | 200px 视窗恒渲染 9 项；scrollTop=800 后视窗切到第 18–26 项 |
| D14 | Layout | PASS | header(56px)/main/footer/aside 结构齐全，horizontal/vertical 变体类名正确（几何为 demo 内容驱动） |

---

## D15 Form 表单链路（docs /components/form.html）— 完成

| 测试点 | 操作 | 结果 |
| --- | --- | --- |
| 空提交校验 | 两个必填项留空点「提交」 | PASS：2 条错误 + `aria-invalid`×2，错误文案与输入框 aria 关联 |
| 合法提交 | 填「测试用户」+「test@example.com」点「提交」 | PASS：错误清零、无 aria-invalid、值保留 |
| 重置 | 点「重置」 | PASS：字段清空、错误清除 |
| 邮箱格式校验 | 填「not-an-email」提交 | 无报错 —— 设计如此（demo rules 只有 required，无格式规则） |

### BUG-02：required 属性 + 自定义 message 时，message 被通用文案覆盖（低）

- 现象：demo rules 配了 `message: '请输入姓名'` / `'请输入邮箱'`，实测报错文案是「此项为必填」。
- 源码链（已核对三处）：
  1. `packages/components/form/src/item.vue:71` 的 `rules` computed：`props.required` 为真时把
     `[{ required: true }, ...formRules]` —— **合成规则排在最前**；
  2. `@lh-ui/share/core/form/logic.js:101` 的 `validateFormField`：
     `const requiredRule = rules.find(rule => rule.required)` —— find 命中的是那个**无 message 的合成规则**；
  3. 于是回退到第 103 行的 `requiredMessage`，即 `t('form.required')` = 「此项为必填」。
- 结论：只要 `LhFormItem` 同时写 `required` 属性和带 message 的 required 规则，用户配的文案永远不生效。修法两选一：
  合成规则改放末尾（`[...formRules, { required: true }]`），或在 find 时优先取带 message 的规则。
- 影响面：`required` 属性与 rules.message 并存的所有表单（含官方 demo 自身），文案定制能力失效。

### FINDING-07：Form demo 合法提交无可见成功反馈（低）

demo 的 `submitForm` 校验通过后只 `console.log('提交成功', formModel)`，页面没有任何成功提示。用户照着 demo 学，无法从视觉上确认「提交成功」。建议 demo 里加一条 `LhMessage.success`，顺带演示消息组件联动。

---

## D16 Table 全量（docs /components/table.html，8 个 demo）— 完成

| 测试点 | 操作 | 结果 |
| --- | --- | --- |
| 排序三态循环 | block1「年龄」连点 4 次 | PASS：none→asc(28,31,34)→desc(34,31,28)→none(回原序)，aria-sort 与图标同步 |
| 默认排序 | block7 `default-sort-prop/order` | PASS：渲染即 desc(34,31,28)，aria-sort=descending，图标 ↓ |
| 受控筛选 | block5 勾「前端」→ 确定 | PASS：只剩苏晚/前端，`v-model:filtered-values` 回写 `{"role":["前端"]}`，demo 日志同步 |
| 筛选激活态 | 筛选生效后查触发器 | PASS：icon 加 `lh-table__filter-icon--active`（在 icon span 上，不在 button 上） |
| 筛选重置 | 面板内「重置」 | PASS：3 行全回，日志清空为 `{"role":[]}` |
| 点击外部关闭 | 面板外 mousedown | PASS：aria-expanded→false（`useLhClickOutside` 默认监听 mousedown，click 不触发——属正常设计） |
| 键盘列宽 | 手柄 focus + ArrowRight×3 / ArrowLeft | PASS：140→150→170→160，精确 10px 步进，手柄 tabindex=0 可聚焦 |
| 鼠标拖拽列宽 | mousedown + move 35px | PASS：140→175，精确 +35px，`columnResize` 事件链通 |
| 两级表头 | block4 | PASS：表头 2 行，分组「项目信息」下含职责/城市，可排序列「年龄」为叶子，表体 4 cell 对齐 |
| 虚拟滚动 1000 行 | block2 滚到中段/底部 | PASS：phantom 48000px(1000×48)，中段渲 11 行（498–508，window translateY 23856），底部渲 9 行收在行 1000，无过冲 |
| 固定列钉住 | 收窄容器至 260px 制造溢出后横向滚 | PASS：首列 sticky，左缘始终对齐表体左缘 |

### BUG-03：`max-height="200"`（无单位字符串）被 CSSOM 静默丢弃（中）

- 现象：block7「rowKey / maxHeight / 默认排序」demo 写的是 `max-height="200"`（**字符串，非 `:max-height="200"`**），
  实测 `.lh-table__body` 的 `style` 属性为**空**，`getComputedStyle().maxHeight` = none，高度限制完全没生效。
- 证据链：
  1. 从 Vue 实例读到 `props.maxHeight === "200"`（字符串），说明 prop 传到了；
  2. `packages/components/table/src/index.vue:570` 的 `bodyStyle` 对字符串原样返回 `{ maxHeight: "200" }`；
  3. 浏览器 CSSOM 拒绝无单位长度——实测 `el.style.maxHeight = "200"` 后 `getAttribute("style")` 仍是 null，
     而 `= "200px"` 后正常写入且 computed 为 200px（截证见 `gui-test-screenshots/` 目录同批记录）。
- 结论：官方 demo 的写法本身就不工作，用户照抄 `max-height="200"` 得不到任何高度限制，且**无任何报错提示**。
- 修法（二选一）：组件层对纯数字字符串归一化加 px（推荐，与 Element Plus 同路）；或 demo 改成 `:max-height="200"`。
- 附带：该 demo 只有 3 行（body 高 144px），即便 maxHeight 生效也演示不出滚动效果，建议把数据量加到 8–10 行。

### BUG-04：窄容器下表头/表体横向滚动不同步（中）

- 复现：block1 表格收窄到 260px（列总宽 360px，表体出现横向滚动条），把表体 `scrollLeft` 滚到底（101px）。
- 结果（实测坐标）：
  - 表头「年龄」列视口左缘 = **493px**
  - 表体同行「34」格视口左缘 = **392px**
  - 差值 101px 恰等于 `body.scrollLeft`（101），且 `header.scrollLeft` 始终为 0
- 根因：`packages/components/table/src/index.vue:462` 的 `onScroll` 只处理虚拟纵向滚动
  （`if (!isVirtual.value) return; scrollTop.value = ...`），**没有任何表头横向同步逻辑**；
  表头 `.lh-table__header` 是独立 grid 容器且 `overflow-x: visible`（实测），永不滚动。
- 影响：任何窄于列宽之和的容器（响应式布局、侧栏内嵌表格）里横向滚动后，列表头与单元格整列错位。
  宽容器下不暴露，所以 docs 默认视口看不出来。
- 截证：`gui-test-screenshots/D16_header_body_desync.png`
- 修法方向：onScroll 里同步 `headerRef.scrollLeft = body.scrollLeft`（表头改 overflow-x: auto），
  或让表头表体共用同一个横向滚动容器。

### FINDING-08：固定列 demo 在默认视口下无横向溢出（低）

block1 虽声明了固定列（名称 fixed-left），但 docs 容器够宽（scrollWidth == clientWidth == 411），
钉住效果不可见，用户感知不到这个能力。建议给该 demo 套一个 `max-width` 小于列宽之和的外壳。

---

## D17 Menu / Tabs / Steps / Pagination（docs，5180 端口）— 完成

| 组件 | 测试点 | 结果 |
| --- | --- | --- |
| Pagination | 点击翻页 + 页窗滑动 | PASS：1→5→6→12，窗口随动，首末页锚点常驻，边界按钮禁用，aria-current="page" 全程保持 |
| Pagination | 跳页 | PASS：输入 30 回车→激活 30（窗口 29/30/31）；越界 99→钳到末页 48；输入框用后清空 |
| Pagination | 每页条数切换 | PASS：10→30 条/页，总页数 48→16，总数「共 480 条」不变 |
| Pagination | 受控 v-model | PASS：初值 2 生效，点 4 后「当前页：4」同步回写 |
| Tabs | 点击切换 + 面板联动 | PASS：aria-selected 与激活面板同步 |
| Tabs | 键盘导航（APG tabs pattern） | PASS：roving tabindex（仅激活 tab 可聚焦）；ArrowRight 激活并移动焦点；End 跳末项 |
| Tabs | 新增页签 | PASS：点 + 新增「画卷3」 |
| Tabs | 关闭激活页签 | PASS：关「画卷一」后自动切到相邻「画卷二」，数据源同步移除 |
| Tabs | 受控 v-model | PASS：初值 'mo' 生效，点国风后「当前页签：zh」同步 |
| Steps | 可点击导航 | PASS：点已完成步骤「选稿」→ current 0，后续步骤状态刷新为 wait |
| Steps | wait 态禁点 | PASS：未到达步骤不渲染为 button，点 li 无效（`isButton = clickable && status !== 'wait'`） |
| Menu | 垂直子菜单展开 | PASS：aria-expanded false→true，面板高 0→88px，aria-hidden 同步 |
| Menu | 内联子项选中 | PASS：点「安全设置」→ 激活转移，全局仅 1 个激活项 |
| Menu | 水平飞出定位 | PASS：触发器滚进视口后，popper 落在 trigger 正下方、间距 8px（position: fixed） |
| Menu | 飞出项选中 | PASS：点「基本设置」→ 该项激活（激活态在 teleport 出去的 popper 节点上） |

### BUG-05：文档页多个 demo 共享同名状态，互相串扰（中，docs 站）

- 复现（menu.html 受控实验）：
  1. 刷新页面，基线：demo「垂直布局」激活「首页」、「水平布局」激活「首页」、「展开控制」激活「基本设置」——各自正确；
  2. 点击「水平布局」飞出菜单的「基本设置」；
  3. 结果：**「垂直布局」demo 的激活项从「首页」变成了「基本设置」**，而它自己一个字都没点。
- 根因（已核对组件树 + 源码）：
  - `docs/components/menu.md` 末尾有一段**页级** `<script setup>`（在所有围栏之外）：
    ```js
    const active = ref('home')
    const active2 = ref('settings2-basic')
    ```
  - 页面所有 `<DemoBlock>` 内的活示例模板都跑在这一个页面组件作用域里，所以凡是用 `v-model="active"` 的 demo（本页 4 个中的 3 个）**共用同一个 ref**；
  - 浏览器组件树实证：demo0 与 demo3 的菜单挂在同一个 `components/menu.md` 实例（uid 177）下，其 `setupState` 只有一个 `active`。
- 波及面：`grep` 出 **15 个文档页**带页级 `<script setup>`（anchor/backtop/calendar/cascader/collapse/menu/rate/segmented/table/tooltip/transfer/tree-select/tree/upload/virtual-list）。collapse 页实测同样只有一个共享 `activeNames`。只要一页多个同名状态 demo 就会串。
- 用户观感：点一个 demo，旁边 demo 跟着动，看起来像组件 bug，实际是文档示例没有状态隔离。
- 修法方向：要么每个 DemoBlock 编译成独立子组件（推荐，组件级作用域天然隔离），要么页级脚本按 demo 拆分变量名（`active1`/`active2`…，治标）。

### FINDING-09：Steps「可点击导航」只能回退不能前进（低）

`isButton = clickable.value && status.value !== 'wait'` 使未到达步骤不可点击。对向导流程这是合理守卫，但 demo 标题叫「可点击导航」，用户期待自由跳转。建议文案改为「可回退导航」，或在文档中注明只能跳到已完成的步骤。

---

## D18 国际化镜像（/en/ 站）— 完成

| 测试点 | 结果 |
| --- | --- |
| en button 页结构 | PASS：`lang="en-US"`、`<title>Button \| lh-ui-plus>`、按钮文案 Default/Primary/Success/Warning 全英文、ApiStyleToggle 存在 |
| ApiStyleToggle | PASS：点 Composition → `localStorage['lh-docs-api-style']='composition'`；点 Options → `'options'` + 按钮加 `active` 类 + 10 个 composition 块全部隐藏、10 个 options 块全部显示 |
| en 页面文案（静态） | PASS：demo 模板里的字面量（placeholder、自定义 message）随 en 源码英化 |
| en 组件运行时文案 | **FAIL，见 BUG-06** |

### BUG-06：/en/ 镜像站点从未切换 lh-ui locale，组件运行时文案全中文（中）

- 现象（两处实证）：
  1. `/en/components/pagination.html`：`<html lang="en-US">`，但分页组件渲染的是
     `共 480 条` / `前往` / `每页条数`，aria-label 是 `上一页` / `下一页` / `第 1 页` —— 全中文；
  2. `/en/components/empty.html`：未传 description 的 demo 渲染默认文案 **「暂无数据」**，
     而同页传了自定义 description 的 demo 是英文（"No search results" 等）——
     说明问题只在「组件内部的 locale 文案」，demo 自己写的字面量不受影响。
- 根因：
  - `docs/.vitepress/theme/index.ts` 只把 `LhConfigProvider` 注册为全局组件，
    **没有按路由（`/en/` 前缀）给应用套 `locale="en-US"`**，也没调 `lhlocale.use(...)`；
  - `@lh-ui/share/locales/lang/en-US.js` 里英文文案是**齐的**（`total: "Total {total} items"`、
    `goto: "Go to"`、`prev: "Previous page"` 等），纯粹是没接上。
- 影响：英文用户看文档时，所有组件自带的提示文案（空状态、分页、日期选择器月份、
  上传、表格「暂无数据」筛选按钮等）都是中文。国际化承诺在文档站这一层打折。
- 修法：theme 的 Layout setup 里 watch `useData().page` 的 relativePath，
  以 `/en/` 前缀决定 locale 并 `lhlocale.use({ locale, messages })`，
  或在根布局包一层 `<LhConfigProvider :locale="isEn ? 'en-US' : 'zh-CN'">`。

---

## X1 预设主题切换器（站点右上角 PresetThemeSwitcher）— 完成

| 测试点 | 操作 | 结果 |
| --- | --- | --- |
| 5 个预设逐一切 | 点击切换器下拉，选 cerblue/songhua/zhusha/shuimo/golden | PASS：主色依次 #2B4C7C / #5B8C5A / #B23A3A / #2C2C2C / 金色，`<style id="lh-preset-theme">` 每次整体替换 |
| 持久化 | 刷新页面 | PASS：`localStorage lh-docs-preset` 保留，刷新后主色不回退（防闪烁 head 脚本同步注入） |
| 作用范围 | 预设只改令牌，不动布局 | PASS：切换无重排、无闪烁 |

---

## X2 暗色轴（docs 明暗切换 + 预设 × 暗色交叉）— 完成

| 测试点 | 操作 | 结果 |
| --- | --- | --- |
| 站点暗色开关 | 点导航栏 `VPNavBarAppearance` 日月开关 | PASS：`<html class="dark">` 落位，body 底色变 `#1A1A2E`（深墨染夜），明暗来回切无残留 |
| `.dark` 与 `[data-theme='dark']` 等价 | 手动设两类名/属性 | PASS：两条选择器等价生效（var-dark.scss 用 `[data-theme='dark'], .dark` 双写） |
| 暗色全链路 | 暗色下抽测 button/input/dialog 面板 | PASS：面板底、边框、悬停底（`rgba(255,255,255,.08)`，暗色下反向提亮）均随暗色变量走，未见明色残留 |
| 预设 × 暗色交叉 | 5 预设各自进暗色 | **缺陷**：见 BUG-07 |

### BUG-07：暗色下预设主色不随暗色适配，水墨（shuimo）预设主按钮几乎不可见（中）

- 现象：水墨预设 + 暗色模式，主按钮底色 `rgb(44,44,44)`（#2C2C2C），页面底色
  `rgb(26,26,46)`（#1A1A2E）—— 按钮与背景亮度差仅约 3%，肉眼几乎看不到按钮边界，
  只剩白字浮在暗背景上。截证 `gui-test-screenshots/X2_shuimo_dark_invisible_btn.png`。
- 根因（已核对源码）：`@lh-ui/share/theme` 的 `buildPresetStyleText`（`es/theme/themes/index.js:89`）
  生成的预设样式里，暗色块只覆盖两个令牌：
  ```css
  [data-theme='dark'], .dark {
    --lh-primary-color-bg: color-mix(in srgb, var(--lh-primary-color) 25%, transparent);
    --lh-selected-color:   color-mix(in srgb, var(--lh-primary-color) 40%, #fff);
  }
  ```
  `--lh-primary-color` / `--lh-color-on-primary` 直接沿用明色预设值。这对青花瓷（#2B4C7C）、
  松花绿（#5B8C5A）、朱砂（#B23A3A）尚可接受，但水墨预设明色主色本就是接近黑的 #2C2C2C，
  进暗色后既不提亮也不换色，完全融进暗底。
- 影响面：任何使用 shuimo 预设的暗色站点，主按钮/主色链接/选中态失去「可点 affordance」；
  期望上 `buildPresetStyleText` 应为暗色提供一个提亮后的主色（如 `color-mix(in srgb, #2C2C2C 12%, #fff)`
  之类），或 var-dark 的暗色块对明度过低的主色做兜底提亮。
- 修法建议（任选）：
  1. `buildPresetStyleText` 的暗色块追加 `--lh-primary-color` 的暗色适配（按明度计算提亮）；
  2. 在预设定义里允许每个预设携带 `dark` 覆盖表，shuimo 显式给一个暗色主色（如 #8A8A8A 系）。
- 附带正面发现：暗色下 `--lh-hover-bg-color` 用 `rgba(255,255,255,.08)` 而非黑色低透明度，
  避免了「反向悬停」，这块设计是对的。

---

## X3 主题定制台 ThemeStudio（docs /guide/theme-studio.html）— 完成

| 测试点 | 操作 | 结果 |
| --- | --- | --- |
| 挂载初始化 | 进页面 | PASS：18 个令牌（6 组）全部渲染，预览区即时取站点当前配色 |
| 预设下拉 | 选 songhua | PASS：预览主按钮即时变 `rgb(91,140,90)`，令牌面板同步更新 |
| 令牌实时编辑 | 主色改 `#B23A3A` | PASS：预览按钮即时变朱砂红，下拉自动翻转为「自定义（custom）」 |
| 预览暗色 | 点 ☀️/🌙 | PASS：预览容器 `data-theme="dark"` 落位，`--lh-primary-color-bg` 变 `color-mix(... 25%, transparent)`、`--lh-selected-color` 变 `40% + #fff`，与 buildPresetStyleText 暗色块同源 |
| 导出 SCSS | 读文本域 | PASS：`@use '@lh-ui/share/styles/index.scss'` + `:root` 令牌块 + 暗色块三段齐全，日期注释带生成日 |
| 复制 | 点「复制」 | 部分：按钮按预期闪现「已复制」1.5s 后回落；剪贴板读权限被自动化环境拒绝，内容未直接验证（回退 `execCommand` 路径存在） |
| 重置 | 点「重置」 | PASS：回到 cerblue 默认值，下拉回 cerblue |
| 非法 hex 输入 | 文本框敲 `red` | PASS：真实值保留为 `red`（预览按钮变纯红），颜色选择框静默回退占位色 `#cccccc`，无浏览器 format 报错 |
| 可选令牌 | `--lh-selected-color` | PASS：空值时 hex 框 placeholder「跟随默认链路」 |

### FINDING-10：定制台挂载时下拉框与令牌值不一致（低）

- 现象：站点已切到朱砂预设，进入定制台后预览区与令牌面板全是朱砂值（主色 `#B23A3A`），
  但预设下拉显示的是「青花瓷（cerblue）」。
- 根因：`mounted()` 用 `getComputedStyle(document.documentElement)` 采集站点当前令牌初始化 `vars`，
  但 `selectedPreset` 的 data 初始值固定为 `'cerblue'`，没有根据采集结果反查匹配的预设名。
- 影响：用户在非默认预设下进定制台，看到的「当前预设」与实际颜色不符；改任何令牌又立刻翻成 custom，
  不会误导太久，但首屏认知有错位。修法：mounted 采集后用 `LH_THEME_PRESETS` 反查 vars 完全匹配的预设名赋给
  `selectedPreset`，无匹配则置 `custom`。

---

## X4 非默认预设下的组件回归（松花绿 / 水墨 / 藤黄）— 完成

| 测试点 | 操作 | 结果 |
| --- | --- | --- |
| 主色联动 | 三预设下读 `.lh-button--primary` | PASS：#5B8C5A / #2C2C2C / #B8860B，与预设声明一致 |
| 选中态联动 | 藤黄下打开 Select 下拉，读选中项「北京」 | PASS：选中项文字色 `rgb(130,96,10)` = `--lh-selected-color`（#82600A），未选中项为常规文字色 |
| 主按钮对比度 | 藤黄主按钮 `#B8860B` 底 + `#1E1A16` 字 | PASS：对比度 5.75:1（AA），藤黄预设显式声明了 on-primary |
| 功能色不动 | 三预设下读 success 按钮 | 符合设计：恒为 #5B8C5A（预设只覆盖主色族，功能色保持基线） |
| 容器/边框不动 | 藤黄下 Card 底/边框、Input wrapper 边框 | 符合设计：#FAF6F0 / #E5E0D8 / #D8D3CC 不随预设变（预设未声明 bg/border 令牌） |

### FINDING-11：松花绿预设下「成功按钮」与「主要按钮」完全同色（低）

- 现象：songhua 预设主色 #5B8C5A == 全局 success 色 #5B8C5A，页面上「主要按钮」和「成功按钮」
  颜色、悬停态完全一致，用户只能靠文字区分语义。
- 根因：预设只覆盖主色族，功能色是全局基线；songhua 恰好取了与 success 相同的绿。
- 严重度低（信息仍可读），但建议 songhua 预设把主色稍微偏冷/偏黄一点点（如 #51865A→#4F8A52
  已偏近），或在 success 色定义上与主色拉开色相距离。

---

## X5 ConfigProvider 局部作用域（playground 5173）— 完成

| 测试点 | 操作 | 结果 |
| --- | --- | --- |
| themeVars 局部作用 | 「自定义主题变量」demo（`primary-color:#e6a23c`） | PASS：区内主按钮 `rgb(230,162,60)`，区外全局主按钮仍 `rgb(43,76,124)`；provider 根元素 style 恰为 `--lh-primary-color: #e6a23c;`，变量只级联子树 |
| size 局部作用 | 「全局尺寸」demo（size=mini） | PASS：区内按钮高 20px / 字 12px |
| 组合配置 | size=large + `primary-color:#67c23a` | PASS：按钮高 40px，朴素按钮底为 `#67c23a` 8% 透明 |
| 花纹全局传播 | 依次点 柳叶/云纹/梅花/无花纹 | PASS：三种花纹均以 inline SVG data-uri 即时铺到全站按钮（含远端按钮区），「无花纹」清空回 `none`，预览框文案同步 |
| 花纹消费面 | 柳叶生效后读 `.lh-card` | **缺陷**：见 FINDING-12 |
| patternComponents 白名单 | 运行时探针 | 未生效（见下说明，源码核对通过） |

### FINDING-12：`bg-pattern` 只被 Button 一家绘制，Card 等 10 个组件的 `bgPattern` 是空摆设（中）

- 现象（运行时实测）：playground 里点「柳叶」后，按钮背景出现柳叶花纹；`.lh-card` 根元素的内联 style 里
  明确带上了 `--lh-bg-pattern: var(--lh-pattern-willow)`，但 `getComputedStyle(card).backgroundImage`
  仍是 `none` —— 变量被转发到了元素上，却没有任何样式规则消费它。
- 根因（全量核对 `@lh-ui/share/styles/`）：整个样式库里只有 `button/index.scss` 画了
  `background-image: var(--lh-bg-pattern, none)`（4 处），`patterns.scss` 只定义令牌。
  而调用 `useLhComponentTheme`（会转发 bg-pattern 到根内联 style）的组件有 11 个：
  button / card / dialog / drawer / dropdown / icon / input / popconfirm / popover / steps / tooltip
  —— 除 button 外全部「转发但不绘制」。
- 更进一步：`card/src/types.ts` 给 `bgPattern` 写了文档注释「花纹背景 URL（如
  `var(--lh-pattern-willow)`），不受全局白名单限制」，属于**文档承诺了但样式未实现**。
- 影响：用户照文档给 Card/Dialog 设 `bg-pattern` 或把花纹配进全局 themeVars，期望「国风花纹铺满
  容器」，实际只有按钮变了花纹，卡片/弹窗/输入框纹丝不动。
- 修法建议：在 share 的 card/dialog/drawer 等容器组件 scss 里补
  `background-image: var(--lh-bg-pattern, none)` 及配套 repeat/size 变量（button 的写法可直接照抄）；
  或在文档里明确「花纹目前仅 Button 支持」并移除其余组件的 `bgPattern` prop，避免承诺落空。

### 关于 patternComponents 白名单的验证说明

- 门禁逻辑源码核对通过：`packages/composables/index.ts:113-135`
  `const isPatternAllowed = !ctx?.patternComponents || ctx.patternComponents.includes(componentName)`，
  仅当 key === 'bg-pattern' 时跳过转发，组件自身 `props.themeVars` 不受限制——逻辑正确且最小化。
- 运行时探针未能验证：我把根 provider 的 provides 换成带 `patternComponents: ['LhCard']` 的代理对象后，
  已挂载按钮的内联 `--lh-bg-pattern` 仍未被移除。原因是 `inject()` 在 setup 期就把 computed 引用
  拍进了消费者，替换 provides 对象对已挂载组件无效（不是库的 bug，是探针手段的局限）。
- 覆盖缺口：playground 与 docs 都没有演示 `patternComponents` 的 demo，这段逻辑目前只有源码路径可达。
  建议在 ConfigProvider 文档里补一个「白名单内外对比」demo，顺手补一条单测。
