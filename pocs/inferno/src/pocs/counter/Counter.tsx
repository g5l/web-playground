import { useState } from 'inferno-hooks';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  
  return (
    <div className="counter">
      <div className="display">Count: <strong>{count}</strong></div>
      
      <div className="controls">
        <button onClick={() => setCount(c => c - step)}>-{step}</button>
        <button onClick={() => setCount(c => c + step)}>+{step}</button>
        
        <label>
          Step:
          <input
            type="number"
            value={step}
            onInput={(e: any) => setStep(Number(e.target.value) || 1)}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
        
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}