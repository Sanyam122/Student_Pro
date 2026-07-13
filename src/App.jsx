import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import heroImage from './assets/hero.png'

const accentMap = {
  blue: {
    label: 'Blue',
    start: '#26AEE9',
    end: '#57CBF7',
    soft: '#1C3A4D',
  },
  green: {
    label: 'Green',
    start: '#14D9A1',
    end: '#3BE6B7',
    soft: '#143A33',
  },
  gold: {
    label: 'Gold',
    start: '#F5B843',
    end: '#FFCB61',
    soft: '#3D3221',
  },
  danger: {
    label: 'Danger',
    start: '#F0546B',
    end: '#FF7B8F',
    soft: '#40212B',
  },
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'attendance', label: 'Attendance', icon: 'check' },
  { id: 'notes', label: 'Notes', icon: 'note' },
  { id: 'pyqs', label: "PYQ's", icon: 'archive' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
]

const pageIds = navItems.map((item) => item.id)
const publicPageIds = ['home', 'login', 'signin']
const routeIds = [...publicPageIds, ...pageIds]

const learningCards = [
  {
    subject: 'Organic Chemistry',
    tag: '3 days left',
    meta: '12 video lessons',
    progress: 68,
    tasks: '7/10 tasks',
    accent: 'gold',
  },
  {
    subject: 'Linear Algebra',
    tag: 'On track',
    meta: '8 problem sets',
    progress: 84,
    tasks: '11/13 tasks',
    accent: 'green',
  },
]

const readingItems = [
  { title: 'Electrostatics Formula Sheet', author: 'Physics vault', value: 72, accent: 'blue' },
  { title: 'Modern History Mind Map', author: 'Revision desk', value: 58, accent: 'gold' },
  { title: 'Plant Physiology Notes', author: 'Bio sprint', value: 89, accent: 'green' },
]

const schedule = [
  { name: 'Dr. Rhea Sen', role: 'Chemistry mentor', topic: 'Reaction mechanism clinic', time: 'Today, 4:30 PM', status: 'Live prep' },
  { name: 'Arjun Mehta', role: 'Math coach', topic: 'Matrices doubt room', time: 'Tomorrow, 9:00 AM', status: 'Booked' },
]

const todos = [
  { time: '08:00 - 09:00', task: 'Revise derivatives', accent: 'blue', icon: 'clock' },
  { time: '10:30 - 11:15', task: 'Upload chemistry lab note', accent: 'green', icon: 'upload' },
  { time: '05:00 - 06:00', task: 'Solve 2023 PYQ set', accent: 'gold', icon: 'archive' },
]

const subjects = [
  { name: 'Physics', attended: 38, total: 44, streak: '+4 this month' },
  { name: 'Chemistry', attended: 31, total: 41, streak: '2 misses' },
  { name: 'Mathematics', attended: 35, total: 46, streak: '+1 this week' },
  { name: 'Biology', attended: 24, total: 39, streak: 'Needs 5 classes' },
]

const heatmap = Array.from({ length: 35 }, (_, index) => {
  const day = index + 1
  if ([6, 13, 20, 27, 34].includes(day)) return 'holiday'
  if ([8, 16, 24, 31].includes(day)) return 'absent'
  if ([4, 11, 18, 29].includes(day)) return 'partial'
  return 'present'
})

const notes = [
  { title: 'Thermodynamics Quick Revision', subject: 'Physics', type: 'PDF', date: 'Edited today', pages: 18, accent: 'blue', pinned: true },
  { title: 'Coordination Compounds', subject: 'Chemistry', type: 'DOC', date: 'Yesterday', pages: 32, accent: 'green', pinned: true },
  { title: 'Trigonometry Identity Bank', subject: 'Maths', type: 'PDF', date: 'Jul 7', pages: 24, accent: 'gold', pinned: false },
  { title: 'Cell Cycle Diagrams', subject: 'Biology', type: 'IMG', date: 'Jul 4', pages: 12, accent: 'green', pinned: false },
  { title: 'Indian Polity Flash Notes', subject: 'General', type: 'PDF', date: 'Jul 1', pages: 40, accent: 'blue', pinned: false },
  { title: 'Probability Practice Sheet', subject: 'Maths', type: 'XLS', date: 'Jun 28', pages: 9, accent: 'gold', pinned: false },
]

const pyqs = [
  { exam: 'JEE Main', year: '2025', subject: 'Physics', difficulty: 'Medium', questions: 90, solved: 67, accent: 'blue' },
  { exam: 'NEET', year: '2024', subject: 'Biology', difficulty: 'Easy', questions: 100, solved: 86, accent: 'green' },
  { exam: 'CUET', year: '2025', subject: 'Chemistry', difficulty: 'Hard', questions: 75, solved: 34, accent: 'gold' },
  { exam: 'Boards', year: '2023', subject: 'Maths', difficulty: 'Medium', questions: 60, solved: 42, accent: 'blue' },
  { exam: 'JEE Adv', year: '2024', subject: 'Maths', difficulty: 'Hard', questions: 54, solved: 21, accent: 'danger' },
  { exam: 'NEET', year: '2023', subject: 'Physics', difficulty: 'Medium', questions: 80, solved: 53, accent: 'green' },
]

const calendarEvents = [
  { date: 'Mon 13', title: 'Chemistry mock test', time: '09:00 AM', accent: 'gold', duration: '90 min', reminder: '30 min before' },
  { date: 'Tue 14', title: 'Attendance review', time: '12:30 PM', accent: 'green', duration: '30 min', reminder: '10 min before' },
  { date: 'Wed 15', title: 'PYQ sprint room', time: '05:00 PM', accent: 'blue', duration: '60 min', reminder: '15 min before' },
  { date: 'Fri 17', title: 'Mentor checkpoint', time: '03:15 PM', accent: 'green', duration: '45 min', reminder: '30 min before' },
]

