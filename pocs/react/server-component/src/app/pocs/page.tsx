import Link from "next/link";

export default function PocsIndex() {
  return (
    <div>
      <h1>React Server Components POCs</h1>
      <p>Small, focused demos to explore RSC in Next.js.</p>
      <ul style={{ lineHeight: 1.8 }}>
        <li>
          <Link href="/pocs/intro-rsc">
            Intro RSC – server vs client, async, actions
          </Link>
        </li>
      </ul>
    </div>
  );
}

