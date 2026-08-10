<template>
  <div class="lh-config-provider" :style="cssVars">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'LhConfigProvider',
})

import type { LhConfigProviderProps } from './types'
import { useConfigProvider } from './index'

const props = withDefaults(defineProps<LhConfigProviderProps>(), {
  size: undefined,
  locale: undefined,
  themeVars: undefined,
})

const { cssVars } = useConfigProvider(props)
</script>

<style>
.lh-config-provider {
  background-blend-mode: soft-light;
  min-height: 0;
}
</style>