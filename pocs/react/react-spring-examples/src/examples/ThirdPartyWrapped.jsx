import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { ExternalComponent } from '../external/external-library';
import '../styles/example.css';

const AnimatedExternal = animated(ExternalComponent);

export default function ThirdPartyWrapped() {
  const [hovered, setHovered] = useState(false);
  const styles = useSpring({
    from: { opacity: 0, y: 20, scale: 0.98 },
    to: { opacity: 1, y: hovered ? -2 : 0, scale: hovered ? 1.2 : 1 },
    config: { tension: 220, friction: 16 }
  });

  return (
    <div className="example">
      <AnimatedExternal
        style={styles}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Hover me (animated 3rd-party)
      </AnimatedExternal>
    </div>
  );
}
3