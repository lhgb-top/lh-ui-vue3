# Descriptions 描述列表

`LhDescriptions` 用于展示对象的属性列表，支持列数、跨列与边框模式。

## 基础用法

<DemoBlock title="标题 + 条目列表">
  <LhDescriptions
    title="藏品档案"
    :column="2"
    :items="[
      { label: '名称', value: '青花缠枝莲纹瓶' },
      { label: '年代', value: '明永乐' },
      { label: '类别', value: '瓷器' },
      { label: '级别', value: '一级文物' },
    ]"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
import { LhDescriptions } from '@lh-ui/vue3'
</script>

<template>
  <LhDescriptions
    title="藏品档案"
    :column="2"
    :items="[
      { label: '名称', value: '青花缠枝莲纹瓶' },
      { label: '年代', value: '明永乐' },
      { label: '类别', value: '瓷器' },
      { label: '级别', value: '一级文物' },
    ]"
  />
</template>
```

```vue options
<script>
import { LhDescriptions } from '@lh-ui/vue3'

export default {
  components: { LhDescriptions },
}
</script>

<template>
  <LhDescriptions
    title="藏品档案"
    :column="2"
    :items="[
      { label: '名称', value: '青花缠枝莲纹瓶' },
      { label: '年代', value: '明永乐' },
      { label: '类别', value: '瓷器' },
      { label: '级别', value: '一级文物' },
    ]"
  />
</template>
```

## 列数与跨列

<DemoBlock title="column 控制每行列数，item 的 span 控制跨列">
  <LhDescriptions
    :column="3"
    :items="[
      { label: '名称', value: '千里江山图', span: 2 },
      { label: '年代', value: '北宋' },
      { label: '作者', value: '王希孟' },
      { label: '材质', value: '绢本设色' },
      { label: '藏地', value: '北京故宫博物院' },
    ]"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhDescriptions
    :column="3"
    :items="[
      { label: '名称', value: '千里江山图', span: 2 },
      { label: '年代', value: '北宋' },
      { label: '作者', value: '王希孟' },
      { label: '材质', value: '绢本设色' },
      { label: '藏地', value: '北京故宫博物院' },
    ]"
  />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhDescriptions
    :column="3"
    :items="[
      { label: '名称', value: '千里江山图', span: 2 },
      { label: '年代', value: '北宋' },
      { label: '作者', value: '王希孟' },
      { label: '材质', value: '绢本设色' },
      { label: '藏地', value: '北京故宫博物院' },
    ]"
  />
</template>
```

span 超出本行剩余宽度时自动钳制；最后一行不足会自动补位。

## 边框模式

<DemoBlock title="border 展示表格边框">
  <LhDescriptions
    :column="2"
    border
    :items="[
      { label: '名称', value: '兰亭序' },
      { label: '作者', value: '王羲之' },
      { label: '年代', value: '东晋' },
      { label: '书体', value: '行书' },
    ]"
  />
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <LhDescriptions
    :column="2"
    border
    :items="[
      { label: '名称', value: '兰亭序' },
      { label: '作者', value: '王羲之' },
      { label: '年代', value: '东晋' },
      { label: '书体', value: '行书' },
    ]"
  />
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <LhDescriptions
    :column="2"
    border
    :items="[
      { label: '名称', value: '兰亭序' },
      { label: '作者', value: '王羲之' },
      { label: '年代', value: '东晋' },
      { label: '书体', value: '行书' },
    ]"
  />
</template>
```

## 自定义内容

条目内容可通过 `item-<index>` 作用域插槽覆盖。

<DemoBlock title="作用域插槽">
  <LhDescriptions
    :column="1"
    :items="[
      { label: '状态', value: '进行中' },
      { label: '进度', value: '' },
    ]"
  >
    <template #item-1="{ item }">
      <LhProgress :percentage="66" />
    </template>
  </LhDescriptions>
</DemoBlock>

```vue composition
<script setup lang="ts">
</script>

<template>
  <!-- 用 #item-1 插槽覆盖「进度」条目 -->
  <LhDescriptions
    :column="1"
    :items="[
      { label: '状态', value: '进行中' },
      { label: '进度', value: '' },
    ]"
  >
    <template #item-1="{ item }">
      <LhProgress :percentage="66" />
    </template>
  </LhDescriptions>
