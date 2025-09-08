import React, { useState } from "react";
import FadeIn from "./FadeIn";

export default function App() {
  const [isVisible, setIsVisible] = useState(true);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="app">
      <h1>React Spring Testing POC</h1>
      <button 
        onClick={toggleVisibility}
        style={{ 
          marginBottom: '20px', 
          padding: '8px 16px', 
          cursor: 'pointer' 
        }}
      >
        {isVisible ? 'Hide' : 'Show'} Content
      </button>
      <FadeIn isVisible={isVisible}>Hello React Spring!</FadeIn>
    </div>
  );
}