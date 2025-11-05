import http from 'node:http';
import { createServer as createViteServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

const port = Number(process.env.PORT || 4000);

async function start() {
  const vite = await createViteServer({
    root: process.cwd(),
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const server = http.createServer(async (req, res) => {
    try {
      const url = req.url || '/';

      if (url === '/' || url.startsWith('/index')) {
        const mod = await vite.ssrLoadModule('/src/patterns/ProgressiveHydration/ServerApp.tsx');
        const { Widget } = mod;

        const fast = renderToString(React.createElement(Widget, { title: 'Fast widget', color: '#16a34a' }));
        const medium = renderToString(React.createElement(Widget, { title: 'Medium widget', color: '#2563eb' }));
        const slow = renderToString(React.createElement(Widget, { title: 'Slow widget', color: '#ea580c' }));

        const appHtml = `
          <div class="ph-page">
            <header class="ph-header">
              <h1>Progressive Hydration</h1>
              <p>SSR first. Hydrate islands over time or when visible.</p>
            </header>
            <main class="ph-grid">
              <section id="island-fast" data-island>${fast}</section>
              <section id="island-medium" data-island>${medium}</section>
              <section id="island-slow" data-island>${slow}</section>
            </main>
            <footer class="ph-footer">
              <small>Try query <code>?mode=viewport</code> to hydrate on visibility. Without it, hydration staggers: fast → medium → slow.</small>
            </footer>
          </div>`;

        const html = `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Progressive Hydration – SSR Demo</title>
              <link rel="stylesheet" href="/src/patterns/ProgressiveHydration/ProgressiveHydration.css" />
              <style>
                html, body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji; }
                body { background: #0b1220; color: #e5e7eb; }
                a { color: #93c5fd; }
              </style>
            </head>
            <body>
              ${appHtml}
              <script type="module" src="/src/patterns/ProgressiveHydration/client.tsx"></script>
            </body>
          </html>`;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        return res.end(await vite.transformIndexHtml(url, html));
      }

      vite.middlewares(req, res, () => {
        res.statusCode = 404;
        res.end('Not found');
      });
    } catch (err) {
      vite.ssrFixStacktrace(err);
      console.error(err);
      res.statusCode = 500;
      res.end(String(err));
    }
  });

  server.listen(port, () => {
    console.log(`Progressive Hydration SSR demo running at http://localhost:${port}`);
  });
}

start();
