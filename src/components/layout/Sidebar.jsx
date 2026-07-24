import { navItems } from '../../data/constants'
import { Icon } from '../Icon'
import { Logo } from './Logo'

export function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <Logo />
      <nav className="nav-list">
        {navItems.map((item) => (
          <button
            aria-current={activePage === item.id ? 'page' : undefined}
            className={`nav-item ${activePage === item.id ? 'is-active' : ''}`}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button className="nav-item logout" type="button" onClick={onLogout}>
        <Icon name="logout" />
        <span>Logout</span>
      </button>
    </aside>
  )
}
