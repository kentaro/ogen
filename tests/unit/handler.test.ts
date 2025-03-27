import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateOGImage } from '../../src/handler'
import { Context } from 'hono'
import * as satori from 'satori'

// satoriのモック
vi.mock('satori', () => {
  return {
    default: vi.fn().mockImplementation((component, options) => {
      return Promise.resolve('<svg>モックSVG</svg>')
    })
  }
})

// グローバルfetchのモック
global.fetch = vi.fn().mockImplementation((url: string) => {
  return Promise.resolve({
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(10))
  })
})

describe('handler', () => {
  describe('generateOGImage', () => {
    let mockContext: Context

    beforeEach(() => {
      // コンテキストのモックをセットアップ
      mockContext = {
        req: {
          query: vi.fn().mockReturnValue({
            title: 'テストタイトル',
            username: 'testuser'
          })
        },
        json: vi.fn().mockImplementation((data, status) => {
          return { data, status }
        })
      } as unknown as Context

      // モックをリセット
      vi.clearAllMocks()
    })

    it('必須パラメータが提供されている場合、SVGレスポンスを返す', async () => {
      const response = await generateOGImage(mockContext)
      
      // satori関数が呼ばれたことを確認
      expect(satori.default).toHaveBeenCalled()
      
      // レスポンスが正しいことを確認
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('Content-Type')).toBe('image/svg+xml')
      expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable')
      
      const content = await response.text()
      expect(content).toBe('<svg>モックSVG</svg>')
    })

    it('必須パラメータが欠けている場合、400エラーを返す', async () => {
      // パラメータが欠けているコンテキストを作成
      mockContext.req.query = vi.fn().mockReturnValue({
        // titleが欠けている
        username: 'testuser'
      })
      
      const response = await generateOGImage(mockContext)
      
      // jsonメソッドが呼ばれたことを確認
      expect(mockContext.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.anything()
        }),
        400
      )
    })

    it('カスタムグラデーションが指定されている場合、それらを使用する', async () => {
      // カスタムグラデーションを指定
      mockContext.req.query = vi.fn().mockReturnValue({
        title: 'テストタイトル',
        username: 'testuser',
        gradientFrom: '#ff0000',
        gradientTo: '#0000ff'
      })
      
      await generateOGImage(mockContext)
      
      // satoriが呼び出されたことを確認
      expect(satori.default).toHaveBeenCalled()
      
      // カスタム値を確認
      const satoriCall = (satori.default as any).mock.calls[0]
      expect(satoriCall).toBeDefined()
    })

    it('iconUrlが指定されている場合、それを使用する', async () => {
      // iconUrlを指定
      mockContext.req.query = vi.fn().mockReturnValue({
        title: 'テストタイトル',
        username: 'testuser',
        iconUrl: 'https://example.com/icon.png'
      })
      
      await generateOGImage(mockContext)
      
      // satoriが呼び出されたことを確認
      expect(satori.default).toHaveBeenCalled()
      
      // iconUrlが渡されたことを確認
      const satoriCall = (satori.default as any).mock.calls[0]
      expect(satoriCall).toBeDefined()
    })

    it('例外が発生した場合、500エラーを返す', async () => {
      // satoriがエラーをスローするようにモック
      (satori.default as any).mockRejectedValueOnce(new Error('テストエラー'))
      
      await generateOGImage(mockContext)
      
      // jsonメソッドが呼ばれたことを確認
      expect(mockContext.json).toHaveBeenCalledWith(
        {
          success: false,
          error: 'Internal Server Error'
        },
        500
      )
    })
  })
})