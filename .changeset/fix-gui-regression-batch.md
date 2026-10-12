---
"@lh-ui/vue3": patch
---

GUI 回归测试发现的七项缺陷修复 + Form 异步校验缺陷。

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
