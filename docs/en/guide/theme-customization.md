# Theme Customization

## CSS Variables

lh-ui-plus uses CSS variables for theming. All theme variables are prefixed with `--lh-`.

Key variables include:
- `--lh-primary-color` - Primary color
- `--lh-success-color` - Success color
- `--lh-warning-color` - Warning color
- `--lh-danger-color` - Danger color
- `--lh-info-color` - Info color

## Custom Theme via ConfigProvider

```vue
<script setup lang="ts">
import { ref } from 'vue'

const themeVars = ref({
  primaryColor: '#1890ff',
  successColor: '#52c41a',
  warningColor: '#faad14',
  dangerColor: '#f5222d',
  infoColor: '#91d5ff',
})
</script>

<template>
  <LhConfigProvider :theme-vars="themeVars">
    <div>
      <LhButton type="primary">Custom Primary</LhButton>
      <LhButton type="success">Custom Success</LhButton>
    </div>
  </LhConfigProvider>
</template>
```

## Dark Mode

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)
</script>

<template>
  <div :class="{ 'dark-mode': isDark }">
    <LhButton @click="isDark = !isDark">Toggle Dark Mode</LhButton>
    <LhButton type="primary">Content</LhButton>
  </div>
</template>

<style scoped>
.dark-mode {
  --lh-primary-color: #409eff;
  --lh-bg-color: #1a1a1a;
  --lh-text-color: #ffffff;
}
</style>
```

## sx Quick Layout

The `sx` prop provides a declarative way to set spacing and sizing on a component inline, without writing CSS. It is currently available on Button, Input, Dialog, and Tooltip.

### How it works

`sx` is based on an `8px` scale: numeric values are multiplied by `8` to produce pixels. For example, `mt: 2` is equivalent to `marginTop: 16px`.

### Supported props

#### Spacing

| Prop | Description | Example | Equivalent CSS |
|------|-------------|---------|----------------|
| `m` | Margin on all sides | `m: 2` | `margin: 16px` |
| `mx` | Horizontal margin | `mx: 1` | `marginLeft: 8px; marginRight: 8px` |
| `my` | Vertical margin | `my: 1` | `marginTop: 8px; marginBottom: 8px` |
| `mt`, `mr`, `mb`, `ml` | Single-side margin | `mt: 2` | `marginTop: 16px` |
| `p` | Padding on all sides | `p: 3` | `padding: 24px` |
| `px` | Horizontal padding | `px: 2` | `paddingLeft: 16px; paddingRight: 16px` |
| `py` | Vertical padding | `py: 1` | `paddingTop: 8px; paddingBottom: 8px` |
| `pt`, `pr`, `pb`, `pl` | Single-side padding | `pt: 2` | `paddingTop: 16px` |

#### Sizing

| Prop | Description | Example |
|------|-------------|---------|
| `w` | Width (numbers are px, strings are used as-is) | `w: 200` or `w: '100%'` |
| `h` | Height | `h: 100` or `h: 'auto'` |

#### Flexbox

| Prop | Description | Example |
|------|-------------|---------|
| `display` | Display type | `display: 'flex'` |
| `flex` | flex shorthand | `flex: '1 1 0%'` |
| `flexDirection` | Main axis direction | `flexDirection: 'column'` |
| `alignItems` | Cross-axis alignment | `alignItems: 'center'` |
| `justifyContent` | Main-axis alignment | `justifyContent: 'flex-end'` |

### Example

```vue
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <!-- Button spacing -->
  <LhButton type="primary" :sx="{ mt: 2, mx: 1 }">Spaced button</LhButton>

  <!-- Input margin -->
  <LhInput placeholder="Vertical margin" :sx="{ my: 1 }" />

  <!-- Dialog max width -->
  <LhDialog v-model="visible" title="Example" :sx="{ maxWidth: 400 }">
    <p>With a max width</p>
  </LhDialog>
</template>
```
```