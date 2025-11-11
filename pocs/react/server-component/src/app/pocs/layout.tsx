import Link from "next/link";
import type { ReactNode } from "react";

export default function PocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <header className="header">
        <Link className="navlink" href="/">
          Home
        </Link>
        <Link className="navlink" href="/pocs">
          POCs
        </Link>
      </header>
      <main className="grid" style={{ gridTemplateColumns: "1fr" }}>{children}</main>
    </div>
  );
}
