import { todos } from '../../../data/content'
import { useState } from 'react'
import { Card } from '../../ui/Card'
import { IconChip } from '../../ui/IconChip'
import { ProgressBar } from '../../ui/ProgressBar'
import { ProgressRing } from '../../ui/ProgressRing'
import { Stat } from '../../ui/Stat'

export function WeeklyActivity() {
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

export function TodoWidget({ actions }) {
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

export function PracticeStreak() {
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
