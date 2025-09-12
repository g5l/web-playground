import React, { useState } from "react";
import { Link } from "react-router-dom";
import SpringBall from "./SpringBall";

const BALL_COUNT = 200;

export default function SpringPerformancePage() {
  const [move, setMove] = useState(false);
  return (
    <div className="container">
      <h1>Performance Test: React Spring</h1>
      <Link to="/">
        <button>Back</button>
      </Link>
      <p>Renders {BALL_COUNT} react-spring-animated balls. Use browser dev tools to measure FPS, CPU, and memory.</p>
      <button onClick={() => setMove((m) => !m)}>{move ? "Reset" : "Animate"}</button>
      
      <div className="content">
        {Array.from({ length: BALL_COUNT }).map((_, i) => (
          <div className="stage" style={{ margin: '10px 0' }} key={i}>
            <SpringBall key={i} move={move} />
          </div>
        ))}
      </div>
    </div>
  );
}
