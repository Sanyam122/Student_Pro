import { Logo } from './Logo'

export function PublicNav({ activeRoute, onNavigate }) {
  return (
    <header className="public-nav">
      <button className="brand-button" type="button" onClick={() => onNavigate('home')} aria-label="Go to StudentPro home">
        <Logo />
      </button>
      <nav className="auth-nav" aria-label="Authentication">
        <button className={activeRoute === 'login' ? 'is-active' : ''} type="button" onClick={() => onNavigate('login')}>
          Login
        </button>
        <button className={activeRoute === 'signin' ? 'is-active' : ''} type="button" onClick={() => onNavigate('signin')}>
          Sign in
        </button>
      </nav>
    </header>
  )
}
