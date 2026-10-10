<template>
  <div
    :class="loadingClasses"
    :style="maskStyle"
    role="status"
    aria-busy="true"
    :aria-label="maskText"
  >
    <LhSpinner
      v-if="props.spinner"
      size="medium"
      class="lh-loading__spinner"
    />
    <span
      v-if="maskText"
      class="lh-loading__text"
    >{{ maskText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getLoadingClassNames } from '@lh-ui/share/core/loading'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import LhSpinner from '../../spinner'
import type { LhLoadingMaskProps } from './types'

defineOptions({ name: 'LhLoadingMask' })

const props = withDefaults(defineProps<LhLoadingMaskProps>(), {
  text: undefined,
  background: undefined,
  zIndex: undefined,
  spinner: true,
  sx: undefined,
})

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const loadingClasses = computed(() =>
  getLoadingClassNames({
    fullscreen: !!props.fullscreen,
    withText: !!maskText.value,
  }),
)

const maskText = computed(() => props.text ?? t('loading.text', '加载中…'))

const maskStyle = computed(() => ({
  background: props.background,
  zIndex: props.zIndex,
  ...sxToStyle(props.sx ?? {}),
}))
</script>
