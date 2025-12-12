import { use } from "react";
import { createFromFetch } from "react-server-dom-webpack/client";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<Root />);

const cache = new Map();

function Root() {
  const key = window.location.search || "home";
  let content = cache.get(key);
  if (!content) {
    const url = "/react" + (window.location.search || "");
    content = createFromFetch(fetch(url));
    cache.set(key, content);
  }
  return <>{use(content)}</>;
}
