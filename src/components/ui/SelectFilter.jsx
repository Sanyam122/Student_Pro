import { Icon } from '../Icon'

export function SelectFilter({ label, value, options, onChange }) {
  return (
    <label className={`pill-select native ${value !== 'All' ? 'is-active' : ''}`}>
      <Icon name="filter" size={16} />
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={`Filter PYQs by ${label}`}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}
