import { pageIds } from '../data/constants'

export function routeFromLocation() {
  const url = new URL(window.location.href)
  const segment = url.pathname.split('/').filter(Boolean).pop()
  const queryPage = url.searchParams.get('page')
  if (!segment) return 'home'
  if (segment === 'login' || segment === 'signin') return segment
  if (pageIds.includes(segment)) return segment
  if (pageIds.includes(queryPage)) return queryPage
  return 'home'
}

export function routeFor(routeId) {
  const url = new URL(window.location.href)
  url.search = pageIds.includes(routeId) ? url.search : ''
  url.pathname = routeId === 'home' ? '/' : `/${routeId}`
  return `${url.pathname}${url.search}`
}

export function replaceQuery(updates) {
  const url = new URL(window.location.href)
  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '' || value === 'All') {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, value)
    }
  })
  window.history.replaceState({}, '', `${url.pathname}${url.search}`)
}

export function queryValue(key, fallback = '') {
  return new URL(window.location.href).searchParams.get(key) ?? fallback
}
