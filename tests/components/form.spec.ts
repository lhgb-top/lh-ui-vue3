import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import LhForm, { LhFormItem } from '~/components/form'
import LhInput from '~/components/input'
import LhSelect from '~/components/select'
import { LhCheckbox, LhCheckboxGroup } from '~/components/checkbox'

const InputStub = {
  template: '<input />',
}

describe('LhForm', () => {
  it('renders labels and validates required fields', async () => {
    const model = { name: '' }
    const wrapper = mount(LhForm, {
      props: { model },
      global: { components: { LhFormItem, InputStub } },
      slots: {
        default: '<LhFormItem prop="name" label="Name" required><InputStub /></LhFormItem>',
      },
    })

    expect(wrapper.find('.lh-form-item__label').text()).toContain('Name')
    const form = wrapper.vm as unknown as { validate: () => Promise<boolean> }
    expect(await form.validate()).toBe(false)
  })

  it('resets fields to their initial values', async () => {
    const model = { name: 'Initial' }
    const wrapper = mount(LhForm, {
      props: { model, rules: { name: [{ required: true }] } },
    })

    model.name = 'Changed'
    const form = wrapper.vm as unknown as { resetFields: () => void }
    form.resetFields()
    expect(model.name).toBe('Initial')
  })

  it('announces validation errors via role=alert and aria-describedby', async () => {
    const model = { name: '' }
    const wrapper = mount(LhForm, {
      props: { model, rules: { name: [{ required: true }] } },
      global: { components: { LhFormItem, InputStub } },
      slots: {
        default: '<LhFormItem prop="name" label="姓名" required><InputStub /></LhFormItem>',
      },
    })

    const form = wrapper.vm as unknown as { validate: () => Promise<boolean> }
    expect(await form.validate()).toBe(false)
    await wrapper.vm.$nextTick()

    const error = wrapper.find('.lh-form-item__error')
    expect(error.exists()).toBe(true)
    // 必填兜底文案取自语言包 form.required，不再是 core 层的硬编码英文
    expect(error.text()).toBe('此项为必填')
    expect(error.attributes('role')).toBe('alert')
    const errorId = error.attributes('id')
    expect(errorId).toBeTruthy()
    expect(wrapper.find('.lh-form-item__content').attributes('aria-describedby')).toBe(errorId)
  })

  it('drops the aria-describedby association when there is no error', async () => {
    const model = { name: '已填' }
    const wrapper = mount(LhForm, {
      props: { model, rules: { name: [{ required: true }] } },
      global: { components: { LhFormItem, InputStub } },
      slots: {
        default: '<LhFormItem prop="name" label="姓名" required><InputStub /></LhFormItem>',
      },
    })

    const form = wrapper.vm as unknown as { validate: () => Promise<boolean> }
    expect(await form.validate()).toBe(true)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.lh-form-item__error').exists()).toBe(false)
    expect(wrapper.find('.lh-form-item__content').attributes('aria-describedby')).toBeUndefined()
  })

  it('fails field-level validation of required rules', async () => {
    // 表单级的 validateField 也走必填兜底文案，不能静默放行
    const model = { name: '' }
    const wrapper = mount(LhForm, {
      props: { model, rules: { name: [{ required: true }] } },
    })
    const form = wrapper.vm as unknown as { validateField: (prop: string) => Promise<boolean> }
    expect(await form.validateField('name')).toBe(false)
  })

  it('marks inner controls with aria-invalid while the form item has an error', async () => {
    const model = { name: '', city: undefined }
    const wrapper = mount(LhForm, {
      props: { model, rules: { name: [{ required: true }], city: [{ required: true }] } },
      slots: {
        default: () => [
          h(LhFormItem, { prop: 'name', label: '姓名' }, () => h(LhInput, { modelValue: model.name })),
          h(LhFormItem, { prop: 'city', label: '城市' }, () =>
            h(LhSelect, { modelValue: model.city, options: [] }),
          ),
        ],
      },
    })

    const form = wrapper.vm as unknown as { validate: () => Promise<boolean> }
    expect(await form.validate()).toBe(false)
    await wrapper.vm.$nextTick()

    // 原生 input 标记 aria-invalid，复合触发器同样标记
    expect(wrapper.find('.lh-input__inner').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('.lh-select__trigger').attributes('aria-invalid')).toBe('true')

    // 错误消除后属性随之移除
    model.name = '已填'
    model.city = 'hz'
    expect(await form.validate()).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.lh-input__inner').attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.find('.lh-select__trigger').attributes('aria-invalid')).toBeUndefined()
  })

  it('does not set aria-invalid on controls placed outside a form item', () => {
    const wrapper = mount(LhInput, { props: { modelValue: '' } })
    expect(wrapper.find('.lh-input__inner').attributes('aria-invalid')).toBeUndefined()
  })

  it('propagates aria-invalid through a checkbox group', async () => {
    const model = { agree: [] as unknown[] }
    const wrapper = mount(LhForm, {
      props: {
        model,
        rules: {
          agree: [
            // 必填判定对空数组不生效，用 validator 兜住分组场景
            { validator: (value: unknown) => (Array.isArray(value) && value.length ? '' : '请至少勾选一项') },
          ],
        },
      },
      slots: {
        default: () =>
          h(LhFormItem, { prop: 'agree', label: '协议' }, () =>
            h(LhCheckboxGroup, { modelValue: model.agree }, () => h(LhCheckbox, { value: true, label: '同意' })),
          ),
      },
    })

    const form = wrapper.vm as unknown as { validate: () => Promise<boolean> }
    expect(await form.validate()).toBe(false)
    await wrapper.vm.$nextTick()

    // group 不阻断 provide，checkbox 的原生 input 仍拿到错误状态
    expect(wrapper.find('.lh-checkbox__input').attributes('aria-invalid')).toBe('true')
  })

  it('applies sx props as inline styles on the root element', () => {
    const wrapper = mount(LhForm, { props: { model: {}, sx: { mt: 2, w: '50%' } } })
    const style = wrapper.attributes('style')
    expect(style).toContain('margin-top: 16px')
    expect(style).toContain('width: 50%')
  })
})
