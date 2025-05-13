import { useCounter } from '../store/useCounter'

export function CounterControls() {
  const increment = useCounter((state) => state.increment)
  const decrement = useCounter((state) => state.decrement)

  return (
    <div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}