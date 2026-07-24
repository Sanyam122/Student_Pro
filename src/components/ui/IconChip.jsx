import { Icon } from '../Icon'

export function IconChip({ accent = 'blue', icon }) {
  return (
    <span className={`icon-chip ${accent}`}>
      <Icon name={icon} size={18} />
    </span>
  )
}
