import React from 'react';
import { OGImageParams } from '@/models/og';
import { styles } from './styles';

/**
 * 安全なHTML属性値の作成 - XSS対策
 * HTMLタグや危険な属性を削除します
 */
function safeAttr(value: string): string {
    // タグと属性を削除
    return value
        .replace(/<[^>]*>/g, '') // すべてのHTMLタグを削除
        .replace(/onerror\s*=\s*['"](.*?)['"]/gi, '') // onerror属性を削除
        .replace(/javascript\s*:/gi, '') // javascriptプロトコルを削除
        .replace(/on\w+\s*=\s*['"](.*?)['"]/gi, ''); // すべてのイベントハンドラを削除
}

/**
 * 有効なカラーコードかチェック
 */
function isValidColor(color: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * タイトルテキストを処理し、最大48文字に制限する
 * 長すぎる場合は47文字にして「...」で省略する
 */
function formatTitle(title: string): string {
    const MAX_CHARS = 48;

    // 48文字を超える場合は47文字で切って「...」を付ける
    if (title.length > MAX_CHARS) {
        return title.slice(0, MAX_CHARS - 1) + '...';
    }

    return title;
}

/**
 * OGP画像用のReactコンポーネント
 * 
 * このコンポーネントは@vercel/ogのImageResponseによってレンダリングされ、
 * PNG画像として返されます。
 * 
 * @param props OG画像パラメータ
 * @returns React要素
 */
export function OGImage({
    title,
    username,
    gradientFrom,
    gradientTo,
    iconUrl,
}: OGImageParams): React.ReactElement {
    // 文字列の安全性を確保（XSS対策）
    const safeTitle = safeAttr(title);
    const formattedTitle = formatTitle(safeTitle);
    const safeUsername = safeAttr(username);
    const safeGradientFrom = isValidColor(gradientFrom)
        ? gradientFrom
        : '#EEF0FF';
    const safeGradientTo = isValidColor(gradientTo)
        ? gradientTo
        : '#FFF0F8';
    const safeIconUrl = iconUrl && typeof iconUrl === 'string' ? safeAttr(iconUrl) : null;

    return (
        <div
            style={{
                ...styles.container,
                background: `linear-gradient(to left, ${safeGradientFrom}, ${safeGradientTo})`
            }}
        >
            <div style={styles.card}>
                {/* メインコンテンツ */}
                <div style={{
                    ...styles.content,
                    zIndex: 1
                }}>
                    {/* タイトルエリア */}
                    <div style={{ display: 'flex' }}>
                        <div style={styles.title}>
                            {formattedTitle}
                        </div>
                    </div>

                    {/* ユーザー情報と Powered by */}
                    <div style={{ ...styles.bottom, display: 'flex' }}>
                        {/* ユーザー情報 */}
                        <div style={{ ...styles.userInfo, display: 'flex' }}>
                            {safeIconUrl && (
                                <img
                                    src={safeIconUrl}
                                    width="80"
                                    height="80"
                                    alt={`${safeUsername}'s avatar`}
                                    style={styles.avatar}
                                />
                            )}
                            <div style={styles.username}>
                                {safeUsername}
                            </div>
                        </div>

                        {/* Powered by */}
                        <div style={{ ...styles.poweredBy, display: 'flex' }}>
                            Powered by <span style={styles.brand}>kentaro/ogen</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 