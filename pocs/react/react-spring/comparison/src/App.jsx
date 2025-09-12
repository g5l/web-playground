import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import CssPerformancePage from "./CssPerformancePage";
import SpringPerformancePage from "./SpringPerformancePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/css-performance" element={<CssPerformancePage />} />
      <Route path="/spring-performance" element={<SpringPerformancePage />} />
    </Routes>
  );
}
