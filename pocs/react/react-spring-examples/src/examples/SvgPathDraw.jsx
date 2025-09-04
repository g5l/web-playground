import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import '../styles/example.css';

const AnimatedPath = animated('path');

export default function SvgPathDraw() {
  const { dash } = useSpring({
    from: { dash: 100 },
    to: { dash: 0 },
    config: { tension: 180, friction: 20 }
  });

  return (
    <div className="example">
      <svg width="200" height="120" viewBox="0 0 200 120">
        <AnimatedPath
          d="M20 60 L80 100 L180 20"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset={dash}
        />
      </svg>
      <p style={{ color: 'var(--muted)' }}>Stroke dashoffset animates from 100 → 0</p>
    </div>
  );
}
