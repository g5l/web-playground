import React from "react";
import { useSpring, animated } from "@react-spring/web";

export default function SpringBall({ move }) {
  const styles = useSpring({
    to: { x: move ? 200 : 0 },
    from: { x: 0 },
    config: { tension: 400, friction: 10 }
  });

  return (
    <div className="stage">
      <animated.div className="ball spring" style={styles} />
    </div>
  );
}
