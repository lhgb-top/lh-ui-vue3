# Dialog 对话框

模态对话框组件，用于展示重要信息或确认操作。

## 基础用法

<DemoBlock title="基础用法">
  <LhButton @click="dialogVisible1 = true">打开对话框</LhButton>
  <LhDialog v-model="dialogVisible1" title="提示">
    <p>这是一个对话框内容</p>
    <template #footer>
      <LhButton @click="dialogVisible1 = false">取消</LhButton>
      <LhButton type="primary" @click="dialogVisible1 = false">确定</LhButton>
    </template>
  </LhDialog>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhButton, LhDialog } from '@lh-ui/vue3'

const dialogVisible1 = ref(false)
</script>

<template>
  <!-- 基础用法 -->
  <LhButton @click="dialogVisible1 = true">打开对话框</LhButton>
  <LhDialog v-model="dialogVisible1" title="提示">
    <p>这是一个对话框内容</p>
    <template #footer>
      <LhButton @click="dialogVisible1 = false">取消</LhButton>
      <LhButton type="primary" @click="dialogVisible1 = false">确定</LhButton>
    </template>
  </LhDialog>
</template>
```

```vue options
<script>
import { LhButton, LhDialog } from '@lh-ui/vue3'

export default {
  components: { LhButton, LhDialog },
  data() {
    return {
      dialogVisible1: false
    }
  }
}
</script>

<template>
  <!-- 基础用法 -->
  <LhButton @click="dialogVisible1 = true">打开对话框</LhButton>
  <LhDialog v-model="dialogVisible1" title="提示">
    <p>这是一个对话框内容</p>
    <template #footer>
      <LhButton @click="dialogVisible1 = false">取消</LhButton>
      <LhButton type="primary" @click="dialogVisible1 = false">确定</LhButton>
    </template>
  </LhDialog>
</template>
```

## 自定义宽高

<DemoBlock title="自定义宽度">
  <LhButton @click="dialogVisible2 = true">打开大对话框</LhButton>
  <LhDialog v-model="dialogVisible2" title="大对话框" width="600px">
    <p>自定义尺寸的对话框</p>
    <template #footer>
      <LhButton @click="dialogVisible2 = false">关闭</LhButton>
    </template>
  </LhDialog>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhButton, LhDialog } from '@lh-ui/vue3'

const dialogVisible2 = ref(false)
</script>

<template>
  <!-- 自定义宽高 -->
  <LhButton @click="dialogVisible2 = true">打开大对话框</LhButton>
  <LhDialog v-model="dialogVisible2" title="大对话框" width="600px">
    <p>自定义尺寸的对话框</p>
    <template #footer>
      <LhButton @click="dialogVisible2 = false">关闭</LhButton>
    </template>
  </LhDialog>
</template>
```

```vue options
<script>
import { LhButton, LhDialog } from '@lh-ui/vue3'

export default {
  components: { LhButton, LhDialog },
  data() {
    return {
      dialogVisible2: false
    }
  }
}
</script>

<template>
  <!-- 自定义宽高 -->
  <LhButton @click="dialogVisible2 = true">打开大对话框</LhButton>
  <LhDialog v-model="dialogVisible2" title="大对话框" width="600px">
    <p>自定义尺寸的对话框</p>
    <template #footer>
      <LhButton @click="dialogVisible2 = false">关闭</LhButton>
    </template>
  </LhDialog>
</template>
```

## 可拖拽

<DemoBlock title="可拖拽">
  <LhButton @click="dialogVisible3 = true">打开可拖拽对话框</LhButton>
  <LhDialog v-model="dialogVisible3" title="可拖拽对话框" draggable>
    <p>拖拽标题栏可以移动此对话框。</p>
    <template #footer>
      <LhButton @click="dialogVisible3 = false">关闭</LhButton>
    </template>
  </LhDialog>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhButton, LhDialog } from '@lh-ui/vue3'

const dialogVisible3 = ref(false)
</script>

<template>
  <!-- 可拖拽 -->
  <LhButton @click="dialogVisible3 = true">打开可拖拽对话框</LhButton>
  <LhDialog v-model="dialogVisible3" title="可拖拽对话框" draggable>
    <p>拖拽标题栏可以移动此对话框。</p>
    <template #footer>
      <LhButton @click="dialogVisible3 = false">关闭</LhButton>
    </template>
  </LhDialog>
