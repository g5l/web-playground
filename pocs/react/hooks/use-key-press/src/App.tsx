import { useKeyPress } from './useKeyPress'

interface KeyCapProps {
  label: string
  keyName: string
}

function KeyCap({ label, keyName }: KeyCapProps) {
  const pressed = useKeyPress(keyName)
  return <div className={`keycap ${pressed ? 'keycap-active' : ''}`}>{label}</div>
}

function CommonKeysDemo() {
  return (
    <div className="card">
      <h2>Common keys</h2>
      <p className="hint">
        Press any of the keys below. Each <code>KeyCap</code> calls{' '}
        <code>useKeyPress</code> independently.
      </p>
      <div className="row">
        <KeyCap label="Enter" keyName="Enter" />
        <KeyCap label="Esc" keyName="Escape" />
        <KeyCap label="Space" keyName=" " />
        <KeyCap label="Tab" keyName="Tab" />
      </div>
    </div>
  )
}

function ArrowPadDemo() {
  return (
    <div className="card">
      <h2>Arrow keys</h2>
      <p className="hint">Hold an arrow key to see it light up.</p>
      <div className="arrow-pad">
        <div className="arrow-top">
          <KeyCap label="↑" keyName="ArrowUp" />
        </div>
        <div className="arrow-bottom">
          <KeyCap label="←" keyName="ArrowLeft" />
          <KeyCap label="↓" keyName="ArrowDown" />
          <KeyCap label="→" keyName="ArrowRight" />
        </div>
      </div>
    </div>
  )
}

function ModifiersDemo() {
  return (
    <div className="card">
      <h2>Modifier keys</h2>
      <p className="hint">
        Four separate <code>useKeyPress</code> instances update independently
        — there is no shared state between them.
      </p>
      <div className="row">
        <KeyCap label="Shift" keyName="Shift" />
        <KeyCap label="Ctrl" keyName="Control" />
        <KeyCap label="Alt" keyName="Alt" />
        <KeyCap label="Cmd" keyName="Meta" />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <main>
      <h1>useKeyPress</h1>
      <p>
        A custom hook that returns <code>true</code> while a specific key is
        held down. Internally it attaches <code>keydown</code> /{' '}
        <code>keyup</code> listeners to <code>window</code> and removes them on
        unmount.
      </p>
      <CommonKeysDemo />
      <ArrowPadDemo />
      <ModifiersDemo />
    </main>
  )
}
