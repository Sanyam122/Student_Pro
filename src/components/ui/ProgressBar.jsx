export function ProgressBar({ value, accent = 'blue' }) {
  return (
    <div className="progress-bar" aria-label={`${value}% complete`}>
      <span className={accent} style={{ width: `${value}%` }} />
    </div>
  )
}
