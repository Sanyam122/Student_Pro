export function Badge({ accent = 'blue', children }) {
  return <span className={`badge ${accent}`}>{children}</span>
}