</template>
```

```vue options
<script>
import { LhButton, LhDialog } from '@lh-ui/vue3'

export default {
  components: { LhButton, LhDialog },
  data() {
    return {
      dialogVisible3: false
    }
  }
}
</script>

<template>
  <!-- 可拖拽 -->
  <LhButton @click="dialogVisible3 = true">打开可拖拽对话框</LhButton>
  <LhDialog v-model="dialogVisible3" title="可拖拽对话框" draggable>
    <p>拖拽标题栏可以移动此对话框。</p>
    <template #footer>
      <LhButton @click="dialogVisible3 = false">关闭</LhButton>
    </template>
  </LhDialog>
</template>
```

## 自定义主题

为对话框应用自定义主题色。

<DemoBlock title="青花瓷主题对话框">
  <LhConfigProvider :theme-vars="cerblueTheme">
    <div>
      <LhButton @click="dialogThemeVisible = true" type="primary">打开主题对话框</LhButton>
      <LhDialog v-model="dialogThemeVisible" title="青花瓷主题">
        <p>该对话框使用青花瓷主题色</p>
        <template #footer>
          <LhButton @click="dialogThemeVisible = false">关闭</LhButton>
        </template>
      </LhDialog>
    </div>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhConfigProvider, LhButton, LhDialog } from '@lh-ui/vue3'

const dialogThemeVisible = ref(false)
const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <!-- 青花瓷主题 -->
    <LhButton @click="dialogThemeVisible = true" type="primary">打开主题对话框</LhButton>
    <LhDialog v-model="dialogThemeVisible" title="青花瓷主题">
      <p>该对话框使用青花瓷主题色</p>
      <template #footer>
        <LhButton @click="dialogThemeVisible = false">关闭</LhButton>
      </template>
    </LhDialog>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhButton, LhDialog } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton, LhDialog },
  data() {
    return {
      dialogThemeVisible: false,
      cerblueTheme: {
        'primary-color': '#2B4C7C',
        'primary-color-hover': '#3D649E',
        'primary-color-bg': '#E8EDF3',
      },
    }
  },
}
</script>

<template>
  <LhConfigProvider :theme-vars="cerblueTheme">
    <!-- 青花瓷主题 -->
    <LhButton @click="dialogThemeVisible = true" type="primary">打开主题对话框</LhButton>
    <LhDialog v-model="dialogThemeVisible" title="青花瓷主题">
      <p>该对话框使用青花瓷主题色</p>
      <template #footer>
        <LhButton @click="dialogThemeVisible = false">关闭</LhButton>
      </template>
    </LhDialog>
  </LhConfigProvider>
</template>
```

更多主题请参考 [主题定制](/guide/theme-customization)。

## sx 快速布局

通过 `sx` 属性快速设置 Dialog 的维度与间距。

<DemoBlock title="sx 快速布局">
  <LhButton @click="visible = true">打开对话框</LhButton>
  <LhDialog v-model="visible" title="sx 布局" :sx="{ maxWidth: 400 }">
    <p>设置了最大宽度</p>
    <template #footer>
      <LhButton @click="visible = false">取消</LhButton>
    </template>
  </LhDialog>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhButton, LhDialog } from '@lh-ui/vue3'

const visible = ref(false)
</script>

<template>
  <!-- 打开对话框 -->
  <LhButton @click="visible = true">打开对话框</LhButton>
  <!-- sx 布局对话框 -->
  <LhDialog v-model="visible" title="sx 布局" :sx="{ maxWidth: 400 }">
    <p>设置了最大宽度</p>
    <template #footer>
      <LhButton @click="visible = false">取消</LhButton>
    </template>
  </LhDialog>
</template>
```

```vue options
<script>
import { LhButton, LhDialog } from '@lh-ui/vue3'

export default {
  components: { LhButton, LhDialog },
  data() {
    return { visible: false }
  },
}
</script>

<template>
  <!-- 打开对话框 -->
  <LhButton @click="visible = true">打开对话框</LhButton>
  <!-- sx 布局对话框 -->
  <LhDialog v-model="visible" title="sx 布局" :sx="{ maxWidth: 400 }">
    <p>设置了最大宽度</p>
    <template #footer>
      <LhButton @click="visible = false">取消</LhButton>
    </template>
  </LhDialog>
