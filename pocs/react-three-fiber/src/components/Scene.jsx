import React from "react";
import Box from "./Box";
import Sphere from "./Sphere";

export default function Scene() {
  return (
    <>
      <Box position={[-1.5, 0, 0]} />
      <Sphere position={[1.5, 0, 0]} />
    </>
  );
}
