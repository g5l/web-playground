import { posts } from '../../lib/posts';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Blog (SSG) | Static Rendering Demo',
};

export default function BlogIndex() {
  return (
    <section>
      <h1>Blog (SSG)</h1>
      <p>This list is statically rendered at build time.</p>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}`}>{p.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