</template>
```

## 国际化


对话框文字可以通过 `LhConfigProvider` 配合语言包实现国际化切换。

<DemoBlock title="国际化">
  <LhConfigProvider :locale="messages">
    <LhButton @click="i18nVisible = true">
      {{ locale === 'zh-CN' ? '打开对话框' : 'Open Dialog' }}
    </LhButton>
    <LhDialog v-model="i18nVisible" :title="locale === 'zh-CN' ? '提示' : 'Notice'">
      <p>{{ locale === 'zh-CN' ? '对话框内容' : 'Dialog content' }}</p>
      <template #footer>
        <LhButton @click="i18nVisible = false">
          {{ locale === 'zh-CN' ? '取消' : 'Cancel' }}
        </LhButton>
      </template>
    </LhDialog>
  </LhConfigProvider>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref, computed } from 'vue'
import { LhConfigProvider, LhButton, LhDialog, zhCN, enUS } from '@lh-ui/vue3'

const locale = ref('zh-CN')
const i18nVisible = ref(false)
const messages = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS))
</script>

<template>
  <LhConfigProvider :locale="messages">
    <!-- 打开对话框 -->
    <LhButton @click="i18nVisible = true">
      {{ locale === 'zh-CN' ? '打开对话框' : 'Open Dialog' }}
    </LhButton>
    <!-- 国际化对话框 -->
    <LhDialog v-model="i18nVisible" :title="locale === 'zh-CN' ? '提示' : 'Notice'">
      <p>{{ locale === 'zh-CN' ? '对话框内容' : 'Dialog content' }}</p>
      <template #footer>
        <LhButton @click="i18nVisible = false">
          {{ locale === 'zh-CN' ? '取消' : 'Cancel' }}
        </LhButton>
      </template>
    </LhDialog>
  </LhConfigProvider>
</template>
```

```vue options
<script>
import { LhConfigProvider, LhButton, LhDialog, zhCN, enUS } from '@lh-ui/vue3'

export default {
  components: { LhConfigProvider, LhButton, LhDialog },
  data() {
    return {
      locale: 'zh-CN',
      i18nVisible: false,
    }
  },
  computed: {
    messages() {
      return this.locale === 'zh-CN' ? zhCN : enUS
    },
  },
}
</script>

<template>
  <LhConfigProvider :locale="messages">
    <!-- 打开对话框 -->
    <LhButton @click="i18nVisible = true">
      {{ locale === 'zh-CN' ? '打开对话框' : 'Open Dialog' }}
    </LhButton>
    <!-- 国际化对话框 -->
    <LhDialog v-model="i18nVisible" :title="locale === 'zh-CN' ? '提示' : 'Notice'">
      <p>{{ locale === 'zh-CN' ? '对话框内容' : 'Dialog content' }}</p>
      <template #footer>
        <LhButton @click="i18nVisible = false">
          {{ locale === 'zh-CN' ? '取消' : 'Cancel' }}
        </LhButton>
      </template>
    </LhDialog>
  </LhConfigProvider>
</template>
```

## 行为开关

<DemoBlock title="关闭方式 / 滚动锁定 / beforeClose">
  <LhButton @click="dialogAdv1 = true">仅按钮关闭</LhButton>
  <LhButton @click="dialogAdv2 = true">不锁定滚动</LhButton>
  <LhButton @click="dialogAdv3 = true">异步关闭</LhButton>
  <LhDialog
    v-model="dialogAdv1"
    title="仅按钮关闭"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <p>隐藏右上角关闭按钮，点击遮罩与按 ESC 也不会关闭，只能通过底部按钮关闭。</p>
    <template #footer>
      <LhButton type="primary" @click="dialogAdv1 = false">我知道了</LhButton>
    </template>
  </LhDialog>
  <LhDialog v-model="dialogAdv2" title="不锁定滚动" :lock-scroll="false">
    <p>对话框打开时页面仍可滚动，适合内容较短的轻量提示。</p>
  </LhDialog>
  <LhDialog v-model="dialogAdv3" title="异步关闭" :before-close="handleAdvBeforeClose">
    <p>点击右上角关闭按钮、遮罩或按 ESC 后，延迟 500ms 才真正关闭（模拟关闭前校验）。</p>
  </LhDialog>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhButton, LhDialog } from '@lh-ui/vue3'

