import React from "react";

export default function CssBall({ move }) {
  return (
    <div className="stage">
      <div className={`ball css ${move ? "move" : ""}`} />
    </div>
  );
}
