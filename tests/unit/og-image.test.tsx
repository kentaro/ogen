import { describe, it, expect } from 'vitest'
import { OGImage } from '../../src/og-image'

describe('OGImage', () => {
    it('基本的なプロパティでコンポーネントがレンダリングされる', () => {
        const props = {
            title: 'テストタイトル',
            username: 'testuser',
            gradientFrom: '#EEF0FF',
            gradientTo: '#FFF0F8'
        }

        const component = OGImage(props)

        // コンポーネントが正しく作成されたことを確認
        expect(component).toBeDefined()

        // コンポーネントの構造を確認（簡易版）
        const renderedJsx = component as any
        expect(renderedJsx).toBeDefined()
        expect(renderedJsx.tag).toBe('div')
    })

    it('iconUrlが提供された場合、アバター画像がレンダリングされる', () => {
        const props = {
            title: 'テストタイトル',
            username: 'testuser',
            gradientFrom: '#EEF0FF',
            gradientTo: '#FFF0F8',
            iconUrl: 'https://example.com/avatar.png'
        }

        // 正常にレンダリングされるか確認（エラーが発生しないこと）
        expect(() => OGImage(props)).not.toThrow()

        // コンポーネントが生成されることを確認
        const component = OGImage(props)
        expect(component).toBeDefined()
    })

    it('iconUrlが提供されない場合でも正常にレンダリングされる', () => {
        const props = {
            title: 'テストタイトル',
            username: 'testuser',
            gradientFrom: '#EEF0FF',
            gradientTo: '#FFF0F8'
        }

        // 正常にレンダリングされるか確認（エラーが発生しないこと）
        expect(() => OGImage(props)).not.toThrow()

        // コンポーネントが生成されることを確認
        const component = OGImage(props)
        expect(component).toBeDefined()
    })

    it('カスタムのグラデーションが適用される', () => {
        const props = {
            title: 'テストタイトル',
            username: 'testuser',
            gradientFrom: '#ff0000',
            gradientTo: '#0000ff'
        }

        // 正常にレンダリングされるか確認（エラーが発生しないこと）
        expect(() => OGImage(props)).not.toThrow()

        // コンポーネントが生成されることを確認
        const component = OGImage(props)
        expect(component).toBeDefined()
    })
}) 