type MoviesResponse = {
  movies: { id: string; title: string; year: number; rating: number }[];
  servedAt: string;
};

export default async function MoviesList() {
  // Fetch on the server, no caching to demonstrate re-renders.
  // Using a same-origin relative path avoids needing request headers.
  const res = await fetch("/api/movies", { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.status}`);
  }
  const data = (await res.json()) as MoviesResponse;

  return (
    <div className="card">
      <h3>Movies (fetched on the server)</h3>
      <p style={{ marginTop: 4, color: "var(--muted-foreground)" }}>
        API served at: <code>{data.servedAt}</code>
      </p>
      <ul style={{ marginTop: 12 }}>
        {data.movies.map((m) => (
          <li key={m.id}>
            {m.title} ({m.year}) – Rating {m.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
