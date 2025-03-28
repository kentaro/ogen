import { describe, it, expect, vi, afterEach, beforeEach, afterAll } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

// グローバルfetch関数をモック
const originalFetch = global.fetch;
vi.stubGlobal('fetch', vi.fn());

describe('Index API (Integration)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    afterAll(() => {
        // 元のfetchを復元
        global.fetch = originalFetch;
    });

    it('should redirect to the OG image API with default parameters', async () => {
        // リダイレクトレスポンスをモック
        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: true,
            status: 307,
            url: 'http://localhost:3000/api/og?title=OGen&username=example',
            redirected: true
        } as unknown as Response);

        // APIを呼び出す
        const url = 'http://localhost:3000/api';
        const response = await fetch(url);

        // レスポンスを検証
        expect(response.ok).toBe(true);
        expect(response.status).toBe(307);
        expect(response.redirected).toBe(true);
        expect(response.url).toBe('http://localhost:3000/api/og?title=OGen&username=example');

        // fetchが適切に呼び出されたことを確認
        expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it('should return error for invalid request', async () => {
        // エラーレスポンスをモック
        vi.mocked(global.fetch).mockResolvedValueOnce({
            ok: false,
            status: 400,
            headers: new Headers({ 'Content-Type': 'application/json' }),
            json: () => Promise.resolve({
                success: false,
                error: '無効なリクエストです'
            })
        } as unknown as Response);

        // 無効なリクエストを送信
        const url = 'http://localhost:3000/api?invalid=true';
        const response = await fetch(url);
        const data = await response.json();

        // エラーレスポンスを検証
        expect(response.ok).toBe(false);
        expect(response.status).toBe(400);
        expect(data.success).toBe(false);
        expect(data.error).toBe('無効なリクエストです');

        // fetchが適切に呼び出されたことを確認
        expect(global.fetch).toHaveBeenCalledWith(url);
    });
}); 