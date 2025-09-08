import React from "react";
import { useSpring, animated } from "@react-spring/web";

export default function FadeIn({ isVisible, children }) { //isVisible = false
  const styles = useSpring({
    opacity: isVisible ? 1 : 0
  });

  return <animated.div style={styles}>{children}</animated.div>;
}
