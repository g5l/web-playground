export function healthHandler() {
  return new Response(JSON.stringify({ ok: true, uptime: process.uptime() }), {
    headers: { "Content-Type": "application/json" },
  });
}