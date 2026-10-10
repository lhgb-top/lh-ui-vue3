<template>
  <nav
    class="lh-breadcrumb"
    :style="rootStyle"
    :aria-label="t('breadcrumb.label', 'Breadcrumb')"
  >
    <ol class="lh-breadcrumb__list">
      <slot></slot>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import { getCollapsedHiddenIndexes, getEllipsisBeforeIndex } from '@lh-ui/share/core/breadcrumb'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import { LH_BREADCRUMB_KEY } from './types'
import type { LhBreadcrumbProps } from './types'

defineOptions({ name: 'LhBreadcrumb' })

const props = withDefaults(defineProps<LhBreadcrumbProps>(), {
  separator: '/',
  maxItems: 0,
  sx: undefined,
})

const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

// 子项在各自 setup 阶段注册 token，顺序即渲染顺序；
// 序号/总数在注册完成的同一微任务批次内收敛，不会产生可见闪烁
const itemTokens = ref<symbol[]>([])
const expanded = ref(false)

const effectiveMax = computed(() => (expanded.value ? 0 : props.maxItems ?? 0))
const hiddenIndexes = computed(() =>
  getCollapsedHiddenIndexes({ total: itemTokens.value.length, maxItems: effectiveMax.value }),
)
const ellipsisBeforeIndex = computed(() =>
  getEllipsisBeforeIndex({ total: itemTokens.value.length, maxItems: effectiveMax.value }),
)

provide(LH_BREADCRUMB_KEY, {
  itemTokens,
  hiddenIndexes,
  ellipsisBeforeIndex,
  expand: () => {
    expanded.value = true
  },
  separator: computed(() => props.separator ?? '/'),
})

const rootStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
