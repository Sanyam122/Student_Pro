export const learningCards = [
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

export const readingItems = [
  { title: 'Electrostatics Formula Sheet', author: 'Physics vault', value: 72, accent: 'blue' },
  { title: 'Modern History Mind Map', author: 'Revision desk', value: 58, accent: 'gold' },
  { title: 'Plant Physiology Notes', author: 'Bio sprint', value: 89, accent: 'green' },
]

export const schedule = [
  { name: 'Dr. Rhea Sen', role: 'Chemistry mentor', topic: 'Reaction mechanism clinic', time: 'Today, 4:30 PM', status: 'Live prep' },
  { name: 'Arjun Mehta', role: 'Math coach', topic: 'Matrices doubt room', time: 'Tomorrow, 9:00 AM', status: 'Booked' },
]

export const todos = [
  { time: '08:00 - 09:00', task: 'Revise derivatives', accent: 'blue', icon: 'clock' },
  { time: '10:30 - 11:15', task: 'Upload chemistry lab note', accent: 'green', icon: 'upload' },
  { time: '05:00 - 06:00', task: 'Solve 2023 PYQ set', accent: 'gold', icon: 'archive' },
]

export const subjects = [
  { name: 'Physics', attended: 38, total: 44, streak: '+4 this month' },
  { name: 'Chemistry', attended: 31, total: 41, streak: '2 misses' },
  { name: 'Mathematics', attended: 35, total: 46, streak: '+1 this week' },
  { name: 'Biology', attended: 24, total: 39, streak: 'Needs 5 classes' },
]

export const heatmap = Array.from({ length: 35 }, (_, index) => {
  const day = index + 1
  if ([6, 13, 20, 27, 34].includes(day)) return 'holiday'
  if ([8, 16, 24, 31].includes(day)) return 'absent'
  if ([4, 11, 18, 29].includes(day)) return 'partial'
  return 'present'
})

export const notes = [
  { title: 'Thermodynamics Quick Revision', subject: 'Physics', type: 'PDF', date: 'Edited today', pages: 18, accent: 'blue', pinned: true },
  { title: 'Coordination Compounds', subject: 'Chemistry', type: 'DOC', date: 'Yesterday', pages: 32, accent: 'green', pinned: true },
  { title: 'Trigonometry Identity Bank', subject: 'Maths', type: 'PDF', date: 'Jul 7', pages: 24, accent: 'gold', pinned: false },
  { title: 'Cell Cycle Diagrams', subject: 'Biology', type: 'IMG', date: 'Jul 4', pages: 12, accent: 'green', pinned: false },
  { title: 'Indian Polity Flash Notes', subject: 'General', type: 'PDF', date: 'Jul 1', pages: 40, accent: 'blue', pinned: false },
  { title: 'Probability Practice Sheet', subject: 'Maths', type: 'XLS', date: 'Jun 28', pages: 9, accent: 'gold', pinned: false },
]

export const pyqs = [
  { exam: 'JEE Main', year: '2025', subject: 'Physics', difficulty: 'Medium', questions: 90, solved: 67, accent: 'blue' },
  { exam: 'NEET', year: '2024', subject: 'Biology', difficulty: 'Easy', questions: 100, solved: 86, accent: 'green' },
  { exam: 'CUET', year: '2025', subject: 'Chemistry', difficulty: 'Hard', questions: 75, solved: 34, accent: 'gold' },
  { exam: 'Boards', year: '2023', subject: 'Maths', difficulty: 'Medium', questions: 60, solved: 42, accent: 'blue' },
  { exam: 'JEE Adv', year: '2024', subject: 'Maths', difficulty: 'Hard', questions: 54, solved: 21, accent: 'danger' },
  { exam: 'NEET', year: '2023', subject: 'Physics', difficulty: 'Medium', questions: 80, solved: 53, accent: 'green' },
]

export const calendarEvents = [
  { date: 'Mon 13', title: 'Chemistry mock test', time: '09:00 AM', accent: 'gold', duration: '90 min', reminder: '30 min before' },
  { date: 'Tue 14', title: 'Attendance review', time: '12:30 PM', accent: 'green', duration: '30 min', reminder: '10 min before' },
  { date: 'Wed 15', title: 'PYQ sprint room', time: '05:00 PM', accent: 'blue', duration: '60 min', reminder: '15 min before' },
  { date: 'Fri 17', title: 'Mentor checkpoint', time: '03:15 PM', accent: 'green', duration: '45 min', reminder: '30 min before' },
]

export const notificationsSeed = [
  { id: 1, title: 'Chemistry mentor starts soon', meta: 'Today, 4:05 PM', unread: true },
  { id: 2, title: 'Biology attendance dropped below target', meta: 'Yesterday', unread: true },
  { id: 3, title: '2 notes finished uploading', meta: 'Jul 10', unread: false },
]

export const achievements = [
  { title: '14-day practice streak', meta: 'Top 8% of your cohort' },
  { title: '55 study hours logged', meta: '15 hours from this week target' },
  { title: 'Organic Chemistry milestone', meta: '68% complete' },
]

export const calendarWeeks = {
  '-1': { label: 'Jul 6 - Jul 12', dates: ['Mon 6', 'Tue 7', 'Wed 8', 'Thu 9', 'Fri 10', 'Sat 11', 'Sun 12'] },
  0: { label: 'Jul 13 - Jul 19', dates: ['Mon 13', 'Tue 14', 'Wed 15', 'Thu 16', 'Fri 17', 'Sat 18', 'Sun 19'] },
  1: { label: 'Jul 20 - Jul 26', dates: ['Mon 20', 'Tue 21', 'Wed 22', 'Thu 23', 'Fri 24', 'Sat 25', 'Sun 26'] },
}
