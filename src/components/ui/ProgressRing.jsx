import { accentMap } from '../../data/constants'

export function ProgressRing({ value, size = 90, stroke = 8, accent = 'blue', label }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (value / 100) * circumference
  const colors = accentMap[accent] ?? accentMap.blue

  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="ring-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className="ring-value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            '--ring-start': colors.start,
            '--ring-end': colors.end,
          }}
        />
      </svg>
      <span>
        <strong>{value}%</strong>
        {label ? <small>{label}</small> : null}
      </span>
    </div>
  )
}
