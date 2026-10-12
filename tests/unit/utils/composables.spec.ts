import { describe, it, expect } from 'vitest'
import { useLhZIndex, useLhOverlayStack, useLhPresetTheme } from '~/composables'
import { LH_THEME_PRESETS } from '@lh-ui/share/theme'

describe('useLhOverlayStack', () => {
  it('只有栈顶实例 isTopmost，出栈后归还', () => {
    const a = useLhOverlayStack()
    const b = useLhOverlayStack()
    expect(a.isTopmost()).toBe(false)
    a.register()
    expect(a.isTopmost()).toBe(true)
    b.register()
    expect(a.isTopmost()).toBe(false)
    expect(b.isTopmost()).toBe(true)
    // 栈顶关闭后，下层弹层重新成为栈顶（Esc 应由它响应）
    b.unregister()
    expect(a.isTopmost()).toBe(true)
  })

  it('空栈与重复 unregister 均为安全空操作', () => {
    const a = useLhOverlayStack()
    expect(a.isTopmost()).toBe(false)
    a.unregister()
    a.unregister()
    expect(a.isTopmost()).toBe(false)
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

describe('useLhPresetTheme', () => {
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
    const { preset } = useLhPresetTheme({ storageKey: STORAGE_KEY })
    expect(preset.value).toBe(LH_THEME_PRESETS[0].name)
  })

  it('injects a style element carrying the preset CSS variables for :root', () => {
    useLhPresetTheme({ storageKey: STORAGE_KEY })
    expect(presetStyleText()).toContain(
      `${PRIMARY_VAR}: ${LH_THEME_PRESETS[0].vars[PRIMARY_VAR]};`
    )
    // 暗色块随样式一并注入，保证预设主色在暗色模式下有正确的底色/选中色
    expect(presetStyleText()).toContain("[data-theme='dark']")
  })

  it('applies a new preset on setPreset', () => {
    const { setPreset } = useLhPresetTheme({ storageKey: STORAGE_KEY })
    setPreset('zhusha')
    expect(presetStyleText()).toContain(
      `${PRIMARY_VAR}: ${LH_THEME_PRESETS.find((p) => p.name === 'zhusha')!.vars[PRIMARY_VAR]};`
    )
  })

  it('persists the chosen preset to localStorage', () => {
    const { setPreset } = useLhPresetTheme({ storageKey: STORAGE_KEY })
    setPreset('songhua')
    expect(localStorage.getItem(STORAGE_KEY)).toBe('songhua')
  })

  it('restores the preset from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'shuimo')
    const { preset } = useLhPresetTheme({ storageKey: STORAGE_KEY })
    expect(preset.value).toBe('shuimo')
  })

  it('ignores an unknown preset stored in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'does-not-exist')
    const { preset } = useLhPresetTheme({ storageKey: STORAGE_KEY })
    expect(preset.value).toBe(LH_THEME_PRESETS[0].name)
  })

  it('returns ConfigProvider-compatible themeVars without the --lh- prefix', () => {
    const { themeVars } = useLhPresetTheme({ storageKey: STORAGE_KEY, applyToRoot: false })
    expect(themeVars.value['primary-color']).toBe(LH_THEME_PRESETS[0].vars[PRIMARY_VAR])
    expect(Object.keys(themeVars.value)).not.toContain(PRIMARY_VAR)
  })

  it('skips the :root write when applyToRoot is false', () => {
    useLhPresetTheme({ storageKey: STORAGE_KEY, applyToRoot: false })
    expect(document.getElementById(STYLE_ID)).toBeNull()
  })

  it('honours an explicit initialPreset over localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'shuimo')
    const { preset } = useLhPresetTheme({ initialPreset: 'golden', storageKey: STORAGE_KEY })
    expect(preset.value).toBe('golden')
  })

  it('reuses a pre-existing style element created by the docs FOUC script', () => {
    // 文档站 head 防闪烁脚本会先创建同 id 的 <style> 元素，运行时必须原地接管而非重建
    const pre = document.createElement('style')
    pre.id = STYLE_ID
    pre.textContent = ':root {\n  --lh-primary-color: #000000;\n}'
    document.head.appendChild(pre)

    const { setPreset } = useLhPresetTheme({ storageKey: STORAGE_KEY })
    setPreset('zhusha')
    expect(document.getElementById(STYLE_ID)).toBe(pre)
    expect(pre.textContent).toContain(
      `${PRIMARY_VAR}: ${LH_THEME_PRESETS.find((p) => p.name === 'zhusha')!.vars[PRIMARY_VAR]};`
    )
  })

  it('keeps the injected style element as the last child of head after each apply', () => {
    const { setPreset } = useLhPresetTheme({ storageKey: STORAGE_KEY })
    // 模拟 Vite 在运行时注入的组件样式晚于预设元素：再应用时须挪回 head 末尾
    const late = document.createElement('style')
    late.textContent = ':root { --lh-unrelated: 1; }'
    document.head.appendChild(late)

    setPreset('golden')
    expect(document.head.lastElementChild).toBe(document.getElementById(STYLE_ID))
  })
})
