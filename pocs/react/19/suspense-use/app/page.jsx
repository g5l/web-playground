import { Suspense } from 'react';
import Post from './sections/Post.jsx';
import Users from './sections/Users.jsx';

export default function Page() {
  return (
    <main>
      <h1>Suspense + use() in Server Components (React 19)</h1>
      <p>
        This page streams two server components that suspend via <code>use(promise)</code>.
        You should see fallback content that is replaced as data resolves.
      </p>

      <section style={{ marginTop: 24 }}>
        <h2>Post (fast)</h2>
        <Suspense fallback={<p>Loading post…</p>}>
          <Post />
        </Suspense>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Users (artificial delay)</h2>
        <Suspense fallback={<p>Loading users…</p>}>
          <Users />
        </Suspense>
      </section>
    </main>
  );
}

