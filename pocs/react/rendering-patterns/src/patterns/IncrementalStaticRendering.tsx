import React from 'react';
import CodeCard from '@components/CodeCard';
import './IncrementalStaticRendering.css';

export default function IncrementalStaticRendering() {
  return (
    <div className="pattern-screen">
      <CodeCard
        title="Incremental Static Rendering (iSSG)"
        description="Prerender pages as static and keep them fresh incrementally with background revalidation."
      >
        <p>
          iSSG combines the speed of SSG with periodic freshness. Pages are served from static output, and a
          background process re-generates them on a schedule or on demand. Users get fast responses; content becomes
          fresh without full rebuilds.
        </p>
        <ul className="isr-bullets">
          <li>Static by default – cheap, cacheable, CDN-friendly.</li>
          <li>Revalidate per page/route – seconds-based or on-demand.</li>
          <li>Zero downtime – stale content serves while a new version builds.</li>
        </ul>
      </CodeCard>

      <CodeCard title="How it works (Stale‑While‑Revalidate)">
        <pre>
          {`
            Request --> [Has fresh page?]
            Yes -> Serve cached HTML immediately
            No  -> Serve last cached (if any); trigger background re‑gen
            └── On finish, cache new HTML for next requests
          `}
        </pre>
      </CodeCard>

      <CodeCard title="When to use">
        <ul className="isr-bullets">
          <li>Large catalogs, news, docs – many pages, periodic updates.</li>
          <li>SEO matters, but content isn't personalized per request.</li>
          <li>Builds are slow if done monolithically; need partial updates.</li>
        </ul>
      </CodeCard>

      <CodeCard title="Trade‑offs">
        <ul className="isr-bullets">
          <li>Content can be slightly stale during the revalidation window.</li>
          <li>Cache invalidation adds complexity (timers, tags, on‑demand triggers).</li>
          <li>Not suited for per‑user personalization at HTML level (use CSR/SSR for that slice).</li>
        </ul>
      </CodeCard>

      <CodeCard title="Example: time‑based revalidation (Next.js)">
        <pre>
          {`
            // pages/blog/[slug].tsx
            export async function getStaticProps({ params }) {
              const post = await fetchCMS(params.slug);
              return {
                props: { post },
                // Re‑generate at most once every 60s on next request
                revalidate: 60,
              };
            }
            
            // Fallback determines how to handle not‑yet‑generated pages
            export async function getStaticPaths() {
              const slugs = await fetchPopularSlugs();
              return { paths: slugs.map(s => ({ params: { slug: s } })), fallback: 'blocking' };
            }
          `}
        </pre>
      </CodeCard>

      <CodeCard title="Example: on‑demand revalidation (Next.js)">
        <pre>
          {`
            / pages/api/revalidate.ts
            export default async function handler(req, res) {
              if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
                return res.status(401).end('Unauthorized');
              }
              const { path } = req.query; // e.g. /blog/my-post
              await res.revalidate(path);
              return res.json({ revalidated: true });
            }
          `}
        </pre>
        <p className="hint">Trigger via webhook from your CMS when content changes.</p>
      </CodeCard>

      <CodeCard title="Good practices">
        <ul className="isr-bullets">
          <li>Choose revalidate windows per route by freshness needs.</li>
          <li>Prefer fallback="blocking" for SEO‑critical routes to avoid loading states in HTML.</li>
          <li>Use tag/path revalidation for precise cache busting on content updates.</li>
          <li>Keep dynamic, user‑specific bits client‑side or hydrate via islands.</li>
        </ul>
      </CodeCard>
    </div>
  );
}

