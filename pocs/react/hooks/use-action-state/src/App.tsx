import { useActionState, useState, type FormEvent } from 'react'
import { submitFeedback, type FeedbackEntry } from './fakeApi'
import './App.css'

function getString(data: FormData, key: string): string {
  const val = data.get(key)
  return typeof val === 'string' ? val : ''
}

// ─── Panel 1: Traditional ────────────────────────────────────────────────────

function TraditionalPanel() {
  const [author, setAuthor] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<FeedbackEntry | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setResult(null)
    try {
      const entry = await submitFeedback({ author, comment })
      setResult(entry)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="panel panel-verbose">
      <div className="panel-header">
        <span className="badge badge-verbose">Traditional</span>
        <h2>useState juggling</h2>
        <p>
          Five separate <code>useState</code> calls — one each for <code>author</code>,{' '}
          <code>comment</code>, <code>isSubmitting</code>, <code>error</code>, and{' '}
          <code>result</code>. Requires a controlled form, manual <code>e.preventDefault()</code>,
          and resetting <code>error</code> and <code>result</code> before each submission.
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </label>
        <label>
          Comment
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="At least 10 characters..."
            rows={4}
            disabled={isSubmitting}
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      {error && <p className="status status-error">{error}</p>}
      {result && (
        <p className="status status-success">
          Entry <strong>#{result.id}</strong> by {result.author} at {result.submittedAt}.
        </p>
      )}

      <div className="debug-box">
        <span className="debug-label">5 state variables</span>
        <div className="debug-rows">
          <span className="debug-key">isSubmitting</span>
          <span className="debug-val">{String(isSubmitting)}</span>
          <span className="debug-key">error</span>
          <span className="debug-val">{error ?? 'null'}</span>
          <span className="debug-key">result</span>
          <span className="debug-val">{result ? `#${result.id}` : 'null'}</span>
          <span className="debug-key">author</span>
          <span className="debug-val">"{author || ''}"</span>
          <span className="debug-key">comment</span>
          <span className="debug-val">"{comment.slice(0, 18)}{comment.length > 18 ? '…' : ''}"</span>
        </div>
      </div>
    </div>
  )
}

// ─── Panel 2: useActionState (basic) ─────────────────────────────────────────

type BasicState =
  | { status: 'idle' }
  | { status: 'success'; entry: FeedbackEntry; formKey: number }
  | { status: 'error'; message: string; formKey: number }

async function basicAction(prev: BasicState, data: FormData): Promise<BasicState> {
  const formKey = prev.status !== 'idle' ? prev.formKey : 0
  const author = getString(data, 'author')
  const comment = getString(data, 'comment')
  try {
    const entry = await submitFeedback({ author, comment })
    return { status: 'success', entry, formKey: formKey + 1 }
  } catch (err) {
    return { status: 'error', message: (err as Error).message, formKey }
  }
}

function ActionStatePanel() {
  const [state, dispatch, isPending] = useActionState(basicAction, { status: 'idle' })
  const formKey = state.status !== 'idle' ? state.formKey : 0

  return (
    <div className="panel panel-clean">
      <div className="panel-header">
        <span className="badge badge-clean">useActionState</span>
        <h2>Single typed state</h2>
        <p>
          One <code>useActionState</code> call. <code>isPending</code> is provided automatically.
          The form uses the native <code>action</code> attribute — no <code>e.preventDefault()</code>,
          no controlled inputs, no manual loading flag. The action returns the next state directly.
        </p>
      </div>

      <form key={formKey} className="form" action={dispatch}>
        <label>
          Author
          <input type="text" name="author" placeholder="Your name" disabled={isPending} />
        </label>
        <label>
          Comment
          <textarea name="comment" placeholder="At least 10 characters..." rows={4} disabled={isPending} />
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      {state.status === 'error' && <p className="status status-error">{state.message}</p>}
      {state.status === 'success' && (
        <p className="status status-success">
          Entry <strong>#{state.entry.id}</strong> by {state.entry.author} at{' '}
          {state.entry.submittedAt}.
        </p>
      )}

      <div className="debug-box">
        <span className="debug-label">2 values from the hook</span>
        <div className="debug-rows">
          <span className="debug-key">isPending</span>
          <span className="debug-val">{String(isPending)}</span>
          <span className="debug-key">state.status</span>
          <span className="debug-val">"{state.status}"</span>
          {state.status === 'success' && (
            <>
              <span className="debug-key">state.entry.id</span>
              <span className="debug-val">"{state.entry.id}"</span>
            </>
          )}
          {state.status === 'error' && (
            <>
              <span className="debug-key">state.message</span>
              <span className="debug-val">"{state.message.slice(0, 28)}…"</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Panel 3: prevState accumulation ─────────────────────────────────────────

type LogState = {
  entries: FeedbackEntry[]
  error: string | null
  formKey: number
}

async function logAction(prev: LogState, data: FormData): Promise<LogState> {
  const author = getString(data, 'author')
  const comment = getString(data, 'comment')
  try {
    const entry = await submitFeedback({ author, comment })
    return { entries: [...prev.entries, entry], error: null, formKey: prev.formKey + 1 }
  } catch (err) {
    return { ...prev, error: (err as Error).message }
  }
}

function AccumulationPanel() {
  const [state, dispatch, isPending] = useActionState(logAction, {
    entries: [],
    error: null,
    formKey: 0,
  })

  return (
    <div className="panel panel-advanced">
      <div className="panel-header">
        <span className="badge badge-advanced">prevState</span>
        <h2>Stateful accumulation</h2>
        <p>
          The action receives <code>prevState</code> as its first argument. On success,{' '}
          <code>[...prev.entries, newEntry]</code> builds up the log across submissions.
          The same pattern applies to pagination cursors, undo stacks, and multi-step flows.
        </p>
      </div>

      <form key={state.formKey} className="form" action={dispatch}>
        <label>
          Author
          <input type="text" name="author" placeholder="Your name" disabled={isPending} />
        </label>
        <label>
          Comment
          <textarea name="comment" placeholder="At least 10 characters..." rows={4} disabled={isPending} />
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Add to Log'}
        </button>
      </form>

      {state.error && <p className="status status-error">{state.error}</p>}

      <div className="entry-log">
        {state.entries.length === 0 ? (
          <p className="log-empty">No entries yet. Submit to start building the log.</p>
        ) : (
          state.entries.map((e, i) => (
            <div key={e.id} className="log-row">
              <span className="log-index">{i + 1}</span>
              <span className="log-id">#{e.id}</span>
              <span className="log-author">{e.author}</span>
              <span className="log-comment">
                {e.comment.slice(0, 28)}{e.comment.length > 28 ? '…' : ''}
              </span>
              <span className="log-time">{e.submittedAt}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>useActionState</h1>
        <p>
          A React 19 hook for managing async form state. It takes an action function and an
          initial state, and returns a typed state object, a dispatch function compatible with
          the native <code>form action</code> attribute, and a built-in <code>isPending</code>{' '}
          flag. The action receives <code>prevState</code> as its first argument, enabling
          stateful accumulation across submissions.
        </p>
        <pre className="signature">
          {`const [state, dispatch, isPending] = useActionState(\n  async (prevState, formData) => nextState,\n  initialState\n)`}
        </pre>
      </header>
      <div className="panels">
        <TraditionalPanel />
        <ActionStatePanel />
        <AccumulationPanel />
      </div>
    </div>
  )
}
