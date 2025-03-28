import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { z } from 'zod';
import React from 'react';

export const config = {
    runtime: 'edge',
};

// 型定義
const ogImageParamsSchema = z.object({
    title: z.string().min(1, { message: 'タイトルは必須です' }),
    username: z.string().min(1, { message: 'ユーザー名は必須です' }),
    gradientFrom: z.string().default('#EEF0FF'),
    gradientTo: z.string().default('#FFF0F8'),
    iconUrl: z.string().url().optional()
});

type OGImageParams = z.infer<typeof ogImageParamsSchema>;

export default async function handler(req: NextRequest) {
    try {
        console.log('OG Image API called', req.url);
        const { searchParams } = new URL(req.url);

        // パラメータの取得
        const result = ogImageParamsSchema.safeParse({
            title: searchParams.get('title'),
            username: searchParams.get('username'),
            gradientFrom: searchParams.get('gradientFrom') || '#EEF0FF',
            gradientTo: searchParams.get('gradientTo') || '#FFF0F8',
            iconUrl: searchParams.get('iconUrl')
        });

        if (!result.success) {
            console.error('Validation error', result.error.format());
            return new Response(JSON.stringify({
                success: false,
                error: result.error.format()
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const params = result.data;
        console.log('Generating image with params', params);

        // フォントの読み込み
        const fontNormal = await fetch(
            'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/files/noto-sans-jp-all-400-normal.woff'
        ).then((res) => res.arrayBuffer());

        const fontBold = await fetch(
            'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp/files/noto-sans-jp-all-700-normal.woff'
        ).then((res) => res.arrayBuffer());

        // OG画像の生成
        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        background: `linear-gradient(to left, ${params.gradientFrom}, ${params.gradientTo})`,
                        padding: '36px',
                        boxSizing: 'border-box'
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            color: '#333',
                            padding: '60px',
                            fontFamily: '"Noto Sans JP", sans-serif',
                            position: 'relative',
                            borderRadius: '16px',
                            boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.15)'
                        }}
                    >
                        {/* メインコンテンツ */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            {/* タイトルエリア */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{
                                    fontSize: '64px',
                                    fontWeight: 'bold',
                                    lineHeight: 1.3,
                                    letterSpacing: '-0.02em',
                                    color: '#333'
                                }}>
                                    {params.title}
                                </div>
                            </div>

                            {/* ユーザー情報と Powered by */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                marginTop: '60px'
                            }}>
                                {/* ユーザー情報 */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px'
                                }}>
                                    {params.iconUrl && (
                                        <img
                                            src={params.iconUrl}
                                            width="80"
                                            height="80"
                                            alt={`${params.username}'s avatar`}
                                            style={{ borderRadius: '50%', border: '3px solid #3177EE' }}
                                        />
                                    )}
                                    <div style={{
                                        fontSize: '36px',
                                        color: '#333',
                                        fontWeight: 'bold'
                                    }}>
                                        {params.username}
                                    </div>
                                </div>

                                {/* Powered by */}
                                <div style={{
                                    fontSize: '24px',
                                    color: '#666',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    Powered by <span style={{
                                        marginLeft: '10px',
                                        color: '#3177EE',
                                        fontWeight: 'bold'
                                    }}>kentaro/ogen</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Noto Sans JP',
                        data: fontNormal,
                        weight: 400,
                        style: 'normal',
                    },
                    {
                        name: 'Noto Sans JP',
                        data: fontBold,
                        weight: 700,
                        style: 'normal',
                    },
                ],
            }
        );
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({
            success: false,
            error: 'Internal Server Error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
} 