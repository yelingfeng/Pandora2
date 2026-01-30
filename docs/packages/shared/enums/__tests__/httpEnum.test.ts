import { describe, expect, test } from 'vitest'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '../httpEnum'

describe('httpEnum', () => {
  test('exports expected enum values', () => {
    expect(ResultEnum.SUCCESS).toBe(0)
    expect(ResultEnum.ERROR).toBe(-1)
    expect(ResultEnum.TIMEOUT).toBe(401)
    expect(ResultEnum.TYPE).toBe('success')

    expect(RequestEnum.GET).toBe('GET')
    expect(RequestEnum.POST).toBe('POST')
    expect(RequestEnum.PUT).toBe('PUT')
    expect(RequestEnum.DELETE).toBe('DELETE')

    expect(ContentTypeEnum.JSON).toContain('application/json')
    expect(ContentTypeEnum.FORM_URLENCODED).toContain('application/x-www-form-urlencoded')
    expect(ContentTypeEnum.FORM_DATA).toContain('multipart/form-data')
  })
})

