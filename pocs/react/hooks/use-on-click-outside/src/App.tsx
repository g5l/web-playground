import { useRef, useState } from 'react'
import { useOnClickOutside } from './useOnClickOutside'

function DropdownDemo() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div className="card">
      <h2>Dropdown menu</h2>
      <p className="hint">
        Click the button to open the menu. Click anywhere outside to close it.
        The ref wraps both the trigger and the menu, so clicking menu items
        does not count as an outside click.
      </p>
      <div className="dropdown" ref={ref}>
        <button className="trigger-btn" onClick={() => setOpen(o => !o)}>
          File {open ? '▲' : '▼'}
        </button>
        {open && (
          <div className="dropdown-menu">
            <button className="dropdown-item">New file</button>
            <button className="dropdown-item">Open...</button>
            <button className="dropdown-item">Save</button>
            <hr className="dropdown-divider" />
            <button className="dropdown-item dropdown-item-danger">Delete</button>
          </div>
        )}
      </div>
      <div className="row">
        <span className={`badge ${open ? 'badge-open' : 'badge-closed'}`}>
          {open ? 'open' : 'closed'}
        </span>
      </div>
    </div>
  )
}

function FocusRingDemo() {
  const [focused, setFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setFocused(false))

  return (
    <div className="card">
      <h2>Focus ring</h2>
      <p className="hint">
        Click inside the box to focus it. Click anywhere outside to blur it.
      </p>
      <div
        ref={ref}
        className={`focus-box ${focused ? 'focus-box-active' : ''}`}
        onMouseDown={() => setFocused(true)}
      >
        <span className="focus-box-label">
          {focused ? 'focused, click outside to blur' : 'click to focus'}
        </span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <main>
      <h1>useOnClickOutside</h1>
      <p>
        A custom hook that fires a callback when the user clicks or taps
        outside a referenced element. Internally it attaches{' '}
        <code>mousedown</code> and <code>touchstart</code> listeners to{' '}
        <code>document</code> and removes them on unmount.
      </p>
      <DropdownDemo />
      <FocusRingDemo />
    </main>
  )
}
