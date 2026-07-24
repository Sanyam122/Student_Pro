export const accentMap = {
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

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'attendance', label: 'Attendance', icon: 'check' },
  { id: 'notes', label: 'Notes', icon: 'note' },
  { id: 'pyqs', label: "PYQ's", icon: 'archive' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
]

export const pageIds = navItems.map((item) => item.id)
export const publicPageIds = ['home', 'login', 'signin']
export const routeIds = [...publicPageIds, ...pageIds]
