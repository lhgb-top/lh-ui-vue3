<template>
  <div
    :class="treeClasses"
    :style="treeStyle"
    role="tree"
    :aria-multiselectable="props.showCheckbox || undefined"
    @keydown="handleKeydown"
  >
    <div
      v-for="item in flatNodes"
      :key="item.key"
      :class="[
        ...nodeClasses(item),
        { 'lh-tree-node--focused': item.key === focusedKey },
      ]"
      :style="{ paddingInlineStart: `${item.level * 18 + 8}px` }"
      role="treeitem"
      :aria-level="item.level + 1"
      :aria-expanded="item.isLeaf ? undefined : expandedKeys.includes(item.key)"
      :aria-selected="selectedKeys.includes(item.key)"
      :aria-disabled="item.node.disabled || undefined"
      :tabindex="props.disabled || item.node.disabled ? -1 : item.key === tabbableKey ? 0 : -1"
      :data-tree-key="item.key"
      @click="handleNodeClick(item)"
    >
      <!-- 展开箭头（懒加载中显示 loading 态） -->
      <span
        v-if="!item.isLeaf"
        class="lh-tree-node__arrow"
        :class="{
          'lh-tree-node__arrow--expanded': expandedKeys.includes(item.key),
          'lh-tree-node__arrow--loading': loadingKeys.includes(item.key),
        }"
        aria-hidden="true"
        @click.stop="toggleExpand(item.key)"
      >▸</span>
      <span
        v-else
        class="lh-tree-node__placeholder"
        aria-hidden="true"
      />

      <!-- 勾选框 -->
      <span
        v-if="props.showCheckbox"
        class="lh-tree-node__checkbox"
        :class="`lh-tree-node__checkbox--${item.checkState}`"
        role="checkbox"
        :aria-checked="item.checkState === 'checked' ? 'true' : item.checkState === 'indeterminate' ? 'mixed' : 'false'"
        :aria-disabled="item.node.disabled || undefined"
        aria-label="选择节点"
        @click.stop="toggleCheck(item.key)"
      />
      <!-- 标签 -->
      <slot
        name="node"
        :node="item.node"
        :level="item.level"
        :expanded="expandedKeys.includes(item.key)"
        :selected="selectedKeys.includes(item.key)"
      >
        <span class="lh-tree-node__label">{{ item.node.label }}</span>
      </slot>
    </div>

    <div
      v-if="flatNodes.length === 0"
      class="lh-tree__empty"
    >
      <slot name="empty">{{ t('tree.empty', '暂无数据') }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  findTreeNode,
  flattenTree,
  getNodeCheckState,
  getTreeClassNames,
  getTreeNodeClassNames,
  isNodeLoadable,
  mergeLoadedChildren,
  moveTreeFocus,
  toggleCheckKeys,
} from '@lh-ui/share/core/tree'
import { LH_KEYS, sxToStyle } from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import type { LhTreeNode } from '@lh-ui/share/core/tree'
import type { LhTreeProps } from './types'

defineOptions({ name: 'LhTree' })

const props = withDefaults(defineProps<LhTreeProps>(), {
  showCheckbox: false,
  multiple: false,
  // Vue 会把缺省的 Boolean prop 归一化为 false，「默认启用」语义必须在此显式声明
  expandOnClickNode: true,
  defaultExpandedKeys: () => [],
  expandedKeys: undefined,
  defaultSelectedKeys: () => [],
  selectedKeys: undefined,
  defaultCheckedKeys: () => [],
  checkedKeys: undefined,
  checkStrictly: false,
  lazy: false,
  load: undefined,
  disabled: false,
  sx: undefined,
})

