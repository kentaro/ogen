import { Fonts, FontConfig } from '@/models/og';
import fs from 'fs/promises';
import path from 'path';
import { APIError } from './errors';

// フォントファイルパス
const FONT_PATHS = {
  normal: path.join(process.cwd(), 'public/fonts/noto-sans-jp-400.woff'),
  bold: path.join(process.cwd(), 'public/fonts/noto-sans-jp-700.woff')
} as const;

/**
 * フォントをロードする - メモリ使用とパフォーマンスを最適化
 * @throws {APIError} フォントファイルの読み込みに失敗した場合
 * @returns {Promise<Fonts>} 正常にロードされたフォントデータ
 */
export async function loadFonts(): Promise<Fonts> {
  try {
    // フォントファイルの存在確認
    await Promise.all([
      fs.access(FONT_PATHS.normal),
      fs.access(FONT_PATHS.bold)
    ]).catch(() => {
      throw new APIError(
        'フォントファイルが見つかりません',
        500,
        'Font files missing in public/fonts directory'
      );
    });

    // ローカルファイルシステムからフォントを並列読み込み
    const [fontNormal, fontBold] = await Promise.all([
      fs.readFile(FONT_PATHS.normal),
      fs.readFile(FONT_PATHS.bold)
    ]);

    return {
      normal: fontNormal,
      bold: fontBold
    };
  } catch (error) {
    // エラーの詳細をログに記録
    if (error instanceof APIError) {
      throw error;
    }
    
    console.error('[Font Loader]', error);
    throw new APIError(
      'フォントの読み込みに失敗しました', 
      500,
      error instanceof Error ? error.message : String(error)
    );
  }
}

/**
 * フォント設定を取得 - OG画像生成用
 * @param {Fonts} fonts ロードされたフォントデータ
 * @returns {FontConfig[]} ImageResponseで使用可能なフォント設定
 */
export function getFontConfig(fonts: Fonts): FontConfig[] {
  return [
    {
      name: 'Noto Sans JP',
      data: fonts.normal,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Noto Sans JP',
      data: fonts.bold,
      weight: 700,
      style: 'normal',
    },
  ];
} 