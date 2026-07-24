import { calendarEvents, notes, pyqs, schedule, todos } from '../data/content'

export function getSearchResults(query) {
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