const emit = defineEmits<{
  'update:expandedKeys': [keys: string[]]
  'update:selectedKeys': [keys: string[]]
  'update:checkedKeys': [keys: string[]]
  select: [key: string, node: LhTreeProps['data'][number]]
  check: [keys: string[], node: LhTreeProps['data'][number]]
  expand: [key: string, expanded: boolean]
  nodeLoad: [node: LhTreeNode, children: LhTreeNode[]]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

/** 展开态（受控 / 内部双模） */
const innerExpanded = ref<string[]>([...props.defaultExpandedKeys])
const expanded = computed(() => props.expandedKeys ?? innerExpanded.value)

/** 选中态 */
const innerSelected = ref<string[]>([...props.defaultSelectedKeys])
const selected = computed(() => props.selectedKeys ?? innerSelected.value)

/** 勾选态 */
const innerChecked = ref<string[]>([...props.defaultCheckedKeys])
const checked = computed(() => props.checkedKeys ?? innerChecked.value)

const expandedKeys = expanded
const selectedKeys = selected

/** ============ 懒加载 ============ */
const loadedMap = ref<Record<string, LhTreeNode[]>>({})
const loadingKeys = ref<string[]>([])

const mergedData = computed(() => mergeLoadedChildren(props.data, loadedMap.value))

/** 懒加载模式下展示树需要把已加载节点视为非叶子（子树已挂载则自然展开） */
const flatNodes = computed(() =>
  flattenTree(mergedData.value, expanded.value).map((item) => ({
    ...item,
    checkState: getNodeCheckState(item.node, checked.value, props.checkStrictly),
  })),
)

/**
 * 发起懒加载：置 loading → 调 load 回调；resolve 写入 loadedMap 并展开，
 * reject / 同步异常取消 loading 且不展开。
 */
function requestLoad(node: LhTreeNode): void {
  if (!props.load || loadingKeys.value.includes(node.key)) return
  loadingKeys.value = [...loadingKeys.value, node.key]
  const settle = (): void => {
    loadingKeys.value = loadingKeys.value.filter((k) => k !== node.key)
  }
  const resolve = (children: LhTreeNode[]): void => {
    settle()
    loadedMap.value = { ...loadedMap.value, [node.key]: children }
    if (!expanded.value.includes(node.key)) toggleExpand(node.key)
    emit('nodeLoad', node, children)
  }
  const reject = (): void => settle()
  try {
    props.load(node, resolve, reject)
  } catch {
    settle()
  }
}

const focusedKey = ref<string | null>(null)
const tabbableKey = computed(() => {
  if (focusedKey.value && flatNodes.value.some((n) => n.key === focusedKey.value && !n.node.disabled)) {
    return focusedKey.value
  }
  const first = flatNodes.value.find((n) => !n.node.disabled)
  return first?.key ?? null
})

function toggleExpand(key: string): void {
  if (props.disabled) return
  // 懒加载：未加载的可加载节点先请求，加载成功后在 resolve 里展开
  const target = findTreeNode(mergedData.value, key)
  if (target && isNodeLoadable(target, !!props.lazy, Object.keys(loadedMap.value))) {
    requestLoad(target)
    return
  }
  const next = expanded.value.includes(key)
    ? expanded.value.filter((k) => k !== key)
    : [...expanded.value, key]
  innerExpanded.value = next
  emit('update:expandedKeys', next)
  emit('expand', key, next.includes(key))
}

function toggleSelect(key: string, node: LhTreeProps['data'][number]): void {
  if (props.disabled || node.disabled) return
  const next = props.multiple
    ? selected.value.includes(key)
      ? selected.value.filter((k) => k !== key)
      : [...selected.value, key]
    : [key]
  innerSelected.value = next
  emit('update:selectedKeys', next)
  emit('select', key, node)
}

function toggleCheck(key: string): void {
  if (props.disabled) return
  const next = toggleCheckKeys(mergedData.value, checked.value, key, {
    checkStrictly: props.checkStrictly,
  })
  innerChecked.value = next
  emit('update:checkedKeys', next)
  const node = flatNodes.value.find((n) => n.key === key)?.node
  if (node) emit('check', next, node)
}

function handleNodeClick(item: (typeof flatNodes.value)[number]): void {
  if (props.disabled || item.node.disabled) return
  focusedKey.value = item.key
  if (!item.isLeaf && props.expandOnClickNode !== false) {
    toggleExpand(item.key)
  }
  toggleSelect(item.key, item.node)
}

function handleKeydown(event: KeyboardEvent): void {
  if (props.disabled) return
  const visible = flatNodes.value
  const current = focusedKey.value ?? tabbableKey.value

  const actions: Record<string, () => void> = {
    [LH_KEYS.ArrowDown]: () => focusNode(moveTreeFocus(visible, current, 1)),
    [LH_KEYS.ArrowUp]: () => focusNode(moveTreeFocus(visible, current, -1)),
    [LH_KEYS.Home]: () => focusNode(visible.find((n) => !n.node.disabled)?.key ?? null),
    [LH_KEYS.End]: () => focusNode([...visible].reverse().find((n) => !n.node.disabled)?.key ?? null),
    [LH_KEYS.ArrowRight]: () => {
      const item = visible.find((n) => n.key === current)
      if (!item) return
      if (!item.isLeaf && !expanded.value.includes(item.key)) toggleExpand(item.key)
      else if (!item.isLeaf) focusNode(moveTreeFocus(visible, current, 1))
    },
    [LH_KEYS.ArrowLeft]: () => {
      const item = visible.find((n) => n.key === current)
      if (!item) return
      if (!item.isLeaf && expanded.value.includes(item.key)) toggleExpand(item.key)
      else if (item.parentKey) focusNode(item.parentKey)
    },
    [LH_KEYS.Enter]: () => {
      const item = visible.find((n) => n.key === current)
      if (item) handleNodeClick(item)
    },
    [LH_KEYS.Space]: () => {
      const item = visible.find((n) => n.key === current)
      if (!item) return
      if (props.showCheckbox) toggleCheck(item.key)
      else handleNodeClick(item)
    },
  }

  const action = actions[event.key]
  if (!action) return
  event.preventDefault()
  action()
}

function focusNode(key: string | null): void {
  if (!key) return
  focusedKey.value = key
  const el = document.querySelector<HTMLElement>(`[data-tree-key="${key}"]`)
  el?.focus()
}

function nodeClasses(item: (typeof flatNodes.value)[number]): string[] {
  return getTreeNodeClassNames({
    expanded: expanded.value.includes(item.key),
    selected: selected.value.includes(item.key),
    disabled: !!item.node.disabled,
    leaf: item.isLeaf,
  })
}

// 数据变化时清掉已不存在的焦点键与懒加载缓存
watch(
  () => props.data,
  () => {
    if (focusedKey.value && !flatNodes.value.some((n) => n.key === focusedKey.value)) {
      focusedKey.value = null
    }
    loadedMap.value = {}
    loadingKeys.value = []
  },
)

const treeClasses = computed(() => getTreeClassNames({ showCheckbox: !!props.showCheckbox }))

const treeStyle = computed(() => sxToStyle(props.sx ?? {}))
</script>
