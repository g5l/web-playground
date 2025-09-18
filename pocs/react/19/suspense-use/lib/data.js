const API = 'https://jsonplaceholder.typicode.com';

export async function getPost() {
  const res = await fetch(`${API}/posts/1`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load post');
  return res.json();
}

export async function getUsers({ delayMs = 0 } = {}) {
  const res = await fetch(`${API}/users`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load users');
  const json = await res.json();
  if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
  return json;
}

