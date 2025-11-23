import React, { useState } from 'react';
import CodeCard from '@components/CodeCard';
import './MutatingStateDirectly.css';

export default function MutatingStateDirectly() {
  const [wrongItems, setWrongItems] = useState<string[]>([]);
  const addWrong = () => {
    wrongItems.push(`Item ${wrongItems.length + 1}`);
    setWrongItems(wrongItems);
  };

  const [rightItems, setRightItems] = useState<string[]>([]);
  const addRight = () => {
    setRightItems(prev => [...prev, `Item ${prev.length + 1}`]);
  };

  const reset = () => {
    setWrongItems([]);
    setRightItems([]);
  };

  return (
    <div className="anti-screen">
      <CodeCard
        title="Anti-Pattern: Mutating State Directly"
        description="Changing state objects or arrays in place prevents React from detecting updates always return new copies."
      >
        <div className="demo-row">
          <div className="panel">
            <div className="panel__title">Wrong</div>
            <button className="btn btn--wrong" onClick={addWrong}>Add item (wrong)</button>
            <ul className="list">
              {wrongItems.map((it, idx) => (<li key={idx}>{it}</li>))}
            </ul>
          </div>
          <div className="panel">
            <div className="panel__title">Correct</div>
            <button className="btn btn--right" onClick={addRight}>Add item (correct)</button>
            <ul className="list">
              {rightItems.map((it, idx) => (<li key={idx}>{it}</li>))}
            </ul>
          </div>
        </div>
        <div className="actions">
          <button className="btn" onClick={reset}>Reset</button>
        </div>
      </CodeCard>

      <CodeCard title="Why this fails">
        <p>
          React uses reference equality to detect state changes. If you mutate the existing value and pass the
          same reference to setState, React treats it as unchanged and may skip rendering. Create a new object/array.
        </p>
      </CodeCard>

      <CodeCard title="Correct Usage">
        <pre>
          {`
            // Arrays: create a new array
            setItems(prev => [...prev, newItem]);
            
            // Objects: create a new object
            setUser(prev => ({ ...prev, name: 'Ada' }));
          `}
        </pre>
      </CodeCard>
    </div>
  );
}

