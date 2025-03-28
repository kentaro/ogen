# OGen: OG画像ジェネレーター

VercelでOGP画像を動的に生成するサービスです。

## 特徴

- ⚡️ 高速: Vercel Edge FunctionとVercel OGライブラリによる高速なレスポンス
- 🎨 カスタマイズ可能: グラデーション色を変更できるモダンなデザイン
- 🖼️ PNG出力: 高品質なPNG画像を生成
- 🧪 テスト完備: 単体テスト・統合テストによる安定性

## セットアップ

### 必要条件

- Node.js 18以上
- npm

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

## 使い方

### パラメーター

OG画像生成には以下のパラメーターを指定できます:

- `title`: 画像に表示するタイトル（必須）
- `username`: ユーザー名（必須）
- `gradientFrom`: グラデーションの開始色（デフォルトは `#EEF0FF`）
- `gradientTo`: グラデーションの終了色（デフォルトは `#FFF0F8`）
- `iconUrl`: アイコン画像のURL（オプション）

### リクエスト例

#### 基本的な使い方:

```
https://your-vercel-domain.vercel.app/og?title=タイトル&username=ユーザー名
```

#### アイコン付きリクエスト:

```
https://your-vercel-domain.vercel.app/og?title=タイトル&username=ユーザー名&iconUrl=https://example.com/icon.png
```

#### カスタムグラデーション:

```
https://your-vercel-domain.vercel.app/og?title=タイトル&username=ユーザー名&gradientFrom=%23FF8C00&gradientTo=%23FFA500
```

色コードは URL エンコードする必要があります：

- `%233177EE` は `#3177EE`

## デザイン

OGP画像のデザインは白い角丸のコンテンツエリアと、カスタマイズ可能なグラデーションの枠で構成されています。

- モダンでスタイリッシュなデザイン
- 角丸とシャドウで立体感を表現
- タイトルとユーザー名を大きく表示
- アイコン画像（指定した場合）をユーザー名の横に表示

## デプロイ

### Vercelへのデプロイ

このプロジェクトはVercelにデプロイできます。以下の手順で行ってください：

1. Vercel CLIをインストール（オプション）
   ```bash
   npm i -g vercel
   ```

2. デプロイを実行
   ```bash
   vercel
   ```

または、Vercelダッシュボードからリポジトリを接続してデプロイすることもできます。

## 技術スタック

- [Next.js](https://nextjs.org/): Reactベースのフレームワーク
- [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation): Vercelの公式OG画像生成ライブラリ
- [Zod](https://zod.dev/) v3.22.4: TypeScriptファーストなバリデーション
- [Vitest](https://vitest.dev/) v1.4.0: 次世代のテストフレームワーク

## ライセンス

MIT 