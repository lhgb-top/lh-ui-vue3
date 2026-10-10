# Badge 徽标

`LhBadge` 用于显示未读消息数量或状态标记。

## 基础用法

<DemoBlock title="基础用法">
  <LhBadge :value="5">
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBadge :value="5">
    <div>目标内容</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBadge :value="5">
    <div>目标内容</div>
  </LhBadge>
</template>
```

## 自定义最大值

<DemoBlock title="自定义最大值">
  <LhBadge :value="100" :max="99">
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBadge
    :value="100"
    :max="99"
  >
    <div>目标内容</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBadge
    :value="100"
    :max="99"
  >
    <div>目标内容</div>
  </LhBadge>
</template>
```

## 红点

`is-dot` 只显示小红点、不展示具体数值，适合「有更新」类提示，可用 `type` 换色。

<DemoBlock title="红点">
  <LhBadge is-dot>
    <div style="width: 60px; height: 60px; border: 1px solid #eee; border-radius: 4px">消息</div>
  </LhBadge>
  <LhBadge is-dot type="warning">
    <div style="width: 60px; height: 60px; border: 1px solid #eee; border-radius: 4px">待办</div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 红点 -->
  <LhBadge is-dot>
    <div>目标内容</div>
  </LhBadge>
  <!-- 红点（警告色） -->
  <LhBadge is-dot type="warning">
    <div>目标内容</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 红点 -->
  <LhBadge is-dot>
    <div>目标内容</div>
  </LhBadge>
  <!-- 红点（警告色） -->
  <LhBadge is-dot type="warning">
    <div>目标内容</div>
  </LhBadge>
</template>
```

## 偏移、零值与自定义内容

`offset` 微调徽标位置（`[x, y]` 像素偏移）；`show-zero` 让零值也显示；`content` 用自定义文案代替数字。

<DemoBlock title="偏移 / 零值 / 自定义内容">
  <LhBadge :value="5" :offset="[6, 6]">
    <div style="width: 80px; height: 80px; border: 1px solid #eee; border-radius: 4px">offset</div>
  </LhBadge>
  <LhBadge :value="0" show-zero>
    <div style="width: 80px; height: 80px; border: 1px solid #eee; border-radius: 4px">show-zero</div>
  </LhBadge>
  <LhBadge value="新" content="新">
    <div style="width: 80px; height: 80px; border: 1px solid #eee; border-radius: 4px">content</div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 偏移 -->
  <LhBadge :value="5" :offset="[6, 6]">
    <div>目标内容</div>
  </LhBadge>
  <!-- 零值也显示 -->
  <LhBadge :value="0" show-zero>
    <div>目标内容</div>
  </LhBadge>
  <!-- 自定义内容 -->
  <LhBadge value="新" content="新">
    <div>目标内容</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 偏移 -->
  <LhBadge :value="5" :offset="[6, 6]">
    <div>目标内容</div>
  </LhBadge>
  <!-- 零值也显示 -->
  <LhBadge :value="0" show-zero>
    <div>目标内容</div>
  </LhBadge>
  <!-- 自定义内容 -->
  <LhBadge value="新" content="新">
    <div>目标内容</div>
  </LhBadge>
</template>
```


<DemoBlock title="红点">
  <LhBadge is-dot>
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBadge is-dot>
    <div>目标内容</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBadge is-dot>
    <div>目标内容</div>
  </LhBadge>
</template>
```

## 类型

<DemoBlock title="类型">
  <LhBadge type="primary" :value="2">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge type="success" :value="1">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge type="warning" :value="1">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge type="info" :value="1">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBadge
    type="primary"
    :value="2"
  >
    <div>Primary</div>
  </LhBadge>
  <LhBadge
    type="success"
    :value="1"
  >
    <div>Success</div>
  </LhBadge>
  <LhBadge
    type="warning"
    :value="1"
  >
    <div>Warning</div>
  </LhBadge>
  <LhBadge
    type="info"
    :value="1"
  >
    <div>Info</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBadge
    type="primary"
    :value="2"
  >
    <div>Primary</div>
  </LhBadge>
  <LhBadge
    type="success"
    :value="1"
  >
    <div>Success</div>
  </LhBadge>
  <LhBadge
    type="warning"
    :value="1"
  >
    <div>Warning</div>
  </LhBadge>
  <LhBadge
    type="info"
    :value="1"
  >
    <div>Info</div>
  </LhBadge>
</template>
```

## 尺寸

<DemoBlock title="尺寸">
  <LhBadge size="small" :value="5">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge size="medium" :value="5">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhBadge size="large" :value="5">
    <div style="width: 50px; height: 50px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhBadge
    size="small"
    :value="5"
  >
    <div>Small</div>
  </LhBadge>
  <LhBadge
    size="medium"
    :value="5"
  >
    <div>Medium</div>
  </LhBadge>
  <LhBadge
    size="large"
    :value="5"
  >
    <div>Large</div>
  </LhBadge>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhBadge
    size="small"
    :value="5"
  >
    <div>Small</div>
  </LhBadge>
  <LhBadge
    size="medium"
    :value="5"
  >
    <div>Medium</div>
  </LhBadge>
  <LhBadge
    size="large"
    :value="5"
  >
    <div>Large</div>
  </LhBadge>
