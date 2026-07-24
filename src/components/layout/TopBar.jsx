import { useEffect, useMemo, useState } from 'react'
import { achievements, notificationsSeed } from '../../data/content'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { queryValue, replaceQuery } from '../../utils/routing'
import { getSearchResults } from '../../utils/search'
import { Icon } from '../Icon'
import { EmptyState } from '../ui/EmptyState'
import { TopPanel } from '../ui/TopPanel'

export function TopBar({ title, actions }) {
  const [query, setQuery] = useState(queryValue('q'))
  const [activePanel, setActivePanel] = useState(null)
  const [notifications, setNotifications] = useState(notificationsSeed)
  const debouncedQuery = useDebouncedValue(query)
  const unreadCount = notifications.filter((item) => item.unread).length
  const searchResults = useMemo(() => getSearchResults(debouncedQuery), [debouncedQuery])

  useEffect(() => {
    replaceQuery({ q: query })
  }, [query])

  useEffect(() => {
    if (activePanel !== 'search') return undefined
    const onPointerDown = (event) => {
      if (!event.target.closest('.search-wrap')) {
        setActivePanel(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [activePanel])

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
