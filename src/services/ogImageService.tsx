import { ImageResponse } from '@vercel/og';
import { OGImageParams, ogImageParamsSchema, FontConfig } from '@/models/og';
import { loadFonts, getFontConfig } from '@/lib/fonts';
import { OGImage } from '@/components/og/OGImage';
import { z } from 'zod';
import React from 'react';
import { APIError } from '@/lib/errors';

/**
 * URLパラメータからOG画像パラメータを抽出して検証
 * @param url URL
 * @returns 検証結果
 * @throws {APIError} URLパラメータの解析に失敗した場合
 */
export function parseOGImageParams(url: URL): z.SafeParseReturnType<unknown, OGImageParams> {
    if (!url || !(url instanceof URL)) {
        throw new APIError('URLが無効です', 400);
    }

    try {
        const params = Object.fromEntries(url.searchParams);

        // デフォルト値を設定
        const paramsWithDefaults = {
            title: params.title ?? null,
            username: params.username ?? null,
            gradientFrom: params.gradientFrom || '#EEF0FF',
            gradientTo: params.gradientTo || '#FFF0F8',
            iconUrl: params.iconUrl || null,
        };

        // Zodスキーマでバリデーション
        return ogImageParamsSchema.safeParse(paramsWithDefaults);
    } catch (error) {
        console.error('[URL Parser]', error);
        throw new APIError(
            'URLパラメータの解析に失敗しました',
            400,
            error instanceof Error ? error.message : String(error)
        );
    }
}

/**
 * OG画像生成のキャッシュ設定
 */
const cacheConfig = {
    headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    }
} as const;

/**
 * OG画像の基本設定
 */
const imageConfig = {
    width: 1200,
    height: 630,
} as const;

/**
 * OG画像を生成する
 * @param params バリデーション済みのOG画像パラメータ
 * @returns 生成されたOG画像のImageResponse
 * @throws {APIError} 画像生成に失敗した場合
 */
export async function generateOGImage(params: OGImageParams): Promise<ImageResponse> {
    try {
        // パラメータのバリデーション
        if (!params || typeof params !== 'object') {
            throw new Error('無効なパラメータ形式です');
        }

        // フォントをロード
        const fonts = await loadFonts();
        const fontConfig = getFontConfig(fonts);

        // OG画像用のコンポーネントをレンダリング
        return new ImageResponse(
            <OGImage {...params} />,
            {
                ...imageConfig,
                fonts: fontConfig as any, // 型互換性のためにany型を使用
                headers: cacheConfig.headers
            }
        );
    } catch (error) {
        // 発生したエラーのログを取得
        console.error('[OG Image Generator]', error);

        // エラーの種類に応じて適切なAPIErrorに変換
        if (error instanceof APIError) {
            throw error; // 既にAPIErrorの場合はそのまま再スロー
        }

        throw new APIError(
            'OG画像の生成に失敗しました',
            500,
            error instanceof Error ? error.message : String(error)
        );
    }
} 