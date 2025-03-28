import Link from 'next/link';

export default function Home() {
    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <main>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>OGen - OG画像ジェネレーター</h1>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    VercelでOGP画像を動的に生成するサービスです。シンプルにパラメータを指定するだけで、美しいOGP画像を生成できます。
                </p>

                <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>使い方</h2>
                <p style={{ marginBottom: '1rem' }}>
                    以下のURLにパラメータを付けてアクセスするだけで、OGP画像を生成できます：
                </p>

                <div style={{
                    backgroundColor: '#f4f4f4',
                    padding: '1rem',
                    borderRadius: '8px',
                    overflow: 'auto'
                }}>
                    <code>https://{process.env.NEXT_PUBLIC_VERCEL_URL || 'your-domain.vercel.app'}/api/og?title=タイトル&username=ユーザー名</code>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>パラメータ</h3>
                <ul style={{ lineHeight: 1.6 }}>
                    <li><strong>title</strong>: 画像に表示するタイトル（必須）</li>
                    <li><strong>username</strong>: ユーザー名（必須）</li>
                    <li><strong>gradientFrom</strong>: グラデーションの開始色（デフォルト: #EEF0FF）</li>
                    <li><strong>gradientTo</strong>: グラデーションの終了色（デフォルト: #FFF0F8）</li>
                    <li><strong>iconUrl</strong>: アイコン画像のURL（オプション）</li>
                </ul>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>サンプル</h3>
                <div style={{ marginBottom: '2rem' }}>
                    <Link
                        href="/api/og?title=OGenでOGP画像を簡単生成&username=サンプルユーザー"
                        target="_blank"
                        style={{ color: '#3177EE', textDecoration: 'underline' }}
                    >
                        基本的なOGP画像を表示
                    </Link>
                </div>
            </main>

            <footer style={{ marginTop: '3rem', borderTop: '1px solid #eaeaea', paddingTop: '2rem' }}>
                <p>
                    &copy; {new Date().getFullYear()} OGen -
                    <a
                        href="https://github.com/kentaro/ogen"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#3177EE' }}
                    >
                        GitHub
                    </a>
                </p>
            </footer>
        </div>
    );
} 