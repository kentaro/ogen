/** @jsx jsx */
import { jsx } from 'hono/jsx'
import type { OGImageParams } from '../types'

export const SimpleTemplate = ({ title, username, iconUrl }: OGImageParams) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: '40px',
        fontFamily: '"Noto Sans JP"'
      }}
    >
      <div style={{
        fontSize: '64px',
        fontWeight: 'bold',
        marginBottom: '20px',
        display: 'flex'
      }}>
        {title}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {iconUrl && (
          <img
            src={iconUrl}
            width="48"
            height="48"
            alt={`${username}'s avatar`}
            style={{ borderRadius: '50%' }}
          />
        )}
        <div style={{
          fontSize: '24px',
          display: 'flex'
        }}>by {username}</div>
      </div>
    </div>
  )
} 