</template>
```

## 控制显示与隐藏

<DemoBlock title="控制显示与隐藏">
  <LhBadge :value="badgeValue" :hidden="isHidden">
    <div style="width: 100px; height: 100px; border: 1px solid #eee; border-radius: 4px;"></div>
  </LhBadge>
  <LhButton @click="isHidden = !isHidden">
    {{ isHidden ? '显示' : '隐藏' }}
  </LhButton>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'

const badgeValue = ref(10)
const isHidden = ref(false)
</script>

<template>
  <LhBadge
    :value="badgeValue"
    :hidden="isHidden"
  >
    <div>目标内容</div>
  </LhBadge>
  <LhButton @click="isHidden = !isHidden">
    {{ isHidden ? '显示' : '隐藏' }}
  </LhButton>
</template>
```

```vue options
<script>
import { ref } from 'vue'

const badgeValue = ref(10)
const isHidden = ref(false)
</script>

<template>
  <LhBadge
    :value="badgeValue"
    :hidden="isHidden"
  >
    <div>目标内容</div>
  </LhBadge>
  <LhButton @click="isHidden = !isHidden">
    {{ isHidden ? '显示' : '隐藏' }}
  </LhButton>
</template>
```

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/badge/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhBadgeProps">
<summary><code>LhBadgeProps</code></summary>

```ts
export interface LhBadgeProps {
  type?: LhBadgeType
  value?: string | number
  size?: LhBadgeSize
  max?: number
  isDot?: boolean
  hidden?: boolean
  offset?: [number, number]
  showZero?: boolean
  content?: string
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhBadgeSize">
<summary><code>LhBadgeSize</code></summary>

```ts
export type LhBadgeSize = LhComponentSize
```

</details>

<details id="type-LhBadgeOffset">
<summary><code>LhBadgeOffset</code></summary>

```ts
export type LhBadgeOffset = [number, number]
```

</details>

<details id="type-LhBadgeType">
<summary><code>LhBadgeType</code> <sub>（来自 @lh-ui/share/core/badge）</sub></summary>

```ts
export type LhBadgeType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
```

</details>

<details id="type-LhComponentSize">
<summary><code>LhComponentSize</code> <sub>（来自 @lh-ui/share/core/shared）</sub></summary>

```ts
export type LhComponentSize = (typeof LH_SIZE_CONST)[keyof typeof LH_SIZE_CONST]
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const badgeValue = ref(10)
const isHidden = ref(false)
const locale = ref('zh-CN')
</script>

## 国际化

徽标文字可以通过 `LhConfigProvider` 配合语言包实现国际化切换。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhBadge :value="5">
      <div>{{ locale === 'zh-CN' ? '消息' : 'Messages' }}</div>
    </LhBadge>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhBadge, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
</script>

<template>
  <!-- 通过 ConfigProvider 切换语言包 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhBadge :value="5">
      <div>{{ locale === 'zh-CN' ? '消息' : 'Messages' }}</div>
    </LhBadge>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhBadge, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhBadge, LhButton },
  data() {
    return {
      locale: 'zh-CN',
      zhCN: zhCN,
      enUS: enUS,
    }
  },
}
</script>

<template>
  <!-- 通过 ConfigProvider 切换语言包 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhBadge :value="5">
      <div>{{ locale === 'zh-CN' ? '消息' : 'Messages' }}</div>
    </LhBadge>
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## API

| 属性     | 说明       | 类型                                                                     | 默认值     |
| -------- | ---------- | ------------------------------------------------------------------------ | ---------- |
| type | 徽标类型 | `"primary" \| "success" \| "warning" \| "danger" \| "info" \| "default"` | `'danger'` |
| value | 显示值 | `string \| number` | — |
| size | 尺寸 | `"small" \| "medium" \| "large" \| "mini" \| "x-large"` | `'medium'` |
| max | 最大值 | `number` | `99` |
| isDot | 小圆点模式 | `boolean` | `false` |
| hidden | 是否隐藏 | `boolean` | `false` |
| offset | 偏移量 | `[number, number]` | — |
| showZero | 是否显示0 | `boolean` | `false` |
| content | 自定义内容 | `string` | — |
| sx | 快速布局属性（如 `{ mt: 2, w: '50%' }`），转内联样式作用于根元素 | `SxProps` | — |

## 无障碍

- 小圆点模式（`is-dot`）的角标是纯装饰，标记为 `aria-hidden`，不进入无障碍树
- 数值模式保留文本内容，屏读可读取「99+」等计数
