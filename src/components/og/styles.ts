/**
 * OG画像のカード用スタイルオブジェクト
 */
export const styles = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    padding: '36px',
    boxSizing: 'border-box',
  } as const,

  card: {
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
  } as const,

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1
  } as const,

  title: {
    fontSize: '64px',
    fontWeight: 'bold',
    lineHeight: 1.3,
    letterSpacing: '-0.02em',
    color: '#333',
    display: 'flex'
  } as const,

  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '60px'
  } as const,

  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  } as const,

  avatar: {
    borderRadius: '50%',
    border: '3px solid #3177EE'
  } as const,

  username: {
    fontSize: '36px',
    color: '#333',
    fontWeight: 'bold',
    display: 'flex'
  } as const,

  poweredBy: {
    fontSize: '24px',
    color: '#666',
    display: 'flex',
    alignItems: 'center'
  } as const,

  brand: {
    marginLeft: '10px',
    color: '#3177EE',
    fontWeight: 'bold',
    display: 'flex'
  } as const,
}; 