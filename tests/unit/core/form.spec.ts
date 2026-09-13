import { describe, expect, it } from 'vitest'
import { getFormFieldValue, validateFormField } from '~/core/form'

describe('form/core/logic', () => {
  it('reads nested field values', () => {
    expect(getFormFieldValue({ user: { name: 'Lin' } }, 'user.name')).toBe('Lin')
    expect(getFormFieldValue({ user: {} }, 'user.name')).toBeUndefined()
  })

  it('validates required fields', () => {
    expect(validateFormField('', [{ required: true }], {})).toBe('This field is required')
    expect(validateFormField('ok', [{ required: true }], {})).toBeUndefined()
  })

  it('uses custom validation messages', () => {
    const message = validateFormField(
      'short',
      [{ validator: (value) => String(value).length < 8 ? 'Too short' : undefined }],
      {},
    )
    expect(message).toBe('Too short')
  })
})
