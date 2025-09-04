import React, { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import '../styles/example.css';

let id = 0;
export default function ListTransition() {
  const [items, setItems] = useState([]);
  const transitions = useTransition(items, {
    keys: item => item.id,
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -10 },
    config: { tension: 200, friction: 18 }
  });

  const add = () => setItems(s => [{ id: id++, label: `Item #${id}` }, ...s]);
  const remove = (rid) => setItems(s => s.filter(i => i.id !== rid));

  return (
    <div className="example">
      <div className="row">
        <button className="btn" onClick={add}>Add item</button>
      </div>
      <ul style={{ padding: 0, listStyle: 'none'}}>
        {transitions((style, item) => (
          <animated.li
            style={style}
            key={item.id}
            className="panel"
            onClick={() => remove(item.id)}
          >
            {item.label} (click to remove)
          </animated.li>
        ))}
      </ul>
    </div>
  );
}
