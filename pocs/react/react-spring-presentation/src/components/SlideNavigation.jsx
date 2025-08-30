import React from "react";

export default function SlideNavigation({ onPrev, onNext }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <button onClick={onPrev}>← Previous</button>
      <button onClick={onNext}>Next →</button>
    </div>
  );
}
