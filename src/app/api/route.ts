import { NextRequest, NextResponse } from 'next/server';
import { handleAPIError, APIError } from '@/lib/errors';

/**
 * メインAPIルートハンドラ
 * 
 * OG画像生成APIへのリダイレクトを行います。
 * クエリパラメータなしでアクセスされた場合、デフォルトパラメータを設定してリダイレクトします。
 * 
 * @param request NextRequestオブジェクト
 * @returns リダイレクトレスポンス
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    // リクエストのバリデーション
    if (!request || !request.url) {
      throw new APIError('無効なリクエストです', 400);
    }

    // リクエストURLをパース
    const url = new URL(request.url);
    
    // OG画像APIへのリダイレクト先URLを構築
    const redirectUrl = new URL('/api/og', url.origin);
    
    // デフォルトのクエリパラメータを設定
    redirectUrl.searchParams.set('title', 'OGen');
    redirectUrl.searchParams.set('username', 'example');
    
    // リダイレクトレスポンスを返す
    return NextResponse.redirect(redirectUrl, 307);
  } catch (error) {
    // エラーをログに記録
    console.error('[API Route]', error);
    
    // エラーハンドリング
    return handleAPIError(error);
  }
} 