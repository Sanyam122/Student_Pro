import { calendarEvents, calendarWeeks } from '../../data/content'
import { useMemo, useState } from 'react'
import { Icon } from '../Icon'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { RightRail } from '../ui/RightRail'
import { TodoWidget } from '../features/shared/Widgets'

const WEEK_OFFSETS = [-1, 0, 1]

export function CalendarPage({ actions }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [events, setEvents] = useState(calendarEvents)
  const [selectedEvent, setSelectedEvent] = useState(calendarEvents[0])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [form, setForm] = useState({ title: 'Focused revision', date: 'Thu 16', time: '07:00 PM', duration: '45 min', reminder: '15 min before', accent: 'blue' })

  const week = calendarWeeks[weekOffset] ?? calendarWeeks[0]
  const weekLabel = week.label
  const weekEvents = useMemo(
    () => events.filter((event) => week.dates.includes(event.date)),
    [events, week.dates],
  )

  const visibleEvent = weekEvents.some(
    (event) => event.title === selectedEvent?.title && event.date === selectedEvent?.date,
  )
    ? selectedEvent
    : weekEvents[0] ?? null

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
            <button
              className="icon-button"
              type="button"
              aria-label="Previous week"
              onClick={() => setWeekOffset((offset) => Math.max(WEEK_OFFSETS[0], offset - 1))}
              disabled={weekOffset <= WEEK_OFFSETS[0]}
            >
              <Icon name="arrow" size={16} />
            </button>
            <strong>{weekLabel}</strong>
            <button
              className="icon-button next"
              type="button"
              aria-label="Next week"
              onClick={() => setWeekOffset((offset) => Math.min(WEEK_OFFSETS[WEEK_OFFSETS.length - 1], offset + 1))}
              disabled={weekOffset >= WEEK_OFFSETS[WEEK_OFFSETS.length - 1]}
            >
              <Icon name="arrow" size={16} />
            </button>
          </div>
          {weekEvents.length ? (
            <div className="calendar-event-list">
              {weekEvents.map((event) => (
                <button
                  className={`calendar-event action-row ${visibleEvent?.title === event.title && visibleEvent?.date === event.date ? 'is-selected' : ''}`}
                  key={`${event.title}-${event.date}-${event.time}`}
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                >
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
          {visibleEvent ? (
            <div className="event-detail">
              <Badge accent={visibleEvent.accent}>{visibleEvent.date}</Badge>
              <h3>{visibleEvent.title}</h3>
              <p>{visibleEvent.time} - {visibleEvent.duration}</p>
              <span>{visibleEvent.reminder}</span>
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
              <span>Title</span>
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
            </label>
            <label>
              <span>Date</span>
              <select
                value={week.dates.includes(form.date) ? form.date : week.dates[0]}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
              >
                {week.dates.map((day) => <option key={day} value={day}>{day}</option>)}
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
