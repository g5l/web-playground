import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { counterStore } from "./store";

const externalBtn = document.getElementById("external-btn");
externalBtn?.addEventListener("click", () => counterStore.increment());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
