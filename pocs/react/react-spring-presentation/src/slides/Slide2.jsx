import React from "react";
import { useSpring, animated } from "@react-spring/web";
import SlideLayout from "../components/SlideLayout";

export default function Slide2() {
  const styles = useSpring({
    loop: true,
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.2)" },
    config: { tension: 150, friction: 10 }
  });

  return (
    <SlideLayout
      title="Physics-based Animations"
      description="Animations feel natural thanks to spring physics."
      code={`const styles = useSpring({
          loop: true,
          from: { scale: 1 },
          to: { scale: 1.2 }
        });`
      }
    >
      <animated.div
        style={{
          ...styles,
          width: "100px",
          height: "100px",
          background: "tomato",
          margin: "auto",
          borderRadius: "8px"
        }}
      />
    </SlideLayout>
  );
}
