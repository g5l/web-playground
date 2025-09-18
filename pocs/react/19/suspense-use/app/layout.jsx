export const metadata = {
  title: 'RSC Suspense + use() PoC',
  description: 'Demonstrates Suspense and use(promise) in React 19 Server Components',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 1.5, padding: 24 }}>
        {children}
      </body>
    </html>
  );
}

