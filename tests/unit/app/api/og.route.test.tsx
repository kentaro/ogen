import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '@/app/api/og/route';
import { parseOGImageParams, generateOGImage } from '@/services/ogImageService';
import { handleAPIError, APIError } from '@/lib/errors';
import { ImageResponse } from '@vercel/og';

// 必要なモジュールをモック
vi.mock('@/services/ogImageService', () => ({
    parseOGImageParams: vi.fn(),
    generateOGImage: vi.fn()
}));

vi.mock('@/lib/errors', () => ({
    handleAPIError: vi.fn(),
    APIError: class MockAPIError extends Error {
        constructor(message: string, public status: number = 500, public details?: unknown) {
            super(message);
            this.name = 'APIError';
        }
    }
}));

vi.mock('@vercel/og', () => ({
    ImageResponse: vi.fn()
}));

describe('OG Image API Route', () => {
    let mockImageResponse: ImageResponse;

    beforeEach(() => {
        vi.clearAllMocks();

        // モックレスポンスを作成
        mockImageResponse = {
            headers: new Headers({ 'Content-Type': 'image/png' }),
            status: 200,
            statusText: 'OK'
        } as unknown as ImageResponse;

        // デフォルトのモック動作を設定
        vi.mocked(parseOGImageParams).mockReturnValue({
            success: true,
            data: {
                title: 'Test Title',
                username: 'testuser',
                gradientFrom: '#EEF0FF',
                gradientTo: '#FFF0F8',
                iconUrl: null
            }
        } as any);

        vi.mocked(generateOGImage).mockResolvedValue(mockImageResponse);
        vi.mocked(handleAPIError).mockImplementation((error) => {
            return new Response(JSON.stringify({ error: error.message }), {
                status: error instanceof APIError ? error.status : 500
            });
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should generate OG image with valid parameters', async () => {
        // 有効なリクエストを作成
        const req = new NextRequest('https://example.com/api/og?title=Test&username=user');

        // APIを呼び出す
        const response = await GET(req);

        // 正しいレスポンスが返されることを確認
        expect(response).toBe(mockImageResponse);
        expect(parseOGImageParams).toHaveBeenCalledTimes(1);
        expect(generateOGImage).toHaveBeenCalledTimes(1);
        expect(handleAPIError).not.toHaveBeenCalled();
    });

    it('should handle invalid request URL', async () => {
        // 無効なリクエストを作成（URLなし）
        const req = { url: '' } as unknown as NextRequest;

        // APIを呼び出す
        await GET(req);

        // エラーハンドリングが呼び出されることを確認
        expect(handleAPIError).toHaveBeenCalledTimes(1);
        expect(parseOGImageParams).not.toHaveBeenCalled();
        expect(generateOGImage).not.toHaveBeenCalled();
    });

    it('should handle parameter validation failure', async () => {
        // 有効なリクエストを作成
        const req = new NextRequest('https://example.com/api/og');

        // バリデーション失敗のモック
        vi.mocked(parseOGImageParams).mockReturnValue({
            success: false,
            error: {
                format: () => ({ title: { _errors: ['Required'] } })
            }
        } as any);

        // APIを呼び出す
        await GET(req);

        // エラーハンドリングが呼び出されることを確認
        expect(parseOGImageParams).toHaveBeenCalledTimes(1);
        expect(handleAPIError).toHaveBeenCalledTimes(1);
        expect(generateOGImage).not.toHaveBeenCalled();
    });

    it('should handle image generation failure', async () => {
        // 有効なリクエストを作成
        const req = new NextRequest('https://example.com/api/og?title=Test&username=user');

        // 画像生成失敗のモック
        const genError = new APIError('Image generation failed', 500);
        vi.mocked(generateOGImage).mockRejectedValue(genError);

        // APIを呼び出す
        await GET(req);

        // エラーハンドリングが呼び出されることを確認
        expect(parseOGImageParams).toHaveBeenCalledTimes(1);
        expect(generateOGImage).toHaveBeenCalledTimes(1);
        expect(handleAPIError).toHaveBeenCalledTimes(1);
        expect(handleAPIError).toHaveBeenCalledWith(genError);
    });
}); 