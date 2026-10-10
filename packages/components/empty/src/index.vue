<template>
  <div
    :class="emptyClasses"
    :style="emptyStyle"
    role="status"
  >
    <!-- 视觉区：自定义图片 > 默认内联插画 -->
    <div
      v-if="props.image || $slots.default"
      class="lh-empty__image lh-empty__image--custom"
    >
      <slot>
        <img
          :src="props.image"
          alt=""
        />
      </slot>
    </div>
    <div
      v-else
      class="lh-empty__image"
      aria-hidden="true"
    >
      <!-- 默认插画：留白构图，主题变量着色 -->
      <svg
        class="lh-empty__illustration"
        viewBox="0 0 96 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          class="lh-empty__ink-wash"
          cx="48"
          cy="58"
          rx="30"
          ry="6"
        />
        <rect
          x="24"
          y="22"
          width="48"
          height="32"
          rx="4"
          class="lh-empty__ink-frame"
        />
        <path
          d="M38 44 L48 30 L58 44"
          class="lh-empty__ink-mountain"
        />
        <circle
          cx="62"
          cy="30"
          r="4"
          class="lh-empty__ink-seal"
        />
      </svg>
    </div>

    <!-- 描述文案：插槽 > props > 语言包 -->
    <p class="lh-empty__description">
      <slot name="description">{{ props.description || t('empty.description', '暂无数据') }}</slot>
    </p>

    <!-- 动作区 -->
    <div
      v-if="$slots.actions"
      class="lh-empty__actions"
    >
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getEmptyClassNames } from '@lh-ui/share/core/empty'
import { lhlocale } from '~/locale'
import { sxToStyle } from '@lh-ui/share/core/shared'
import type { LhEmptyProps } from './types'

defineOptions({ name: 'LhEmpty' })

const props = withDefaults(defineProps<LhEmptyProps>(), {
  description: undefined,
  image: undefined,
  sx: undefined,
})

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const emptyClasses = computed(() =>
  getEmptyClassNames({ hasImage: !!props.image }),
)

const emptyStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
