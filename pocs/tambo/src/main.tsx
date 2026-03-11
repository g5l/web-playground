import React from "react";
import ReactDOM from "react-dom/client";
import { TamboProvider } from "@tambo-ai/react";
import App from "./App";
import { tamboComponents } from "./tambo/components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TamboProvider
      apiKey={import.meta.env.VITE_TAMBO_API_KEY}
      components={tamboComponents}
    >
      <App />
    </TamboProvider>
  </React.StrictMode>
);
