# OGen: OG画像ジェネレーター

CloudflareワーカーでOGP画像を動的に生成するサービスです。

## 特徴

- ⚡️ 高速: Hono＋Cloudflare Workersによる高速なレスポンス
- 🎨 カスタマイズ可能: グラデーション色を変更できるモダンなデザイン
- 🧪 テスト完備: 単体テスト・統合テストによる安定性（カバレッジ100%）

## セットアップ

### 必要条件

- Node.js 18以上
- npm
- Wranglerコマンドラインツール

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/kentaro/ogen.git
cd ogen

# 依存パッケージをインストール
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

### テスト実行

```bash
npm test
```

テストカバレッジを確認するには:

```bash
npm run test:coverage
```

## テスト構成

テストは以下のディレクトリ構造で管理されています：

```
tests/
├── integration/   # 統合テスト
│   └── index.test.ts  # アプリケーション全体の統合テスト
└── unit/         # ユニットテスト
    ├── handler.test.ts    # ハンドラー関数のテスト
    ├── og-image.test.tsx  # OGImageコンポーネントのテスト
    └── types.test.ts      # 型定義とバリデーションのテスト
```

すべてのソースコードに対して100%のテストカバレッジを達成しています。

## 使い方

### パラメーター

OG画像生成には以下のパラメーターを指定できます:

- `title`: 画像に表示するタイトル（必須）
- `username`: ユーザー名（必須）
- `gradientFrom`: グラデーションの開始色（デフォルトは `#EEF0FF`）
- `gradientTo`: グラデーションの終了色（デフォルトは `#FFF0F8`）
- `iconUrl`: アイコン画像のURL（オプション）

### リクエスト例

#### アイコン付きリクエスト（実際の利用例）：

[![](https://ogen.kentarok.workers.dev/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92Hono%EF%BC%8BCloudflare%20Workers%E3%81%A7%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81%20&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg)](https://ogen.kentarok.workers.dev/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92Hono%EF%BC%8BCloudflare%20Workers%E3%81%A7%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81%20&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg)

#### オレンジ系グラデーション：

[![](https://ogen.kentarok.workers.dev/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92Hono%EF%BC%8BCloudflare%20Workers%E3%81%A7%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81%20&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg&gradientFrom=%23FF8C00&gradientTo=%23FFA500)](https://ogen.kentarok.workers.dev/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92Hono%EF%BC%8BCloudflare%20Workers%E3%81%A7%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81%20&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg&gradientFrom=%23FF8C00&gradientTo=%23FFA500)

#### 水色系グラデーション：

[![](https://ogen.kentarok.workers.dev/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92Hono%EF%BC%8BCloudflare%20Workers%E3%81%A7%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81%20&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg&gradientFrom=%2300C6FF&gradientTo=%230072FF)](https://ogen.kentarok.workers.dev/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92Hono%EF%BC%8BCloudflare%20Workers%E3%81%A7%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81%20&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg&gradientFrom=%2300C6FF&gradientTo=%230072FF)

色コードは URL エンコードする必要があります：

- `%233177EE` は `#3177EE`

## デザイン

OGP画像のデザインは白い角丸のコンテンツエリアと、カスタマイズ可能なグラデーションの枠で構成されています。

- モダンでスタイリッシュなデザイン
- 角丸とシャドウで立体感を表現
- タイトルとユーザー名を大きく表示
- アイコン画像（指定した場合）をユーザー名の横に表示

## デプロイ

### Cloudflare Workersへのデプロイ

```bash
# wrangler.tomlを編集して設定を調整

# デプロイ実行
npm run deploy
```

## 技術スタック

- [Hono](https://hono.dev/) v4.4.1: 軽量で高速なWebフレームワーク
- [Satori](https://github.com/vercel/satori) v0.10.13: JavaScriptからSVGを生成
- [Zod](https://zod.dev/) v3.22.4: TypeScriptファーストなバリデーション
- [Vitest](https://vitest.dev/) v1.4.0: 次世代のテストフレームワーク

## ライセンス

MIT 

## GitHub Actionsによるデプロイ

このプロジェクトはGitHub Actionsを使用して自動デプロイができます。以下の手順でセットアップしてください：

1. Cloudflare Workers APIトークンの取得
   - [Cloudflareダッシュボード](https://dash.cloudflare.com/)にアクセス
   - API Tokensページから、適切な権限を持つトークンを作成

2. GitHub Secretsの設定
   - リポジトリの「Settings」→「Secrets and variables」→「Actions」を開く
   - 以下の2つのシークレットを追加:
     - `CF_API_TOKEN`: CloudflareのAPIトークン
     - `CF_ACCOUNT_ID`: CloudflareのアカウントID

3. GitHubにプッシュ
   - mainブランチにプッシュすると自動的にテストが実行され、成功した場合にデプロイされます 