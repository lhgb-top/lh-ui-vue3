# lh-ui-plus

A Vue 3 UI Component Library - Enterprise-grade open-source framework.

## Features

- Built with Vue 3 + TypeScript
- Composition API support
- Tree-shaking ready (ESM)
- Theme customization via CSS variables
- Internationalization (i18n)
- ConfigProvider for global configuration

## Installation

```bash
pnpm install lh-ui-plus
```

## Quick Start

### Full Import

```ts
import { createApp } from 'vue'
import lhUiPlus from 'lh-ui-plus'
import 'lh-ui-plus/packages/theme/src/index.scss'

const app = createApp(App)
app.use(lhUiPlus)
app.mount('#app')
```

### On-demand Import

```ts
import { LhButton, LhInput, LhConfigProvider } from 'lh-ui-plus'
import 'lh-ui-plus/packages/components/button/style/index.scss'
import 'lh-ui-plus/packages/components/input/style/index.scss'

const app = createApp(App)
app.component(LhButton.name, LhButton)
app.component(LhInput.name, LhInput)
app.mount('#app')
```

## Components

- **LhButton** - Button with type, size, loading, plain, round, circle variants
- **LhInput** - Input with v-model, clearable, textarea, prefix/suffix support
- **LhConfigProvider** - Global config via provide/inject

## Development

```bash
pnpm install
pnpm dev  # Start Vite preview server
```

## Build

```bash
pnpm build      # Full build (ESM + CJS + UMD)
pnpm build:esm  # ESM only
pnpm build:cjs  # CJS only
pnpm build:umd  # UMD only
```

## Internationalization

```ts
import { lhlocale, zhCN, enUS } from 'lh-ui-plus'

// Set locale
lhlocale.setLocale('zh-CN')

// Translate
const text = lhlocale.t('common.ok')
```

## License

MIT