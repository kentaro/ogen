/** @jsx jsx */
import { jsx } from 'hono/jsx'
import type { OGImageParams } from '../types'

export const ModernTemplate = ({ title, username, iconUrl, gradientFrom, gradientTo }: OGImageParams) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        background: `linear-gradient(to left, ${gradientFrom}, ${gradientTo})`,
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
              {title}
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
              {iconUrl && (
                <img
                  src={iconUrl}
                  width="80"
                  height="80"
                  alt={`${username}'s avatar`}
                  style={{ borderRadius: '50%', border: '3px solid #3177EE' }}
                />
              )}
              <div style={{
                fontSize: '36px',
                color: '#333',
                fontWeight: 'bold'
              }}>
                {username}
              </div>
            </div>

            {/* Powered by */}
            <div style={{
              fontSize: '24px',
              color: '#666',
              display: 'flex',
              alignItems: 'center'
            }}>
              Powered by <a href="https://github.com/kentaro/ogen" style={{
                marginLeft: '10px',
                color: '#3177EE',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}>kentaro/ogen</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 