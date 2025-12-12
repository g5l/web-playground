import { use, useEffect, useState } from "react";
import { createFromFetch } from "react-server-dom-webpack/client";
import { createRoot } from "react-dom/client";
import TaxForm from "./components/TaxForm.client.jsx";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

const rscCache = new Map();

function App() {
  const [version, setVersion] = useState(0);

  // Listen for navigation events triggered by the form
  useEffect(() => {
    const onNavigate = () => setVersion((v) => v + 1);
    window.addEventListener("rsc:navigate", onNavigate);
    return () => window.removeEventListener("rsc:navigate", onNavigate);
  }, []);

  // Fetch RSC tree with current query string
  const search = typeof window !== "undefined" ? window.location.search : "";
  const cacheKey = `rsc:${search}`;
  let content = rscCache.get(cacheKey);
  if (!content) {
    content = createFromFetch(fetch(`/react${search}`));
    rscCache.set(cacheKey, content);
  }

  // After RSC content has been committed, mount the TaxForm client component
  useEffect(() => {
    mountTaxForm();
  }, [version, search]);

  return <>{use(content)}</>;
}

function mountTaxForm() {
  const container = document.getElementById("tax-form-root");
  if (!container) return;

  // Avoid remounting if already mounted
  if (container.__mounted) return;

  const products = JSON.parse(container.getAttribute("data-products") || "[]");
  const states = JSON.parse(container.getAttribute("data-states") || "[]");
  const years = JSON.parse(container.getAttribute("data-years") || "[]");

  // Pre-fill from current URL params if present
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId") || undefined;
  const stateCode = params.get("stateCode") || undefined;
  const year = params.get("year") ? parseInt(params.get("year"), 10) : undefined;
  const quantity = params.get("quantity") ? parseInt(params.get("quantity"), 10) : undefined;
  const initialValues = { productId, stateCode, year, quantity };

  const formRoot = createRoot(container);
  container.__mounted = true;

  const onCalculate = ({ productId, stateCode, year, quantity }) => {
    const params = new URLSearchParams({
      productId,
      stateCode,
      year: String(year),
      quantity: String(quantity),
    });
    const url = `?${params.toString()}`;
    window.history.pushState(null, "", url);
    window.dispatchEvent(new Event("rsc:navigate"));
  };

  formRoot.render(
    <TaxForm
      products={products}
      states={states}
      years={years}
      onCalculate={onCalculate}
      initialValues={initialValues}
    />
  );
}
