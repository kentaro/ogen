import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { generateOGImage } from './handler'

const app = new Hono()

// CORSを設定
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'OPTIONS'],
}))

// ルートへのアクセスをリダイレクト
app.get('/', (c) => {
  return c.redirect('/og?title=OGen&username=example')
})

// OG画像生成エンドポイント
app.get('/og', generateOGImage)

export default app 