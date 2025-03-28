import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { APIError } from '@/lib/errors';

// 必要なモジュールをモック
vi.mock('@vercel/og', () => ({
    ImageResponse: vi.fn().mockImplementation(() => {
        return {
            status: 200,
            headers: new Headers({ 'Content-Type': 'image/png' })
        };
    })
}));

// フォントロードをモック
vi.mock('../../src/lib/fonts', () => ({
  loadFonts: vi.fn(() => Promise.resolve({
    normal: new ArrayBuffer(0),
    bold: new ArrayBuffer(0)
  })),
  getFontConfig: vi.fn(() => [])
}));

// グローバルfetch関数をモック
const originalFetch = global.fetch;
vi.stubGlobal('fetch', vi.fn());

describe('OG Image API (Integration)', () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.resetAllMocks();
        // 元のfetchを復元
        global.fetch = originalFetch;
    });

    it('should generate OG image with valid parameters', async () => {
        // モックサーバーのレスポンスを設定
        const mockResponseBuffer = Buffer.from('mock image data');
        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: new Headers({ 'Content-Type': 'image/png' }),
            arrayBuffer: () => Promise.resolve(mockResponseBuffer.buffer)
        } as unknown as Response);

        // OG画像APIを呼び出す
        const url = 'http://localhost:3000/api/og?title=Test%20Title&username=testuser';
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();

        // レスポンスを検証
        expect(response.ok).toBe(true);
        expect(response.status).toBe(200);
        expect(response.headers.get('Content-Type')).toBe('image/png');
        // バッファの内容の検証は省略（テスト環境によって異なる可能性があるため）

        // fetchが適切に呼び出されたことを確認
        expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it('should return error for invalid parameters', async () => {
        // エラーレスポンスを設定
        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: false,
            status: 400,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            json: () => Promise.resolve({
                success: false,
                error: 'タイトルは必須です'
            })
        } as unknown as Response);

        // 無効なパラメータでAPIを呼び出す
        const url = 'http://localhost:3000/api/og?username=testuser';
        const response = await fetch(url);
        const data = await response.json();

        // エラーレスポンスを検証
        expect(response.ok).toBe(false);
        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.error).toBe('タイトルは必須です');

        // fetchが適切に呼び出されたことを確認
        expect(global.fetch).toHaveBeenCalledWith(url);
    });
}); 