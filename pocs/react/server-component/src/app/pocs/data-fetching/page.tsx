import MoviesList from "@/app/pocs/data-fetching/MoviesList";

export const dynamic = "force-dynamic";

export default async function DataFetchingPOC() {
  const renderedAt = new Date().toISOString();

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
      <div className="card">
        <h1>Data Fetching with RSC</h1>
        <p>
          This page fetches from a local API using <code>await</code> directly in
          a Server Component. There is no client-side hydration.
        </p>
        <p style={{ marginTop: 8 }}>
          Page rendered at: <code>{renderedAt}</code>
        </p>
        {/* Plain GET form triggers a full document navigation (no JS). */}
        <form method="GET" style={{ marginTop: 12 }}>
          <button type="submit">Refresh (full reload)</button>
        </form>
      </div>

      <MoviesList />
    </div>
  );
}

