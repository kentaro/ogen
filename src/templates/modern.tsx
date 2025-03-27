/** @jsx jsx */
import { jsx } from 'hono/jsx'
import type { OGImageParams } from '../types'

export const ModernTemplate = ({ title, username, iconUrl }: OGImageParams) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '60px',
        fontFamily: '"Noto Sans JP"'
      }}
    >
      {/* グラデーションの背景要素 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
        opacity: 0.1,
        display: 'flex'
      }} />

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
        <div style={{
          fontSize: '72px',
          fontWeight: 'bold',
          lineHeight: 1.4,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'flex'
        }}>
          {title}
        </div>

        {/* ユーザー情報エリア */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '40px'
        }}>
          {iconUrl && (
            <img
              src={iconUrl}
              width="64"
              height="64"
              alt={`${username}'s avatar`}
              style={{ borderRadius: '50%', border: '2px solid #0072FF' }}
            />
          )}
          <div style={{
            fontSize: '32px',
            color: '#e0e0e0',
            display: 'flex'
          }}>
            by {username}
          </div>
        </div>

        {/* フッターエリア */}
        <div style={{
          marginTop: '80px',
          fontSize: '18px',
          color: '#888',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          Powered by OGen
        </div>
      </div>
    </div>
  )
} 