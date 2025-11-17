import React from 'react';
import CodeCard from '@components/CodeCard';
import './RenderingStrategies.css';

export default function RenderingStrategies() {
  return (
    <div className="pattern-screen">
      <CodeCard
        title="Rendering Strategies"
        description="What CSR, SSR, SSG, ISG, and RSC are — and when to use them."
      >
        <ul className="rs-list">
          <li><strong>CSR</strong>: render fully on the client after JS loads.</li>
          <li><strong>SSR</strong>: server renders HTML per request, then hydrates.</li>
          <li><strong>SSG</strong>: build-time prerender to static HTML.</li>
          <li><strong>ISG</strong>: like SSG, but pages can revalidate incrementally.</li>
          <li><strong>RSC</strong>: render components on the server with minimal client JS.</li>
        </ul>
      </CodeCard>

      <CodeCard title="Client-Side Rendering (CSR)">
        <p><em>What</em>: Server sends a shell; React renders everything in the browser.</p>
        <p><em>Use when</em>: Highly interactive apps, dashboards, auth-gated UIs, heavy client state.</p>
        <ul className="rs-bullets">
          <li><strong>Pros</strong>: Simple hosting, great for SPA routing, minimal server coupling.</li>
          <li><strong>Cons</strong>: Slower first content without extra work; weaker SEO by default.</li>
        </ul>
      </CodeCard>

      <CodeCard title="Server-Side Rendering (SSR)">
        <p><em>What</em>: HTML rendered on request; React hydrates to attach interactivity.</p>
        <p><em>Use when</em>: Marketing pages, content that depends on per-request data, strong SEO.</p>
        <ul className="rs-bullets">
          <li><strong>Pros</strong>: Fast first content, good SEO, auth-aware HTML.</li>
          <li><strong>Cons</strong>: Server cost/complexity; sensitive to backend latency (TTFB).</li>
        </ul>
      </CodeCard>

      <CodeCard title="Static Site Generation (SSG)">
        <p><em>What</em>: HTML generated at build time and served as static files.</p>
        <p><em>Use when</em>: Blogs, docs, marketing pages with content known at build.</p>
        <ul className="rs-bullets">
          <li><strong>Pros</strong>: Extremely fast, cheap to host, CDN-friendly.</li>
          <li><strong>Cons</strong>: Rebuilds for content updates; long builds on very large sites.</li>
        </ul>
      </CodeCard>

      <CodeCard title="Incremental Static Generation (ISG)">
        <p><em>What</em>: Static pages can be re-generated on-demand with caching and revalidation.</p>
        <p><em>Use when</em>: Mostly-static content that updates periodically (catalogs, news, docs).</p>
        <ul className="rs-bullets">
          <li><strong>Pros</strong>: SSG speed with fresher data, avoids full rebuilds.</li>
          <li><strong>Cons</strong>: Cache invalidation complexity; framework-specific configs.</li>
        </ul>
      </CodeCard>

      <CodeCard title="React Server Components (RSC)">
        <p><em>What</em>: Components render on the server and stream to the client; only interactive parts ship JS.</p>
        <p><em>Use when</em>: Reduce client JS, fetch on the server, stream UI early, compose server/client boundaries.</p>
        <ul className="rs-bullets">
          <li><strong>Pros</strong>: Less client JS, better network utilization, simpler data fetching.</li>
          <li><strong>Cons</strong>: Requires RSC-enabled framework (e.g., Next.js 13+); new mental model.</li>
        </ul>
      </CodeCard>

      <CodeCard title="Choosing Guide">
        <ul className="rs-bullets">
          <li><strong>App-like SPA</strong>: CSR + selective/partial SSR where needed.</li>
          <li><strong>Content/SEO critical</strong>: SSR or SSG; add ISG for freshness.</li>
          <li><strong>Large surfaces with data fetching</strong>: Consider an RSC-enabled framework.</li>
          <li><strong>Hybrid</strong>: Mix per-route strategies; modern frameworks support this.</li>
        </ul>
      </CodeCard>
    </div>
  );
}

