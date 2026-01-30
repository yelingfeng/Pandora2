import { describe, expect, test } from 'vitest'
import dayjs from 'dayjs'
import { dateUtil, formatToDate, formatToDateTime } from '../dateUtil'

describe('dateUtil', () => {
  test('formatToDateTime', () => {
    const d = dayjs('2020-01-02 03:04:05')
    expect(formatToDateTime(d)).toBe('2020-01-02 03:04:05')
    expect(formatToDateTime(d, 'YYYY/MM/DD')).toBe('2020/01/02')
  })

  test('formatToDate', () => {
    const d = dayjs('2020-01-02')
    expect(formatToDate(d)).toBe('2020-01-02')
    expect(formatToDate(d, 'YYYY/MM/DD')).toBe('2020/01/02')
  })

  test('dateUtil alias', () => {
    expect(dateUtil('2020-01-01').format('YYYY')).toBe('2020')
  })
})

