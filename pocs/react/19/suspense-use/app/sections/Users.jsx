import { use } from 'react';
import { getUsers } from '../../lib/data.js';

export default function Users() {
  // Server Component: use() will suspend until the Promise resolves
  const users = use(getUsers({ delayMs: 1500 }));

  return (
    <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
      <ul style={{ margin: 0, paddingLeft: 16 }}>
        {users.slice(0, 5).map((u) => (
          <li key={u.id}>
            {u.name} <small>({u.email})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

