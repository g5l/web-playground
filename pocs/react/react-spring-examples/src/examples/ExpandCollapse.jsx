import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/example.css';

export default function ExpandCollapse() {
  const [open, setOpen] = useState(false);
  const styles = useSpring({
    from: { height: 0, opacity: 0 },
    to: { height: open ? 140 : 0, opacity: open ? 1 : 0 },
    config: { tension: 180, friction: 20 }
  });

  return (
    <div className="example">
      <div className="row">
        <button className="btn" onClick={() => setOpen(o => !o)}>
          {open ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <animated.div className="panel" style={{ ...styles, overflow: 'hidden' }}>
        <p><strong>Expandable content</strong></p>
        <p>Animated height + opacity using a single spring.</p>
      </animated.div>
    </div>
  );
}
