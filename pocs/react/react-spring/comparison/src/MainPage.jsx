import React, { useState } from "react";
import { Link } from "react-router-dom";
import CssBall from "./CssBall";
import SpringBall from "./SpringBall";

export default function MainPage() {
  const [move, setMove] = useState(false);
  return (
    <div className="container">
      <h1>CSS vs React Spring</h1>
      <p>Click the button to see the difference:</p>
      <button onClick={() => setMove((m) => !m)}>
        {move ? "Reset" : "Animate"}
      </button>
      <Link to="/css-performance" style={{ marginLeft: 8 }}>
        <button>CSS Performance Test</button>
      </Link>
      <Link to="/spring-performance" style={{ marginLeft: 8 }}>
        <button>React Spring Performance Test</button>
      </Link>
      <div className="row">
        <div>
          <h2>CSS Transition</h2>
          <CssBall move={move} />
        </div>
        <div>
          <h2>React Spring</h2>
          <SpringBall move={move} />
        </div>
      </div>
    </div>
  );
}
