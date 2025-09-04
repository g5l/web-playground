import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/example.css';

export default function InterpolateColor() {
  const [toggled, setToggled] = useState(false);
  const [spr, api] = useSpring(() => ({ progress: 0 }));

  const go = () => api.start({ progress: toggled ? 0 : 9, config: { duration: 3000 } })
    .then(() => setToggled(t => !t));

  return (
    <div className="example">
      <button className="btn" onClick={go}>Animate color</button>
      <animated.div
        className="box"
        style={{
          background: spr.progress.to({
            range: [0, 0.5, 1],
            output: ['#6366f1', '#4ade80', '#22c55e', '#84cc16', '#eab308', '#f59e0b', '#f97316', '#ef4444', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9']
          })
        }}
      >
        Interpolate color
      </animated.div>
    </div>
  );
}
