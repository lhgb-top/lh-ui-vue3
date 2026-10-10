<template>
  <div
    :class="rootClasses"
    :style="rootStyle"
  >
    <div
      class="lh-tabs__header"
      role="tablist"
      @keydown="onKeydown"
    >
      <button
        v-for="pane in records"
        :id="`${idPrefix}-tab-${pane.name}`"
        :key="pane.name"
        :ref="(el) => setTabRef(pane.name, el)"
        type="button"
        role="tab"
        class="lh-tabs__tab"
        :class="{
          'lh-tabs__tab--active': pane.name === activeName,
          'lh-tabs__tab--disabled': pane.disabled,
        }"
        :aria-selected="pane.name === activeName"
        :aria-controls="`${idPrefix}-panel-${pane.name}`"
        :tabindex="pane.name === activeName ? 0 : -1"
        :disabled="pane.disabled"
        :data-name="pane.name"
        @click="setActive(pane.name)"
      >
        <span class="lh-tabs__tab-label">{{ pane.label }}</span>
        <span
          v-if="closable && !pane.disabled"
          class="lh-tabs__tab-close"
          aria-hidden="true"
          @click.stop="removePane(pane.name)"
        >✕</span>
      </button>
      <button
        v-if="addable"
        type="button"
        class="lh-tabs__add"
        :aria-label="t('tabs.add', 'Add tab')"
        @click="emit('tab-add')"
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>

    <div class="lh-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide, ref, useSlots } from 'vue'
import { getTabsClassNames, getNameAfterRemove, getNextActiveName, resolveActiveName } from '@lh-ui/share/core/tabs'
import { LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import { generateId } from '@lh-ui/share/utils'
import LhTabPane from './tab-pane.vue'
import { LH_TABS_KEY } from './types'
import type { VNode } from 'vue'
import type { LhTabRecord } from '@lh-ui/share/core/tabs'
import type { LhTabsProps } from './types'

defineOptions({ name: 'LhTabs' })

const props = withDefaults(defineProps<LhTabsProps>(), {
  modelValue: undefined,
  type: 'line',
  closable: false,
  addable: false,
  tabPosition: 'top',
  sx: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [name: string]
  'tab-change': [name: string]
  'tab-remove': [name: string]
  'tab-add': []
}>()

const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const slots = useSlots()

// 从默认插槽同步收集页签 vnode（下钻 v-for / template 产生的 Fragment）
function collectPaneVnodes(vnodes: VNode[] | undefined): VNode[] {
  const out: VNode[] = []
  for (const vnode of vnodes ?? []) {
    if (vnode.type === LhTabPane) {
      out.push(vnode)
    } else if (Array.isArray(vnode.children)) {
      out.push(...collectPaneVnodes(vnode.children as VNode[]))
    }
  }
  return out
}

// 页签记录同步源自插槽 vnode props，首帧即正确
const records = computed<LhTabRecord[]>(() =>
  collectPaneVnodes(slots.default?.()).map((vnode) => ({
    name: String(vnode.props?.name ?? ''),
    label: String(vnode.props?.label ?? ''),
    disabled: vnode.props?.disabled === true || vnode.props?.disabled === '',
  })),
)

const innerActive = ref<string | null>(null)
const idPrefix = generateId('lh-tabs')

const activeName = computed(() =>
  resolveActiveName(records.value, props.modelValue ?? innerActive.value),
)

function setActive(name: string) {
  const pane = records.value.find((record) => record.name === name)
  if (!pane || pane.disabled) return
  innerActive.value = name
  emit('update:modelValue', name)
  emit('tab-change', name)
}

function removePane(name: string) {
  if (!props.closable) return
  emit('tab-remove', name)
  // 被关闭的是激活页签时，联动切换到相邻可用页签
  if (name === activeName.value) {
    const next = getNameAfterRemove(records.value, name, activeName.value ?? '')
    if (next) setActive(next)
  }
}

// —— roving tabindex 键盘导航（APG tabs pattern：方向键移动并激活）——
const tabRefs = new Map<string, HTMLElement>()

function setTabRef(name: string, el: unknown) {
  if (el instanceof HTMLElement) {
    tabRefs.set(name, el)
  } else {
    tabRefs.delete(name)
  }
}

function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  const currentName = target?.dataset?.name
  if (!currentName) return

  if (event.key === LH_KEYS.Delete) {
    if (props.closable) removePane(currentName)
    return
  }

  let direction: 'next' | 'prev' | 'first' | 'last' | null = null
  if (event.key === LH_KEYS.ArrowRight || event.key === LH_KEYS.ArrowDown) direction = 'next'
  else if (event.key === LH_KEYS.ArrowLeft || event.key === LH_KEYS.ArrowUp) direction = 'prev'
  else if (event.key === LH_KEYS.Home) direction = 'first'
  else if (event.key === LH_KEYS.End) direction = 'last'
  if (!direction) return

  event.preventDefault()
  const next = getNextActiveName(records.value, currentName, direction)
  if (!next) return
  setActive(next)
  nextTick(() => tabRefs.get(next)?.focus())
}

provide(LH_TABS_KEY, {
  activeName,
  setActive,
  removePane,
  closable: computed(() => props.closable),
  idPrefix,
})

const rootClasses = computed(() =>
  getTabsClassNames({ type: props.type, position: props.tabPosition }),
)
const rootStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
