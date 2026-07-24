import { learningCards, readingItems, schedule } from '../../data/content'
import { Icon } from '../Icon'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { IconChip } from '../ui/IconChip'
import { ProgressBar } from '../ui/ProgressBar'
import { ProgressRing } from '../ui/ProgressRing'
import { RightRail } from '../ui/RightRail'
import { SectionHeader } from '../ui/SectionHeader'
import { TodoWidget, WeeklyActivity } from '../features/shared/Widgets'

export function DashboardPage({ actions }) {
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
                <ScheduleRow key={item.topic} item={item} onNavigate={actions.navigate} />
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

function ScheduleRow({ item, onNavigate }) {
  return (
    <button className="schedule-row action-row" type="button" onClick={() => onNavigate('calendar')}>
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
