import React, { useState, useMemo } from 'react';
import { useSpring, animated, useSpringRef, useTransition, useChain } from '@react-spring/web';
import '../styles/example.css';

export default function ChainSequence() {
  const [open, setOpen] = useState(false);

  const boxRef = useSpringRef();
  const box = useSpring({
    ref: boxRef,
    from: { scale: 0.8, opacity: 0 },
    to: { scale: open ? 1 : 0.8, opacity: open ? 1 : 0 }
  });

  const items = useMemo(() => (open ? ['A', 'B', 'C', 'D'] : []), [open]);

  const listRef = useSpringRef();
  const transitions = useTransition(items, {
    ref: listRef,
    keys: i => i,
    from: { opacity: 0, y: -8 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -8 },
    trail: 80
  });

  useChain(open ? [boxRef, listRef] : [listRef, boxRef], [0, open ? 0.2 : 0]);

  return (
    <div className="example">
      <div className="row">
        <button className="btn" onClick={() => setOpen(o => !o)}>
          {open ? 'Close' : 'Open'}
        </button>
      </div>
      <animated.div className="box" style={box}>Box</animated.div>
      <div style={{ width: 240 }}>
        {transitions((style, item) => (
          <animated.div className="panel" key={item} style={style}>
            Item {item}
          </animated.div>
        ))}
      </div>
    </div>
  );
}
