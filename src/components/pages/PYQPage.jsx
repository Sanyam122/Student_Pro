import { pyqs } from '../../data/content'
import { useEffect, useState } from 'react'
import { replaceQuery, queryValue } from '../../utils/routing'
import { IconChip } from '../ui/IconChip'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { ProgressRing } from '../ui/ProgressRing'
import { RightRail } from '../ui/RightRail'
import { SelectFilter } from '../ui/SelectFilter'
import { PracticeStreak } from '../features/shared/Widgets'

export function PYQPage({ actions }) {
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
              <button className="compact-row action-row" key={`${pyq.exam}-${pyq.year}-${pyq.subject}`} type="button" onClick={() => actions.showDetail(`${pyq.subject} ${pyq.year}`, `${pyq.exam}: ${pyq.solved}/${pyq.questions} solved.`, 'View set')}>
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
