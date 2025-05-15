import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

export function CounterDisplay() {
  const count = useSelector((state: RootState) => state.counter.value)

  return <h2>Current Count: {count}</h2>
}
