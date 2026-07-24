import { Icon } from '../Icon'
import { Logo } from '../layout/Logo'
import { GoogleButton } from '../ui/GoogleButton'
import { IconChip } from '../ui/IconChip'

export function AuthPage({ mode, onGoogleAuth, onNavigate }) {
  const isLogin = mode === 'login'
  const title = isLogin ? 'Welcome back.' : 'Start with StudentPro.'
  const subtitle = isLogin
    ? 'Use Google to return to your dashboard, study plan, notes, and attendance.'
    : 'Create your workspace with Google and keep your academic rhythm beautifully organized.'

  return (
    <section className="auth-layout">
      <div className="auth-panel">
        <button className="brand-button auth-brand" type="button" onClick={() => onNavigate('home')} aria-label="Go to StudentPro home">
          <Logo />
        </button>
        <div className="auth-copy">
          <p className="eyebrow">{isLogin ? 'Login' : 'Sign in'}</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <GoogleButton label={isLogin ? 'Login with Google' : 'Sign in with Google'} onClick={() => onGoogleAuth(mode)} />
        <div className="auth-switch">
          <span>{isLogin ? 'New to StudentPro?' : 'Already have a workspace?'}</span>
          <button type="button" onClick={() => onNavigate(isLogin ? 'signin' : 'login')}>
            {isLogin ? 'Sign in' : 'Login'}
          </button>
        </div>
      </div>
      <aside className="auth-showcase" aria-label="StudentPro benefits">
        <div className="showcase-orbit">
          <Icon name="spark" size={42} />
        </div>
        <div className="showcase-list">
          <div>
            <IconChip accent="blue" icon="target" />
            <span>
              <strong>Clear next steps</strong>
              <small>Daily priorities, notes, and tasks in one place.</small>
            </span>
          </div>
          <div>
            <IconChip accent="green" icon="shield" />
            <span>
              <strong>Google-only access</strong>
              <small>No extra forms, passwords, or clutter.</small>
            </span>
          </div>
          <div>
            <IconChip accent="gold" icon="trophy" />
            <span>
              <strong>Momentum you can see</strong>
              <small>Streaks, progress rings, and attendance recovery.</small>
            </span>
          </div>
        </div>
      </aside>
    </section>
  )
}
