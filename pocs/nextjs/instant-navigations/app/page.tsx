import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Instant Navigations</h1>
      <p>
        Next.js 16.3 introduces a new opt-in suite of tools that bring
        SPA-like instant navigations to server-driven apps. Enable them in
        <code>next.config.ts</code> via <code>cacheComponents</code> and{' '}
        <code>partialPrefetching</code>, then choose a strategy per route.
      </p>

      <p>
        Click between the three routes below. Pay attention to how quickly the
        page shell appears after each click compared to the blocking route.
      </p>

      <div className="card-grid">
        <Link href="/streaming" className="card">
          <div className="strategy instant">Stream ⚡</div>
          <h2>Streaming with Suspense</h2>
          <p>
            Wrap slow data in <code>&lt;Suspense&gt;</code>. The page shell
            appears instantly and slow content streams in after the network
            round trip.
          </p>
        </Link>

        <Link href="/cached" className="card">
          <div className="strategy instant">Cache ⚡</div>
          <h2>Caching with &apos;use cache&apos;</h2>
          <p>
            Mark a data function with <code>&apos;use cache&apos;</code>. The
            server computes the result once and reuses it across navigations,
            making the response immediate.
          </p>
        </Link>

        <Link href="/blocking" className="card">
          <div className="strategy blocking">Block ⏳</div>
          <h2>Blocking with instant = false</h2>
          <p>
            Export <code>instant = false</code> to opt out. The browser waits
            for the full server response before showing anything. Use this only
            when a loading shell would be harmful.
          </p>
        </Link>
      </div>

      <p className="meta-note">
        <strong>Config used:</strong> <code>cacheComponents: true</code>,{' '}
        <code>partialPrefetching: true</code> in <code>next.config.ts</code>.
        Partial prefetching fetches one reusable shell per route instead of
        one prefetch request per link.
      </p>
    </>
  );
}
