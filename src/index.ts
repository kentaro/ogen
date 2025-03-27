import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import satori from 'satori'
import { ogImageParamsSchema } from './types'
import { getTemplate } from './templates/registry'

// フォントデータのキャッシュ
let notoSansRegular: ArrayBuffer | undefined
let notoSansBold: ArrayBuffer | undefined

// satoriのFontOptions型を定義
type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type FontStyle = 'normal' | 'italic'

interface Font {
  name: string
  data: ArrayBuffer
  weight?: FontWeight
  style?: FontStyle
}

const app = new Hono()

// CORSを設定
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'OPTIONS'],
}))

// 静的ファイルの提供
app.get('/static/*', serveStatic({ 
  root: './',
  manifest: {} // 空のマニフェストを追加
}))

// ルートへのアクセスをリダイレクト
app.get('/', (c) => {
  return c.redirect('/og?title=OGen&username=example')
})

// フォントデータを取得する関数
async function loadFonts(): Promise<Font[]> {
  if (!notoSansRegular) {
    notoSansRegular = await fetch(
      'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/files/noto-sans-jp-all-400-normal.woff'
    ).then((res) => res.arrayBuffer())
  }

  if (!notoSansBold) {
    notoSansBold = await fetch(
      'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/files/noto-sans-jp-all-700-normal.woff'
    ).then((res) => res.arrayBuffer())
  }

  // フォント設定を返す
  return [
    {
      name: 'Noto Sans JP',
      data: notoSansRegular!,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Noto Sans JP',
      data: notoSansBold!,
      weight: 700,
      style: 'normal',
    },
  ]
}

// OG画像生成エンドポイント
app.get('/og', async (c) => {
  try {
    // クエリパラメータを取得
    const query = c.req.query()
    
    // バリデーション
    const result = ogImageParamsSchema.safeParse({
      title: query.title,
      username: query.username,
      gradientFrom: query.gradientFrom,
      gradientTo: query.gradientTo,
      iconUrl: query.iconUrl
    })
    
    if (!result.success) {
      return c.json({
        success: false,
        error: result.error.format()
      }, 400)
    }
    
    const params = result.data
    
    // テンプレートを取得
    const template = getTemplate()
    
    // フォントをロード
    const fonts = await loadFonts()
    
    // SVGの生成
    const svg = await satori(
      template(params),
      {
        width: 1200,
        height: 630,
        fonts,
      }
    )
    
    // SVGをレスポンスとして返す
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (e) {
    console.error(e)
    return c.json({
      success: false,
      error: 'Internal Server Error'
    }, 500)
  }
})

export default app 