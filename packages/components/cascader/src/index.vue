<template>
  <div
    ref="containerRef"
    :class="containerClasses"
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
        :readonly="!props.filterable"
        class="lh-cascader__input-inner"
        @input="onInput"
        @focus="handleFocus"
        @keydown.backspace="onBackspace"
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
      <Transition name="lh-cascader-panel-enter">
        <div
          v-if="internalVisible"
          ref="panelRef"
          :class="panelClasses"
          :style="panelStyle"
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
                    <span v-if="i < result.pathLabels.length - 1">/</span>
                  </span>
                </div>
                <div
                  v-if="!searchResults.length"
                  class="lh-cascader-panel__empty"
                >
                  {{ t('cascader.noMatch') }}
                </div>
              </div>
            </template>
            <template v-else>
              <!-- 级联面板列 -->
              <div
                v-for="(panel, pIndex) in panels"
                :key="pIndex"
                class="lh-cascader-panel__column"
              >
                <div class="lh-cascader-panel__column-header">
                  {{ panel.title }}
                </div>
                <div class="lh-cascader-panel__column-body">
                  <div
                    v-for="item in panel.items"
                    :key="item.value"
                    class="lh-cascader-panel__item"
                    :class="{
                      'lh-cascader-panel__item--active': isPanelActive(pIndex, item.value),
                      'lh-cascader-panel__item--disabled': item.isDisabled,
                    }"
                    @mouseenter="onItemHover(pIndex, item)"
                    @click="onItemClick(pIndex, item)"
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
import { ref, computed, watch, nextTick, StyleValue, onMounted, onUnmounted } from 'vue'
import LhIcon from '../../icon'
import {
  findNode,
  findPathByValues,
  getPanelItems,
  flattenNodes,
  getDefaultCascaderPlaceholder,
  isLeafNode,
  expandLastValue,
} from '@lh-ui/core/cascader'
import type {
  LhCascaderPanelItem,
  LhCascaderNode,
  LhCascaderSearchResult,
} from '@lh-ui/core/cascader'
import type { LhCascaderProps } from './types'
import { lhlocale } from '~/locales'

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
})

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  change: [value: (string | number)[], path: LhCascaderNode[] | null]
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

// Instance tracking
let nextUid = 0
nextUid++
const uid = nextUid

const internalVisible = ref(false)
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
  internalVisible.value = true
  nextTick(() => updatePanelPosition())
}

function handleClear(e: Event) {
  e.stopPropagation()
  emit('update:modelValue', props.multiple ? [] : [])
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

  // Expand this item and clear subsequent panels
  expandedValues.value = [...expandedValues.value.slice(0, panelIndex + 1), [item.value]]
}

function onItemClick(panelIndex: number, item: LhCascaderPanelItem) {
  if (item.isDisabled) return

  const currentPath = expandedValues.value[panelIndex] || []

  const nodeFound = findNode(props.options, item.value)
  const node = nodeFound?.node || { value: '', label: '', children: [] }
  const leaf = isLeafNode(node, props.itemConfig)

  if (item.hasChildren && !leaf && !item.isExpanded) {
    // Expand to show children
    expandedValues.value = [
      ...expandedValues.value.slice(0, panelIndex + 2),
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
    const pathResult = findPathByValues(props.options, fullPath)
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
  const path = expandedValues.value[panelIndex] || []
  return path.includes(value)
}

function isSelected(pathValues: (string | number)[]): boolean {
  if (props.multiple) {
    return multiSelected.value.some((v) => v.join(',') === pathValues.join(','))
  }
  const current = props.emitPath ? props.modelValue : getLeafValue(props.modelValue)
  return JSON.stringify(current) === JSON.stringify(pathValues)
}

function getLeafValue(value: (string | number)[]): (string | number)[] | null {
  if (!value.length) return null
  return [value[value.length - 1]]
}

// Computed panels
const panels = computed(() => {
  const result = []
  let currentNodes = props.options

  for (let i = 0; i < expandedValues.value.length && currentNodes.length; i++) {
    const path = expandedValues.value[i] || []
    const nodeValues = path.length ? path : []

    const items: LhCascaderPanelItem[] = getPanelItems(
      currentNodes,
      new Set(expandedValues.value[i + 1] || []),
      props.itemConfig,
    )

    result.push({
      title: path.length > 0 ? '' : i === 0 ? '' : '',
      items,
    })

    // Get next level nodes
    if (nodeValues.length) {
      const lastValue = nodeValues[nodeValues.length - 1]
      const node = findNode(currentNodes, lastValue)
      currentNodes = node?.node.children ?? []
    } else {
      break
    }
  }

  return result
})

const searchResults = computed(() => {
  if (!filterKeyword.value) return []
  const all = flattenNodes(props.options)
  return all
    .filter((item) => item.node.label.includes(filterKeyword.value))
    .map(({ path, pathValues }) => ({
      path: pathValues,
      nodes: path,
      pathLabels: path.map((n) => n.label),
    }))
})

const displayPlaceholder = computed(() => {
  return props.placeholder || getDefaultCascaderPlaceholder()
})

const displayValue = computed(() => {
  // 过滤模式下使用用户输入
  if (filterKeyword.value) return inputValue.value
  // 多选不显示在输入框（用标签显示）
  if (props.multiple) return ''
  // 单选显示选中路径的标签
  if (props.modelValue.length) {
    const result = findPathByValues(props.options, props.modelValue)
    if (result?.nodes) {
      return props.showAllLevels
        ? result.nodes.map((n) => n.label).join(props.separator)
        : result.nodes[result.nodes.length - 1].label
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
  zIndex: 3000 + uid,
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
    const result = findPathByValues(props.options, path)
    return result?.nodes.map((n) => n.label).join(props.separator) || String(path[path.length - 1])
  })
  if (props.collapseTags) return tags.slice(0, 1)
  return tags
})

// Watch modelValue to update multiSelected
watch(
  () => props.modelValue,
  (newVal) => {
    if (props.multiple && newVal && newVal.length > 0) {
      // Reconstruct multiSelected from newVal
      multiSelected.value = newVal.map((v) => {
        const expanded = expandLastValue(props.options, v)
        return expanded || [v]
      })
    }
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
