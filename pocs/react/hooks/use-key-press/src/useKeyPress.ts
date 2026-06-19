import { useEffect, useState } from 'react'

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
