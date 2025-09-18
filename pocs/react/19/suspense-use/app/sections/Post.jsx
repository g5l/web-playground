import { use } from 'react';
import { getPost } from '../../lib/data.js';

export default function Post() {
  // Server Component: read a Promise with use() to suspend
  const post = use(getPost());

  return (
    <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
      <strong>Title:</strong> {post.title}
      <br />
      <small>ID: {post.id}</small>
      <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6, overflowX: 'auto' }}>
        {JSON.stringify(post, null, 2)}
      </pre>
    </div>
  );
}

