import { describe, it, expect } from 'vitest';
import { ogImageParamsSchema } from '@/models/og';

describe('OG Image Parameters Schema', () => {
  // 有効なパラメータをテスト
  describe('Valid parameters', () => {
    it('should validate with required fields only', () => {
      const params = {
        title: 'Test Title',
        username: 'testuser'
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.title).toBe('Test Title');
        expect(result.data.username).toBe('testuser');
        expect(result.data.gradientFrom).toBe('#EEF0FF'); // デフォルト値
        expect(result.data.gradientTo).toBe('#FFF0F8'); // デフォルト値
        expect(result.data.iconUrl).toBeUndefined();
      }
    });
    
    it('should validate with all fields', () => {
      const params = {
        title: 'Test Title',
        username: 'testuser',
        gradientFrom: '#FF0000',
        gradientTo: '#0000FF',
        iconUrl: 'https://example.com/avatar.png'
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.title).toBe('Test Title');
        expect(result.data.username).toBe('testuser');
        expect(result.data.gradientFrom).toBe('#FF0000');
        expect(result.data.gradientTo).toBe('#0000FF');
        expect(result.data.iconUrl).toBe('https://example.com/avatar.png');
      }
    });
    
    it('should accept short hex color codes', () => {
      const params = {
        title: 'Test Title',
        username: 'testuser',
        gradientFrom: '#F00',
        gradientTo: '#00F'
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.gradientFrom).toBe('#F00');
        expect(result.data.gradientTo).toBe('#00F');
      }
    });
    
    it('should accept null as iconUrl', () => {
      const params = {
        title: 'Test Title',
        username: 'testuser',
        iconUrl: null
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.iconUrl).toBeNull();
      }
    });
  });
  
  // 無効なパラメータをテスト
  describe('Invalid parameters', () => {
    it('should fail when title is missing', () => {
      const params = {
        username: 'testuser'
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const formatted = result.error.format();
        expect(formatted.title?._errors).toBeDefined();
      }
    });
    
    it('should fail when username is missing', () => {
      const params = {
        title: 'Test Title'
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const formatted = result.error.format();
        expect(formatted.username?._errors).toBeDefined();
      }
    });
    
    it('should fail with empty title', () => {
      const params = {
        title: '',
        username: 'testuser'
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const formatted = result.error.format();
        expect(formatted.title?._errors).toBeDefined();
      }
    });
    
    it('should fail with empty username', () => {
      const params = {
        title: 'Test Title',
        username: ''
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const formatted = result.error.format();
        expect(formatted.username?._errors).toBeDefined();
      }
    });
    
    it('should fail with invalid color format', () => {
      const params = {
        title: 'Test Title',
        username: 'testuser',
        gradientFrom: 'red',  // 無効な形式
        gradientTo: '#0000FF'
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const formatted = result.error.format();
        expect(formatted.gradientFrom?._errors).toBeDefined();
      }
    });
    
    it('should fail with invalid URL format', () => {
      const params = {
        title: 'Test Title',
        username: 'testuser',
        iconUrl: 'invalid-url'  // 無効なURL
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const formatted = result.error.format();
        expect(formatted.iconUrl?._errors).toBeDefined();
      }
    });
    
    it('should fail when title exceeds maximum length', () => {
      const params = {
        title: 'a'.repeat(101),  // 101文字
        username: 'testuser'
      };
      
      const result = ogImageParamsSchema.safeParse(params);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const formatted = result.error.format();
        expect(formatted.title?._errors).toBeDefined();
      }
    });
  });
}); 