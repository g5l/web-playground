import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Instant Navigations POC',
  description: 'Next.js 16.3 Instant Navigations — stream, cache, or block',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/" className="logo">Next.js 16.3</Link>
          <Link href="/streaming">Stream ⚡</Link>
          <Link href="/cached">Cache ⚡</Link>
          <Link href="/blocking">Block ⏳</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
