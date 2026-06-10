import { useEffect, useRef, useState } from 'react'
import './App.css'

type EventKind = 'mount' | 'unmount' | 'every-render' | 'dep-update' | 'cleanup'

interface LogEntry {
  id: number
  kind: EventKind
  hook: string
  message: string
}

let nextId = 0

interface ChildProps {
  label: string
  onEvent: (hook: string, message: string, kind: EventKind) => void
}

function ChildComponent({ label, onEvent }: ChildProps) {
  const [count, setCount] = useState(0)
  const renderRef = useRef(0)
  renderRef.current++

  // Fires on every render
  useEffect(() => {
    onEvent('useEffect (no deps)', `render #${renderRef.current}`, 'every-render')
    return () => {
      onEvent('useEffect (no deps)', `cleanup before render #${renderRef.current + 1}`, 'cleanup')
    }
  })

  // Fires only on mount / unmount
  useEffect(() => {
    onEvent('useEffect ([])', 'component mounted', 'mount')
    return () => {
      onEvent('useEffect ([])', 'component unmounted', 'unmount')
    }
  }, [])

  // Fires when `count` changes
  useEffect(() => {
    onEvent('useEffect ([count])', `count changed to ${count}`, 'dep-update')
    return () => {
      onEvent('useEffect ([count])', `cleanup: count was ${count}`, 'cleanup')
    }
  }, [count])

  // Fires when `label` changes
  useEffect(() => {
    onEvent('useEffect ([label])', `label changed to "${label}"`, 'dep-update')
    return () => {
      onEvent('useEffect ([label])', `cleanup: label was "${label}"`, 'cleanup')
    }
  }, [label])

  return (
    <div className="child-box">
      <div className="child-title">
        Child <span className="label-badge">{label}</span>
        <span className="render-count">render #{renderRef.current}</span>
      </div>
      <div className="child-row">
        <span>count: <strong>{count}</strong></span>
        <button onClick={() => setCount((c) => c + 1)}>count++</button>
      </div>
    </div>
  )
}

const LABELS = ['Alpha', 'Beta', 'Gamma', 'Delta']

export default function App() {
  const [mounted, setMounted] = useState(true)
  const [labelIdx, setLabelIdx] = useState(0)
  const [log, setLog] = useState<LogEntry[]>([])

  function handleEvent(hook: string, message: string, kind: EventKind) {
    setLog((prev) => [{ id: nextId++, hook, message, kind }, ...prev])
  }

  function cycleLabel() {
    setLabelIdx((i) => (i + 1) % LABELS.length)
  }

  return (
    <div className="app">
      <header>
        <h1>React Hook Lifecycle Events</h1>
        <p className="subtitle">
          Watch how <code>useEffect</code> fires during mount, update, and unmount.
          StrictMode double-invokes effects in dev so you can spot missing cleanups.
        </p>
      </header>

      <div className="main">
        <section className="controls-section">
          <h2>Controls</h2>
          <div className="controls">
            <button
              className={mounted ? 'btn-danger' : 'btn-success'}
              onClick={() => setMounted((m) => !m)}
            >
              {mounted ? 'Unmount child' : 'Mount child'}
            </button>
            <button className="btn-neutral" onClick={cycleLabel} disabled={!mounted}>
              Change label prop
            </button>
            <button className="btn-ghost" onClick={() => setLog([])}>
              Clear log
            </button>
          </div>

          <div className="legend">
            <span className="dot mount" /> mount
            <span className="dot unmount" /> unmount
            <span className="dot dep-update" /> dep update
            <span className="dot every-render" /> every render
            <span className="dot cleanup" /> cleanup
          </div>

          <div className="child-area">
            {mounted
              ? <ChildComponent label={LABELS[labelIdx]!} onEvent={handleEvent} />
              : <div className="unmounted-placeholder">Component is unmounted</div>
            }
          </div>
        </section>

        <section className="log-section">
          <h2>Event log <span className="log-count">{log.length}</span></h2>
          <div className="log">
            {log.length === 0 && (
              <div className="log-empty">Events will appear here...</div>
            )}
            {log.map((e) => (
              <div key={e.id} className={`log-entry ${e.kind}`}>
                <span className="log-hook">{e.hook}</span>
                <span className="log-msg">{e.message}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
