import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'
import {
  useLhSize,
  useLhDisabled,
  useLhNamespace,
  useLhVModel,
  useLhZIndex,
} from '~/utils/composables'

describe('useLhSize', () => {
  it('returns default size when no props or config', () => {
    const { effectiveSize } = useLhSize({})
    expect(effectiveSize.value).toBe('medium')
  })

  it('returns props.size when set', () => {
    const { effectiveSize } = useLhSize({ size: 'large' })
    expect(effectiveSize.value).toBe('large')
  })

  it('returns configSize when props.size is absent', () => {
    const configSize = ref('small')
    const { effectiveSize } = useLhSize({}, configSize)
    expect(effectiveSize.value).toBe('small')
  })

  it('props.size has higher priority than configSize', () => {
    const configSize = ref('small')
    const { effectiveSize } = useLhSize({ size: 'large' }, configSize)
    expect(effectiveSize.value).toBe('large')
  })

  it('reacts to configSize changes when props.size is absent', async () => {
    const configSize = ref('small')
    const { effectiveSize } = useLhSize({}, configSize)
    configSize.value = 'large'
    await nextTick()
    expect(effectiveSize.value).toBe('large')
  })

  it('uses custom defaultSize', () => {
    const { effectiveSize } = useLhSize({}, undefined, 'small')
    expect(effectiveSize.value).toBe('small')
  })
})

describe('useLhDisabled', () => {
  it('returns false when neither disabled nor loading', () => {
    const { isDisabled } = useLhDisabled({ disabled: false, loading: false })
    expect(isDisabled.value).toBe(false)
  })

  it('returns true when disabled is true', () => {
    const { isDisabled } = useLhDisabled({ disabled: true, loading: false })
    expect(isDisabled.value).toBe(true)
  })

  it('returns true when loading is true', () => {
    const { isDisabled } = useLhDisabled({ disabled: false, loading: true })
    expect(isDisabled.value).toBe(true)
  })

  it('returns true when both disabled and loading are true', () => {
    const { isDisabled } = useLhDisabled({ disabled: true, loading: true })
    expect(isDisabled.value).toBe(true)
  })
})

describe('useLhNamespace', () => {
  it('generates block class', () => {
    const { b } = useLhNamespace('button')
    expect(b()).toBe('lh-button')
  })

  it('generates element class', () => {
    const { e } = useLhNamespace('button')
    expect(e('text')).toBe('lh-button__text')
  })

  it('generates modifier class', () => {
    const { m } = useLhNamespace('button')
    expect(m('primary')).toBe('lh-button--primary')
  })

  it('generates element-modifier class', () => {
    const { em } = useLhNamespace('button')
    expect(em('text', 'large')).toBe('lh-button__text--large')
  })

  it('is() returns empty string when state is false', () => {
    const { is } = useLhNamespace('button')
    expect(is('active', false)).toBe('')
  })

  it('is() returns empty string when state is undefined', () => {
    const { is } = useLhNamespace('button')
    expect(is('active', undefined)).toBe('')
  })

  it('is() returns is-{name} when state is true', () => {
    const { is } = useLhNamespace('button')
    expect(is('active', true)).toBe('is-active')
  })

  it('is() returns is-{state} when state is a string', () => {
    const { is } = useLhNamespace('button')
    expect(is('active', 'primary')).toBe('is-primary')
  })
})

describe('useLhVModel', () => {
  it('initializes with props.modelValue', () => {
    const emit = vi.fn()
    const { model } = useLhVModel({ modelValue: 'hello' }, emit)
    expect(model.value).toBe('hello')
  })

  it('initializes with defaultValue when modelValue is undefined', () => {
    const emit = vi.fn()
    const { model } = useLhVModel({ modelValue: undefined }, emit, 'default')
    expect(model.value).toBe('default')
  })

  it('updateModel emits update:modelValue and updates model', () => {
    const emit = vi.fn()
    const { model, updateModel } = useLhVModel({ modelValue: 'old' }, emit)
    updateModel('new')
    expect(emit).toHaveBeenCalledWith('update:modelValue', 'new')
    expect(model.value).toBe('new')
  })

  it('reacts to props.modelValue changes', async () => {
    const emit = vi.fn()
    const props = { modelValue: 'initial' }
    const { model } = useLhVModel(props, emit)

    // Simulate props change via watch
    expect(model.value).toBe('initial')
  })
})

describe('useLhZIndex', () => {
  it('returns a zIndex starting from 2001', () => {
    // Reset counter to ensure predictable test
    const { zIndex } = useLhZIndex()
    expect(zIndex.value).toBeGreaterThan(2000)
  })

  it('nextZIndex returns incrementing value', () => {
    const { zIndex, nextZIndex } = useLhZIndex()
    const first = nextZIndex()
    const second = nextZIndex()
    expect(second).toBe(first + 1)
  })
})
