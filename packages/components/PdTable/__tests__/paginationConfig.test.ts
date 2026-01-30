import { describe, expect, test } from 'vitest'
import { getPagerProps } from '../src/pagination/config'

describe('pagination config', () => {
  test('getPagerProps default returns cloned option', () => {
    const props: any = getPagerProps()
    const a = props.option.default()
    const b = props.option.default()
    expect(a).not.toBe(b)
    expect(a.pageSize).toBe(10)
  })
})

