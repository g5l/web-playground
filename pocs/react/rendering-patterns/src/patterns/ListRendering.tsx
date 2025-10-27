import CodeCard from '@components/CodeCard';
import React, {useMemo} from 'react';
import './ListRendering.css';

type User = { id: string; name: string };

export default function ListRendering() {
  const users = useMemo<User[]>(
    () => [
      {id: 'u1', name: 'Ada'},
      {id: 'u2', name: 'Linus'},
      {id: 'u3', name: 'Grace'}
    ],
    []
  );

  return (
    <div className="pattern-screen">
      <CodeCard title="List Rendering" description="Always use stable keys (avoid index).">
        <ul className="card-list">
          {users.map(u => (
            <li key={u.id} className="card-line">
              <span className="dot"/> {u.name}
            </li>
          ))}
        </ul>
      </CodeCard>
      <CodeCard title="Example Code">
        <pre>{`<ul>{users.map(u => <UserCard key={u.id} user={u} />)}</ul>`}</pre>
      </CodeCard>
    </div>
  );
}
