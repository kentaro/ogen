import { describe, it, expect } from 'vitest'
import { ogImageParamsSchema } from '../../src/types'

describe('ogImageParamsSchema', () => {
  it('有効なパラメータでバリデーションが成功する', () => {
    const validParams = {
      title: 'テストタイトル',
      username: 'testuser',
      gradientFrom: '#ff0000',
      gradientTo: '#0000ff',
      iconUrl: 'https://example.com/icon.png'
    }
    
    const result = ogImageParamsSchema.safeParse(validParams)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validParams)
    }
  })

  it('必須フィールドが欠けている場合バリデーションが失敗する', () => {
    // titleが欠けている
    const missingTitle = {
      username: 'testuser',
      gradientFrom: '#ff0000',
      gradientTo: '#0000ff'
    }
    
    const result1 = ogImageParamsSchema.safeParse(missingTitle)
    expect(result1.success).toBe(false)
    
    // usernameが欠けている
    const missingUsername = {
      title: 'テストタイトル',
      gradientFrom: '#ff0000',
      gradientTo: '#0000ff'
    }
    
    const result2 = ogImageParamsSchema.safeParse(missingUsername)
    expect(result2.success).toBe(false)
  })

  it('空の文字列の場合バリデーションが失敗する', () => {
    const emptyTitle = {
      title: '',
      username: 'testuser',
      gradientFrom: '#ff0000',
      gradientTo: '#0000ff'
    }
    
    const result1 = ogImageParamsSchema.safeParse(emptyTitle)
    expect(result1.success).toBe(false)
    
    const emptyUsername = {
      title: 'テストタイトル',
      username: '',
      gradientFrom: '#ff0000',
      gradientTo: '#0000ff'
    }
    
    const result2 = ogImageParamsSchema.safeParse(emptyUsername)
    expect(result2.success).toBe(false)
  })

  it('iconUrlが無効なURLの場合バリデーションが失敗する', () => {
    const invalidIconUrl = {
      title: 'テストタイトル',
      username: 'testuser',
      gradientFrom: '#ff0000',
      gradientTo: '#0000ff',
      iconUrl: 'invalid-url'
    }
    
    const result = ogImageParamsSchema.safeParse(invalidIconUrl)
    expect(result.success).toBe(false)
  })

  it('デフォルト値が適用される', () => {
    const paramsWithoutDefaults = {
      title: 'テストタイトル',
      username: 'testuser'
    }
    
    const result = ogImageParamsSchema.safeParse(paramsWithoutDefaults)
    expect(result.success).toBe(true)
    
    if (result.success) {
      expect(result.data.gradientFrom).toBe('#EEF0FF')
      expect(result.data.gradientTo).toBe('#FFF0F8')
    }
  })
}) 