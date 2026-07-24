import { navItems } from '../../data/constants'
import { Icon } from '../Icon'

export function BottomNav({ activePage, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {navItems.slice(0, 5).map((item) => (
        <button
          aria-current={activePage === item.id ? 'page' : undefined}
          aria-label={item.label}
          className={`bottom-nav-item ${activePage === item.id ? 'is-active' : ''}`}
          key={item.id}
          onClick={() => onNavigate(item.id)}
          type="button"
        >
          <Icon name={item.icon} size={18} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