const dialogAdv1 = ref(false)
const dialogAdv2 = ref(false)
const dialogAdv3 = ref(false)

function handleAdvBeforeClose(done: () => void) {
  setTimeout(done, 500)
}
</script>

<template>
  <!-- 仅按钮关闭 -->
  <LhButton @click="dialogAdv1 = true">仅按钮关闭</LhButton>
  <LhDialog
    v-model="dialogAdv1"
    title="仅按钮关闭"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <p>隐藏右上角关闭按钮，点击遮罩与按 ESC 也不会关闭，只能通过底部按钮关闭。</p>
    <template #footer>
      <LhButton type="primary" @click="dialogAdv1 = false">我知道了</LhButton>
    </template>
  </LhDialog>
  <!-- 不锁定滚动 -->
  <LhButton @click="dialogAdv2 = true">不锁定滚动</LhButton>
  <LhDialog v-model="dialogAdv2" title="不锁定滚动" :lock-scroll="false">
    <p>对话框打开时页面仍可滚动，适合内容较短的轻量提示。</p>
  </LhDialog>
  <!-- 异步关闭 -->
  <LhButton @click="dialogAdv3 = true">异步关闭</LhButton>
  <LhDialog v-model="dialogAdv3" title="异步关闭" :before-close="handleAdvBeforeClose">
    <p>点击右上角关闭按钮、遮罩或按 ESC 后，延迟 500ms 才真正关闭（模拟关闭前校验）。</p>
  </LhDialog>
</template>
```

```vue options
<script>
import { LhButton, LhDialog } from '@lh-ui/vue3'

export default {
  components: { LhButton, LhDialog },
  data() {
    return {
      dialogAdv1: false,
      dialogAdv2: false,
      dialogAdv3: false,
    }
  },
  methods: {
    handleAdvBeforeClose(done) {
      setTimeout(done, 500)
    },
  },
}
</script>

<template>
  <!-- 仅按钮关闭 -->
  <LhButton @click="dialogAdv1 = true">仅按钮关闭</LhButton>
  <LhDialog
    v-model="dialogAdv1"
    title="仅按钮关闭"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <p>隐藏右上角关闭按钮，点击遮罩与按 ESC 也不会关闭，只能通过底部按钮关闭。</p>
    <template #footer>
      <LhButton type="primary" @click="dialogAdv1 = false">我知道了</LhButton>
    </template>
  </LhDialog>
  <!-- 不锁定滚动 -->
  <LhButton @click="dialogAdv2 = true">不锁定滚动</LhButton>
  <LhDialog v-model="dialogAdv2" title="不锁定滚动" :lock-scroll="false">
    <p>对话框打开时页面仍可滚动，适合内容较短的轻量提示。</p>
  </LhDialog>
  <!-- 异步关闭 -->
  <LhButton @click="dialogAdv3 = true">异步关闭</LhButton>
  <LhDialog v-model="dialogAdv3" title="异步关闭" :before-close="handleAdvBeforeClose">
    <p>点击右上角关闭按钮、遮罩或按 ESC 后，延迟 500ms 才真正关闭（模拟关闭前校验）。</p>
  </LhDialog>
</template>
```

## 位置与层级

<DemoBlock title="fullscreen / position / top / zIndex / center">
  <LhButton @click="dialogAdv4 = true">全屏</LhButton>
  <LhButton @click="dialogAdv5 = true">底部位置</LhButton>
  <LhButton @click="dialogAdv6 = true">顶部偏移 + 层级</LhButton>
  <LhButton @click="dialogAdv7 = true">内容居中（center）</LhButton>
  <LhDialog v-model="dialogAdv4" title="全屏对话框" fullscreen>
    <p>fullscreen 时对话框铺满整个视口。</p>
  </LhDialog>
  <LhDialog v-model="dialogAdv5" title="底部位置" position="bottom">
    <p>position 为 bottom 时对话框贴近视口底部展示。</p>
  </LhDialog>
  <LhDialog v-model="dialogAdv6" title="顶部偏移 + 层级" position="top" top="10vh" :z-index="3000">
    <p>top 调整距视口顶部的距离，z-index 控制层叠顺序。</p>
  </LhDialog>
  <LhDialog v-model="dialogAdv7" title="内容居中" center>
    <p>center 让标题与内容居中显示（兼容旧版，新代码建议使用 position）。</p>
    <template #footer>
      <LhButton @click="dialogAdv7 = false">取消</LhButton>
      <LhButton type="primary" @click="dialogAdv7 = false">确定</LhButton>
    </template>
  </LhDialog>
</DemoBlock>

```vue composition
<script setup lang="ts">
import { ref } from 'vue'
import { LhButton, LhDialog } from '@lh-ui/vue3'

