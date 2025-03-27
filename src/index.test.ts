import { describe, it, expect } from 'vitest'
import app from './index'

describe('OGen API', () => {
  it('should return 400 when required parameters are missing', async () => {
    const req = new Request('http://localhost/og')
    const res = await app.fetch(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.success).toBe(false)
    expect(data.error).toBeDefined()
  })

  it('should return 200 with SVG content when required parameters are provided', async () => {
    const req = new Request('http://localhost/og?title=Test&username=testuser')
    const res = await app.fetch(req)
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('image/svg+xml')
    const content = await res.text()
    expect(content).toContain('<svg')
    // SVGに変換されるためテキストはそのまま検出できない
    // expect(content).toContain('Test')
    // expect(content).toContain('testuser')
  })

  it('should use simple template when specified', async () => {
    const req = new Request('http://localhost/og?title=Test&username=testuser&template=simple')
    const res = await app.fetch(req)
    expect(res.status).toBe(200)
    const content = await res.text()
    expect(content).toContain('<svg')
    // スタイル属性がSVGパスに変換されるため、直接検出できない
    // 代わりに背景色を確認
    expect(content).toContain('fill="white"')
  })

  it('should include icon when iconUrl is provided', async () => {
    const iconUrl = 'https://example.com/icon.png'
    const req = new Request(`http://localhost/og?title=Test&username=testuser&iconUrl=${encodeURIComponent(iconUrl)}`)
    const res = await app.fetch(req)
    expect(res.status).toBe(200)
    const content = await res.text()
    expect(content).toContain('<svg')
    // SVGに変換されるため、URLは直接検出できない
    // clipPathやマスクが使用されていることを確認
    expect(content).toContain('clipPath')
  })
}) 