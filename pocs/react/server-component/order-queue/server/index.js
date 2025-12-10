import path from "node:path";
import express from "express";
import React from "react";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";

// RSC server runtime
import * as ReactServerDOM from "react-server-dom-webpack/server";

// Server component entry
import App from "./rsc/App.server.js";
import { addOrder, clearAll } from "./store.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(ROOT, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(ROOT, "client", "index.html"));
});

// Stream the React Server Components payload
app.get("/rsc", async (_req, res, next) => {
  try {
    res.setHeader("Content-Type", "text/x-component");
    res.setHeader("Cache-Control", "no-store");
    const onError = (err) => {
      console.error("RSC render error:", err);
    };
    // No client components, so an empty bundler map is fine.
    const moduleMap = {};
    // Use the ReadableStream API and adapt to Node for robust piping.
    const rscStream = ReactServerDOM.renderToReadableStream(
      React.createElement(App, null),
      moduleMap,
      { onError }
    );
    if (typeof res.flushHeaders === "function") res.flushHeaders();
    Readable.fromWeb(rscStream).pipe(res);
  } catch (err) {
    next(err);
  }
});

app.post("/order", (req, res) => {
  const { dish } = req.body ?? {};
  try {
    if (!dish) throw new Error("Dish is required");
    addOrder(dish);
    res.redirect(303, "/");
  } catch (err) {
    console.error(err);
    res.status(400).send(String(err?.message || err));
  }
});

app.post("/clear", (req, res) => {
  clearAll();
  res.redirect(303, "/");
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Restaurant Queue listening on http://localhost:${PORT}`);
});