const dialogAdv4 = ref(false)
const dialogAdv5 = ref(false)
const dialogAdv6 = ref(false)
const dialogAdv7 = ref(false)
</script>

<template>
  <!-- 全屏 -->
  <LhButton @click="dialogAdv4 = true">全屏</LhButton>
  <LhDialog v-model="dialogAdv4" title="全屏对话框" fullscreen>
    <p>fullscreen 时对话框铺满整个视口。</p>
  </LhDialog>
  <!-- 底部位置 -->
  <LhButton @click="dialogAdv5 = true">底部位置</LhButton>
  <LhDialog v-model="dialogAdv5" title="底部位置" position="bottom">
    <p>position 为 bottom 时对话框贴近视口底部展示。</p>
  </LhDialog>
  <!-- 顶部偏移+层级 -->
  <LhButton @click="dialogAdv6 = true">顶部偏移 + 层级</LhButton>
  <LhDialog v-model="dialogAdv6" title="顶部偏移 + 层级" position="top" top="10vh" :z-index="3000">
    <p>top 调整距视口顶部的距离，z-index 控制层叠顺序。</p>
  </LhDialog>
  <!-- 内容居中 -->
  <LhButton @click="dialogAdv7 = true">内容居中（center）</LhButton>
  <LhDialog v-model="dialogAdv7" title="内容居中" center>
    <p>center 让标题与内容居中显示（兼容旧版，新代码建议使用 position）。</p>
    <template #footer>
      <LhButton @click="dialogAdv7 = false">取消</LhButton>
      <LhButton type="primary" @click="dialogAdv7 = false">确定</LhButton>
    </template>
  </LhDialog>
</template>
```

```vue options
<script>
import { LhButton, LhDialog } from '@lh-ui/vue3'

export default {
  components: { LhButton, LhDialog },
  data() {
    return {
      dialogAdv4: false,
      dialogAdv5: false,
      dialogAdv6: false,
      dialogAdv7: false,
    }
  },
}
</script>

<template>
  <!-- 全屏 -->
  <LhButton @click="dialogAdv4 = true">全屏</LhButton>
  <LhDialog v-model="dialogAdv4" title="全屏对话框" fullscreen>
    <p>fullscreen 时对话框铺满整个视口。</p>
  </LhDialog>
  <!-- 底部位置 -->
  <LhButton @click="dialogAdv5 = true">底部位置</LhButton>
  <LhDialog v-model="dialogAdv5" title="底部位置" position="bottom">
    <p>position 为 bottom 时对话框贴近视口底部展示。</p>
  </LhDialog>
  <!-- 顶部偏移+层级 -->
  <LhButton @click="dialogAdv6 = true">顶部偏移 + 层级</LhButton>
  <LhDialog v-model="dialogAdv6" title="顶部偏移 + 层级" position="top" top="10vh" :z-index="3000">
    <p>top 调整距视口顶部的距离，z-index 控制层叠顺序。</p>
  </LhDialog>
  <!-- 内容居中 -->
  <LhButton @click="dialogAdv7 = true">内容居中（center）</LhButton>
  <LhDialog v-model="dialogAdv7" title="内容居中" center>
    <p>center 让标题与内容居中显示（兼容旧版，新代码建议使用 position）。</p>
    <template #footer>
      <LhButton @click="dialogAdv7 = false">取消</LhButton>
      <LhButton type="primary" @click="dialogAdv7 = false">确定</LhButton>
    </template>
  </LhDialog>
