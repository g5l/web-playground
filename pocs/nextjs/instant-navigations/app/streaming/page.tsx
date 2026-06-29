import { Suspense } from 'react';
import { sleep } from '@/lib/sleep';

const ARTICLES = [
  { id: 1, title: 'Understanding React Server Components', author: 'Alice Chen', readTime: '5 min', date: 'Jun 28' },
  { id: 2, title: 'The New Next.js 16.3 Prefetching Model', author: 'Bob Martinez', readTime: '8 min', date: 'Jun 29' },
  { id: 3, title: 'When to Stream vs Cache in Next.js', author: 'Carol Kim', readTime: '6 min', date: 'Jun 30' },
  { id: 4, title: 'Building Offline-Ready Apps with Partial Prefetching', author: 'Dave Patel', readTime: '10 min', date: 'Jul 1' },
];

async function ArticleList() {
  await sleep(2000);

  return (
    <ul className="article-list">
      {ARTICLES.map(article => (
        <li key={article.id} className="article">
          <div className="article-title">{article.title}</div>
          <div className="article-meta">
            {article.author} &middot; {article.readTime} read &middot; {article.date}
          </div>
        </li>
      ))}
    </ul>
  );
}

function ArticleSkeleton() {
  return (
    <ul className="article-list">
      {[1, 2, 3, 4].map(i => (
        <li key={i} className="article">
          <div className="skeleton" style={{ width: '70%', marginBottom: 10 }} />
          <div className="skeleton" style={{ width: '40%', height: 13 }} />
        </li>
      ))}
    </ul>
  );
}

export default function StreamingPage() {
  return (
    <>
      <div className="badge instant">⚡ Instant Navigation (Streaming)</div>
      <h1>Latest Articles</h1>
      <p>
        The page shell below appears <strong style={{ color: '#e5e5e5' }}>immediately</strong> on
        navigation. Data fetching takes 2 seconds, but the browser never waits
        for it before rendering the shell — Suspense handles the loading state.
      </p>

      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleList />
      </Suspense>

      <p className="meta-note">
        <strong>How it works:</strong> <code>&lt;Suspense&gt;</code> wraps the
        slow <code>ArticleList</code> component. Next.js prefetches the shell
        (everything outside Suspense) once per route. Clicking the nav link
        shows the shell and skeleton instantly, with articles streaming in
        2 seconds later.
      </p>
    </>
  );
}
