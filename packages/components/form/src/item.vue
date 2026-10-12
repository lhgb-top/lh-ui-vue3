<template>
  <div
    class="lh-form-item"
    :class="{
      'lh-form-item--error': errorMessage,
      'lh-form-item--top': form?.labelPosition === 'top',
    }"
    @focusout="handleFocusout"
  >
    <label
      v-if="props.label"
      class="lh-form-item__label"
      :style="labelStyle"
      @click.prevent="focusControl"
    >
      <span v-if="props.required" class="lh-form-item__required">*</span>
      {{ props.label }}
    </label>
    <div
      ref="contentRef"
      class="lh-form-item__content"
      :aria-describedby="errorMessage ? errorId : undefined"
    >
      <slot></slot>
      <span
        v-if="errorMessage"
        :id="errorId"
        class="lh-form-item__error"
        role="alert"
      >{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, provide, reactive, ref, useId } from 'vue'
import { getFormFieldValue, validateFormField } from '@lh-ui/share/core/form'
import { lhlocale } from '~/locale'
import type { LhFormItemProps } from './types'
import { LH_FORM_CONTEXT_KEY, LH_FORM_ITEM_CONTEXT_KEY } from './types'

const props = withDefaults(defineProps<LhFormItemProps>(), {
  prop: undefined,
  label: undefined,
  required: false,
  rules: undefined,
})

defineOptions({ name: 'LhFormItem' })

const form = inject(LH_FORM_CONTEXT_KEY, null)
const errorMessage = ref('')
// 暴露给后代表单控件：reactive 解包 ref，控件侧读到的就是响应式字符串，
// 校验失败时控件可据此绑定 aria-invalid（config-provider 的注释记录过快照失效的坑，此处 provide 的是 ref 本体）
provide(LH_FORM_ITEM_CONTEXT_KEY, reactive({ errorMessage }))
// 校验失败时错误文案的锚点：role="alert" 自动播报，aria-describedby 关联到内容区
const errorId = `lh-form-item__error-${useId()}`
let unregisterField: (() => void) | undefined

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

const rules = computed(() => {
  const formRules = props.prop ? form?.rules?.[props.prop] || [] : []
  if (props.rules) return props.required ? [{ required: true }, ...props.rules] : props.rules
  return props.required ? [{ required: true }, ...formRules] : formRules
})

const labelStyle = computed(() => {
  if (!form?.labelWidth || form.labelPosition === 'top') return undefined
  const width = typeof form.labelWidth === 'number' ? `${form.labelWidth}px` : form.labelWidth
  return { width }
})

async function validate() {
  if (!props.prop || !form) return true
  // 必填兜底文案走语言包（form.required），core 层不再含文案字面量
  // validateFormField 对含异步 validator 的规则返回 Promise，必须 await：
  // 不 await 会把 Promise 塞进 ref<string> 渲染成 "[object Promise]"，
  // 且 !message 恒为 false（Promise 恒 truthy）导致异步规则永远校验失败
  const message = await validateFormField(
    getFormFieldValue(form.model, props.prop),
    rules.value,
    form.model,
    t('form.required'),
  )
  errorMessage.value = message || ''
  return !message
}

onMounted(() => {
  if (props.prop && form) {
    unregisterField = form.registerField(props.prop, validate)
  }
})

onUnmounted(() => {
  unregisterField?.()
})

const contentRef = ref<HTMLElement | null>(null)

/**
 * 点击标签聚焦控件：slot 里的控件 id 无法静态得知，退而求其次
 * 聚焦内容区第一个可聚焦元素（label 的 for 关联需要控件 id，此处不适用）
 */
function focusControl() {
  const target = contentRef.value?.querySelector<HTMLElement>(
    'input:not([type="hidden"]), textarea, select, button, [tabindex]:not([tabindex="-1"])'
  )
  target?.focus()
}

function handleFocusout(event: FocusEvent) {
  // 焦点在 item 内部移动（控件 ↔ 控件 / 标签）不触发校验，只有真正离开才校验，
  // 否则中途焦点切换会闪出错误态
  const next = event.relatedTarget as Node | null
  if (next && (event.currentTarget as HTMLElement).contains(next)) return
  void validate()
}

defineExpose({ validate, errorMessage })
</script>
