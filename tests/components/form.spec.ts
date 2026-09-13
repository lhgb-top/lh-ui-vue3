import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LhForm, { LhFormItem } from '~/components/form'

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
})
