import React, { Suspense, use } from 'react'
import { createRoot } from 'react-dom/client'
import { createFromFetch } from 'react-server-dom-webpack/client'

function RSCApp({ url }) {
  const content = use(createFromFetch(fetch(url, { headers: { Accept: 'text/x-component' } })))
  return content
}

function render() {
  const url = '/rsc' + window.location.search
  const rootEl = document.getElementById('root')
  const root = rootEl._root || (rootEl._root = createRoot(rootEl))
  root.render(
    React.createElement(Suspense, { fallback: React.createElement('div', { className: 'loading' }, 'Loading...') },
      React.createElement(RSCApp, { url })
    )
  )
}

render()

// Intercept GET forms to refresh RSC without full page reload
window.addEventListener('popstate', render)
document.addEventListener('submit', (e) => {
  const form = e.target
  if (!(form instanceof HTMLFormElement)) return
  const method = (form.getAttribute('method') || 'GET').toUpperCase()
  if (method !== 'GET') return // allow server to handle POST normally
  e.preventDefault()
  const data = new FormData(form)
  const params = new URLSearchParams()
  for (const [k, v] of data.entries()) params.set(k, v)
  const search = '?' + params.toString()
  history.pushState({}, '', search)
  render()
})

