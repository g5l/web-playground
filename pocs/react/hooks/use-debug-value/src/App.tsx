import { useFormField } from './useFormField'
import { useOnlineStatus } from './useOnlineStatus'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isNonEmpty = (v: string) => v.trim().length >= 3

function StatusIndicator() {
  const isOnline = useOnlineStatus()

  return (
    <div className="card">
      <h2>useOnlineStatus</h2>
      <p className="hint">
        Inspect this component in React DevTools. The hook label shows{' '}
        <code>"Online"</code> or <code>"Offline"</code> instead of a raw
        boolean, thanks to the formatter passed to <code>useDebugValue</code>.
      </p>
      <div className="row">
        <span className={`badge ${isOnline ? 'badge-online' : 'badge-offline'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
        <span className="hint">
          (toggle your network in DevTools Network tab to see it change)
        </span>
      </div>
    </div>
  )
}

function EmailField() {
  const email = useFormField(isEmail)

  return (
    <div className="card">
      <h2>useFormField — email</h2>
      <p className="hint">
        DevTools shows <code>"pristine"</code>, <code>"valid"</code>, or{' '}
        <code>"invalid"</code> for this field. The formatter runs lazily, only
        when DevTools is open.
      </p>
      <input
        type="text"
        value={email.value}
        onChange={(e) => email.setValue(e.target.value)}
        placeholder="Enter an email address"
      />
      {email.isDirty && (
        <span className={`badge ${email.isValid ? 'badge-online' : 'badge-offline'}`}>
          {email.isValid ? 'valid' : 'invalid'}
        </span>
      )}
    </div>
  )
}

function NameField() {
  const name = useFormField(isNonEmpty)

  return (
    <div className="card">
      <h2>useFormField — name</h2>
      <p className="hint">
        Same hook, different validator. Both instances show their own debug
        label independently in DevTools.
      </p>
      <input
        type="text"
        value={name.value}
        onChange={(e) => name.setValue(e.target.value)}
        placeholder="Enter at least 3 characters"
      />
      {name.isDirty && (
        <span className={`badge ${name.isValid ? 'badge-online' : 'badge-offline'}`}>
          {name.isValid ? 'valid' : 'invalid'}
        </span>
      )}
    </div>
  )
}

export default function App() {
  return (
    <main>
      <h1>useDebugValue</h1>
      <p>
        <code>useDebugValue</code> adds a label to custom hooks in React
        DevTools. It has no effect on runtime behavior — open DevTools and
        inspect the components below to see the labels.
      </p>
      <StatusIndicator />
      <EmailField />
      <NameField />
    </main>
  )
}
