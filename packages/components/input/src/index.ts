import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { LhInputProps } from './types'

export const useLhInput = (props: LhInputProps) => {
  const inputValue: Ref<string> = ref(props.modelValue ?? '')

  const inputStyle: ComputedRef<Record<string, string>> = computed(() => {
    const styles: Record<string, string> = {}
    if (props.size === 'mini') {
      styles.padding = '4px 8px'
      styles.fontSize = '12px'
    } else if (props.size === 'small') {
      styles.padding = '6px 10px'
      styles.fontSize = '12px'
    } else if (props.size === 'medium') {
      styles.padding = '8px 12px'
      styles.fontSize = '14px'
    } else if (props.size === 'large') {
      styles.padding = '12px 16px'
      styles.fontSize = '16px'
    }
    return styles
  })

  const isDisabled = computed(() => props.disabled)
  const isTextarea = computed(() => props.type === 'textarea')
  const isFocused: Ref<boolean> = ref(false)

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement
    let val = target.value

    if (props.maxlength !== undefined && val.length > props.maxlength) {
      val = val.slice(0, props.maxlength)
    }

    inputValue.value = val
  }

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation()
    inputValue.value = ''
  }

  const showsWordLimit = computed(() => {
    return props.showWordLimit && (props.maxlength !== undefined || props.minlength !== undefined)
  })

  const wordCount = computed(() => {
    return `${inputValue.value.length}/${props.maxlength ?? '∞'}`
  })

  return {
    inputValue,
    inputStyle,
    isDisabled,
    isTextarea,
    isFocused,
    showsWordLimit,
    wordCount,
    handleInput,
    handleClear,
  }
}