</template>
```

## Dialog API

### Props

| 属性名            | 说明               | 类型               | 默认值   |
| ----------------- | ------------------ | ------------------ | -------- |
| modelValue | 是否显示对话框 | `boolean` | `false` |
| title | 对话框标题 | `string` | `''` |
| width | 对话框宽度 | `string \| number` | `'480px'` |
| fullscreen | 是否全屏 | `boolean` | `false` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| closeOnClickModal | 点击遮罩层是否关闭 | `boolean` | `true` |
| closeOnPressEscape | 按 ESC 是否关闭 | `boolean` | `true` |
| draggable | 是否可拖拽 | `boolean` | `false` |
| center | 是否居中显示（兼容旧版，建议使用 position） | `boolean` | `false` |
| position | 弹窗位置：top / center / bottom | `"top" \| "center" \| "bottom"` | `'center'` |
| lockScroll | 是否锁定滚动 | `boolean` | `true` |
| beforeClose | 关闭前回调 | `(done: () => void) => void` | — |
| top | 顶部距离(px) | `string` | `'15vh'` |
| zIndex | z-index | `number` | — |
| themeVars | 组件级主题变量，覆盖 ConfigProvider 配置 | `{ [x: string]: string; }` | — |
| bgPattern | 组件级背景花纹，覆盖 ConfigProvider 配置 | `string` | — |
| sx | sx 快速布局属性 | `LhSxProps` | — |

### Events

| 事件名            | 说明         | 回调参数           |
| ----------------- | ------------ | ------------------ |
| update:modelValue | 显示状态改变 | `(value: boolean)` |
| open              | 打开动画结束 | —                  |
| close             | 关闭动画结束 | —                  |
| opened            | 对话框完全打开后触发 | —                  |
| closed            | 对话框完全关闭后触发 | —                  |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 对话框内容     |
| header  | 对话框标题区域 |
| footer  | 对话框底部区域 |


<!-- lh-types:begin (auto-generated by scripts/gen-type-docs.mjs, do not edit) -->

## 类型定义

本组件对外导出的 TypeScript 类型结构如下（自动提取自 `packages/components/dialog/src/types.ts` 与 `@lh-ui/share/core/*` 源码，点击各条目展开查看完整定义；属性说明见上方 Props 表）：

<details id="type-LhDialogProps">
<summary><code>LhDialogProps</code></summary>

```ts
/**
 * Dialog 组件 Props
 */
export interface LhDialogProps {
  /** 是否显示 */
  modelValue?: boolean
  /** 标题 */
  title?: string
  /** 宽度 */
  width?: string | number
  /** 是否全屏 */
  fullscreen?: boolean
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 点击遮罩是否关闭 */
  closeOnClickModal?: boolean
  /** 按 ESC 是否关闭 */
  closeOnPressEscape?: boolean
  /** 是否可拖拽 */
  draggable?: boolean
  /** 是否居中显示（兼容旧版，建议使用 position） */
  center?: boolean
  /** 弹窗位置：top / center / bottom */
  position?: 'top' | 'center' | 'bottom'
  /** 是否锁定滚动 */
  lockScroll?: boolean
  /** 关闭前回调 */
  beforeClose?: (done: () => void) => void
  /** 顶部距离(px) */
  top?: string
  /** z-index */
  zIndex?: number
  /** 组件级主题变量，覆盖 ConfigProvider 配置 */
  themeVars?: Record<string, string>
  /** 组件级背景花纹，覆盖 ConfigProvider 配置 */
  bgPattern?: string
  /** sx 快速布局属性 */
  sx?: LhSxProps
}
```

</details>

<!-- lh-types:end -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { LhConfigProvider } from '~/components'
import '@lh-ui/share/styles/config-provider'
import zhCN from '@lh-ui/share/locales/lang/zh-CN'
import enUS from '@lh-ui/share/locales/lang/en-US'

const visible = ref(false)
const locale = ref('zh-CN')
const i18nVisible = ref(false)
const messages = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS))

const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)
const dialogThemeVisible = ref(false)
const dialogAdv1 = ref(false)
const dialogAdv2 = ref(false)
const dialogAdv3 = ref(false)
const dialogAdv4 = ref(false)
const dialogAdv5 = ref(false)
const dialogAdv6 = ref(false)
const dialogAdv7 = ref(false)

function handleAdvBeforeClose(done: () => void) {
  setTimeout(done, 500)
}

const cerblueTheme = {
  'primary-color': '#2B4C7C',
  'primary-color-hover': '#3D649E',
  'primary-color-bg': '#E8EDF3',
}
</script>
