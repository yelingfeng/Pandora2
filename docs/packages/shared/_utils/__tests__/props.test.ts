import { describe, expect, test } from 'vitest'
import { ref } from 'vue'
import { deepMerge, getDynamicProps } from '../props'

describe('props', () => {
  test('getDynamicProps unwraps refs', () => {
    const input = {
      a: ref(1),
      b: 'x'
    }
    const out: any = getDynamicProps(input)
    expect(out).toEqual({ a: 1, b: 'x' })
  })

  test('deepMerge merges objects and overwrites primitives', () => {
    const src: any = { a: { b: 1 }, c: 1 }
    const target: any = { a: { d: 2 }, c: 2 }
    const merged: any = deepMerge(src, target)
    expect(merged).toEqual({ a: { b: 1, d: 2 }, c: 2 })
  })
})

