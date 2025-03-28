import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { GET } from '@/app/api/route';
import { handleAPIError, APIError } from '@/lib/errors';

// 必要なモジュールをモック
vi.mock('next/server', () => {
  // モック用のリダイレクトレスポンスを作成
  const mockRedirectResponse = new Response(null, { status: 307 });
  
  return {
    NextRequest: vi.fn().mockImplementation((url) => {
      return { url };
    }),
    NextResponse: {
      redirect: vi.fn().mockReturnValue(mockRedirectResponse)
    }
  };
});

vi.mock('@/lib/errors', () => ({
  handleAPIError: vi.fn(),
  APIError: class MockAPIError extends Error {
    constructor(message: string, public status: number = 500, public details?: unknown) {
      super(message);
      this.name = 'APIError';
    }
  }
}));

describe('API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // デフォルトのモック動作を設定
    vi.mocked(handleAPIError).mockImplementation((error) => {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error instanceof APIError ? error.status : 500,
        headers: { 'content-type': 'text/plain;charset=UTF-8' }
      });
    });
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });
  
  it('should redirect to OG image API with default parameters', async () => {
    // 有効なリクエストを作成
    const req = new NextRequest('https://example.com/api');
    
    // APIを呼び出す
    await GET(req);
    
    // リダイレクトが呼び出されたことを確認
    expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
    
    // リダイレクト先URLのチェック
    const redirectUrl = vi.mocked(NextResponse.redirect).mock.calls[0][0];
    expect(redirectUrl instanceof URL).toBe(true);
    expect(redirectUrl.pathname).toBe('/api/og');
    expect(redirectUrl.searchParams.get('title')).toBe('OGen');
    expect(redirectUrl.searchParams.get('username')).toBe('example');
    
    // ステータスコードのチェック
    expect(vi.mocked(NextResponse.redirect).mock.calls[0][1]).toBe(307);
    
    // エラーハンドリングが呼び出されないことを確認
    expect(handleAPIError).not.toHaveBeenCalled();
  });
  
  it('should handle invalid request URL', async () => {
    // 無効なリクエストを作成（URLなし）
    const req = { url: '' } as unknown as NextRequest;
    
    // APIを呼び出す
    await GET(req);
    
    // エラーハンドリングが呼び出されることを確認
    expect(handleAPIError).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).not.toHaveBeenCalled();
    
    // エラー内容の確認
    const error = vi.mocked(handleAPIError).mock.calls[0][0];
    expect(error).toBeInstanceOf(APIError);
    expect((error as APIError).message).toBe('無効なリクエストです');
    expect((error as APIError).status).toBe(400);
  });
  
  it('should handle unexpected errors', async () => {
    // 有効なリクエストを作成
    const req = new NextRequest('https://example.com/api');
    
    // 予期せぬエラーをシミュレート
    const unexpectedError = new APIError('無効なリクエストです', 400);
    vi.mocked(NextResponse.redirect).mockImplementationOnce(() => {
      throw unexpectedError;
    });
    
    // APIを呼び出す
    await GET(req);
    
    // エラーハンドリングが呼び出されることを確認
    expect(handleAPIError).toHaveBeenCalledTimes(1);
    expect(handleAPIError).toHaveBeenCalledWith(unexpectedError);
  });
}); 