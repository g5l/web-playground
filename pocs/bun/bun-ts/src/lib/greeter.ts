export function greet(name: string, opts?: { excited?: boolean }): string {
  const base = `Hello, ${name}`;
  return opts?.excited ? `${base}!` : base;
}