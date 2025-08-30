import React from "react";
import { useSpring, animated } from "@react-spring/web";
import SlideLayout from "../components/SlideLayout";

export default function Slide3() {
  const styles = useSpring({
    from: { transform: "translateX(-200px)" },
    to: { transform: "translateX(0px)" },
    config: { mass: 1, tension: 180, friction: 12 }
  });

  return (
    <SlideLayout
      title="Smooth Transitions"
      description="Move elements into view with smooth transitions."
      code={`const styles = useSpring({
          from: { x: -200 },
          to: { x: 0 }
        });`
      }
    >
      <animated.div
        style={{
          ...styles,
          fontSize: "24px",
          background: "#4caf50",
          color: "white",
          padding: "20px",
          borderRadius: "6px",
          display: "inline-block"
        }}
      >
        🌱 Smooth Entry
      </animated.div>
    </SlideLayout>
  );
}
