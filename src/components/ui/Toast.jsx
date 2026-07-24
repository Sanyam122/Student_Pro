export function Toast({ toast }) {
  return (
    <div className={`toast ${toast.tone === 'error' ? 'error' : ''}`} role="status">
      {toast.message}
    </div>
  )
}
