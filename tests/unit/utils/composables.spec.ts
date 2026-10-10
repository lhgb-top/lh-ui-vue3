import { describe, it, expect } from 'vitest'
import { ref, nextTick } from 'vue'
import {
  useLhSize,
  useLhDisabled,
  useLhNamespace,
  useLhVModel,
  useLhZIndex,
  usePresetTheme,
} from '~/composables'
import { THEME_PRESETS } from '@lh-ui/share/theme'

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
    const { nextZIndex } = useLhZIndex()
    const first = nextZIndex()
    const second = nextZIndex()
    expect(second).toBe(first + 1)
  })
})

describe('usePresetTheme', () => {
  const STORAGE_KEY = 'lh-ui-preset'
  const PRIMARY_VAR = '--lh-primary-color'
  const STYLE_ID = 'lh-preset-theme'

  // 预设改为注入 <style> 元素（而非内联 style），暗色规则才能与主题样式表共存
  const presetStyleText = () => document.getElementById(STYLE_ID)?.textContent ?? ''

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY)
    document.getElementById(STYLE_ID)?.remove()
    document.documentElement.style.cssText = ''
  })

  it('defaults to the first preset', () => {
    const { preset } = usePresetTheme({ storageKey: STORAGE_KEY })
    expect(preset.value).toBe(THEME_PRESETS[0].name)
  })

  it('injects a style element carrying the preset CSS variables for :root', () => {
    usePresetTheme({ storageKey: STORAGE_KEY })
    expect(presetStyleText()).toContain(
      `${PRIMARY_VAR}: ${THEME_PRESETS[0].vars[PRIMARY_VAR]};`
    )
    // 暗色块随样式一并注入，保证预设主色在暗色模式下有正确的底色/选中色
    expect(presetStyleText()).toContain("[data-theme='dark']")
  })

  it('applies a new preset on setPreset', () => {
    const { setPreset } = usePresetTheme({ storageKey: STORAGE_KEY })
    setPreset('zhusha')
    expect(presetStyleText()).toContain(
      `${PRIMARY_VAR}: ${THEME_PRESETS.find((p) => p.name === 'zhusha')!.vars[PRIMARY_VAR]};`
    )
  })

  it('persists the chosen preset to localStorage', () => {
    const { setPreset } = usePresetTheme({ storageKey: STORAGE_KEY })
    setPreset('songhua')
    expect(localStorage.getItem(STORAGE_KEY)).toBe('songhua')
  })

  it('restores the preset from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'shuimo')
    const { preset } = usePresetTheme({ storageKey: STORAGE_KEY })
    expect(preset.value).toBe('shuimo')
  })

  it('ignores an unknown preset stored in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'does-not-exist')
    const { preset } = usePresetTheme({ storageKey: STORAGE_KEY })
    expect(preset.value).toBe(THEME_PRESETS[0].name)
  })

  it('returns ConfigProvider-compatible themeVars without the --lh- prefix', () => {
    const { themeVars } = usePresetTheme({ storageKey: STORAGE_KEY, applyToRoot: false })
    expect(themeVars.value['primary-color']).toBe(THEME_PRESETS[0].vars[PRIMARY_VAR])
    expect(Object.keys(themeVars.value)).not.toContain(PRIMARY_VAR)
  })

  it('skips the :root write when applyToRoot is false', () => {
    usePresetTheme({ storageKey: STORAGE_KEY, applyToRoot: false })
    expect(document.getElementById(STYLE_ID)).toBeNull()
  })

  it('honours an explicit initialPreset over localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'shuimo')
    const { preset } = usePresetTheme({ initialPreset: 'golden', storageKey: STORAGE_KEY })
    expect(preset.value).toBe('golden')
  })

  it('reuses a pre-existing style element created by the docs FOUC script', () => {
    // 文档站 head 防闪烁脚本会先创建同 id 的 <style> 元素，运行时必须原地接管而非重建
    const pre = document.createElement('style')
    pre.id = STYLE_ID
    pre.textContent = ':root {\n  --lh-primary-color: #000000;\n}'
    document.head.appendChild(pre)

    const { setPreset } = usePresetTheme({ storageKey: STORAGE_KEY })
    setPreset('zhusha')
    expect(document.getElementById(STYLE_ID)).toBe(pre)
    expect(pre.textContent).toContain(
      `${PRIMARY_VAR}: ${THEME_PRESETS.find((p) => p.name === 'zhusha')!.vars[PRIMARY_VAR]};`
    )
  })

  it('keeps the injected style element as the last child of head after each apply', () => {
    const { setPreset } = usePresetTheme({ storageKey: STORAGE_KEY })
    // 模拟 Vite 在运行时注入的组件样式晚于预设元素：再应用时须挪回 head 末尾
    const late = document.createElement('style')
    late.textContent = ':root { --lh-unrelated: 1; }'
    document.head.appendChild(late)

    setPreset('golden')
    expect(document.head.lastElementChild).toBe(document.getElementById(STYLE_ID))
  })
})
