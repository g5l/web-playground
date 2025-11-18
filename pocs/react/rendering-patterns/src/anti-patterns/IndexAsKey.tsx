import React, { useMemo, useState } from 'react';
import CodeCard from '@components/CodeCard';
import './IndexAsKey.css';

type Item = { id: string; name: string };

function EditableRow({ label }: { label: string }) {
  const [value, setValue] = useState(label);
  return (
    <div className="row">
      <span className="row__label">{label}</span>
      <input
        className="row__input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}

export default function IndexAsKey() {
  const initial = useMemo<Item[]>(
    () => [
      { id: 'u1', name: 'Ada' },
      { id: 'u2', name: 'Linus' },
      { id: 'u3', name: 'Grace' },
    ],
    []
  );

  const [itemsWrong, setItemsWrong] = useState<Item[]>(initial);
  const [itemsRight, setItemsRight] = useState<Item[]>(initial);
  const [count, setCount] = useState(4);

  const insertAtTop = () => {
    const nu: Item = { id: `u${count}`, name: `User ${count}` };
    setCount(c => c + 1);
    setItemsWrong(curr => [nu, ...curr]);
    setItemsRight(curr => [nu, ...curr]);
  };

  const reverseOrder = () => {
    setItemsWrong(curr => [...curr].reverse());
    setItemsRight(curr => [...curr].reverse());
  };

  return (
    <div className="anti-screen">
      <CodeCard
        title="Anti-Pattern: Using Index as Key"
        description="Keys must reflect item identity. Using the array index breaks identity when inserting/reordering — React may reuse the wrong component/DOM, causing state and focus glitches."
      >
        <div className="demo-row">
          <div className="panel">
            <div className="panel__title">Wrong (key = index)</div>
            <div className="controls">
              <button className="btn btn--wrong" onClick={insertAtTop}>Insert at top</button>
              <button className="btn btn--wrong" onClick={reverseOrder}>Reverse order</button>
            </div>
            <ul className="list">
              {itemsWrong.map((item, index) => (
                <li key={index} className="list__item">
                  <EditableRow label={item.name} />
                </li>
              ))}
            </ul>
            <p className="hint">Type in an input, then insert at top or reverse — text jumps rows because component instances are reused by position.</p>
          </div>

          <div className="panel">
            <div className="panel__title">Correct (key = stable id)</div>
            <div className="controls">
              <button className="btn btn--right" onClick={insertAtTop}>Insert at top</button>
              <button className="btn btn--right" onClick={reverseOrder}>Reverse order</button>
            </div>
            <ul className="list">
              {itemsRight.map(item => (
                <li key={item.id} className="list__item">
                  <EditableRow label={item.name} />
                </li>
              ))}
            </ul>
            <p className="hint">With stable keys, each row keeps its own state and focus correctly across list changes.</p>
          </div>
        </div>
      </CodeCard>

      <CodeCard title="Why index is an anti‑pattern?">
        <ul className="bullets">
          <li><strong>Wrong identity</strong>: Keys tell React which item a component instance belongs to. Index ties identity to position, not the item.</li>
          <li><strong>State leaks</strong>: Local state, focus, and animations stick to positions and jump between items when you insert/reorder.</li>
          <li><strong>Reorder bugs</strong>: Drag‑and‑drop, filters, and sorts exhibit visual glitches and stale data.</li>
        </ul>
      </CodeCard>

      <CodeCard title="Better keys + when index is OK">
        <ul className="bullets">
          <li><strong>Prefer stable IDs</strong> from your data (<code>user.id</code>, <code>slug</code>, etc.).</li>
          <li><strong>Derive a stable key</strong> from immutable fields if you lack IDs (e.g., a unique slug).</li>
          <li><strong>Index is acceptable</strong> only when the list is static: no inserts, removes, or reorders.</li>
        </ul>
        <pre>
          {`
            // Wrong
            {items.map((item, i) => <Row key={i} item={item} />)}

            // Right
            {items.map(item => <Row key={item.id} item={item} />)}
          `}
        </pre>
      </CodeCard>
    </div>
  );
}
