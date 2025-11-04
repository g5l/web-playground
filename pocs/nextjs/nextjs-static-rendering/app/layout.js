import './globals.css';

export const metadata = {
  title: 'Static Rendering Demo',
  description: 'Learn static rendering and ISR with Next.js App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <a href="/">Home</a>
            <a href="/blog">Blog (SSG)</a>
            <a href="/isr">ISR Example</a>
          </nav>
        </header>
        <main style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
          {children}
        </main>
        <footer style={{ padding: '2rem', borderTop: '1px solid #eee' }}>
          <small>Next.js Static Rendering Playground</small>
        </footer>
      </body>
    </html>
  );
}

