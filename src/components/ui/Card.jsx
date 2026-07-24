import { IconChip } from './IconChip'

export function Card({ title, icon, children, className = '' }) {
  return (
    <section className={`surface-card ${className}`}>
      {title ? (
        <div className="section-title-row">
          <div>
            {icon ? <IconChip accent="blue" icon={icon} /> : null}
            <h2>{title}</h2>
          </div>
        </div>
      ) : null}
      {children}
    </section>
  )
}
