<template>
  <template v-if="ownIndex >= 0 && !isHidden">
    <li
      v-if="showEllipsisBefore"
      class="lh-breadcrumb__ellipsis"
    >
      <button
        type="button"
        class="lh-breadcrumb__ellipsis-btn"
        :aria-label="moreLabel"
        @click="expand"
      >
        <span
          aria-hidden="true"
        >•••</span>
      </button>
    </li>
    <li :class="itemClasses">
      <a
        v-if="isLink"
        :href="to"
        class="lh-breadcrumb__link"
        @click="handleClick"
      >
        <slot></slot>
      </a>
      <span
        v-else
        class="lh-breadcrumb__text"
        :aria-current="isLast ? 'page' : undefined"
      >
        <slot></slot>
      </span>
      <span
        v-if="!isLast"
        class="lh-breadcrumb__separator"
        aria-hidden="true"
      >
        <slot name="separator">{{ separatorText }}</slot>
      </span>
    </li>
  </template>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onUnmounted } from 'vue'
import { getBreadcrumbItemClassNames } from '@lh-ui/share/core/breadcrumb'
import { lhlocale } from '~/locale'
import { LH_BREADCRUMB_KEY } from './types'
import type { LhBreadcrumbItemProps } from './types'

defineOptions({ name: 'LhBreadcrumbItem' })

const props = withDefaults(defineProps<LhBreadcrumbItemProps>(), {
  to: undefined,
  replace: false,
})

const context = inject(LH_BREADCRUMB_KEY, null)
const instance = getCurrentInstance()

const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

// setup 阶段注册 token，顺序即渲染顺序；卸载时注销
const token = Symbol('breadcrumb-item')
if (context) {
  context.itemTokens.value.push(token)
  onUnmounted(() => {
    context.itemTokens.value = context.itemTokens.value.filter((item) => item !== token)
  })
}

const ownIndex = computed(() =>
  context ? context.itemTokens.value.indexOf(token) : -1,
)
const total = computed(() => (context ? context.itemTokens.value.length : 1))
const isLast = computed(() => ownIndex.value === total.value - 1)
const isHidden = computed(() =>
  context ? context.hiddenIndexes.value.includes(ownIndex.value) : false,
)
const showEllipsisBefore = computed(() =>
  context ? context.ellipsisBeforeIndex.value === ownIndex.value : false,
)
const isLink = computed(() => !!props.to && !isLast.value)

const itemClasses = computed(() =>
  getBreadcrumbItemClassNames({ isLast: isLast.value, isLink: isLink.value }),
)

const separatorText = computed(() => (context ? context.separator.value : '/'))

const moreLabel = computed(() => t('breadcrumb.more', 'More'))

const expand = () => context?.expand()

/**
 * 跳转：检测到 vue-router 时走路由（支持 replace），否则保持原生 <a> 导航
 */
function handleClick(event: MouseEvent) {
  if (!props.to) return
  const router = instance?.appContext.config.globalProperties.$router as
    | { push?: (to: string) => void; replace?: (to: string) => void }
    | undefined
  if (router && typeof router.push === 'function') {
    event.preventDefault()
    if (props.replace && typeof router.replace === 'function') {
      router.replace(props.to)
    } else {
      router.push(props.to)
    }
  }
}
</script>
