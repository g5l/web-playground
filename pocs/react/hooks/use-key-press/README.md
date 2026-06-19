# useKeyPress

A minimal React hook that returns `true` while a specific keyboard key is held down.

## Hook signature

```ts
function useKeyPress(targetKey: string): boolean
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `targetKey` | `string` | The `KeyboardEvent.key` value to watch |

Returns `true` while the key is held, `false` otherwise.

## How it works

Attaches `keydown` and `keyup` listeners to `window`. When the pressed key matches `targetKey`, it flips a boolean state. Listeners are removed on unmount via the `useEffect` cleanup function.

```ts
export function useKeyPress(targetKey: string): boolean {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.key === targetKey) setPressed(true)
    }
    const onUp = (e: KeyboardEvent) => {
      if (e.key === targetKey) setPressed(false)
    }

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)

    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [targetKey])

  return pressed
}
```

## Usage

```tsx
function Component() {
  const isEnterPressed = useKeyPress('Enter')
  return <p>{isEnterPressed ? 'Enter is held' : 'Press Enter'}</p>
}
```

Multiple instances are completely independent — each manages its own listeners and state:

```tsx
function ArrowControls() {
  const up = useKeyPress('ArrowUp')
  const down = useKeyPress('ArrowDown')
  const left = useKeyPress('ArrowLeft')
  const right = useKeyPress('ArrowRight')
  // ...
}
```

## Key name reference

Key names follow the [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) spec:

| Key | Value |
|-----|-------|
| Enter | `"Enter"` |
| Escape | `"Escape"` |
| Space | `" "` (one space character) |
| Arrow Up | `"ArrowUp"` |
| Arrow Down | `"ArrowDown"` |
| Arrow Left | `"ArrowLeft"` |
| Arrow Right | `"ArrowRight"` |
| Shift | `"Shift"` |
| Control | `"Control"` |
| Alt | `"Alt"` |
| Meta (Cmd/Win) | `"Meta"` |

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5176`.
