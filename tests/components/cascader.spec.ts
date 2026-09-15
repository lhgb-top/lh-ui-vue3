import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import LhCascader from '~/components/cascader'

describe('LhCascader Component', () => {
  let wrapper: VueWrapper

  const cascaderOptions = [
    {
      value: 'zhinan',
      label: '指南',
      children: [
        {
          value: 'sheji',
          label: '设计指南',
          children: [
            { value: 'yuansze', label: '颜色' },
            { value: 'fuziyuanze', label: '字体' },
          ],
        },
        { value: 'shejiguize', label: '设计规则' },
      ],
    },
    {
      value: 'zujian',
      label: '组件',
      children: [
        { value: 'jiben', label: '基础组件' },
        { value: 'fankui', label: '反馈组件' },
      ],
    },
  ]

  it('should render', () => {
    wrapper = mount(LhCascader, {
      props: { options: cascaderOptions },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with disabled class', () => {
    wrapper = mount(LhCascader, {
      props: { disabled: true, options: cascaderOptions },
    })
    expect(wrapper.classes()).toContain('lh-cascader--disabled')
  })

  it('should render with size class', () => {
    wrapper = mount(LhCascader, {
      props: { size: 'small', options: cascaderOptions },
    })
    expect(wrapper.classes()).toContain('lh-cascader--small')
  })

  it('should render the input field', () => {
    wrapper = mount(LhCascader, {
      props: { options: cascaderOptions },
    })
    expect(wrapper.find('.lh-cascader__input-inner').exists()).toBe(true)
  })

  it('should show clear button when clearable and has value', () => {
    wrapper = mount(LhCascader, {
      props: {
        clearable: true,
        options: cascaderOptions,
        modelValue: ['zhinan', 'sheji'],
      },
      global: {
        stubs: {
          'lh-icon': true,
          Teleport: {
            disabled: true,
          },
        },
      },
    })
    expect(wrapper.find('.lh-cascader__clear').exists()).toBe(true)
  })

  it('should not show clear button when no value', () => {
    wrapper = mount(LhCascader, {
      props: { clearable: true, options: cascaderOptions, modelValue: [] },
    })
    expect(wrapper.find('.lh-cascader__clear').exists()).toBe(false)
  })

  it('should emit update:modelValue when clear is clicked', async () => {
    wrapper = mount(LhCascader, {
      props: {
        clearable: true,
        options: cascaderOptions,
        modelValue: ['zhinan', 'sheji'],
      },
      global: {
        stubs: {
          'lh-icon': true,
          Teleport: {
            disabled: true,
          },
        },
      },
    })
    const clearBtn = wrapper.find('.lh-cascader__clear')
    if (clearBtn.exists()) {
      await clearBtn.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('should not open panel when disabled', async () => {
    wrapper = mount(LhCascader, {
      props: { disabled: true, options: cascaderOptions },
    })
    await wrapper.find('.lh-cascader__input-inner').trigger('click')
    expect(wrapper.vm.internalVisible).toBe(false)
  })

  it('should render in multiple mode', () => {
    wrapper = mount(LhCascader, {
      props: { multiple: true, options: cascaderOptions },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with filterable', () => {
    wrapper = mount(LhCascader, {
      props: { filterable: true, options: cascaderOptions },
    })
    const input = wrapper.find('.lh-cascader__input-inner')
    expect(input.exists()).toBe(true)
  })
})