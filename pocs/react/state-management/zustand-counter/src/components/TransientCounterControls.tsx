import { useTransientCounter } from '../store/useTransientCounter'

export const TransientCounterControls = () => {
  const { increment, decrement } = useTransientCounter()

  return (
    <div>
      <h3>Transient Counter Controls</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  )
} 