const notificationsSeed = [
  { id: 1, title: 'Chemistry mentor starts soon', meta: 'Today, 4:05 PM', unread: true },
  { id: 2, title: 'Biology attendance dropped below target', meta: 'Yesterday', unread: true },
  { id: 3, title: '2 notes finished uploading', meta: 'Jul 10', unread: false },
]

const achievements = [
  { title: '14-day practice streak', meta: 'Top 8% of your cohort' },
  { title: '55 study hours logged', meta: '15 hours from this week target' },
  { title: 'Organic Chemistry milestone', meta: '68% complete' },
]

function routeFromLocation() {
  const url = new URL(window.location.href)
  const segment = url.pathname.split('/').filter(Boolean).pop()
  const queryPage = url.searchParams.get('page')
  if (!segment) return 'home'
  if (segment === 'login' || segment === 'signin') return segment
  if (pageIds.includes(segment)) return segment
  if (pageIds.includes(queryPage)) return queryPage
  return 'home'
}

function routeFor(routeId) {
  const url = new URL(window.location.href)
  url.search = pageIds.includes(routeId) ? url.search : ''
  url.pathname = routeId === 'home' ? '/' : `/${routeId}`
  return `${url.pathname}${url.search}`
}

function replaceQuery(updates) {
  const url = new URL(window.location.href)
  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '' || value === 'All') {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, value)
    }
  })
  window.history.replaceState({}, '', `${url.pathname}${url.search}`)
}

function queryValue(key, fallback = '') {
  return new URL(window.location.href).searchParams.get(key) ?? fallback
}

function useDebouncedValue(value, delay = 180) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timeout)
  }, [value, delay])

  return debounced
}

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
    check: <path d="M20 6 9 17l-5-5" />,
    note: <path d="M7 3h8l4 4v14H7zM15 3v5h5M10 12h7M10 16h7" />,
    archive: <path d="M4 7h16M6 7v13h12V7M9 11h6M5 4h14v3H5z" />,
    calendar: <path d="M7 3v4M17 3v4M4 8h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2z" />,
    logout: <path d="M10 17 15 12l-5-5M15 12H3M21 4v16h-8" />,
    search: <path d="m21 21-4.4-4.4M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4z" />,
    bell: <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7M10 20h4" />,
    trophy: <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0zM5 5H3v2a4 4 0 0 0 4 4M19 5h2v2a4 4 0 0 1-4 4" />,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />,
    clock: <path d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
    upload: <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />,
    file: <path d="M14 2H6v20h12V6zM14 2v4h4M9 13h6M9 17h6" />,
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    flame: <path d="M12 22c4 0 7-2.8 7-6.7 0-2.8-1.5-4.8-3.2-6.4-.9 2.3-2.4 3.5-4.1 4.4.8-3.1-.8-6.5-3.3-8.3.2 3.7-3.4 5.6-3.4 10.2C5 19.2 8 22 12 22z" />,
    trend: <path d="M4 18 10 12l4 4 6-9M15 7h5v5" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-5" />,
    spark: <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />,
    target: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />,
  }

  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

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

