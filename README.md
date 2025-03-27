# OGen: OG画像ジェネレーター

CloudflareワーカーでOGP画像を動的に生成するサービスです。

## 特徴

- ⚡️ 高速: Honoフレームワークによる高速なレスポンス
- 🎨 カスタマイズ可能: グラデーション色を変更できるモダンなデザイン
- 🧪 テスト完備: 単体テスト・統合テストによる安定性

## セットアップ

### 必要条件

- Node.js 18以上
- npm または yarn
- Wranglerコマンドラインツール

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/kentaro/ogen.git
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
- `gradientFrom`: グラデーションの開始色（デフォルトは `#EEF0FF`）
- `gradientTo`: グラデーションの終了色（デフォルトは `#FFF0F8`）
- `iconUrl`: アイコン画像のURL（オプション）

### リクエスト例

#### デフォルトのピンク系グラデーション：
```
https://ogen.kentarok.workers.dev/og?title=素晴らしいコンテンツ&username=example_user
```

#### 青系グラデーション：
```
https://ogen.kentarok.workers.dev/og?title=素晴らしいコンテンツ&username=example_user&gradientFrom=%233177EE&gradientTo=%235B8DEF
```

#### 水色系グラデーション：
```
https://ogen.kentarok.workers.dev/og?title=素晴らしいコンテンツ&username=example_user&gradientFrom=%2300C6FF&gradientTo=%230072FF
```

色コードは URL エンコードする必要があります：
- `%233177EE` は `#3177EE`
- `%235B8DEF` は `#5B8DEF`

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