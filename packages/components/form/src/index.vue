<template>
  <form
    class="lh-form"
    :class="{ 'lh-form--inline': props.inline }"
    :style="sxStyle"
    @submit.prevent
  >
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, watch } from 'vue'
import { sxToStyle } from '@lh-ui/share/core/shared'
import { getFormFieldValue, validateFormField } from '@lh-ui/share/core/form'
import { lhlocale } from '~/locale'
import type { LhFormProps } from './types'
import { LH_FORM_CONTEXT_KEY } from './types'

const props = withDefaults(defineProps<LhFormProps>(), {
  rules: undefined,
  labelPosition: 'right',
  labelWidth: undefined,
  inline: false,
  sx: undefined,
})

// sx 快速布局属性：转内联样式作用于根元素
const sxStyle = computed(() => sxToStyle(props.sx ?? {}))

defineOptions({ name: 'LhForm' })

const initialValues = new Map<string, unknown>()
const fieldValidators = new Map<string, () => Promise<boolean>>()

// 依赖响应式版本号：切换语言时触发重渲染
const t = (path: string, fallback?: string) => {
  void lhlocale.version.value
  return lhlocale.t(path, fallback)
}

function getRules(prop: string) {
  return props.rules?.[prop] || []
}

async function validateField(prop: string): Promise<boolean> {
  // 与 item.vue 同理：含异步 validator 的规则必须 await，否则 !message 恒 false
  const message = await validateFormField(
    getFormFieldValue(props.model, prop),
    getRules(prop),
    props.model,
    t('form.required'),
  )
  return !message
}

function resetField(prop: string) {
  if (!initialValues.has(prop)) return
  const keys = prop.split('.')
  const lastKey = keys.pop()
  if (!lastKey) return

  let target: Record<string, unknown> = props.model
  for (const key of keys) {
    const value = target[key]
    if (!value || typeof value !== 'object') return
    target = value as Record<string, unknown>
  }
  target[lastKey] = initialValues.get(prop)
}

function validate(): Promise<boolean> {
  const validators = new Set<() => Promise<boolean>>()
  fieldValidators.forEach((validator) => validators.add(validator))
  Object.keys(props.rules || {}).forEach((prop) => validators.add(() => validateField(prop)))
  return Promise.all([...validators].map((validator) => validator())).then((results) => results.every(Boolean))
}

function resetFields() {
  Object.keys(props.rules || {}).forEach(resetField)
}

function registerField(prop: string, validator: () => Promise<boolean>) {
  fieldValidators.set(prop, validator)
  return () => fieldValidators.delete(prop)
}

// 初始值快照：rules 在 setup 后才到达（异步加载）的字段也要能 reset，
// 因此随 rules 变化增量补拍（immediate 覆盖 setup 期已声明的 rules）
watch(
  () => props.rules,
  (rules) => {
    for (const prop of Object.keys(rules || {})) {
      if (!initialValues.has(prop)) {
        initialValues.set(prop, getFormFieldValue(props.model, prop))
      }
    }
  },
  { immediate: true },
)

// provide 的上下文必须保持响应式（对齐 config-provider 的既定修正）：
// 直接 reactive({ rules: props.rules, ... }) 只会在 setup 时拍一次快照，
// 运行时改 rules / labelPosition / labelWidth 不会传导给 FormItem；
// 改用 getter，读取时即时求值并建立依赖
provide(LH_FORM_CONTEXT_KEY, reactive({
  get model() {
    return props.model
  },
  get rules() {
    return props.rules
  },
  get labelPosition() {
    return props.labelPosition
  },
  get labelWidth() {
    return props.labelWidth
  },
  registerField,
  validateField,
  resetField,
}))

defineExpose({ validate, resetFields, validateField, resetField })
</script>