function PublicExperience({ activeRoute, onGoogleAuth, onNavigate }) {
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

function PublicNav({ activeRoute, onNavigate }) {
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

function HomePage({ onGoogleAuth, onNavigate }) {
  return (
    <section className="home-layout">
      <div className="home-copy">
        <Badge accent="blue">Student command center</Badge>
        <h1>Study plans, notes, attendance, and PYQs in one calm workspace.</h1>
        <p>
          StudentPro brings every academic habit into a focused dashboard with fast revision loops,
          clear progress signals, and a softer daily routine.
        </p>
        <div className="home-actions">
          <GoogleButton label="Continue with Google" onClick={() => onGoogleAuth('signin')} />
          <button className="ghost-button" type="button" onClick={() => onNavigate('login')}>
            Login
          </button>
        </div>
        <div className="home-metrics" aria-label="StudentPro highlights">
          <Stat label="Study hours" value="55" accent="blue" />
          <Stat label="Practice streak" value="14d" accent="green" />
          <Stat label="Attendance" value="82%" accent="gold" />
        </div>
      </div>
      <div className="home-visual" aria-label="StudentPro dashboard preview">
        <img src={heroImage} alt="StudentPro dashboard preview" />
        <div className="floating-study-card primary">
          <IconChip accent="green" icon="check" />
          <span>
            <strong>Attendance recovered</strong>
            <small>Biology target back on track</small>
          </span>
        </div>
        <div className="floating-study-card secondary">
          <IconChip accent="gold" icon="flame" />
          <span>
            <strong>14-day streak</strong>
            <small>PYQ sprint complete</small>
          </span>
        </div>
      </div>
    </section>
  )
}

function AuthPage({ mode, onGoogleAuth, onNavigate }) {
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

function GoogleButton({ label, onClick }) {
  return (
    <button className="google-button" type="button" onClick={onClick}>
      <span className="google-mark" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.33-1.58-5.04-3.71H.94v2.33A9 9 0 0 0 9 18z" />
          <path fill="#FBBC05" d="M3.96 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.94a9 9 0 0 0 0 8.08z" />
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58A8.66 8.66 0 0 0 9 0 9 9 0 0 0 .94 4.96l3.02 2.33C4.67 5.16 6.66 3.58 9 3.58z" />
        </svg>
      </span>
      <span>{label}</span>
    </button>
  )
}

function Sidebar({ activePage, onNavigate, onLogout }) {
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

function BottomNav({ activePage, onNavigate }) {
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

function Logo() {
  return (
    <div className="logo-lockup" aria-label="StudentPro">
      <span className="logo-mark">
        <span />
        <span />
      </span>
      <span>StudentPro</span>
    </div>
  )
}

function TopBar({ title, actions }) {
  const [query, setQuery] = useState(queryValue('q'))
  const [activePanel, setActivePanel] = useState(null)
  const [notifications, setNotifications] = useState(notificationsSeed)
  const debouncedQuery = useDebouncedValue(query)
  const unreadCount = notifications.filter((item) => item.unread).length
  const searchResults = useMemo(() => getSearchResults(debouncedQuery), [debouncedQuery])

  useEffect(() => {
    replaceQuery({ q: query })
  }, [query])

  const markRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, unread: false })))
    actions.notify('Notifications marked as read')
  }

  return (
    <header className="topbar">
      <div className="topbar-title">
        <p className="eyebrow">Academic command center</p>
        <h1>{title}</h1>
      </div>
      <div className="search-wrap">
        <label className="search-pill">
          <Icon name="search" size={18} />
          <input
            aria-label="Search notes, tasks, PYQs, and schedule"
            type="search"
            value={query}
            placeholder="Search notes, tasks, PYQs"
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setActivePanel('search')}
          />
          {query ? (
            <button className="clear-button" type="button" aria-label="Clear global search" onClick={() => setQuery('')}>
              <Icon name="close" size={15} />
            </button>
          ) : null}
        </label>
        {activePanel === 'search' && query ? (
          <div className="floating-panel search-results-panel" role="status">
            <div className="panel-heading">
              <strong>{searchResults.length} matches</strong>
              <button type="button" className="text-action compact" onClick={() => setActivePanel(null)}>Close</button>
            </div>
            {searchResults.length ? (
              <div className="panel-list">
                {searchResults.map((result) => (
                  <button
                    className="panel-row"
                    key={`${result.type}-${result.title}`}
                    type="button"
                    onClick={() => {
                      actions.navigate(result.page)
                      setActivePanel(null)
                    }}
                  >
                    <span>
                      <strong>{result.title}</strong>
                      <small>{result.type}</small>
                    </span>
                    <Icon name="arrow" size={16} />
                  </button>
                ))}
              </div>
            ) : (
              <EmptyState title="No matches found" text="Try a subject, note title, mentor, or PYQ year." />
            )}
          </div>
        ) : null}
      </div>
      <div className="profile-actions">
        <div className="menu-wrap">
          <button
            aria-expanded={activePanel === 'achievements'}
            className="round-action gold"
            type="button"
            aria-label="Achievements"
            onClick={() => setActivePanel(activePanel === 'achievements' ? null : 'achievements')}
          >
            <Icon name="trophy" size={18} />
          </button>
          {activePanel === 'achievements' ? (
            <TopPanel title="Achievements" onClose={() => setActivePanel(null)}>
              {achievements.map((item) => (
                <div className="panel-row static" key={item.title}>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.meta}</small>
                  </span>
                </div>
              ))}
            </TopPanel>
          ) : null}
        </div>
        <div className="menu-wrap">
          <button
            aria-expanded={activePanel === 'notifications'}
            className={`round-action blue ${unreadCount ? 'has-dot' : ''}`}
            type="button"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            onClick={() => setActivePanel(activePanel === 'notifications' ? null : 'notifications')}
          >
            <Icon name="bell" size={18} />
          </button>
          {activePanel === 'notifications' ? (
            <TopPanel title="Notifications" action={unreadCount ? 'Mark read' : undefined} onAction={markRead} onClose={() => setActivePanel(null)}>
              {notifications.map((item) => (
                <div className={`panel-row static ${item.unread ? 'unread' : ''}`} key={item.id}>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.meta}</small>
                  </span>
                </div>
              ))}
            </TopPanel>
          ) : null}
        </div>
        <div className="menu-wrap">
          <button
            aria-expanded={activePanel === 'account'}
            className="profile-block"
            type="button"
            onClick={() => setActivePanel(activePanel === 'account' ? null : 'account')}
          >
            <span className="avatar">AJ</span>
            <span>
              <strong>Aditi Jain</strong>
              <small>Science - XII</small>
            </span>
          </button>
          {activePanel === 'account' ? (
            <TopPanel title="Account" onClose={() => setActivePanel(null)}>
              <div className="panel-row static">
                <span>
                  <strong>Aditi Jain</strong>
                  <small>aditi.jain@studentpro.test</small>
                </span>
              </div>
              <button
                className="panel-row"
                type="button"
                onClick={() => actions.showDetail('Confirm logout', 'You will stay signed in until this demo account connects to authentication.', 'Stay signed in')}
              >
                <span>
                  <strong>Logout</strong>
                  <small>Confirmation required</small>
                </span>
                <Icon name="logout" size={16} />
              </button>
            </TopPanel>
          ) : null}
        </div>
      </div>
    </header>
  )
}

function getSearchResults(query) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []
  const haystacks = [
    ...notes.map((item) => ({ page: 'notes', type: `${item.subject} note`, title: item.title, text: `${item.title} ${item.subject} ${item.type}` })),
    ...pyqs.map((item) => ({ page: 'pyqs', type: `${item.exam} PYQ`, title: `${item.subject} ${item.year}`, text: `${item.exam} ${item.year} ${item.subject} ${item.difficulty}` })),
    ...calendarEvents.map((item) => ({ page: 'calendar', type: 'Calendar event', title: item.title, text: `${item.title} ${item.date} ${item.time}` })),
    ...todos.map((item) => ({ page: 'dashboard', type: 'Task', title: item.task, text: `${item.task} ${item.time}` })),
    ...schedule.map((item) => ({ page: 'dashboard', type: item.role, title: item.topic, text: `${item.topic} ${item.name} ${item.role}` })),
  ]
  return haystacks.filter((item) => item.text.toLowerCase().includes(normalized)).slice(0, 6)
}

