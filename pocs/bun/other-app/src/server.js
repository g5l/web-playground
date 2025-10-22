import { handleApi } from "./api.js";
import { join, normalize } from "path";

const port = Number(process.env.PORT || 3000);
const publicDir = join(process.cwd(), "public");

function serveStatic(pathname) {
  const rel = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = normalize(join(publicDir, rel));
  if (!filePath.startsWith(publicDir)) {
    return new Response("Forbidden", { status: 403 });
  }
  const file = Bun.file(filePath);
  return file.exists()
    ? new Response(file, { headers: { "Content-Type": file.type || "application/octet-stream" } })
    : new Response("Not found", { status: 404 });
}

const server = Bun.serve({
  port,
  fetch: async (req, server) => {
    const url = new URL(req.url);

    // WebSocket endpoint
    if (url.pathname === "/ws") {
      const ok = server.upgrade(req);
      if (ok) return; // WebSocket upgraded
      return new Response("Upgrade failed", { status: 400 });
    }

    // API routes
    if (url.pathname.startsWith("/api/")) {
      const res = await handleApi(req, url, server);
      if (res) return res;
      return new Response("Not found", { status: 404 });
    }

    // Static files
    return serveStatic(url.pathname);
  },
  websocket: {
    open(ws) {
      ws.subscribe("notes");
      ws.send(JSON.stringify({ type: "hello", message: "connected" }));
    },
    message(ws, message) {
      // Echo any client message; useful for learning
      try {
        ws.send(JSON.stringify({ type: "echo", message: String(message) }));
      } catch {}
    },
  },
});

console.log(`Bun server running on http://localhost:${port}`);

