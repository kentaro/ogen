import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseOGImageParams, generateOGImage } from '@/services/ogImageService';
import { loadFonts } from '@/lib/fonts';
import { APIError } from '@/lib/errors';
import { ImageResponse } from '@vercel/og';
import React from 'react';

// モックを設定
vi.mock('@/lib/fonts', () => ({
  loadFonts: vi.fn(),
  getFontConfig: vi.fn().mockImplementation(() => [
    {
      name: 'Noto Sans JP',
      data: new ArrayBuffer(0),
      weight: 400,
      style: 'normal',
    }
  ])
}));

vi.mock('@vercel/og', () => ({
  ImageResponse: vi.fn().mockImplementation(() => ({
    status: 200,
    headers: { get: () => 'image/png' }
  }))
}));

describe('OG Image Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('parseOGImageParams', () => {
    it('should parse valid URL parameters', () => {
      // 有効なURLを作成
      const url = new URL('https://example.com/api/og?title=Test&username=tester');
      
      // パラメータ解析テスト
      const result = parseOGImageParams(url);
      
      // 結果を検証
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Test');
        expect(result.data.username).toBe('tester');
        expect(result.data.gradientFrom).toBe('#EEF0FF'); // デフォルト値
        expect(result.data.gradientTo).toBe('#FFF0F8'); // デフォルト値
        expect(result.data.iconUrl).toBeNull();
      }
    });

    it('should parse URL with all parameters', () => {
      // すべてのパラメータを含むURLを作成
      const url = new URL('https://example.com/api/og?title=Full%20Test&username=fulluser&gradientFrom=%23FF0000&gradientTo=%230000FF&iconUrl=https%3A%2F%2Fexample.com%2Favatar.png');
      
      // パラメータ解析テスト
      const result = parseOGImageParams(url);
      
      // 結果を検証
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Full Test');
        expect(result.data.username).toBe('fulluser');
        expect(result.data.gradientFrom).toBe('#FF0000');
        expect(result.data.gradientTo).toBe('#0000FF');
        expect(result.data.iconUrl).toBe('https://example.com/avatar.png');
      }
    });

    it('should fail with invalid URL structure', () => {
      // 無効なURLケース
      expect(() => parseOGImageParams(null as unknown as URL)).toThrow(APIError);
    });

    it('should handle missing required parameters', () => {
      // タイトルが欠けたURL
      const url = new URL('https://example.com/api/og?username=tester');
      
      const result = parseOGImageParams(url);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const formatted = result.error.format();
        expect(formatted.title?._errors).toBeDefined();
      }
    });
    
    it('should handle exceptions during URL parameter parsing', () => {
      // URLSearchParamsのモックを作成し例外をスローするように設定
      const mockUrl = {
        searchParams: {
          entries: () => { throw new Error('Parsing error'); }
        }
      } as unknown as URL;
      
      // 例外がAPIErrorに変換されることを確認
      expect(() => parseOGImageParams(mockUrl)).toThrow(APIError);
      expect(() => parseOGImageParams(mockUrl)).toThrow('URLが無効です');
    });
  });

  describe('generateOGImage', () => {
    it('should generate OG image with valid parameters', async () => {
      // フォントローダーのモック
      vi.mocked(loadFonts).mockResolvedValue({
        normal: new ArrayBuffer(0),
        bold: new ArrayBuffer(0)
      });

      // ImageResponseのモック
      const mockImageResponse = {} as ImageResponse;
      vi.mocked(ImageResponse).mockReturnValue(mockImageResponse);

      // 有効なパラメータ
      const params = {
        title: 'Test Image',
        username: 'testuser',
        gradientFrom: '#FF0000',
        gradientTo: '#0000FF',
        iconUrl: null
      };

      // 画像生成をテスト
      const result = await generateOGImage(params);
      
      // 結果を検証
      expect(result).toBe(mockImageResponse);
      expect(loadFonts).toHaveBeenCalledTimes(1);
      expect(ImageResponse).toHaveBeenCalledTimes(1);
      
      // ImageResponseの引数を検証
      const callArgs = vi.mocked(ImageResponse).mock.calls[0];
      expect(callArgs.length).toBe(2);
      expect(React.isValidElement(callArgs[0])).toBe(true); // 第1引数はReact要素
      expect(callArgs[1]).toHaveProperty('width', 1200); // 第2引数は設定オブジェクト
      expect(callArgs[1]).toHaveProperty('height', 630);
    });

    it('should throw APIError when font loading fails', async () => {
      // フォントローダーがエラーを投げるようにモック設定
      vi.mocked(loadFonts).mockRejectedValue(new Error('Font loading failed'));

      // 有効なパラメータ
      const params = {
        title: 'Test Image',
        username: 'testuser',
        gradientFrom: '#FF0000',
        gradientTo: '#0000FF',
        iconUrl: null
      };

      // 画像生成がエラーになることを確認
      await expect(generateOGImage(params)).rejects.toThrow(APIError);
      expect(loadFonts).toHaveBeenCalledTimes(1);
      expect(ImageResponse).not.toHaveBeenCalled();
    });

    it('should throw APIError with invalid parameters', async () => {
      // 無効なパラメータ
      const params = null as any;

      // 画像生成がエラーになることを確認
      await expect(generateOGImage(params)).rejects.toThrow(APIError);
      expect(loadFonts).not.toHaveBeenCalled();
      expect(ImageResponse).not.toHaveBeenCalled();
    });
    
    it('should pass all parameter values to OGImage component', async () => {
      // フォントローダーのモック
      vi.mocked(loadFonts).mockResolvedValue({
        normal: new ArrayBuffer(0),
        bold: new ArrayBuffer(0)
      });

      // 有効なパラメータ（すべてのフィールドを含む）
      const params = {
        title: 'Complete Test',
        username: 'fulluser',
        gradientFrom: '#FF0000',
        gradientTo: '#0000FF',
        iconUrl: 'https://example.com/avatar.png'
      };

      // 画像生成をテスト
      await generateOGImage(params);
      
      // ImageResponseに渡されたReact要素のプロパティを検証
      const reactElement = vi.mocked(ImageResponse).mock.calls[0][0];
      expect(reactElement.props).toEqual(params);
    });
    
    it('should rethrow APIError as is', async () => {
      // フォントローダーがAPIErrorを投げるようにモック設定
      const apiError = new APIError('Font loading error', 500);
      vi.mocked(loadFonts).mockRejectedValue(apiError);

      // 有効なパラメータ
      const params = {
        title: 'Test Image',
        username: 'testuser',
        gradientFrom: '#FF0000',
        gradientTo: '#0000FF',
        iconUrl: null
      };

      // 同じAPIErrorが再スローされることを確認
      await expect(generateOGImage(params)).rejects.toBe(apiError);
    });
  });
}); 