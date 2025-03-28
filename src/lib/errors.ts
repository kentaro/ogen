import { ValidationError } from '@/models/og';
import { ZodError } from 'zod';

/**
 * API専用エラークラス
 * 
 * HttpStatusとエラーメッセージ、詳細情報を持つカスタムエラークラス
 */
export class APIError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, status: number = 500, details?: unknown) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;

    // Errorクラスをプロトタイプチェーンに正しく設定
    Object.setPrototypeOf(this, APIError.prototype);
  }

  /**
   * JSON形式に変換
   */
  toJSON(): Record<string, unknown> {
    return {
      error: this.message,
      status: this.status,
      details: this.details
    };
  }
}

/**
 * ZodErrorをバリデーションエラー配列に変換
 */
export function formatZodError(error: ZodError): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const issue of error.issues) {
    errors.push({
      code: issue.code,
      message: issue.message,
      field: issue.path.join('.')
    });
  }

  return errors;
}

/**
 * API用の統一エラーハンドラ
 * 
 * 様々なエラー型を適切なHTTPレスポンスに変換
 */
export function handleAPIError(error: unknown): Response {
  // ログにエラー詳細を記録
  console.error('[API Error Handler]', error);

  // 専用エラークラスの場合
  if (error instanceof APIError) {
    let responseBody;
    try {
      responseBody = JSON.stringify({
        success: false,
        error: error.message,
        details: error.details
      });
    } catch (e) {
      // 循環参照などがある場合は詳細情報を除外
      responseBody = JSON.stringify({
        success: false,
        error: error.message
      });
    }

    return new Response(
      responseBody,
      {
        status: error.status,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }

  // Zodバリデーションエラーの場合
  if (error instanceof ZodError) {
    const validationErrors = formatZodError(error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'バリデーションエラー',
        details: validationErrors
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }

  // その他予期せぬエラーの場合
  const errorMessage = error instanceof Error 
    ? error.message 
    : '不明なエラーが発生しました';

  return new Response(
    JSON.stringify({
      success: false,
      error: errorMessage,
      message: 'サーバーエラーが発生しました'
    }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }
  );
} 