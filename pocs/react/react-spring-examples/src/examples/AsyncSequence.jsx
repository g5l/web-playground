import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/example.css';

export default function AsyncSequence() {
  const styles = useSpring({
    from: { x: -80, y: 0, opacity: 0, scale: 0.9 },
    to: async (next) => {
      await next({ x: 0, opacity: 1 });
      await next({ scale: 1.08 });
      await next({ scale: 1.0 });
      await next({ x: 50});
      await next({ x: 0});
      await next({ x: -50});
      await next({ y: 50});
      await next({ y: 100});
      await next({ y: 150});
    },
    config: { tension: 220, friction: 18 }
  });

  return (
    <div className="example">
      <animated.div className="box" style={styles}>
        Async sequence
      </animated.div>
    </div>
  );
}
