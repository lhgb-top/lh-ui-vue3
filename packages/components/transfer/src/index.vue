<template>
  <div
    :class="transferClasses"
    :style="transferStyle"
  >
    <!-- 左面板（源） -->
    <div :class="panelClasses('left')">
      <div class="lh-transfer-panel__header">
        <label class="lh-transfer-panel__check-all">
          <input
            type="checkbox"
            :checked="leftAllState === 'all'"
            :indeterminate.prop="leftAllState === 'some'"
            :disabled="props.disabled || undefined"
            @change="checkAll('left')"
          >
          <span>{{ t('transfer.sourceTitle', '列表一') }}</span>
        </label>
        <span class="lh-transfer-panel__count">{{ leftItems.length }} / {{ props.data.length }}</span>
      </div>

      <div class="lh-transfer-panel__body">
        <input
          v-model="leftQuery"
          type="text"
          class="lh-transfer-panel__search"
          :placeholder="t('transfer.searchPlaceholder', '请输入搜索内容')"
          :aria-label="t('transfer.searchPlaceholder', '请输入搜索内容')"
        >
        <ul
          class="lh-transfer-panel__list"
          role="listbox"
          :aria-multiselectable="true"
          :aria-label="t('transfer.sourceTitle', '列表一')"
        >
          <li
            v-for="(item, index) in filteredLeft"
            :key="item.key"
            class="lh-transfer-panel__item"
            :class="{ 'lh-transfer-panel__item--disabled': item.disabled }"
            role="option"
            :tabindex="item.disabled ? -1 : itemTabIndex('left', index)"
            :aria-selected="checkedKeys.includes(item.key)"
            :aria-disabled="item.disabled || undefined"
            @click="toggleItem(item)"
            @keydown="onItemKeydown($event, 'left', index)"
          >
            <input
              type="checkbox"
              class="lh-transfer-panel__checkbox"
              :checked="checkedKeys.includes(item.key)"
              :disabled="props.disabled || item.disabled || undefined"
              @click.stop
              @change="toggleItem(item)"
            >
            <span>{{ item.label }}</span>
          </li>
          <li
            v-if="filteredLeft.length === 0"
            class="lh-transfer-panel__empty"
          >{{ t('transfer.empty', '暂无数据') }}</li>
        </ul>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="lh-transfer__actions">
      <button
        type="button"
        class="lh-transfer__button"
        :disabled="leftCheckedCount === 0 || props.disabled || undefined"
        :aria-label="t('transfer.moveRight', '移到右侧')"
        @click="move('left-to-right')"
      >›</button>
      <button
        type="button"
        class="lh-transfer__button"
        :disabled="rightCheckedCount === 0 || props.disabled || undefined"
        :aria-label="t('transfer.moveLeft', '移到左侧')"
        @click="move('right-to-left')"
      >‹</button>
    </div>

    <!-- 右面板（目标） -->
    <div :class="panelClasses('right')">
      <div class="lh-transfer-panel__header">
        <label class="lh-transfer-panel__check-all">
          <input
            type="checkbox"
            :checked="rightAllState === 'all'"
            :indeterminate.prop="rightAllState === 'some'"
            :disabled="props.disabled || undefined"
            @change="checkAll('right')"
          >
          <span>{{ t('transfer.targetTitle', '列表二') }}</span>
        </label>
        <span class="lh-transfer-panel__count">{{ rightItems.length }} / {{ props.data.length }}</span>
      </div>

      <div class="lh-transfer-panel__body">
        <input
          v-model="rightQuery"
          type="text"
          class="lh-transfer-panel__search"
          :placeholder="t('transfer.searchPlaceholder', '请输入搜索内容')"
          :aria-label="t('transfer.searchPlaceholder', '请输入搜索内容')"
        >
        <ul
          class="lh-transfer-panel__list"
          role="listbox"
          :aria-multiselectable="true"
          :aria-label="t('transfer.targetTitle', '列表二')"
        >
          <li
            v-for="(item, index) in filteredRight"
            :key="item.key"
            class="lh-transfer-panel__item"
            :class="{ 'lh-transfer-panel__item--disabled': item.disabled }"
            role="option"
            :tabindex="item.disabled ? -1 : itemTabIndex('right', index)"
            :aria-selected="checkedKeys.includes(item.key)"
            :aria-disabled="item.disabled || undefined"
            @click="toggleItem(item)"
            @keydown="onItemKeydown($event, 'right', index)"
          >
            <input
              type="checkbox"
              class="lh-transfer-panel__checkbox"
              :checked="checkedKeys.includes(item.key)"
              :disabled="props.disabled || item.disabled || undefined"
              @click.stop
              @change="toggleItem(item)"
            >
            <span>{{ item.label }}</span>
          </li>
          <li
            v-if="filteredRight.length === 0"
            class="lh-transfer-panel__empty"
          >{{ t('transfer.empty', '暂无数据') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import {
  filterTransferItems,
  getTransferCheckAllState,
  getTransferClassNames,
  getTransferPanelClassNames,
  moveTransferKeys,
  partitionTransferData,
  toggleTransferChecked,
  toggleTransferCheckAll,
} from '@lh-ui/share/core/transfer'
import {
  sxToStyle,
  LH_KEYS,
  getNextListIndex,
  isActivationKey,
  isArrowKey,
  isEscapeKey,
} from '@lh-ui/share/core/shared'
import { lhlocale } from '~/locale'
import type { LhTransferItem } from '@lh-ui/share/core/transfer'
import type { LhTransferProps } from './types'

defineOptions({ name: 'LhTransfer' })

const props = withDefaults(defineProps<LhTransferProps>(), {
  modelValue: () => [],
  disabled: false,
  sx: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [keys: Array<string | number>]
  change: [keys: Array<string | number>, direction: 'left-to-right' | 'right-to-left']
}>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

/** 左侧（源）键即受控值；未传时内部兜底为全量在右 */
const innerSourceKeys = ref<Array<string | number>>([])
const sourceKeys = computed(() =>
  props.modelValue !== undefined && Array.isArray(props.modelValue)
    ? props.modelValue
    : props.modelValue == null
      ? innerSourceKeys.value
      : [],
)

const checkedKeys = ref<Array<string | number>>([])
const leftQuery = ref('')
const rightQuery = ref('')

const partitioned = computed(() => partitionTransferData(props.data, sourceKeys.value))
const leftItems = computed(() => partitioned.value.left)
const rightItems = computed(() => partitioned.value.right)
const filteredLeft = computed(() => filterTransferItems(leftItems.value, leftQuery.value))
const filteredRight = computed(() => filterTransferItems(rightItems.value, rightQuery.value))

const leftAllState = computed(() => getTransferCheckAllState(checkedKeys.value, leftItems.value))
const rightAllState = computed(() => getTransferCheckAllState(checkedKeys.value, rightItems.value))

const leftCheckedCount = computed(() =>
  leftItems.value.filter((item) => checkedKeys.value.includes(item.key) && !item.disabled).length,
)
const rightCheckedCount = computed(() =>
  rightItems.value.filter((item) => checkedKeys.value.includes(item.key) && !item.disabled).length,
)

function toggleItem(item: LhTransferItem): void {
  if (props.disabled || item.disabled) return
  checkedKeys.value = toggleTransferChecked(checkedKeys.value, item.key)
}

/**
 * roving tabindex：每个面板只有一个 option 可 Tab 进入，其余 -1
 *
 * 焦点跟着「最近勾选项」走：勾选后焦点停在被勾项，符合「空格勾选 → 继续移动」的
 * 键盘操作心智；无勾选时落在首项
 */
const leftFocusIndex = ref(-1)
const rightFocusIndex = ref(-1)

function focusIndex(side: 'left' | 'right') {
  return side === 'left' ? leftFocusIndex : rightFocusIndex
}

function listItems(side: 'left' | 'right'): LhTransferItem[] {
  return side === 'left' ? filteredLeft.value : filteredRight.value
}

/** 最近勾选项位置，没有则首项 */
function anchorIndex(side: 'left' | 'right'): number {
  const items = listItems(side)
  const lastChecked = items.findIndex((item) => checkedKeys.value.includes(item.key))
  return lastChecked >= 0 ? lastChecked : 0
}

function resolveFocus(side: 'left' | 'right'): number {
  const items = listItems(side)
  const idx = focusIndex(side).value
  if (idx >= 0 && idx < items.length) return idx
  // 锚点项被禁用时（如 disabled 项排在最前）回落到首个可用项，保证每列总有 tab 落点
  if (items[anchorIndex(side)]?.disabled) {
    return getNextListIndex(items, -1, 'first', {
      loop: false,
      isDisabled: (item) => !!item.disabled,
    })
  }
  return anchorIndex(side)
}

function itemTabIndex(side: 'left' | 'right', index: number): number {
  return index === resolveFocus(side) ? 0 : -1
}

function resetFocus(side: 'left' | 'right'): void {
  focusIndex(side).value = -1
}

/**
 * 列表项键盘导航（listbox 模式）
 *
 * - 上下方向键在过滤后的列表内移动焦点（跳过禁用项，不循环）
 * - Enter / Space 勾选当前项（与点击等价）
 * - 左右方向键在两面板间跳焦：左列表右移到右列表，右列表左移回左列表
 * - Escape 重置焦点（回到锚点）
 */
function onItemKeydown(e: KeyboardEvent, side: 'left' | 'right', index: number): void {
  if (props.disabled) return
  if (isEscapeKey(e)) {
    e.preventDefault()
    resetFocus(side)
    return
  }
  if (isActivationKey(e)) {
    e.preventDefault()
    const item = listItems(side)[index]
    if (item) toggleItem(item)
    return
  }
  if (!isArrowKey(e)) return
  e.preventDefault()

  // 左右方向键跨面板跳焦
  if (e.key === LH_KEYS.ArrowRight && side === 'left') {
    resetFocus('left')
    focusPanel('right')
    return
  }
  if (e.key === LH_KEYS.ArrowLeft && side === 'right') {
    resetFocus('right')
    focusPanel('left')
    return
  }

  // 上下方向键：列表内移动（纵向）
  const isDown = e.key === LH_KEYS.ArrowDown
  const next = getNextListIndex(listItems(side), index, isDown ? 1 : -1, {
    loop: false,
    isDisabled: (item) => !!item.disabled,
  })
  if (next !== index) focusIndex(side).value = next
}

/** 把焦点移到目标面板的可 Tab 项（无函数 ref，靠类名查询 DOM） */
function focusPanel(side: 'left' | 'right'): void {
  nextTick(() => {
    const panel = document.querySelector(
      side === 'left' ? '.lh-transfer-panel--left' : '.lh-transfer-panel--right',
    )
    panel?.querySelector<HTMLElement>('.lh-transfer-panel__item[tabindex="0"]')?.focus()
  })
}

function checkAll(side: 'left' | 'right'): void {
  if (props.disabled) return
  const items = side === 'left' ? leftItems.value : rightItems.value
  checkedKeys.value = toggleTransferCheckAll(checkedKeys.value, items)
}

function move(direction: 'left-to-right' | 'right-to-left'): void {
  if (props.disabled) return
  const next = moveTransferKeys(sourceKeys.value, props.data, checkedKeys.value, direction)
  innerSourceKeys.value = next
  emit('update:modelValue', next)
  emit('change', next, direction)
  checkedKeys.value = []
}

const transferClasses = computed(() => getTransferClassNames({ disabled: !!props.disabled }))

const transferStyle = computed(() => sxToStyle(props.sx ?? {}))

const panelClasses = (side: 'left' | 'right') => getTransferPanelClassNames(side)
</script>
