# Menu 导航菜单

页面导航组件。支持水平 / 垂直布局、嵌套子菜单、折叠态、手风琴，键盘对齐 APG menu pattern。

## 垂直布局（内联子菜单）

> 垂直内联模式支持键盘遍历：展开子菜单后 ↑/↓ 可跨「叶子项 ↔ 子菜单标题 ↔ 面板内项」边界移动（Home/End 跳首末），禁用项与收起面板内的项自动跳过。

<DemoBlock title="垂直布局">
  <LhMenu v-model="active">
    <LhMenuItem index="home">首页</LhMenuItem>
    <LhSubMenu index="settings" title="设置">
      <LhMenuItem index="settings-basic">基本设置</LhMenuItem>
      <LhMenuItem index="settings-security">安全设置</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="docs" disabled>禁用项</LhMenuItem>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const active = ref('home')
const active2 = ref('settings2-basic')
</script>

<template>
  <!-- 垂直布局 -->
  <LhMenu v-model="active">
    <LhMenuItem index="home">首页</LhMenuItem>
    <LhSubMenu index="settings" title="设置">
      <LhMenuItem index="settings-basic">基本设置</LhMenuItem>
      <LhMenuItem index="settings-security">安全设置</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="docs" disabled>禁用项</LhMenuItem>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return {
      active: 'home',
      active2: 'settings2-basic',
    }
  },
}
</script>

<template>
  <!-- 垂直布局 -->
  <LhMenu v-model="active">
    <LhMenuItem index="home">首页</LhMenuItem>
    <LhSubMenu index="settings" title="设置">
      <LhMenuItem index="settings-basic">基本设置</LhMenuItem>
      <LhMenuItem index="settings-security">安全设置</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="docs" disabled>禁用项</LhMenuItem>
  </LhMenu>
</template>
```

## 展开控制

`default-openeds` 初始展开的子菜单；`openeds`（配合 `v-model:openeds`）受控展开集合；`unique-opened` 同时只展开一个子菜单。`LhSubMenu` 也支持 `disabled` 整体禁用。

<DemoBlock title="展开控制">
  <LhMenu
    v-model="active2"
    :default-openeds="['settings2']"
    unique-opened
    style="max-width: 240px"
  >
    <LhSubMenu index="settings2" title="设置（默认展开）">
      <LhMenuItem index="settings2-basic">基本设置</LhMenuItem>
      <LhMenuItem index="settings2-security">安全设置</LhMenuItem>
    </LhSubMenu>
    <LhSubMenu index="manage" title="管理（禁用）" disabled>
      <LhMenuItem index="manage-users">用户管理</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="about2">关于</LhMenuItem>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup>
import { ref } from 'vue'
const active2 = ref('settings2-basic')
</script>

<template>
  <!-- 展开控制 -->
  <LhMenu
    v-model="active2"
    :default-openeds="['settings2']"
    unique-opened
    style="max-width: 240px"
  >
    <LhSubMenu index="settings2" title="设置（默认展开）">
      <LhMenuItem index="settings2-basic">基本设置</LhMenuItem>
      <LhMenuItem index="settings2-security">安全设置</LhMenuItem>
    </LhSubMenu>
    <LhSubMenu index="manage" title="管理（禁用）" disabled>
      <LhMenuItem index="manage-users">用户管理</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="about2">关于</LhMenuItem>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active2: 'settings2-basic' }
  },
}
</script>

<template>
  <!-- 展开控制 -->
  <LhMenu
    v-model="active2"
    :default-openeds="['settings2']"
    unique-opened
    style="max-width: 240px"
  >
    <LhSubMenu index="settings2" title="设置（默认展开）">
      <LhMenuItem index="settings2-basic">基本设置</LhMenuItem>
      <LhMenuItem index="settings2-security">安全设置</LhMenuItem>
    </LhSubMenu>
    <LhSubMenu index="manage" title="管理（禁用）" disabled>
      <LhMenuItem index="manage-users">用户管理</LhMenuItem>
    </LhSubMenu>
    <LhMenuItem index="about2">关于</LhMenuItem>
  </LhMenu>
</template>
```

<DemoBlock title="受控展开集合">
  <LhMenu v-model="active2" :openeds="['settings2']">
    <LhSubMenu index="settings2" title="设置">
      <LhMenuItem index="settings2-basic">基本设置</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const active2 = ref('settings2-basic')
</script>

<template>
  <!-- 受控展开集合 -->
  <LhMenu v-model="active2" :openeds="['settings2']">
    <LhSubMenu index="settings2" title="设置">
      <LhMenuItem index="settings2-basic">基本设置</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active2: 'settings2-basic' }
  },
}
</script>

<template>
  <!-- 受控展开集合 -->
  <LhMenu v-model="active2" :openeds="['settings2']">
    <LhSubMenu index="settings2" title="设置">
      <LhMenuItem index="settings2-basic">基本设置</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</template>
```

## 水平布局（飞出子菜单）

<DemoBlock title="水平布局">
  <LhMenu v-model="active" mode="horizontal">
    <LhMenuItem index="home">首页</LhMenuItem>
    <LhSubMenu index="settings" title="设置">
      <LhMenuItem index="settings-basic">基本设置</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>

<template>
  <!-- 水平布局 -->
  <LhMenu v-model="active" mode="horizontal">
    <LhMenuItem index="home">首页</LhMenuItem>
    <LhSubMenu index="settings" title="设置">
      <LhMenuItem index="settings-basic">基本设置</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active: 'home' }
  },
}
</script>

<template>
  <!-- 水平布局 -->
  <LhMenu v-model="active" mode="horizontal">
    <LhMenuItem index="home">首页</LhMenuItem>
    <LhSubMenu index="settings" title="设置">
      <LhMenuItem index="settings-basic">基本设置</LhMenuItem>
    </LhSubMenu>
  </LhMenu>
</template>
```

