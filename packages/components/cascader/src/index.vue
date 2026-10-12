<template>
  <div
    ref="containerRef"
    :class="containerClasses"
    :aria-invalid="!!formItem?.errorMessage || undefined"
    :style="sxStyle"
    @click="handleClick"
  >
    <!-- 已选标签 -->
    <div
      v-if="showTags"
      class="lh-cascader__tags"
    >
      <div
        v-for="(tag, idx) in visibleTags"
        :key="idx"
        class="lh-cascader__tag"
      >
        {{ tag }}
      </div>
      <span
        v-if="props.collapseTags && multiSelected.length > visibleTags.length"
        class="lh-cascader__tag-more"
      >
        +{{ multiSelected.length - visibleTags.length }}
      </span>
    </div>

    <!-- 输入框 -->
    <div class="lh-cascader__input">
      <input
        ref="inputRef"
        :value="displayValue"
        :placeholder="displayPlaceholder"
        :disabled="props.disabled"
        :readonly="props.readonly || !props.filterable"
        :tabindex="props.disabled ? -1 : 0"
        role="combobox"
        :aria-expanded="internalVisible"
        :aria-controls="panelId"
        aria-haspopup="dialog"
        class="lh-cascader__input-inner"
        @input="onInput"
        @focus="handleFocus"
        @keydown="onTriggerKeydown"
      />
    </div>

    <!-- 清除按钮 -->
    <button
      v-if="showClear"
      class="lh-cascader__clear"
      @click.stop="handleClear"
    >
      <LhIcon
        name="close"
        size="small"
      />
    </button>

    <!-- 箭头图标 -->
    <LhIcon
      name="arrow-down"
      size="small"
    />

    <!-- 下拉面板 -->
    <Teleport to="body">
      <Transition name="lh-cascader-panel">
        <div
          v-if="internalVisible"
          :id="panelId"
          ref="panelRef"
          :class="panelClasses"
          :style="panelStyle"
          role="dialog"
          aria-modal="false"
          :aria-label="t('cascader.panelLabel', '请选择级联选项')"
        >
          <div class="lh-cascader-panel">
            <template v-if="props.filterable && filterKeyword">
              <!-- 搜索结果 -->
              <div class="lh-cascader-panel__search">
                <div
                  v-for="result in searchResults"
                  :key="result.path.join('-')"
                  class="lh-cascader-panel__search-item"
                  :class="{ 'lh-cascader-panel__search-item--active': isSelected(result.path) }"
                  @click="selectSearchResult(result)"
                >
                  <span
                    v-for="(label, i) in result.pathLabels"
                    :key="i"
                  >
                    {{ label }}
                    <span v-if="i < result.pathLabels.length - 1">{{ props.separator }}</span>
                  </span>
                </div>
                <div
                  v-if="!searchResults.length"
                  class="lh-cascader-panel__empty"
                >
                  <slot name="no-match">{{ t('cascader.noMatch') }}</slot>
                </div>
              </div>
            </template>
            <template v-else>
              <!-- 级联面板列 -->
              <div
                v-for="(panel, pIndex) in panels"
                :key="pIndex"
                class="lh-cascader-panel__column"
                role="listbox"
                :aria-label="columnLabel(pIndex)"
              >
                <div class="lh-cascader-panel__column-header">
                  {{ panel.title }}
                </div>
                <div class="lh-cascader-panel__column-body">
                  <div
                    v-for="(item, index) in panel.items"
                    :key="item.value"
                    class="lh-cascader-panel__item"
                    :class="{
                      'lh-cascader-panel__item--active': isPanelActive(pIndex, item.value),
                      'lh-cascader-panel__item--disabled': item.isDisabled,
                    }"
                    role="option"
                    :tabindex="item.isDisabled ? -1 : itemTabIndex(pIndex, index)"
                    :aria-selected="isPanelActive(pIndex, item.value) ? 'true' : 'false'"
                    :aria-disabled="item.isDisabled ? 'true' : undefined"
                    @mouseenter="onItemHover(pIndex, item)"
                    @click="onItemClick(pIndex, item)"
                    @keydown="onItemKeydown($event, pIndex, index)"
                  >
                    <span class="lh-cascader-panel__item-label">{{ item.label }}</span>
                    <LhIcon
                      v-if="item.isExpanded"
                      name="arrow-right"
                      size="small"
                    />
                    <LhIcon
                      v-else-if="item.hasChildren"
                      name="arrow-down"
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject, watch, nextTick, StyleValue, onMounted, onUnmounted } from 'vue'
import {
  sxToStyle,
  LH_KEYS,
  getNextListIndex,
  isActivationKey,
  isArrowKey,
  isEscapeKey,
} from '@lh-ui/share/core/shared'
import LhIcon from '../../icon'
import {
  findNode,
  findPathByValues,
  getPanelItems,
  flattenNodes,
  isLeafNode,
  expandLastValue,
  normalizeCascaderNodes,
} from '@lh-ui/share/core/cascader'
import type {
  LhCascaderPanelItem,
  LhCascaderNode,
  LhCascaderSearchResult,
} from '@lh-ui/share/core/cascader'
import { generateId } from '@lh-ui/share/utils'
import { useLhZIndex } from '~/composables'
import type { LhCascaderProps } from './types'
import { lhlocale } from '~/locale'
import { LH_FORM_ITEM_CONTEXT_KEY } from '~/components/form/src/types'

