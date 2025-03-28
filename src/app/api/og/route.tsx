import { NextRequest } from 'next/server';
import { parseOGImageParams, generateOGImage } from '@/services/ogImageService';
import { handleAPIError, APIError } from '@/lib/errors';

/**
 * OG画像生成APIハンドラ
 * 
 * リクエストURLからパラメータを解析し、OG画像を動的に生成します。
 * 失敗した場合は適切なエラーレスポンスを返します。
 * 
 * @param req リクエスト
 * @returns OG画像またはエラーレスポンス
 */
export async function GET(req: NextRequest): Promise<Response> {
    try {
        // リクエストURLを取得
        if (!req || !req.url) {
            throw new APIError('無効なリクエストです', 400);
        }

        const url = new URL(req.url);

        // パラメータを解析
        const result = parseOGImageParams(url);

        // バリデーション
        if (!result.success) {
            throw new APIError(
                'パラメータが無効です',
                400,
                result.error.format()
            );
        }

        // OG画像の生成
        const imageResponse = await generateOGImage(result.data);
        return imageResponse;
    } catch (error) {
        // エラーの詳細をログに記録
        console.error('[OG API]', error);

        // エラーハンドリング
        return handleAPIError(error);
    }
} 