import Link from "next/link";

export default function PocsIndex() {
  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
      <div>
        <h1>React Server Components POCs</h1>
        <p>Small, focused demos to explore RSC in Next.js.</p>
      </div>
      <ul className="grid" style={{ listStyle: "none", padding: 0 }}>
        <li className="card">
          <Link href="/pocs/intro-rsc">
            Intro RSC – server vs client, async, actions
          </Link>
        </li>
      </ul>
    </div>
  );
}
