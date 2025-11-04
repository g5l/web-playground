export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <section>
      <h1>Next.js Static Rendering</h1>
      <p>
        This project demonstrates static rendering (SSG) and Incremental Static
        Regeneration (ISR) with the App Router.
      </p>
      <ul>
        <li>
          <a href="/blog">Blog (SSG)</a> — statically generated list and detail pages
          using <code>generateStaticParams</code>.
        </li>
        <li>
          <a href="/isr">ISR Example</a> — a page that revalidates every
          <code> 30s</code>.
        </li>
      </ul>
      <p>
        By default, components without dynamic data are rendered at build time and
        served as static HTML.
      </p>
    </section>
  );
}

