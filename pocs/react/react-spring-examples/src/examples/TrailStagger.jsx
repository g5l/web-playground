import React from 'react';
import { useTrail, animated } from '@react-spring/web';
import '../styles/example.css';

const words = 'React Spring Trail Stagger'.split(' ');

export default function TrailStagger() {
  const trail = useTrail(words.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 16 }
  });

  return (
    <div className="example">
      <div style={{ display: 'flex', gap: 8 }}>
        {trail.map((style, i) => (
          <animated.div className="box" key={i} style={{ ...style, width: 'auto', padding: '12px 16px' }}>
            {words[i]}
          </animated.div>
        ))}
      </div>
    </div>
  );
}
2