</template>
```

```vue options
<script>
export default {}
</script>

<template>
  <!-- 用 #item-1 插槽覆盖「进度」条目 -->
  <LhDescriptions
    :column="1"
    :items="[
      { label: '状态', value: '进行中' },
      { label: '进度', value: '' },
    ]"
  >
    <template #item-1="{ item }">
      <LhProgress :percentage="66" />
    </template>
  </LhDescriptions>
</template>
```

## 国际化

条目标签和内容可以通过 `LhConfigProvider` 配合语言包实现国际化切换。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhDescriptions
      :title="locale === 'zh-CN' ? '藏品档案' : 'Collection Archive'"
      :column="2"
      :items="[
        { label: locale === 'zh-CN' ? '名称' : 'Name', value: '青花缠枝莲纹瓶' },
        { label: locale === 'zh-CN' ? '年代' : 'Period', value: '明永乐' },
      ]"
    />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhDescriptions, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
</script>

<template>
  <!-- 通过 ConfigProvider 切换语言包 -->
  <LhConfigProvider :locale="locale === 'zh-CN' ? zhCN : enUS">
    <LhDescriptions
      :title="locale === 'zh-CN' ? '藏品档案' : 'Collection Archive'"
      :column="2"
      :items="[
        { label: locale === 'zh-CN' ? '名称' : 'Name', value: '青花缠枝莲纹瓶' },
        { label: locale === 'zh-CN' ? '年代' : 'Period', value: '明永乐' },
      ]"
    />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhDescriptions, LhButton } from '@lh-ui/vue3'
import { zhCN } from '@lh-ui/vue3'
import { enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhDescriptions, LhButton },
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
    <LhDescriptions
      :title="locale === 'zh-CN' ? '藏品档案' : 'Collection Archive'"
      :column="2"
      :items="[
        { label: locale === 'zh-CN' ? '名称' : 'Name', value: '青花缠枝莲纹瓶' },
        { label: locale === 'zh-CN' ? '年代' : 'Period', value: '明永乐' },
      ]"
    />
    <LhButton @click="locale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'">
      {{ locale === 'zh-CN' ? '切换英文' : 'Switch to Chinese' }}
    </LhButton>
  </LhConfigProvider>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列表标题 | `string` | — |
| column | 每行展示的条目列数 | `number` | `3` |
| border | 是否展示边框 | `boolean` | `false` |
| items | 条目列表 | `[LhDescriptionsItem](#type-LhDescriptionsItem)`[] | `() => []` |
| sx | 快速布局属性（如 `{ mt: 2, w: '50%' }`），转内联样式作用于根元素 | `SxProps` | — |

### LhDescriptionsItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 条目标签 | `string` | — |
| value | 条目内容 | `string \| number` | — |
| span | 占据的列数，超出会钳制 | `number` | `1` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| title | 自定义标题 | — |
| item-\<index\> | 覆盖第 index 个条目的内容 | `{ item }` |

### 无障碍

- 条目使用 `<dl>` / `<dt>` / `<dd>` 语义结构，标签与值的对应关系由元素本身表达
- 行末补位元素是纯装饰，标记为 `aria-hidden`

<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/descriptions/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhDescriptionsProps">
<summary><code>LhDescriptionsProps</code></summary>

```ts
export interface LhDescriptionsProps {
  /** 描述列表标题 */
  title?: string
  /** 每行展示的条目列数 */
  column?: number
  /** 是否展示边框 */
  border?: boolean
  /** 条目列表；label/value/span 三元组 */
  items: LhDescriptionsItem[]
  /** sx 快速布局属性 */
  sx?: SxProps
}
```

</details>

<details id="type-LhDescriptionsItem">
<summary><code>LhDescriptionsItem</code> <sub>（来自 @lh-ui/share/core/descriptions）</sub></summary>

```ts
export interface LhDescriptionsItem {
  /** 条目标签 */
  label: string
  /** 条目内容（也可用作用域插槽传入） */
  value?: string | number
  /** 占据的列数（默认 1，超出 column 会被钳制） */
  span?: number
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref } from 'vue'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const locale = ref('zh-CN')
</script>
