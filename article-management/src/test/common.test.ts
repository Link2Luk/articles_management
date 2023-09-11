import { describe, expect, it } from 'vitest'

import { getPasswordRegExp } from '@/utils/rules'
describe('rules utils', () => {
  it('create password RegExp', () => {
    expect(getPasswordRegExp()).toStrictEqual([
      {
        pattern: /^[\dA-Za-z@$!%*?&]{8,16}$/,
        message: 'Use 8-16 letters, numbers and @$!%*?&'
      },
      {
        pattern: /^(?=.*\d)[\dA-Za-z@$!%*?&]{8,16}$/,
        message: 'Use at least 1 digit'
      },
      {
        pattern: /^(?=.*[A-Za-z])[\dA-Za-z@$!%*?&]{8,16}$/,
        message: 'Use at least 1 letter'
      }
    ])
    expect(getPasswordRegExp(8, 16, { digit: false, letter: false, upper: false, special: false })).toStrictEqual([
      {
        pattern: /^[\dA-Za-z@$!%*?&]{8,16}$/,
        message: 'Use 8-16 letters, numbers and @$!%*?&'
      }
    ])
    expect(getPasswordRegExp(8, 16, { upper: true })).toContainEqual({
      pattern: /^(?=.*[A-Z])[\dA-Za-z@$!%*?&]{8,16}$/,
      message: 'Use at least 1 uppercase letter'
    })
    expect(getPasswordRegExp(8, 16, { special: true })).toContainEqual({
      pattern: /^(?=.*[@$!%*?&])[\dA-Za-z@$!%*?&]{8,16}$/,
      message: 'Use at least 1 special character'
    })
  })
})
