import { computed, ref, type Ref } from 'vue'
import type { LhInputProps } from './types'
import { useLhConfigContext } from '~/components/config-provider/src/index'
import { useLhComponentTheme } from '~/utils/composables'
import { getInputStyle, shouldShowWordLimit, getWordCount, clampString } from '@lh-ui/core/input/logic'

export const useLhInput = (props: LhInputProps) => {
  const configContext = useLhConfigContext()
  const inputValue: Ref<string> = ref(props.modelValue ?? '')

  const inputStyle = computed(() => getInputStyle(props.size || 'medium'))
  const { componentStyle } = useLhComponentTheme('input', props, configContext)

  const isDisabled = computed(() => props.disabled)
  const isTextarea = computed(() => props.type === 'textarea')
  const isFocused: Ref<boolean> = ref(false)

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement
    let val = target.value
    val = clampString(val, props.maxlength)
    inputValue.value = val
  }

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation()
    inputValue.value = ''
  }

  const showsWordLimit = computed(() => {
    return props.showWordLimit && shouldShowWordLimit({ maxlength: props.maxlength, minlength: props.minlength })
  })

  const wordCount = computed(() => {
    return getWordCount({ value: inputValue.value, maxlength: props.maxlength })
  })

  return {
    inputValue,
    inputStyle,
    componentStyle,
    isDisabled,
    isTextarea,
    isFocused,
    showsWordLimit,
    wordCount,
    handleInput,
    handleClear,
  }
}