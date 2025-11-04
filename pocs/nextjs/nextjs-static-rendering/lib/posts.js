// Tiny in-memory dataset to illustrate SSG + generateStaticParams
export const posts = [
  {
    slug: 'hello-nextjs',
    title: 'Hello Next.js',
    body: 'This page is statically generated at build time.',
  },
  {
    slug: 'static-rendering',
    title: 'Static Rendering Explained',
    body: 'SSG pre-renders routes to HTML so they can be cached on a CDN.',
  },
  {
    slug: 'isr-basics',
    title: 'ISR Basics',
    body: 'Incremental Static Regeneration updates static pages after deployment.',
  },
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null;
}