defineOptions({ name: 'LhCascader' })

const props = withDefaults(defineProps<LhCascaderProps>(), {
  modelValue: () => [],
  options: () => [],
  size: 'medium',
  disabled: false,
  clearable: true,
  placeholder: '',
  readonly: false,
  showAllLevels: true,
  checkStrictly: false,
  emitPath: true,
  multiple: false,
  cascading: true,
  separator: '/',
  collapseTags: false,
  filterable: false,
  itemConfig: () => ({}),
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

// itemConfig 字段别名归一化：路径解析、搜索、面板渲染统一消费标准结构
const resolvedOptions = computed(() => normalizeCascaderNodes(props.options, props.itemConfig))

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  change: [value: (string | number)[], path: LhCascaderNode[] | null]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

// 每实例唯一 ID：必须走 generateId——旧实现 let nextUid=0; nextUid++ 写在 setup 内，
// 每个实例独立执行，uid 恒为 1，多实例 panelId 全部撞名（aria-controls 与 closest 歧义）
// generateId 已带「lh-cascader_」前缀，panelId 只需补「panel-」段，避免前缀重复
const uid = generateId('lh-cascader')
const { zIndex } = useLhZIndex()
const panelId = `lh-cascader-panel-${uid.slice('lh-cascader_'.length)}`

const internalVisible = ref(false)
// Escape 关闭后把焦点还给输入框会再次触发 focus，此时不能重开面板
const suppressOpenOnFocus = ref(false)
const formItem = inject(LH_FORM_ITEM_CONTEXT_KEY, null)
const panelRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const filterKeyword = ref('')
const panelPosition = ref({ top: 0, left: 0 })

// Multi-select state
const multiSelected = ref<(string | number)[][]>([])

// Panel expanded state - track which nodes are expanded per panel
const expandedValues = ref<(string | number)[][]>([[]])

// Input value for filterable mode
const inputValue = ref('')

function handleClick() {
  if (props.disabled || props.readonly) return
  if (props.filterable) {
    inputRef.value?.focus()
  }
  internalVisible.value = true
  nextTick(() => updatePanelPosition())
}

function handleFocus() {
  // 只读组件不允许聚焦弹面板（disabled 时 input 本身已禁用）
  if (props.disabled || props.readonly) return
  // Escape 关闭后焦点回到输入框，不能重开面板
  if (suppressOpenOnFocus.value) return
  internalVisible.value = true
  nextTick(() => updatePanelPosition())
}

/** 关闭面板并把焦点还给触发器输入框（combobox 的 Escape 约定） */
function closeAndReturnFocus() {
  internalVisible.value = false
  suppressOpenOnFocus.value = true
  inputRef.value?.focus()
  nextTick(() => {
    suppressOpenOnFocus.value = false
  })
}

/** 各列 listbox 的 aria-label（第 N 级，走 locale 插值） */
function columnLabel(panelIndex: number): string {
  return t('cascader.columnLabel', { n: panelIndex + 1 })
}

function handleClear(e: Event) {
  e.stopPropagation()
  emit('update:modelValue', [])
  emit('change', [], null)
  multiSelected.value = []
  filterKeyword.value = ''
  inputValue.value = ''
  internalVisible.value = false
  expandedValues.value = [[]]
}

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  filterKeyword.value = target.value.trim()
  inputValue.value = target.value
}

function onBackspace(e: Event) {
  if (!props.multiple || !multiSelected.value.length) return
  const target = e.target as HTMLInputElement
  if (target.value) return

  // Remove last selected
  multiSelected.value.pop()
  emit(
    'update:modelValue',
    multiSelected.value.map((v) => v[v.length - 1]),
  )
  emit(
    'change',
    multiSelected.value.map((v) => v[v.length - 1]),
    null,
  )
}

function updatePanelPosition() {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  panelPosition.value = {
    top: rect.bottom + 4,
    left: rect.left,
  }
}

function selectSearchResult(result: LhCascaderSearchResult) {
  const values = result.path
  if (props.multiple) {
    const exists = multiSelected.value.some((v) => v.join(',') === values.join(','))
    if (!exists) {
      multiSelected.value.push(values)
      emit(
        'update:modelValue',
        multiSelected.value.map((v) => v[v.length - 1]),
      )
    }
  } else {
    emit('update:modelValue', props.emitPath ? values : [values[values.length - 1]])
    emit('change', props.emitPath ? values : [values[values.length - 1]], result.nodes)
  }
  filterKeyword.value = ''
  inputValue.value = ''
  internalVisible.value = false
}

function onItemHover(panelIndex: number, item: LhCascaderPanelItem) {
  if (!props.cascading) return

  // 记录被展开节点的完整值路径（该列之后已展开的列随 slice 一起收起）
  const currentPath = expandedValues.value[panelIndex] || []
  expandedValues.value = [
    ...expandedValues.value.slice(0, panelIndex + 1),
    [...currentPath, item.value],
  ]
}

function onItemClick(panelIndex: number, item: LhCascaderPanelItem) {
  if (item.isDisabled) return

  const currentPath = expandedValues.value[panelIndex] || []

  const nodeFound = findNode(resolvedOptions.value, item.value)
  const node = nodeFound?.node || { value: '', label: '', children: [] }
  const leaf = isLeafNode(node)

  if (item.hasChildren && !leaf && !item.isExpanded && !props.checkStrictly) {
    // Expand to show children（替换该列的展开路径，收起更深的列）
    expandedValues.value = [
      ...expandedValues.value.slice(0, panelIndex + 1),
      [...currentPath, item.value],
    ]
  } else {
    // Select this node
    // In checkStrictly mode, any node can be selected. In normal mode, non-leaf nodes
    // can be selected when already expanded (clicked again), and leaf nodes always selectable.
    selectNode([...currentPath, item.value])
  }
}

function selectNode(fullPath: (string | number)[]) {
  if (props.multiple) {
    const exists = multiSelected.value.some((v) => v.join(',') === fullPath.join(','))
    if (!exists) {
      multiSelected.value.push(fullPath)
      emit(
        'update:modelValue',
        multiSelected.value.map((v) => v[v.length - 1]),
      )
      emit(
        'change',
        multiSelected.value.map((v) => v[v.length - 1]),
        null,
      )
    }
  } else {
    emit('update:modelValue', props.emitPath ? fullPath : [fullPath[fullPath.length - 1]])
    const pathResult = findPathByValues(resolvedOptions.value, fullPath)
    emit(
      'change',
      props.emitPath ? fullPath : [fullPath[fullPath.length - 1]],
      pathResult?.nodes ?? null,
    )
    internalVisible.value = false
    filterKeyword.value = ''
  }
}

function isPanelActive(panelIndex: number, value: string | number): boolean {
  // 第 panelIndex 列中处于展开链上的项，记录在 expandedValues[panelIndex + 1] 的末位
  const nextPath = expandedValues.value[panelIndex + 1] || []
  return nextPath.length > 0 && nextPath[nextPath.length - 1] === value
}

/**
 * roving tabindex：每列只有一个 option 可 Tab 进入
 *
 * 焦点锚点取该列的展开项（展开链上的项），无展开时取首项
 */
const columnFocusIndex = ref<Record<number, number>>({})

function resolveColumnFocus(panelIndex: number): number {
  const items = panels.value[panelIndex]?.items ?? []
  const explicit = columnFocusIndex.value[panelIndex]
  if (explicit !== undefined && explicit >= 0 && explicit < items.length) return explicit
  const expandedIdx = items.findIndex((it) => isPanelActive(panelIndex, it.value))
  return expandedIdx >= 0 ? expandedIdx : 0
}

function itemTabIndex(panelIndex: number, index: number): number {
  return index === resolveColumnFocus(panelIndex) ? 0 : -1
}

/** 把焦点移到指定列的可 Tab 项（无函数 ref，靠类名查询 DOM） */
function focusColumnItem(panelIndex: number): void {
  nextTick(() => {
    const columns = panelRef.value?.querySelectorAll<HTMLElement>('.lh-cascader-panel__column')
    columns?.[panelIndex]?.querySelector<HTMLElement>('.lh-cascader-panel__item[tabindex="0"]')?.focus()
  })
}

/**
 * 列项键盘导航（listbox 模式）
 *
 * - 上下方向键在列内移动（跳过禁用项，不循环）
 * - 左右方向键跨列：右键展开 / 进入下一列，左键回上一列
 * - Enter / Space 等价点击；Escape 关闭并把焦点还给输入框
 */
function onItemKeydown(e: KeyboardEvent, panelIndex: number, index: number): void {
  if (props.disabled) return
  if (isEscapeKey(e)) {
    e.preventDefault()
    closeAndReturnFocus()
    return
  }
  if (isActivationKey(e)) {
    e.preventDefault()
    const item = panels.value[panelIndex]?.items[index]
    if (!item) return
    onItemClick(panelIndex, item)
    // 选中叶节点会关闭面板（单选）：焦点还给触发器（suppressOpenOnFocus 防重开）
    if (!internalVisible.value) {
      closeAndReturnFocus()
      return
    }
    // 展开新列时焦点落到进入侧
    focusColumnItem(panelIndex + 1 < panels.value.length ? panelIndex + 1 : panelIndex)
    return
  }
  if (!isArrowKey(e)) return
  e.preventDefault()

  if (e.key === LH_KEYS.ArrowRight) {
    const item = panels.value[panelIndex]?.items[index]
    // 有子节点且未展开：右键先展开（等价首次点击）
    if (item?.hasChildren && !item.isExpanded && !props.checkStrictly) {
      onItemClick(panelIndex, item)
      focusColumnItem(panelIndex + 1)
      return
    }
    // 已展开或 checkStrictly 下无子：尝试进入下一列
    if (panelIndex + 1 < panels.value.length) focusColumnItem(panelIndex + 1)
    return
  }
  if (e.key === LH_KEYS.ArrowLeft) {
    if (panelIndex > 0) focusColumnItem(panelIndex - 1)
    return
  }

  // 上下方向键：列内移动
  const items = panels.value[panelIndex]?.items ?? []
  const next = getNextListIndex(items, index, e.key === LH_KEYS.ArrowDown ? 1 : -1, {
    loop: false,
    isDisabled: (item) => !!item.isDisabled,
  })
  if (next !== index) {
    columnFocusIndex.value = { ...columnFocusIndex.value, [panelIndex]: next }
    focusColumnItem(panelIndex)
  }
}

/**
 * 触发器（combobox）键盘：Backspace 多选回退、ArrowDown/ArrowUp 进入面板、Escape 关闭
 */
function onTriggerKeydown(e: KeyboardEvent): void {
  if (props.disabled || props.readonly) return
  if (e.key === LH_KEYS.Backspace) {
    onBackspace(e)
    return
  }
  if (isEscapeKey(e)) {
    if (internalVisible.value) {
      e.preventDefault()
      closeAndReturnFocus()
    }
    return
  }
  if (!isArrowKey(e)) return
  e.preventDefault()
  // 过滤态无级联列，不抢焦
  if (props.filterable && filterKeyword.value) return
  if (!internalVisible.value) {
    internalVisible.value = true
    nextTick(() => updatePanelPosition())
  }
  const dir = e.key === LH_KEYS.ArrowDown || e.key === LH_KEYS.ArrowRight ? 1 : -1
  const panelIndex = dir > 0 ? 0 : panels.value.length - 1
  if (panels.value[panelIndex]) focusColumnItem(panelIndex)
}

function isSelected(pathValues: (string | number)[]): boolean {
  if (props.multiple) {
    return multiSelected.value.some((v) => v.join(',') === pathValues.join(','))
  }
  if (!props.modelValue.length) return false
  // emitPath=false 时绑定的是末级值，还原成完整路径再比较
  const current = props.emitPath
    ? props.modelValue
    : (expandLastValue(resolvedOptions.value, props.modelValue[0]) ?? props.modelValue)
  return JSON.stringify(current) === JSON.stringify(pathValues)
}

// Computed panels
const panels = computed(() => {
  const result = []
  let currentNodes = resolvedOptions.value

  for (let i = 0; i < expandedValues.value.length && currentNodes.length; i++) {
    const items: LhCascaderPanelItem[] = getPanelItems(
      currentNodes,
      new Set(expandedValues.value[i + 1] || []),
    )

    result.push({
      title: '',
      items,
    })

    // expandedValues[i + 1] 是第 i 列中被展开节点的完整值路径，
    // 其末位节点即第 i + 1 列的数据源（此前用空的 expandedValues[i] 推进，
    // 导致面板永远只渲染第一列）
    const nextPath = expandedValues.value[i + 1] || []
    if (nextPath.length) {
      const node = findNode(currentNodes, nextPath[nextPath.length - 1])
      currentNodes = node?.node.children ?? []
    } else {
      break
    }
  }

  return result
})

const searchResults = computed(() => {
  if (!filterKeyword.value) return []
  const all = flattenNodes(resolvedOptions.value)
  return all
    .filter((item) => item.node.label.includes(filterKeyword.value))
    .map(({ path, pathValues }) => ({
      path: pathValues,
      nodes: path,
      pathLabels: path.map((n) => n.label),
    }))
})

const displayPlaceholder = computed(() => {
  return props.placeholder || t('cascader.placeholder', '请选择')
})

// 按值解析节点路径；emitPath=false 时绑定的是末级值，从叶值还原完整路径
function resolvePathNodes(values: (string | number)[]): LhCascaderNode[] | null {
  const direct = findPathByValues(resolvedOptions.value, values)
  if (direct) return direct.nodes
  if (values.length === 1) {
    const expanded = expandLastValue(resolvedOptions.value, values[0])
    if (expanded) return findPathByValues(resolvedOptions.value, expanded)?.nodes ?? null
  }
  return null
}

const displayValue = computed(() => {
  // 过滤模式下使用用户输入
  if (filterKeyword.value) return inputValue.value
  // 多选不显示在输入框（用标签显示）
  if (props.multiple) return ''
  // 单选显示选中路径的标签
  if (props.modelValue.length) {
    const nodes = resolvePathNodes(props.modelValue)
    if (nodes) {
      return props.showAllLevels
        ? nodes.map((n) => n.label).join(props.separator)
        : nodes[nodes.length - 1].label
    }
  }
  return ''
})

const containerClasses = computed(() => [
  'lh-cascader',
  `lh-cascader--${props.size}`,
  {
    'lh-cascader--disabled': props.disabled,
    'lh-cascader--visible': internalVisible.value,
    'lh-cascader--filterable': props.filterable,
    'lh-cascader--multiple': props.multiple,
  },
])

const panelClasses = computed(() => ({}))

const panelStyle = computed<StyleValue>(() => ({
  position: 'fixed',
  top: `${panelPosition.value.top}px`,
  left: `${panelPosition.value.left}px`,
  zIndex: zIndex.value,
}))

const showClear = computed(() => {
  return (
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    ((props.multiple && multiSelected.value.length > 0) ||
      (!props.multiple && props.modelValue?.length > 0))
  )
})

const showTags = computed(() => props.multiple && multiSelected.value.length > 0)

const visibleTags = computed(() => {
  const tags = multiSelected.value.map((path) => {
    const result = findPathByValues(resolvedOptions.value, path)
    return result?.nodes.map((n) => n.label).join(props.separator) || String(path[path.length - 1])
  })
  if (props.collapseTags) return tags.slice(0, 1)
  return tags
})

// Watch modelValue to update multiSelected
watch(
  () => props.modelValue,
  (newVal) => {
    if (!props.multiple) return
    // 受控清空（[] / undefined）也要落到内部态，否则已选 tag 残留展示
    if (!newVal || newVal.length === 0) {
      multiSelected.value = []
      return
    }
    // Reconstruct multiSelected from newVal
    multiSelected.value = newVal.map((v) => {
      const expanded = expandLastValue(resolvedOptions.value, v)
      return expanded || [v]
    })
  },
  { immediate: true },
)

// Click outside to close
function onClickOutside(e: MouseEvent) {
  if (!internalVisible.value) return
  if (panelRef.value?.contains(e.target as Node)) return
  if (containerRef.value?.contains(e.target as Node)) return
  internalVisible.value = false
}

// Update panel position when scrolling or resizing
function onWindowChange() {
  if (internalVisible.value) updatePanelPosition()
}

// Watch internalVisible to update panel position when opened
watch(internalVisible, (val) => {
  if (val) nextTick(() => updatePanelPosition())
})

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('resize', onWindowChange)
  window.addEventListener('scroll', onWindowChange, true)
})
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('resize', onWindowChange)
  window.removeEventListener('scroll', onWindowChange, true)
})
</script>
