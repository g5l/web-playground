import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/example.css';

export default function FadeIn() {
  const styles = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });
  return (
    <div className="example">
      <animated.div className="box" style={styles}>
        Fade In
      </animated.div>
    </div>
  );
}
