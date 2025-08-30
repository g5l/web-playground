import React from "react";
import { useSpring, animated } from "@react-spring/web";
import SlideLayout from "../components/SlideLayout";

export default function Slide1() {
  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" }
  });

  return (
    <SlideLayout
      title="Welcome to React-Spring"
      description="Animations made easy and beautiful with physics."
      code={`const styles = useSpring({
          from: { opacity: 0 },
          to: { opacity: 1 }
        });`
      }
    >
      <animated.div
        style={{
          ...styles,
          fontSize: "2rem",
          background: "#ffca3a",
          padding: "20px 40px",
          borderRadius: "12px",
          color: "#222",
          fontWeight: "bold"
        }}
      >
        🚀 Let's Animate!
      </animated.div>
    </SlideLayout>
  );
}
