# useOnClickOutside

A minimal React hook that fires a callback whenever the user clicks or taps outside a referenced element.

## Hook signature

```ts
function useOnClickOutside<T extends Element>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `ref` | `RefObject<T \| null>` | Ref attached to the element to watch |
| `handler` | `(event: MouseEvent \| TouchEvent) => void` | Callback fired on an outside click or tap |

## How it works

Attaches `mousedown` and `touchstart` listeners to `document`. When an event fires and its target is not contained within `ref.current`, the handler is called. Listeners are removed on unmount via the `useEffect` cleanup function.

The handler is stored in a ref internally, so you do not need to wrap it in `useCallback` to prevent unnecessary effect re-runs.

## Usage

```tsx
function Dropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(o => !o)}>Toggle</button>
      {open && <menu>...</menu>}
    </div>
  )
}
```

The ref should wrap the entire interactive area (trigger + content), so that clicks inside the content are not treated as outside clicks.

## Run locally

```sh
npm install
npm run dev
```

Opens at `http://localhost:5177`.
