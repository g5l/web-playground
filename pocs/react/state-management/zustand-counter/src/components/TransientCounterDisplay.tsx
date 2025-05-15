import {useEffect, useRef} from "react";
import { useCounter } from '../store/useCounter'

export const TransientCounterDisplay = () => {
  const countRef = useRef(useCounter.getState().count)

  useEffect(() => useCounter.subscribe(
    state => (countRef.current = state.count)
  ), [])
  
  return <h2>Transient Counter: {countRef.current}</h2>
} 