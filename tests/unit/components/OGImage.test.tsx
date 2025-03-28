import { describe, it, expect } from 'vitest';
import React from 'react';
import { OGImage } from '@/components/og/OGImage';
import { render } from '@testing-library/react';

describe('OGImage Component', () => {
    // 基本的なレンダリングテスト
    it('should render with required props', () => {
        // コンポーネントをレンダリング
        const { container } = render(
            <OGImage
                title="Test Title"
                username="testuser"
                gradientFrom="#FF0000"
                gradientTo="#0000FF"
                iconUrl={null}
            />
        );

        // 基本的なDOM構造の確認
        expect(container.querySelector('div')).not.toBeNull();

        // テキストコンテンツの確認
        expect(container.textContent).toContain('Test Title');
        expect(container.textContent).toContain('testuser');
        expect(container.textContent).toContain('Powered by');
        expect(container.textContent).toContain('kentaro/ogen');
    });

    it('should render icon when iconUrl is provided', () => {
        // アイコンURLを含む場合のレンダリング
        const { container } = render(
            <OGImage
                title="With Icon"
                username="iconuser"
                gradientFrom="#EEF0FF"
                gradientTo="#FFF0F8"
                iconUrl="https://example.com/avatar.png"
            />
        );

        // img要素が存在することを確認
        const img = container.querySelector('img');
        expect(img).not.toBeNull();
        expect(img?.getAttribute('src')).toBe('https://example.com/avatar.png');
        expect(img?.getAttribute('alt')).toBe('iconuser\'s avatar');
    });

    it('should not render icon when iconUrl is null', () => {
        // アイコンURLがnullの場合のレンダリング
        const { container } = render(
            <OGImage
                title="No Icon"
                username="noicon"
                gradientFrom="#EEF0FF"
                gradientTo="#FFF0F8"
                iconUrl={null}
            />
        );

        // img要素が存在しないことを確認
        const img = container.querySelector('img');
        expect(img).toBeNull();
    });

    it('should sanitize props for security', () => {
        // インジェクション攻撃を防ぐためのエスケープ処理テスト
        const { container } = render(
            <OGImage
                title="<script>alert('xss')</script>"
                username="<img src=x onerror=alert('xss')>"
                gradientFrom="#EEF0FF"
                gradientTo="#FFF0F8"
                iconUrl={null}
            />
        );

        // スクリプトタグが実行されないことを確認
        expect(container.querySelector('script')).toBeNull();

        // HTMLが無害化されていることを確認
        const html = container.innerHTML;
        expect(html).not.toContain('<script>');
        expect(html).not.toContain('onerror=');
    });

    it('should use default gradient colors when invalid colors are provided', () => {
        // 無効な色が指定された場合のデフォルト値テスト
        const { container } = render(
            <OGImage
                title="Invalid Colors"
                username="coloruser"
                gradientFrom="invalid"
                gradientTo="red"
                iconUrl={null}
            />
        );

        // 最初のdiv要素のスタイルを取得
        const rootDiv = container.querySelector('div');
        const style = rootDiv?.getAttribute('style') || '';

        // デフォルトの色が使用されていることを確認
        expect(style).toContain('linear-gradient');
        expect(style).toContain('#EEF0FF');
        expect(style).toContain('#FFF0F8');
    });
}); 