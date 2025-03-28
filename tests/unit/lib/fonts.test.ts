import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { APIError } from '@/lib/errors';

// 実際のモジュールを先にインポート
import fs from 'fs/promises';
import path from 'path';
import { loadFonts, getFontConfig } from '@/lib/fonts';
import { FontConfig } from '@/models/og';

// モックの設定
vi.mock('fs/promises');
vi.mock('path');

describe('Font Loader', () => {
  // テスト用のバッファ
  const mockFontBuffer = Buffer.from('mock font data');
  const fontPath = '/Users/antipop/src/github.com/kentaro/ogen/public/fonts';
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // fsのメソッドをモック
    fs.access = vi.fn().mockResolvedValue(undefined);
    fs.readFile = vi.fn().mockResolvedValue(mockFontBuffer);
    
    // pathのメソッドをモック
    path.join = vi.fn().mockImplementation((_cwd, ...rest) => {
      return [fontPath, ...rest].join('/');
    });
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });
  
  describe('loadFonts', () => {
    it('should load fonts successfully', async () => {
      // フォントの読み込みをテスト
      const fonts = await loadFonts();
      
      // ファイルアクセスの確認
      expect(fs.access).toHaveBeenCalledTimes(2);
      
      // ファイル読み込みの確認
      expect(fs.readFile).toHaveBeenCalledTimes(2);
      
      // 結果の検証
      expect(fonts).toHaveProperty('normal');
      expect(fonts).toHaveProperty('bold');
      expect(fonts.normal).toBe(mockFontBuffer);
      expect(fonts.bold).toBe(mockFontBuffer);
    });
    
    it('should throw APIError when fonts are missing', async () => {
      // ファイルが存在しないケースをモック
      fs.access = vi.fn().mockRejectedValue(new Error('File not found'));
      
      // エラーがスローされることを確認
      await expect(loadFonts()).rejects.toThrow(APIError);
      await expect(loadFonts()).rejects.toThrow('フォントファイルが見つかりません');
      
      // アクセスチェックが行われたが、読み込みは行われていないことを確認
      expect(fs.access).toHaveBeenCalled();
      expect(fs.readFile).not.toHaveBeenCalled();
    });
    
    it('should throw APIError when file read fails', async () => {
      // ファイル読み込みが失敗するケースをモック
      fs.readFile = vi.fn().mockRejectedValue(new Error('Read error'));
      
      // エラーがスローされることを確認
      await expect(loadFonts()).rejects.toThrow(APIError);
      await expect(loadFonts()).rejects.toThrow('フォントの読み込みに失敗しました');
      
      // アクセスチェックは成功し、読み込みは失敗したことを確認
      expect(fs.access).toHaveBeenCalled();
      expect(fs.readFile).toHaveBeenCalled();
    });
    
    it('should re-throw APIError as is', async () => {
      // APIErrorが直接スローされる場合
      const apiError = new APIError('フォントファイルが見つかりません', 500);
      fs.access = vi.fn().mockRejectedValue(apiError);
      
      // 同じタイプのエラーがスローされることを確認
      await expect(loadFonts()).rejects.toThrow(APIError);
      await expect(loadFonts()).rejects.toThrow('フォントファイルが見つかりません');
      
      // アクセスチェックが行われたことを確認
      expect(fs.access).toHaveBeenCalled();
    });
  });
  
  describe('getFontConfig', () => {
    it('should return correct font configuration', () => {
      // テスト用のフォントデータ
      const mockFonts = {
        normal: Buffer.from('normal font'),
        bold: Buffer.from('bold font')
      };
      
      // フォント設定の取得
      const config = getFontConfig(mockFonts);
      
      // 結果の検証
      expect(config).toHaveLength(2);
      
      // 各フォント設定の確認
      expect(config[0]).toEqual({
        name: 'Noto Sans JP',
        data: mockFonts.normal,
        weight: 400,
        style: 'normal'
      } as FontConfig);
      
      expect(config[1]).toEqual({
        name: 'Noto Sans JP',
        data: mockFonts.bold,
        weight: 700,
        style: 'normal'
      } as FontConfig);
    });
  });
}); 