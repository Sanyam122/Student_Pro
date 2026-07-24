import { PublicNav } from '../layout/PublicNav'
import { AuthPage } from './AuthPage'
import { HomePage } from './HomePage'

export function PublicExperience({ activeRoute, onGoogleAuth, onNavigate }) {
  return (
    <main className="public-shell">
      <PublicNav activeRoute={activeRoute} onNavigate={onNavigate} />
      <div className="public-route page-transition" key={activeRoute}>
        {activeRoute === 'login' ? (
          <AuthPage mode="login" onGoogleAuth={onGoogleAuth} onNavigate={onNavigate} />
        ) : activeRoute === 'signin' ? (
          <AuthPage mode="signin" onGoogleAuth={onGoogleAuth} onNavigate={onNavigate} />
        ) : (
          <HomePage onGoogleAuth={onGoogleAuth} onNavigate={onNavigate} />
        )}
      </div>
    </main>
  )
}
