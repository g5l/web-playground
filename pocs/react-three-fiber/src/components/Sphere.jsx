import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Sphere(props) {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color="skyblue" wireframe />
    </mesh>
  );
}
