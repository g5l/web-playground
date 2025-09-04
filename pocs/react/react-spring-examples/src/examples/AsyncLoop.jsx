import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/example.css';

export default function AsyncLoop() {
  const [running, setRunning] = useState(false);
  const [styles, api] = useSpring(() => ({
    from: { rotate: 0 },
    config: { tension: 160, friction: 14 }
  }));

  useEffect(() => {
    let mounted = true;
    (async () => {
      while (running && mounted) {
        await api.start({ rotate: 360 });
        await api.start({ rotate: 0 });
      }
    })();
    return () => {
      mounted = false;
      api.stop();
    };
  }, [running, api]);

  return (
    <div className="example">
      <div className="row">
        <button className="btn" onClick={() => setRunning(true)}>Start</button>
        <button className="btn" onClick={() => setRunning(false)}>Stop</button>
      </div>
      <animated.div
        className="box"
        style={{ transform: styles.rotate.to(r => `rotate(${r}deg)`) }}
      >
        Spin
      </animated.div>
    </div>
  );
}
