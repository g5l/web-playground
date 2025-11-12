type TvMazeShow = {
  id: number;
  name: string;
  premiered: string | null;
  rating: { average: number | null };
};

export default async function MoviesList() {
  const res = await fetch("https://api.tvmaze.com/shows?page=1", {
    cache: "no-store",
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch shows: ${res.status}`);
  }
  const shows = (await res.json()) as TvMazeShow[];
  const top = shows.slice(0, 12);

  return (
    <div className="card">
      <h3>Shows from TVMaze (server-fetched)</h3>
      <p style={{ marginTop: 4, color: "var(--muted-foreground)" }}>
        Source: <code>api.tvmaze.com</code>
      </p>
      <ul style={{ marginTop: 12 }}>
        {top.map((s) => (
          <li key={s.id}>
            {s.name}
            {s.premiered ? ` (${new Date(s.premiered).getFullYear()})` : ""}
            {" – Rating "}
            {s.rating?.average ?? "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
