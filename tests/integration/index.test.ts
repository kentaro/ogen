import { describe, it, expect, vi, beforeAll } from 'vitest'
import app from '../../src/index'

// satoriをモック化
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

describe('API統合テスト', () => {
  beforeAll(() => {
    // モックをクリア
    vi.clearAllMocks()
  })

  describe('ルートエンドポイント（/）', () => {
    it('OG画像生成エンドポイントにリダイレクトされる', async () => {
      const req = new Request('http://localhost/')
      const res = await app.fetch(req)
      
      expect(res.status).toBe(302) // リダイレクトステータスコード
      expect(res.headers.get('Location')).toBe('/og?title=OGen&username=example')
    })
  })

  describe('OG画像生成エンドポイント（/og）', () => {
    it('必須パラメータが提供されている場合、SVGを返す', async () => {
      const req = new Request('http://localhost/og?title=テスト&username=ユーザー')
      const res = await app.fetch(req)
      
      expect(res.status).toBe(200)
      expect(res.headers.get('Content-Type')).toBe('image/svg+xml')
      
      const content = await res.text()
      expect(content).toBe('<svg>モックSVG</svg>')
    })

    it('必須パラメータが欠けている場合、エラーを返す', async () => {
      const req = new Request('http://localhost/og')
      const res = await app.fetch(req)
      
      expect(res.status).toBe(400)
      
      const data = await res.json()
      expect(data.success).toBe(false)
      expect(data.error).toBeDefined()
    })

    it('無効なパラメータを提供した場合、エラーを返す', async () => {
      const req = new Request('http://localhost/og?title=&username=')
      const res = await app.fetch(req)
      
      expect(res.status).toBe(400)
      
      const data = await res.json()
      expect(data.success).toBe(false)
      expect(data.error).toBeDefined()
    })

    it('オプションパラメータを受け入れる', async () => {
      const req = new Request(
        'http://localhost/og?title=テスト&username=ユーザー&gradientFrom=%23ff0000&gradientTo=%230000ff&iconUrl=https://example.com/icon.png'
      )
      const res = await app.fetch(req)
      
      expect(res.status).toBe(200)
      expect(res.headers.get('Content-Type')).toBe('image/svg+xml')
    })
  })
}) 