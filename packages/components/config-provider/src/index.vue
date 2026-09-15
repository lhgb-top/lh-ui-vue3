<template>
  <div
    class="lh-config-provider"
    :style="cssVars"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'LhConfigProvider',
})

import type { LhConfigProviderProps } from './types'
import { useLhConfigProvider } from './index'

const props = withDefaults(defineProps<LhConfigProviderProps>(), {
  size: undefined,
  locale: undefined,
  themeVars: undefined,
})

const { cssVars } = useLhConfigProvider(props)
</script>
