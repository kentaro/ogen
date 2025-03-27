# OGen: OG画像ジェネレーター

CloudflareワーカーでOGP画像を動的に生成するサービスです。

## 特徴

- ⚡️ 高速: Honoフレームワークによる高速なレスポンス
- 🎨 複数テンプレート: 用途に合わせて選べる画像テンプレート
- 🧪 テスト完備: 単体テスト・統合テストによる安定性

## セットアップ

### 必要条件

- Node.js 18以上
- npm または yarn
- Wranglerコマンドラインツール

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/ogen.git
cd ogen

# 依存パッケージをインストール
npm install
# または
yarn install
```

### 開発サーバー起動

```bash
npm run dev
# または
yarn dev
```

### テスト実行

```bash
npm test
# または
yarn test
```

テストカバレッジを確認するには:

```bash
npm run test:coverage
# または
yarn test:coverage
```

## 使い方

### パラメーター

OG画像生成には以下のパラメーターを指定できます:

- `title`: 画像に表示するタイトル（必須）
- `username`: ユーザー名（必須）
- `template`: 使用するテンプレート（`modern` または `simple`、デフォルトは `modern`）
- `iconUrl`: アイコン画像のURL（オプション）

### リクエスト例

```
https://your-worker.yourdomain.workers.dev/og?title=素晴らしいコンテンツ&username=example_user&template=modern&iconUrl=https://example.com/icon.png
```

### テンプレート

#### Modernテンプレート

モダンでスタイリッシュなデザイン。主要コンテンツにフォーカスしています。

#### Simpleテンプレート

シンプルなデザイン。最小限の要素でクリーンな見た目を提供します。

## デプロイ

### Cloudflare Workersへのデプロイ

```bash
# wrangler.tomlを編集して設定を調整

# デプロイ実行
npm run deploy
# または
yarn deploy
```

## 技術スタック

- [Hono](https://hono.dev/): 軽量で高速なWebフレームワーク
- [Satori](https://github.com/vercel/satori): JavaScriptからSVGを生成
- [Zod](https://zod.dev/): TypeScriptファーストなバリデーション
- [Vitest](https://vitest.dev/): 次世代のテストフレームワーク

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