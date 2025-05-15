import { useDispatch } from 'react-redux'
import { increment, decrement } from '../features/counterSlice'
import { AppDispatch } from '../app/store'

export function CounterControls() {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
