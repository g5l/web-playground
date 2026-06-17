import { useDebugValue, useEffect, useState } from 'react'

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Without the formatter, DevTools would show: Online: true
  // With the formatter, DevTools shows: Online: "Online" or "Offline"
  useDebugValue(isOnline, (online) => (online ? 'Online' : 'Offline'))

  return isOnline
}
