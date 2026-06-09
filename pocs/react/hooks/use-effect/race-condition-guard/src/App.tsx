import { useEffect, useRef, useState } from 'react'
import { fakeSearch, type SearchResult } from './fakeApi'
import { useLog, type LogEntry } from './useLog'
import './App.css'

function ResultList({ results, renderedFor }: { results: SearchResult[]; renderedFor: string }) {
  if (results.length === 0) return <p className="empty">No results</p>
  return (
    <ul className="result-list">
      {results.map((r) => (
        <li key={r.id} className={r.query !== renderedFor ? 'stale' : ''}>
          {r.label}
          {r.query !== renderedFor && (
            <span className="stale-tag"> (stale: from "{r.query}")</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function EventLog({ entries }: { entries: LogEntry[] }) {
  return (
    <div className="event-log">
      {entries.length === 0 && <p className="log-empty">Events will appear here...</p>}
      {entries.map((e) => (
        <div key={e.id} className={`log-entry log-${e.kind}`}>
          {e.message}
        </div>
      ))}
    </div>
  )
}

// Panel 1: Broken (no guard)

function BrokenSearch({ query }: { query: string }) {
  const [results, setResults] = useState<SearchResult[]>([])
  const { entries, log } = useLog()

  useEffect(() => {
    if (!query) { setResults([]); return }
    log(`Fetching "${query}"...`)
    fakeSearch(query).then((data) => {
      log(`Resolved "${query}" (${data[0]?.delayMs ?? 0}ms) — painting UI`, 'warn')
      setResults(data)
    })
    // No cleanup: every response overwrites the state regardless of order.
  }, [query, log])

  return (
    <div className="panel panel-broken">
      <div className="panel-header">
        <span className="badge badge-unsafe">Broken</span>
        <h2>No guard</h2>
        <p>Older requests can resolve after newer ones and overwrite results with stale data.</p>
      </div>
      <ResultList results={results} renderedFor={query} />
      <EventLog entries={entries} />
    </div>
  )
}

// Panel 2: Fixed with AbortController

function AbortSearch({ query }: { query: string }) {
  const [results, setResults] = useState<SearchResult[]>([])
  const { entries, log } = useLog()

  useEffect(() => {
    if (!query) { setResults([]); return }
    const controller = new AbortController()
    log(`Fetching "${query}"...`)
    ;(async () => {
      try {
        const data = await fakeSearch(query, controller.signal)
        log(`Resolved "${query}" (${data[0]?.delayMs ?? 0}ms) — painting UI`, 'success')
        setResults(data)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          log(`Aborted "${query}"`, 'info')
        } else {
          throw err
        }
      }
    })()
    return () => {
      log(`Cleanup: aborting "${query}"`)
      controller.abort()
    }
  }, [query, log])

  return (
    <div className="panel panel-safe">
      <div className="panel-header">
        <span className="badge badge-safe">Safe</span>
        <h2>AbortController</h2>
        <p>The cleanup function calls <code>controller.abort()</code>, cancelling the in-flight request when the query changes.</p>
      </div>
      <ResultList results={results} renderedFor={query} />
      <EventLog entries={entries} />
    </div>
  )
}

// Panel 3: Fixed with ignore flag (for APIs that don't support abort)

function IgnoreFlagSearch({ query }: { query: string }) {
  const [results, setResults] = useState<SearchResult[]>([])
  const { entries, log } = useLog()
  // Track the request number so the log can show which fetch "won".
  const reqRef = useRef(0)

  useEffect(() => {
    if (!query) { setResults([]); return }
    let ignore = false
    const reqId = ++reqRef.current
    log(`Fetching "${query}" (req #${reqId})...`)
    fakeSearch(query).then((data) => {
      if (ignore) {
        log(`Ignored stale response for "${query}" (req #${reqId}, ${data[0]?.delayMs ?? 0}ms)`, 'info')
        return
      }
      log(`Resolved "${query}" (req #${reqId}, ${data[0]?.delayMs ?? 0}ms) — painting UI`, 'success')
      setResults(data)
    })
    return () => {
      log(`Cleanup: ignoring future response for "${query}" (req #${reqId})`)
      ignore = true
    }
  }, [query, log])

  return (
    <div className="panel panel-safe">
      <div className="panel-header">
        <span className="badge badge-safe">Safe</span>
        <h2>Ignore flag</h2>
        <p>The cleanup sets <code>ignore = true</code>. The request still completes in the background, but its result is discarded.</p>
      </div>
      <ResultList results={results} renderedFor={query} />
      <EventLog entries={entries} />
    </div>
  )
}

export default function App() {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')

  return (
    <div className="app">
      <header className="app-header">
        <h1>useEffect Race Condition Guard</h1>
        <p>
          Type a fruit name one character at a time. Short queries are artificially delayed so they
          resolve <em>after</em> longer ones, triggering the race condition in the broken panel.
        </p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="e.g. apple, berry, mango..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setQuery(e.target.value)
            }}
          />
        </div>
      </header>

      <div className="panels">
        <BrokenSearch query={query} />
        <AbortSearch query={query} />
        <IgnoreFlagSearch query={query} />
      </div>
    </div>
  )
}
