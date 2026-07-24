import heroImage from '../../assets/hero.png'
import { Badge } from '../ui/Badge'
import { GoogleButton } from '../ui/GoogleButton'
import { IconChip } from '../ui/IconChip'
import { Stat } from '../ui/Stat'

export function HomePage({ onGoogleAuth, onNavigate }) {
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
