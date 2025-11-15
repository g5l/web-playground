import http from 'node:http';
import { createServer as createViteServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';

const port = Number(process.env.PORT || 4001);

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
        const mod = await vite.ssrLoadModule('/src/patterns/SelectiveHydration/ServerApp.tsx');
        const { default: App } = mod;

        const appHtml = renderToString(React.createElement(App));

        const html = `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Selective Hydration – SSR Demo</title>
              <link rel="stylesheet" href="/src/patterns/SelectiveHydration/SelectiveHydration.css" />
              <style>
                html, body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji; }
                body { background: #0b1220; color: #e5e7eb; }
                a { color: #93c5fd; }
              </style>
            </head>
            <body>
              <div id="app-root">${appHtml}</div>
              <script type="module" src="/src/patterns/SelectiveHydration/client.tsx"></script>
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
    console.log(`Selective Hydration SSR demo running at http://localhost:${port}`);
  });
}

start();
