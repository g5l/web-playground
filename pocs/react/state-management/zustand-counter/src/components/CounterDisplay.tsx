import { useCounter } from '../store/useCounter'

export function CounterDisplay() {
  const count = useCounter((state) => state.count)
  return <h2>Current Count: {count}</h2>
}