// Minimal client that mounts the RSC stream
import React, { use } from "react";
import ReactDOM from "react-dom/client";
// Webpack consumes the browser client from the package exports
import { createFromFetch } from "react-server-dom-webpack/client";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

function RSCView() {
  const response = createFromFetch(
    fetch("/rsc", { headers: { Accept: "text/x-component" } })
  );
  // React 19 can "use" the RSC response directly
  return use(response);
}

root.render(
  React.createElement(
    React.Suspense,
    { fallback: "Loading..." },
    React.createElement(RSCView)
  )
);
