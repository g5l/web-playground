import { sleep } from '@/lib/sleep';

async function getDashboardStats() {
  'use cache';
  await sleep(2000);

  return {
    users: 12_847,
    posts: 3_291,
    pageViews: 248_103,
    cachedAt: new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };
}

export default async function CachedPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <div className="badge instant">⚡ Instant Navigation (Cached)</div>
      <h1>Dashboard</h1>
      <p>
        This page uses <code>&apos;use cache&apos;</code> on the data function.
        The first request takes 2 seconds, but subsequent navigations return
        the cached result instantly — no network wait.
      </p>

      <div className="stat-grid">
        <div className="stat">
          <div className="label">Users</div>
          <div className="value">{stats.users.toLocaleString()}</div>
        </div>
        <div className="stat">
          <div className="label">Posts</div>
          <div className="value">{stats.posts.toLocaleString()}</div>
        </div>
        <div className="stat">
          <div className="label">Page Views</div>
          <div className="value">{stats.pageViews.toLocaleString()}</div>
        </div>
      </div>

      <p className="meta-note">
        <strong>Data cached at:</strong> {stats.cachedAt}. Navigate away and
        back — the timestamp stays frozen, confirming the cached result is
        reused. The cache is shared across requests for the same cache key.
      </p>
    </>
  );
}
