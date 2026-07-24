import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { navItems, pageIds, publicPageIds, routeIds } from './data/constants'
import { BottomNav } from './components/layout/BottomNav'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { AttendancePage } from './components/pages/AttendancePage'
import { CalendarPage } from './components/pages/CalendarPage'
import { DashboardPage } from './components/pages/DashboardPage'
import { NotesPage } from './components/pages/NotesPage'
import { PYQPage } from './components/pages/PYQPage'
import { PublicExperience } from './components/public/PublicExperience'
import { DetailPanel } from './components/ui/DetailPanel'
import { Toast } from './components/ui/Toast'
import { routeFor, routeFromLocation } from './utils/routing'

function App() {
  const [activeRoute, setActiveRoute] = useState(routeFromLocation)
  const [toast, setToast] = useState(null)
  const [detailPanel, setDetailPanel] = useState(null)
  const activePage = pageIds.includes(activeRoute) ? activeRoute : 'dashboard'
  const title = navItems.find((item) => item.id === activePage)?.label ?? 'Dashboard'

  useEffect(() => {
    const onPopState = () => setActiveRoute(routeFromLocation())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const notify = useCallback((message, tone = 'success') => {
    setToast({ id: Date.now(), message, tone })
  }, [])

  const navigate = useCallback((routeId) => {
    if (!routeIds.includes(routeId)) return
    setActiveRoute(routeId)
    window.history.pushState({}, '', routeFor(routeId))
  }, [])

  const handleGoogleAuth = useCallback((mode) => {
    notify(`${mode === 'login' ? 'Logged in' : 'Signed in'} with Google`)
    navigate('dashboard')
  }, [navigate, notify])

  const showDetail = useCallback((titleText, body, actionLabel) => {
    setDetailPanel({ title: titleText, body, actionLabel })
  }, [])

  const appActions = useMemo(() => ({
    notify,
    navigate,
    showDetail,
  }), [navigate, notify, showDetail])

  const page = useMemo(() => {
    switch (activePage) {
      case 'attendance':
        return <AttendancePage actions={appActions} />
      case 'notes':
        return <NotesPage actions={appActions} />
      case 'pyqs':
        return <PYQPage actions={appActions} />
      case 'calendar':
        return <CalendarPage actions={appActions} />
      default:
        return <DashboardPage actions={appActions} />
    }
  }, [activePage, appActions])

  if (publicPageIds.includes(activeRoute)) {
    return (
      <>
        <PublicExperience
          activeRoute={activeRoute}
          onGoogleAuth={handleGoogleAuth}
          onNavigate={navigate}
        />
        {toast ? <Toast toast={toast} /> : null}
      </>
    )
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={navigate} onLogout={() => showDetail('Confirm logout', 'You will stay signed in until this demo account connects to authentication.', 'Stay signed in')} />
      <main className="workspace">
        <TopBar title={title} actions={appActions} />
        <div className="page-transition" key={activePage}>
          {page}
        </div>
      </main>
      <BottomNav activePage={activePage} onNavigate={navigate} />
      {detailPanel ? <DetailPanel panel={detailPanel} onClose={() => setDetailPanel(null)} /> : null}
      {toast ? <Toast toast={toast} /> : null}
    </div>
  )
}

export default App
