import { ReactNode } from 'react';

export const metadata = {
    title: 'OGen - OG画像ジェネレーター',
    description: 'OGP画像を動的に生成するVercelサービス',
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
} 