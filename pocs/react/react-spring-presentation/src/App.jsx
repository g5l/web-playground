import React, { useState, useEffect } from "react";
import slides from "./slides";
import SlideNavigation from "./components/SlideNavigation";

export default function App() {
  const [index, setIndex] = useState(0);
  const Slide = slides[index];

  const nextSlide = () => setIndex((i) => Math.min(i + 1, slides.length - 1));
  const prevSlide = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div>
      <Slide />
      <SlideNavigation onPrev={prevSlide} onNext={nextSlide} />
    </div>
  );
}
