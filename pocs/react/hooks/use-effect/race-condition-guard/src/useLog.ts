 import { useCallback, useState } from 'react'

export interface LogEntry {
  id: number
  message: string
  kind: 'info' | 'warn' | 'success'
}

let seq = 0

export function useLog() {
  const [entries, setEntries] = useState<LogEntry[]>([])

  const log = useCallback((message: string, kind: LogEntry['kind'] = 'info') => {
    setEntries((prev) => [
      { id: seq++, message, kind },
      ...prev.slice(0, 19),
    ])
  }, [])

  const clear = useCallback(() => setEntries([]), [])

  return { entries, log, clear }
}
