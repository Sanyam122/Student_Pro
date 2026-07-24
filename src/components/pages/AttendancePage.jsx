import { heatmap, subjects } from '../../data/content'
import { useState } from 'react'
import { Icon } from '../Icon'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { ProgressBar } from '../ui/ProgressBar'
import { ProgressRing } from '../ui/ProgressRing'
import { RightRail } from '../ui/RightRail'
import { Stat } from '../ui/Stat'
import { StatCard } from '../ui/StatCard'

export function AttendancePage({ actions }) {
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
  const isJuly = monthIndex === 1
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
      {!isJuly ? (
        <EmptyState title="No attendance data" text={`Attendance tracking for ${monthLabel} is not available yet.`} />
      ) : (
        <>
          <div className="weekday-row" aria-hidden="true">
            {weekdays.map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="heatmap-grid" aria-label={`${monthLabel} attendance calendar`}>
            {heatmap.map((status, index) => {
              const day = index + 1
              const title = `${monthLabel.split(' ')[0]} ${day} - ${statusCopy[status]}`
              return (
                <button className={`heat-cell ${status} ${day === 11 ? 'is-today' : ''}`} key={`${status}-${index}`} type="button" title={title} aria-label={title}>
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
        </>
      )}
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
