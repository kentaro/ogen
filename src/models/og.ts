import { z } from 'zod';

/**
 * OG画像のパラメータスキーマ定義
 */
export const ogImageParamsSchema = z.object({
  /** 画像のタイトル (必須) */
  title: z.string().min(1, { message: 'タイトルは必須です' }).max(100, { message: 'タイトルは100文字以内にしてください' }),
  
  /** ユーザー名 (必須) */
  username: z.string().min(1, { message: 'ユーザー名は必須です' }).max(50, { message: 'ユーザー名は50文字以内にしてください' }),
  
  /** グラデーション開始色 (オプション, デフォルト: #EEF0FF) */
  gradientFrom: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { 
    message: '有効なカラーコードを指定してください（例: #EEF0FF）' 
  }).default('#EEF0FF'),
  
  /** グラデーション終了色 (オプション, デフォルト: #FFF0F8) */
  gradientTo: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { 
    message: '有効なカラーコードを指定してください（例: #FFF0F8）' 
  }).default('#FFF0F8'),
  
  /** ユーザーアイコンURL (オプション) */
  iconUrl: z.union([
    z.string().url({ message: '有効なURLを指定してください' }).max(500, { 
      message: 'URLが長すぎます（500文字以内）' 
    }), 
    z.null(), 
    z.undefined()
  ]).optional(),
});

/** OG画像パラメータの型 */
export type OGImageParams = z.infer<typeof ogImageParamsSchema>;

/**
 * API共通レスポンス型
 */
export type ApiResponse<T = unknown> = 
  | { success: true; data: T }
  | { success: false; error: string; details?: unknown; status?: number };

/**
 * バリデーションエラー型
 */
export interface ValidationError {
  code: string;
  message: string;
  field?: string;
}

/**
 * フォント設定の型定義
 * 
 * ArrayBufferまたはBuffer（Node.js固有の型）を受け入れるための型です。
 * getFontConfig関数でImageResponseに渡されるフォントデータ用。
 */
export interface Fonts {
  normal: ArrayBuffer | Buffer;
  bold: ArrayBuffer | Buffer;
}

/**
 * フォント設定の型
 * ImageResponseのfontsパラメータに必要な形式
 */
export interface FontConfig {
  name: string;
  data: ArrayBuffer | Buffer;
  weight: 400 | 700;
  style: 'normal' | 'italic';
} 