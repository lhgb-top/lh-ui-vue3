import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LhUpload from '~/components/upload'

const makeFile = (name: string, size = 100): File => {
  const file = new File(['x'], name)
  Object.defineProperty(file, 'size', { value: size })
  return file
}

describe('LhUpload Component', () => {
  it('renders a hidden file input and a keyboard-reachable trigger', () => {
    const wrapper = mount(LhUpload)
    const input = wrapper.find('input[type="file"]')
    expect(input.exists()).toBe(true)
    const trigger = wrapper.find('.lh-upload__trigger')
    expect(trigger.attributes('role')).toBe('button')
    expect(trigger.attributes('tabindex')).toBe('0')
  })

  it('opens the file dialog on trigger click and on Enter', async () => {
    const wrapper = mount(LhUpload)
    const input = wrapper.find('input[type="file"]').element as HTMLInputElement
    const click = vi.spyOn(input, 'click').mockImplementation(() => {})
    await wrapper.find('.lh-upload__trigger').trigger('click')
    expect(click).toHaveBeenCalled()
    await wrapper.find('.lh-upload__trigger').trigger('keydown', { key: 'Enter' })
    expect(click).toHaveBeenCalledTimes(2)
  })

  it('adds files from input change and lists them', async () => {
    const wrapper = mount(LhUpload)
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [makeFile('a.png')],
      configurable: true,
    })
    await input.trigger('change')
    expect(wrapper.emitted('change')?.[0][0].length).toBe(1)
    expect(wrapper.find('.lh-upload__file-name').text()).toBe('a.png')
  })

  it('rejects oversized files with a role=alert message', async () => {
    const wrapper = mount(LhUpload, { props: { maxSize: 50 } })
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', { value: [makeFile('big.png', 100)], configurable: true })
    await input.trigger('change')
    expect(wrapper.find('.lh-upload__error').attributes('role')).toBe('alert')
    expect(wrapper.findAll('.lh-upload__file').length).toBe(0)
  })

  it('accepts a comma-separated string accept without crashing', async () => {
    const wrapper = mount(LhUpload, { props: { accept: '.png, .jpg' } })
    // 渲染路径：字符串归一后写入原生 accept 属性
    expect(wrapper.find('input[type="file"]').attributes('accept')).toBe('.png,.jpg')

    // 校验路径：命中的放行、未命中的拦截且不抛错
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [makeFile('ok.png'), makeFile('no.gif')],
      configurable: true,
    })
    await input.trigger('change')
    const names = wrapper.findAll('.lh-upload__file-name').map((n) => n.text())
    expect(names).toEqual(['ok.png'])
    expect(wrapper.find('.lh-upload__error').exists()).toBe(true)
  })

  it('uploads through the request prop and tracks progress', async () => {
    let resolveUpload: (value: { url: string }) => void = () => {}
    const request = vi.fn(
      () =>
        new Promise<{ url: string }>((resolve) => {
          resolveUpload = resolve
        }),
    )
    const wrapper = mount(LhUpload, { props: { request } })
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', { value: [makeFile('a.png')], configurable: true })
    await input.trigger('change')
    await vi.waitFor(() => expect(wrapper.find('.lh-upload__progress').exists()).toBe(true))
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('0')

    resolveUpload({ url: 'https://example.com/a.png' })
    await vi.waitFor(() => expect(wrapper.find('.lh-upload__file--success').exists()).toBe(true))
    expect(wrapper.emitted('success')?.[0][0].url).toBe('https://example.com/a.png')
  })

  it('marks failed uploads and emits error', async () => {
    const request = vi.fn(() => Promise.reject(new Error('boom')))
    const wrapper = mount(LhUpload, { props: { request } })
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', { value: [makeFile('a.png')], configurable: true })
    await input.trigger('change')
    await vi.waitFor(() => expect(wrapper.find('.lh-upload__file--fail').exists()).toBe(true))
    expect(wrapper.emitted('error')?.[0][1]).toBe('boom')
  })

  it('removes a file and emits', async () => {
    const wrapper = mount(LhUpload)
    const input = wrapper.find('input[type="file"]')
    Object.defineProperty(input.element, 'files', { value: [makeFile('a.png')], configurable: true })
    await input.trigger('change')
    await wrapper.find('.lh-upload__file-remove').trigger('click')
    expect(wrapper.findAll('.lh-upload__file').length).toBe(0)
    expect(wrapper.emitted('remove')).toBeTruthy()
  })

  it('accepts drops when drag mode is on', async () => {
    const wrapper = mount(LhUpload, { props: { drag: true } })
    await wrapper.trigger('dragover')
    expect(wrapper.classes()).toContain('lh-upload--dragover')
    await wrapper.trigger('drop', { dataTransfer: { files: [makeFile('d.png')] } })
    expect(wrapper.findAll('.lh-upload__file').length).toBe(1)
  })
})