function DashboardPage({ actions }) {
  return (
    <div className="page-grid">
      <section className="main-feed">
        <HeroBanner actions={actions} />
        <SectionHeader title="Continue Learning" action="View plan" onAction={() => actions.navigate('calendar')} />
        <div className="learning-grid">
          {learningCards.map((item) => (
            <LearningCard key={item.subject} item={item} actions={actions} />
          ))}
        </div>
        <div className="content-grid two">
          <Card title="Continue Reading" icon="book">
            <div className="reading-list">
              {readingItems.map((item) => (
                <ReadingItem key={item.title} item={item} actions={actions} />
              ))}
            </div>
          </Card>
          <Card title="Upcoming Schedule" icon="calendar">
            <div className="schedule-list">
              {schedule.map((item) => (
                <ScheduleRow key={item.topic} item={item} actions={actions} />
              ))}
            </div>
          </Card>
        </div>
      </section>
      <RightRail>
        <WeeklyActivity />
        <TodoWidget actions={actions} />
      </RightRail>
    </div>
  )
}

function HeroBanner({ actions }) {
  return (
    <section className="hero-banner gradient-card blue">
      <div>
        <p className="eyebrow">Hello, Aditi!</p>
        <h2>Today is built for Physics momentum.</h2>
        <p>Finish electrostatics revision, protect your streak, and close the evening with one PYQ sprint.</p>
        <button className="dark-pill" type="button" onClick={() => actions.showDetail('Focus session ready', 'Physics momentum starts with a 45 minute electrostatics block, followed by a 10 minute recap.', 'Begin session')}>
          Start focus session
        </button>
      </div>
      <div className="hero-orbit" aria-hidden="true">
        <ProgressRing value={82} size={150} stroke={12} accent="blue" label="Focus" />
      </div>
    </section>
  )
}

function LearningCard({ item, actions }) {
  return (
    <article className={`learning-card gradient-card ${item.accent}`}>
      <div className="card-topline">
        <Badge accent={item.accent}>{item.tag}</Badge>
        <IconChip accent={item.accent} icon="book" />
      </div>
      <h3 title={item.subject}>{item.subject}</h3>
      <p>{item.meta}</p>
      <ProgressBar value={item.progress} accent={item.accent} />
      <div className="split-row">
        <span>{item.tasks}</span>
        <button className="mini-button" type="button" onClick={() => actions.showDetail(item.subject, `${item.meta} are queued. Resume from ${item.progress}% complete.`, 'Continue')}>
          Continue
        </button>
      </div>
    </article>
  )
}

function ReadingItem({ item, actions }) {
  return (
    <button className="reading-item action-row" type="button" onClick={() => actions.showDetail(item.title, `${item.author} is ${item.value}% reviewed.`, 'Open reader')}>
      <ProgressRing value={item.value} size={54} stroke={6} accent={item.accent} />
      <span>
        <strong title={item.title}>{item.title}</strong>
        <small>{item.author}</small>
      </span>
      <Icon name="arrow" size={16} />
    </button>
  )
}

function ScheduleRow({ item, actions }) {
  return (
    <button className="schedule-row action-row" type="button" onClick={() => actions.navigate('calendar')}>
      <span className="mentor-avatar">{item.name.slice(0, 2)}</span>
      <span>
        <strong title={item.topic}>{item.topic}</strong>
        <small>{item.name} - {item.role}</small>
        <small>{item.time}</small>
      </span>
      <Badge accent="blue">{item.status}</Badge>
    </button>
  )
}

function WeeklyActivity() {
  return (
    <Card title="Weekly Activity" icon="trend">
      <div className="activity-widget">
        <ProgressRing value={78} size={162} stroke={12} accent="green" label="10 hrs/day" />
        <div className="mini-stats">
          <Stat label="Target" value="70h" accent="blue" />
          <Stat label="Achieved" value="55h" accent="green" />
        </div>
      </div>
    </Card>
  )
}