## 折叠态与分组

<DemoBlock title="折叠 + 分组">
  <LhMenu v-model="active" collapse>
    <LhMenuItemGroup title="内容">
      <LhMenuItem index="home">首页</LhMenuItem>
    </LhMenuItemGroup>
  </LhMenu>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>

<template>
  <!-- 折叠 + 分组 -->
  <LhMenu v-model="active" collapse>
    <LhMenuItemGroup title="内容">
      <LhMenuItem index="home">首页</LhMenuItem>
    </LhMenuItemGroup>
  </LhMenu>
</template>
```

```vue options
<script>
export default {
  data() {
    return { active: 'home' }
  },
}
</script>

<template>
  <!-- 折叠 + 分组 -->
  <LhMenu v-model="active" collapse>
    <LhMenuItemGroup title="内容">
      <LhMenuItem index="home">首页</LhMenuItem>
    </LhMenuItemGroup>
  </LhMenu>
</template>
```

## API

### LhMenu Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 当前激活项（受控 v-model；未传时内部维护） | `string` | — |
| mode | 布局模式 | `"horizontal" \| "vertical"` | `'vertical'` |
| collapse | 垂直模式折叠为图标条（子菜单改为飞出面板） | `boolean` | `false` |
| defaultOpeneds | 默认展开的子菜单键（非受控） | `string[]` | `() => []` |
| openeds | 受控展开的子菜单键 | `string[]` | — |
| uniqueOpened | 手风琴：同时只展开一个子菜单 | `boolean` | `false` |
| sx | sx 快速布局属性 | `SxProps` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 激活项变化时触发（v-model） | `(value: string)` |
| update:openeds | 展开的子菜单集合变化时触发（v-model:openeds） | `(value: string[])` |
| select | 菜单项被选中时触发 | `(index: string, indexPath: string[])` |
| open | 子菜单展开时触发 | `(index: string, indexPath: string[])` |
| close | 子菜单收起时触发 | `(index: string, indexPath: string[])` |

### LhMenuItem Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| index | 唯一标识（必填） | `string` | — |
| disabled | 禁用 | `boolean` | `false` |
| sx | sx 快速布局属性 | `SxProps` | — |

事件：`click(index)`；插槽：`default`。

### LhSubMenu Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| index | 唯一标识（必填） | `string` | — |
| title | 标题（也可用 title 插槽） | `string` | — |
| disabled | 禁用 | `boolean` | `false` |
| sx | sx 快速布局属性 | `SxProps` | — |

事件：`select(index, indexPath)`（冒泡）；插槽：`title`、`default`（可再嵌套 LhSubMenu）。

### LhMenuItemGroup Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 分组标题（也可用 title 插槽） | `string` | — |
| sx | sx 快速布局属性 | `SxProps` | — |

插槽：`title`、`default`。

## 无障碍

- 水平为 `role="menubar"`、垂直为 `role="menu"`；项为 `role="menuitem"`、分组为 `role="group"`（容器 `role="presentation"`）
- 子菜单标题 `aria-haspopup` + `aria-expanded` + `aria-controls` 关联面板
- 键盘：Enter/Space/→ 展开并聚焦首项、← 收起、Esc 关闭；垂直内联模式 ↑/↓/Home/End 在可见项（叶子项、子菜单标题与已展开面板内项）间跨边界遍历并循环，禁用项与收起面板内的项自动跳过
- 内联展开高度用 CSS `grid-template-rows: 0fr/1fr`（零 JS 测高）；飞出面板由 popper 引擎定位（flip/shift/视口外收起）

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/menu/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhMenuProps">
<summary><code>LhMenuProps</code></summary>

```ts
/** 菜单 props */
export interface LhMenuProps {
  /** 当前激活项（受控 v-model；未传时组件内部维护） */
  modelValue?: string
  /** 布局模式 */
  mode?: LhMenuMode
  /** 垂直模式折叠为图标条（子菜单改为飞出面板） */
  collapse?: boolean
  /** 默认展开的子菜单键（非受控） */
  defaultOpeneds?: string[]
  /** 受控展开的子菜单键 */
  openeds?: string[]
  /** 手风琴：同时只展开一个子菜单 */
  uniqueOpened?: boolean
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhMenuItemProps">
<summary><code>LhMenuItemProps</code></summary>

```ts
/** 叶子项 props */
export interface LhMenuItemProps {
  /** 唯一标识（必填） */
  index: string
  disabled?: boolean
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhSubMenuProps">
<summary><code>LhSubMenuProps</code></summary>

```ts
/** 子菜单 props（可递归嵌套） */
export interface LhSubMenuProps {
  /** 唯一标识（必填） */
  index: string
  /** 标题（也可用 title 插槽） */
  title?: string
  disabled?: boolean
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhMenuItemGroupProps">
<summary><code>LhMenuItemGroupProps</code></summary>

```ts
/** 分组 props */
export interface LhMenuItemGroupProps {
  /** 分组标题（也可用 title 插槽） */
  title?: string
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhMenuMode">
<summary><code>LhMenuMode</code> <sub>（来自 @lh-ui/share/core/menu）</sub></summary>

```ts
/** 菜单布局模式 */
export type LhMenuMode = 'horizontal' | 'vertical'
```

</details>

<!-- lh-types:end -->
<script setup>
import { ref } from 'vue'
const active = ref('home')
const active2 = ref('settings2-basic')
</script>
