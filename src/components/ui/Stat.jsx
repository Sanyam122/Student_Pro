export function Stat({ label, value, accent }) {
  return (
    <div className="stat">
      <span className={`stat-dot ${accent}`} />
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  )
}
