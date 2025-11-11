import Link from "next/link";
import type { ReactNode } from "react";

export default function PocsLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <Link href="/">Home</Link>
        <Link href="/pocs">POCs</Link>
      </header>
      <main>{children}</main>
    </div>
  );
}

