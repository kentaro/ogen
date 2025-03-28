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

[![](https://ogen-sigma.vercel.app/api/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg)](https://ogen-sigma.vercel.app/api/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg)

[![](https://ogen-sigma.vercel.app/api/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg&gradientFrom=%2300C6FF&gradientTo=%230072FF)](https://ogen-sigma.vercel.app/api/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg&gradientFrom=%2300C6FF&gradientTo=%230072FF)

[![](https://ogen-sigma.vercel.app/api/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg&&gradientFrom=%23FF8C00&gradientTo=%23FFA500)](https://ogen-sigma.vercel.app/api/og?title=og:image%E3%82%92%E5%8B%95%E7%9A%84%E3%81%AB%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8BWeb%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%9F%EF%BC%81&username=%E6%A0%97%E6%9E%97%E5%81%A5%E5%A4%AA%E9%83%8E&iconUrl=https://pbs.twimg.com/profile_images/1893532407988367361/5EfifO80_400x400.jpg&&gradientFrom=%23FF8C00&gradientTo=%23FFA500)

色コードは URL エンコードする必要があります：

- 例: `%2300C6FF` は `#00C6FF`

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
- [Zod](https://zod.dev/): TypeScriptファーストなバリデーション
- [Vitest](https://vitest.dev/): 次世代のテストフレームワーク

## ライセンス

MIT 