function TodoWidget({ actions }) {
  const [completed, setCompleted] = useState([])

  return (
    <Card title="Today's To-Do" icon="check">
      <div className="todo-list">
        {todos.map((item) => {
          const isDone = completed.includes(item.task)
          return (
            <button
              aria-pressed={isDone}
              className={`todo-row action-row ${isDone ? 'is-complete' : ''}`}
              key={item.task}
              type="button"
              onClick={() => {
                setCompleted((current) => (current.includes(item.task) ? current.filter((task) => task !== item.task) : [...current, item.task]))
                actions.notify(isDone ? 'Task reopened' : 'Task marked complete')
              }}
            >
              <IconChip accent={item.accent} icon={item.icon} />
              <span>
                <strong title={item.task}>{item.task}</strong>
                <small>{item.time}</small>
              </span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}

function AttendancePage({ actions }) {
  return (
    <div className="page-grid">
      <section className="main-feed">
        <div className="attendance-hero">
          <Card className="attendance-ring-card">
            <div className="overall-attendance">
              <ProgressRing value={82} size={178} stroke={14} accent="green" label="Overall" />
              <div>
                <p className="eyebrow">Attendance health</p>
                <h2>82% overall attendance</h2>
                <Badge accent="green">Safe zone</Badge>
                <p>Attend 6 of your next 7 classes to keep a comfortable buffer above 75%.</p>
              </div>
            </div>
          </Card>
          <div className="quick-stat-stack">
            <StatCard label="This week" value="18/20" accent="blue" />
            <StatCard label="Current streak" value="9 days" accent="green" />
          </div>
        </div>
        <Card title="Subject Attendance" icon="check">
          <div className="subject-list">
            {subjects.map((subject) => (
              <SubjectRow key={subject.name} subject={subject} />
            ))}
          </div>
        </Card>
        <Card title="Monthly Calendar" icon="calendar">
          <CalendarHeatmap />
        </Card>
      </section>
      <RightRail>
        <Card title="This Month" icon="trend">
          <div className="month-stats">
            <Stat label="Attended" value="73" accent="green" />
            <Stat label="Missed" value="8" accent="danger" />
            <Stat label="Avg." value="82%" accent="blue" />
          </div>
        </Card>
        <AlertCard actions={actions} />
      </RightRail>
    </div>
  )
}

function SubjectRow({ subject }) {
  const value = Math.round((subject.attended / subject.total) * 100)
  const accent = value >= 75 ? 'green' : value >= 65 ? 'gold' : 'danger'
  const label = value >= 75 ? 'Safe' : value >= 65 ? 'Borderline' : 'At risk'

  return (
    <div className="subject-row">
      <div>
        <strong>{subject.name}</strong>
        <span>{subject.attended}/{subject.total} classes - {subject.streak}</span>
      </div>
      <div className="subject-progress">
        <span>{value}%</span>
        <ProgressBar value={value} accent={accent} />
      </div>
      <Badge accent={accent}>{label}</Badge>
    </div>
  )
}

function CalendarHeatmap() {
  const [monthIndex, setMonthIndex] = useState(1)
  const months = ['June 2026', 'July 2026', 'August 2026']
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const monthLabel = months[monthIndex]
  const statusCopy = {
    present: 'Present - Physics, Chemistry',
    partial: 'Partial - Physics only',
    absent: 'Absent - Biology, Maths',
    holiday: 'Holiday',
  }

  return (
    <div className="heatmap-wrap">
      <div className="calendar-toolbar">
        <button className="icon-button" type="button" aria-label="Previous month" onClick={() => setMonthIndex((index) => Math.max(0, index - 1))} disabled={monthIndex === 0}>
          <Icon name="arrow" size={16} />
        </button>
        <strong>{monthLabel}</strong>
        <button className="icon-button next" type="button" aria-label="Next month" onClick={() => setMonthIndex((index) => Math.min(months.length - 1, index + 1))} disabled={monthIndex === months.length - 1}>
          <Icon name="arrow" size={16} />
        </button>
      </div>
      <div className="weekday-row" aria-hidden="true">
        {weekdays.map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="heatmap-grid" aria-label={`${monthLabel} attendance calendar`}>
        {heatmap.map((status, index) => {
          const day = index + 1
          const title = `${monthLabel.split(' ')[0]} ${day} - ${statusCopy[status]}`
          return (
            <button className={`heat-cell ${status} ${monthLabel === 'July 2026' && day === 11 ? 'is-today' : ''}`} key={`${status}-${index}`} type="button" title={title} aria-label={title}>
              {day}
            </button>
          )
        })}
      </div>
      <div className="legend-row">
        <span><i className="present" /> Present</span>
        <span><i className="partial" /> Partial</span>
        <span><i className="absent" /> Absent</span>
        <span><i className="holiday" /> Holiday</span>
      </div>
    </div>
  )
}

function AlertCard({ actions }) {
  return (
    <article className="alert-card">
      <Badge accent="danger">Attention</Badge>
      <h3>Biology needs recovery</h3>
      <p>Attend the next 5 Biology classes to move back into the safe attendance zone.</p>
      <button className="dark-pill" type="button" onClick={() => actions.showDetail('Recovery plan', 'Biology recovery adds three weekday classes and two weekend lab sessions.', 'Add to calendar')}>
        Plan recovery
      </button>
    </article>
  )
}

function NotesPage({ actions }) {
  const filters = ['All', 'Physics', 'Chemistry', 'Maths', 'Biology', 'General']
  const [search, setSearch] = useState(queryValue('notes_q'))
  const [activeFilter, setActiveFilter] = useState(queryValue('note_subject', 'All'))
  const debouncedSearch = useDebouncedValue(search)
  const filteredNotes = useMemo(() => {
    const normalized = debouncedSearch.trim().toLowerCase()
    return notes.filter((note) => {
      const matchesSearch = !normalized || `${note.title} ${note.subject} ${note.type}`.toLowerCase().includes(normalized)
      const matchesFilter = activeFilter === 'All' || note.subject === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [activeFilter, debouncedSearch])
  const recent = filteredNotes.slice(0, 3)
  const filterCount = (activeFilter === 'All' ? 0 : 1) + (debouncedSearch ? 1 : 0)

  useEffect(() => {
    replaceQuery({ notes_q: search, note_subject: activeFilter })
  }, [activeFilter, search])

  const resetFilters = () => {
    setSearch('')
    setActiveFilter('All')
  }

  return (
    <div className="page-grid">
      <section className="main-feed">
        <div className="filter-toolbar">
          <label className="search-pill page-search">
            <Icon name="search" size={18} />
            <input
              aria-label="Search notes by title, subject, or type"
              type="search"
              value={search}
              placeholder="Search notes by title or subject"
              onChange={(event) => setSearch(event.target.value)}
            />
            {search ? (
              <button className="clear-button" type="button" aria-label="Clear notes search" onClick={() => setSearch('')}>
                <Icon name="close" size={15} />
              </button>
            ) : null}
          </label>
          <div className="chip-row" aria-label="Filter notes by subject">
            {filters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter}
                className={`filter-chip ${activeFilter === filter ? 'is-active' : ''}`}
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="filter-summary">
            <span>{filteredNotes.length} notes</span>
            {filterCount ? <Badge accent="blue">{filterCount} filters</Badge> : null}
            {filterCount ? <button className="text-action compact" type="button" onClick={resetFilters}>Reset</button> : null}
          </div>
        </div>
        <SectionHeader title="Recently Added" action="Sort by date" onAction={() => actions.notify('Notes sorted by most recent')} />
        {recent.length ? (
          <div className="recent-row">
            {recent.map((note) => (
              <RecentNote key={note.title} note={note} />
            ))}
          </div>
        ) : (
          <EmptyState title="No recent notes match" text="Clear filters or upload a new study file." action="Clear filters" onAction={resetFilters} />
        )}
        <SectionHeader title="All Notes" action="Grid view" onAction={() => actions.notify('Grid view is active')} />
        {filteredNotes.length ? (
          <div className="note-grid">
            {filteredNotes.map((note) => (
              <NoteCard key={note.title} note={note} actions={actions} />
            ))}
          </div>
        ) : (
          <EmptyState title="No notes found" text="Try another keyword or subject filter." action="Reset filters" onAction={resetFilters} />
        )}
      </section>
      <RightRail>
        <UploadWidget actions={actions} />
        <Card title="Pinned Notes" icon="note">
          <div className="pinned-list">
            {notes.filter((note) => note.pinned).map((note) => (
              <button className="compact-row action-row" key={note.title} type="button" onClick={() => actions.showDetail(note.title, `${note.subject} note, ${note.pages} pages.`, 'Open note')}>
                <IconChip accent={note.accent} icon="file" />
                <span>
                  <strong title={note.title}>{note.title}</strong>
                  <small>{note.subject}</small>
                </span>
              </button>
            ))}
          </div>
        </Card>
      </RightRail>
    </div>
  )
}

function RecentNote({ note }) {
  return (
    <article className={`recent-note gradient-card ${note.accent}`}>
      <Badge accent={note.accent}>{note.subject}</Badge>
      <h3 title={note.title}>{note.title}</h3>
      <span>{note.pages} pages - {note.date}</span>
    </article>
  )
}

function NoteCard({ note, actions }) {
  return (
    <article className="note-card">
      <div className="card-topline">
        <IconChip accent={note.accent} icon="file" />
        <Badge accent={note.accent}>{note.subject}</Badge>
      </div>
      <h3 title={note.title}>{note.title}</h3>
      <div className="note-meta">
        <span>{note.type}</span>
        <span>{note.pages} pages</span>
        <span>{note.date}</span>
      </div>
      <button className="ghost-button" type="button" onClick={() => actions.showDetail(note.title, `${note.subject} ${note.type} with ${note.pages} pages. Last update: ${note.date}.`, 'Open note')}>
        Open note
      </button>
    </article>
  )
}

function UploadWidget({ actions }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const allowedTypes = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'xls', 'xlsx']

  useEffect(() => {
    if (!files.length || error) return undefined
    const steps = [38, 72, 100]
    const timers = steps.map((step, index) => window.setTimeout(() => setProgress(step), 380 * (index + 1)))
    const done = window.setTimeout(() => actions.notify(`${files.length} file${files.length > 1 ? 's' : ''} uploaded`), 1500)
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      window.clearTimeout(done)
    }
  }, [actions, error, files])

  const acceptFiles = (fileList) => {
    const selected = Array.from(fileList)
    const invalid = selected.find((file) => {
      const extension = file.name.split('.').pop().toLowerCase()
      return !allowedTypes.includes(extension) || file.size > 25 * 1024 * 1024
    })
    if (invalid) {
      setFiles([])
      setProgress(0)
      setError('Upload failed. Use PDF, DOC, image, or sheet files under 25 MB.')
      return
    }
    setError('')
    setProgress(12)
    setFiles(selected)
  }

  return (
    <Card title="Quick Upload" icon="upload">
      <div
        className={`upload-zone ${dragging ? 'is-dragging' : ''} ${error ? 'has-error' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          acceptFiles(event.dataTransfer.files)
        }}
      >
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xls,.xlsx"
          onChange={(event) => acceptFiles(event.target.files)}
        />
        <IconChip accent={error ? 'danger' : 'blue'} icon="upload" />
        <strong>Drop study files here</strong>
        <span>PDF, DOC, image, or sheet up to 25 MB</span>
        <button className="ghost-button" type="button" onClick={(event) => {
          event.stopPropagation()
          inputRef.current?.click()
        }}>
          Browse files
        </button>
      </div>
      {error ? <p className="inline-error">{error}</p> : null}
      {files.length ? (
        <div className="upload-list">
          {files.map((file) => (
            <div className="upload-file" key={`${file.name}-${file.size}`}>
              <span title={file.name}>{file.name}</span>
              <small>{progress === 100 ? 'Uploaded' : `${progress}%`}</small>
            </div>
          ))}
        </div>
      ) : null}
      <div className="storage-line">
        <span>Storage used</span>
        <strong>6.8 / 10 GB</strong>
      </div>
      <ProgressBar value={files.length ? Math.max(68, progress) : 68} accent={error ? 'danger' : 'blue'} />
    </Card>
  )
}

function PYQPage({ actions }) {
  const [subject, setSubject] = useState(queryValue('pyq_subject', 'All'))
  const [year, setYear] = useState(queryValue('pyq_year', 'All'))
  const [exam, setExam] = useState(queryValue('pyq_exam', 'All'))
  const filteredPyqs = pyqs.filter((pyq) => (
    (subject === 'All' || pyq.subject === subject) &&
    (year === 'All' || pyq.year === year) &&
    (exam === 'All' || pyq.exam === exam)
  ))
  const activeCount = [subject, year, exam].filter((value) => value !== 'All').length
  const resetFilters = () => {
    setSubject('All')
    setYear('All')
    setExam('All')
  }

  useEffect(() => {
    replaceQuery({ pyq_subject: subject, pyq_year: year, pyq_exam: exam })
  }, [exam, subject, year])

  return (
    <div className="page-grid">
      <section className="main-feed">
        <div className="filter-toolbar pyq-toolbar">
          <SelectFilter label="Subject" value={subject} options={['All', 'Physics', 'Chemistry', 'Maths', 'Biology']} onChange={setSubject} />
          <SelectFilter label="Year" value={year} options={['All', '2025', '2024', '2023']} onChange={setYear} />
          <SelectFilter label="Exam type" value={exam} options={['All', 'JEE Main', 'JEE Adv', 'NEET', 'CUET', 'Boards']} onChange={setExam} />
          <div className="filter-summary">
            <span>{filteredPyqs.length} sets</span>
            {activeCount ? <Badge accent="blue">{activeCount} filters</Badge> : null}
            {activeCount ? <button className="text-action compact" type="button" onClick={resetFilters}>Reset</button> : null}
          </div>
        </div>
        {filteredPyqs.length ? (
          <div className="pyq-grid">
            {filteredPyqs.map((pyq) => (
              <PYQCard key={`${pyq.exam}-${pyq.year}-${pyq.subject}`} pyq={pyq} actions={actions} />
            ))}
          </div>
        ) : (
          <EmptyState title="No PYQ sets match" text="Reset filters or choose a broader year or exam type." action="Reset filters" onAction={resetFilters} />
        )}
      </section>
      <RightRail>
        <PracticeStreak />
        <Card title="Most Attempted" icon="trend">
          <div className="compact-list">
            {pyqs.slice(0, 4).map((pyq) => (
              <button className="compact-row action-row" key={`${pyq.exam}-${pyq.subject}`} type="button" onClick={() => actions.showDetail(`${pyq.subject} ${pyq.year}`, `${pyq.exam}: ${pyq.solved}/${pyq.questions} solved.`, 'View set')}>
                <IconChip accent={pyq.accent} icon="archive" />
                <span>
                  <strong>{pyq.subject} {pyq.year}</strong>
                  <small>{pyq.exam} - {pyq.solved}/{pyq.questions} solved</small>
                </span>
              </button>
            ))}
          </div>
        </Card>
      </RightRail>
    </div>
  )
}

function SelectFilter({ label, value, options, onChange }) {
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

function PYQCard({ pyq, actions }) {
  const value = Math.round((pyq.solved / pyq.questions) * 100)
  const difficultyAccent = pyq.difficulty === 'Easy' ? 'green' : pyq.difficulty === 'Medium' ? 'gold' : 'danger'

  return (
    <article className="pyq-card">
      <div className="card-topline">
        <Badge accent="blue">{pyq.exam} - {pyq.year}</Badge>
        <Badge accent={difficultyAccent}>{pyq.difficulty}</Badge>
      </div>
      <h3>{pyq.subject}</h3>
      <p>{pyq.questions} questions curated for timed practice.</p>
      <div className="pyq-progress">
        <ProgressRing value={value} size={76} stroke={7} accent={pyq.accent} />
        <div>
          <strong>{pyq.solved}/{pyq.questions}</strong>
          <span>Solved</span>
        </div>
      </div>
      <div className="split-row">
        <button className="ghost-button" type="button" onClick={() => actions.showDetail(`${pyq.subject} ${pyq.year}`, `${pyq.exam} ${pyq.difficulty.toLowerCase()} set with ${pyq.questions} questions.`, 'Start practice')}>
          View
        </button>
        <button className="mini-button" type="button" onClick={() => actions.notify(`${pyq.exam} ${pyq.year} ${pyq.subject} download started`)}>
          Download
        </button>
      </div>
    </article>
  )
}

function PracticeStreak() {
  return (
    <article className="practice-card gradient-card gold">
      <IconChip accent="gold" icon="flame" />
      <p className="eyebrow">Practice streak</p>
      <h3>14 days</h3>
      <p>One more solved set today keeps your weekly score above target.</p>
      <ProgressBar value={86} accent="gold" />
    </article>
  )
}

function CalendarPage({ actions }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [events, setEvents] = useState(calendarEvents)
  const [selectedEvent, setSelectedEvent] = useState(calendarEvents[0])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [form, setForm] = useState({ title: 'Focused revision', date: 'Thu 16', time: '07:00 PM', duration: '45 min', reminder: '15 min before', accent: 'blue' })
  const weekLabel = weekOffset === 0 ? 'Jul 13 - Jul 19' : weekOffset > 0 ? 'Jul 20 - Jul 26' : 'Jul 6 - Jul 12'
  const conflict = events.some((event) => event.date === form.date && event.time === form.time)

  const saveSession = (event) => {
    event.preventDefault()
    if (conflict) {
      actions.notify('Session conflicts with an existing event', 'error')
      return
    }
    const next = { ...form }
    setEvents((items) => [...items, next])
    setSelectedEvent(next)
    setDrawerOpen(false)
    actions.notify('Session added to calendar')
  }

  return (
    <div className="page-grid">
      <section className="main-feed">
        <section className="hero-banner gradient-card green">
          <div>
            <p className="eyebrow">Study calendar</p>
            <h2>Plan the week before it plans you.</h2>
            <p>Keep mentor calls, mock tests, attendance recovery, and PYQ sessions in one calm view.</p>
            <button className="dark-pill" type="button" onClick={() => setDrawerOpen(true)}>
              Add session
            </button>
          </div>
          <div className="calendar-stack" aria-hidden="true">
            <span>Mon</span>
            <strong>13</strong>
          </div>
        </section>
        <Card title="This Week" icon="calendar">
          <div className="calendar-toolbar">
            <button className="icon-button" type="button" aria-label="Previous week" onClick={() => setWeekOffset((offset) => offset - 1)}>
              <Icon name="arrow" size={16} />
            </button>
            <strong>{weekLabel}</strong>
            <button className="icon-button next" type="button" aria-label="Next week" onClick={() => setWeekOffset((offset) => offset + 1)}>
              <Icon name="arrow" size={16} />
            </button>
          </div>
          {events.length ? (
            <div className="calendar-event-list">
              {events.map((event) => (
                <button className={`calendar-event action-row ${selectedEvent?.title === event.title ? 'is-selected' : ''}`} key={`${event.title}-${event.date}-${event.time}`} type="button" onClick={() => setSelectedEvent(event)}>
                  <Badge accent={event.accent}>{event.date}</Badge>
                  <span>
                    <strong title={event.title}>{event.title}</strong>
                    <small>{event.time} - {event.duration}</small>
                  </span>
                  <Icon name="arrow" size={16} />
                </button>
              ))}
            </div>
          ) : (
            <EmptyState title="No calendar items" text="Add a study session to protect focused time." action="Add session" onAction={() => setDrawerOpen(true)} />
          )}
        </Card>
      </section>
      <RightRail>
        <Card title="Event Detail" icon="calendar">
          {selectedEvent ? (
            <div className="event-detail">
              <Badge accent={selectedEvent.accent}>{selectedEvent.date}</Badge>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.time} - {selectedEvent.duration}</p>
              <span>{selectedEvent.reminder}</span>
            </div>
          ) : (
            <EmptyState title="No event selected" text="Select an event to review the plan." />
          )}
        </Card>
        <TodoWidget actions={actions} />
      </RightRail>
      {drawerOpen ? (
        <div className="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="add-session-title">
          <div className="drawer-head">
            <h2 id="add-session-title">Add session</h2>
            <button className="icon-button" type="button" aria-label="Close add session" onClick={() => setDrawerOpen(false)}>
              <Icon name="close" size={16} />
            </button>
          </div>
          <form className="session-form" onSubmit={saveSession}>
            <label>
              <span>Subject</span>
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
            </label>
            <label>
              <span>Date</span>
              <select value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })}>
                {['Mon 13', 'Tue 14', 'Wed 15', 'Thu 16', 'Fri 17', 'Sat 18'].map((day) => <option key={day}>{day}</option>)}
              </select>
            </label>
            <label>
              <span>Time</span>
              <input value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} required />
            </label>
            <label>
              <span>Duration</span>
              <select value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })}>
                {['30 min', '45 min', '60 min', '90 min'].map((duration) => <option key={duration}>{duration}</option>)}
              </select>
            </label>
            <label>
              <span>Reminder</span>
              <select value={form.reminder} onChange={(event) => setForm({ ...form, reminder: event.target.value })}>
                {['10 min before', '15 min before', '30 min before', '1 hour before'].map((reminder) => <option key={reminder}>{reminder}</option>)}
              </select>
            </label>
            {conflict ? <p className="inline-error">This overlaps an existing calendar item. Choose another slot.</p> : null}
            <button className="dark-pill" type="submit" disabled={conflict}>Save session</button>
          </form>
        </div>
      ) : null}
    </div>
  )
}

function RightRail({ children }) {
  return <aside className="right-rail">{children}</aside>
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <button className="text-action" type="button" onClick={onAction}>
        {action}
      </button>
    </div>
  )
}

function Card({ title, icon, children, className = '' }) {
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

function IconChip({ accent = 'blue', icon }) {
  return (
    <span className={`icon-chip ${accent}`}>
      <Icon name={icon} size={18} />
    </span>
  )
}

function Badge({ accent = 'blue', children }) {
  return <span className={`badge ${accent}`}>{children}</span>
}

function ProgressBar({ value, accent = 'blue' }) {
  return (
    <div className="progress-bar" aria-label={`${value}% complete`}>
      <span className={accent} style={{ width: `${value}%` }} />
    </div>
  )
}

function ProgressRing({ value, size = 90, stroke = 8, accent = 'blue', label }) {
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

function Stat({ label, value, accent }) {
  return (
    <div className="stat">
      <span className={`stat-dot ${accent}`} />
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  )
}

function StatCard({ label, value, accent }) {
  return (
    <article className={`stat-card ${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function EmptyState({ title, text, action, onAction }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <span>{text}</span>
      {action ? <button className="ghost-button" type="button" onClick={onAction}>{action}</button> : null}
    </div>
  )
}

function TopPanel({ title, action, onAction, onClose, children }) {
  return (
    <div className="floating-panel top-panel">
      <div className="panel-heading">
        <strong>{title}</strong>
        <div>
          {action ? <button className="text-action compact" type="button" onClick={onAction}>{action}</button> : null}
          <button className="icon-button" type="button" aria-label={`Close ${title}`} onClick={onClose}>
            <Icon name="close" size={15} />
          </button>
        </div>
      </div>
      <div className="panel-list">
        {children}
      </div>
    </div>
  )
}

function DetailPanel({ panel, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-head">
          <h2 id="detail-title">{panel.title}</h2>
          <button className="icon-button" type="button" aria-label="Close dialog" onClick={onClose}>
            <Icon name="close" size={16} />
          </button>
        </div>
        <p>{panel.body}</p>
        <button className="dark-pill" type="button" onClick={onClose}>{panel.actionLabel ?? 'Done'}</button>
      </section>
    </div>
  )
}

function Toast({ toast }) {
  return (
    <div className={`toast ${toast.tone === 'error' ? 'error' : ''}`} role="status">
      {toast.message}
    </div>
  )
}

export default App
