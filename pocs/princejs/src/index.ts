const port = Number(process.env.PORT || 3000);

const server = Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/health") {
      return new Response("ok", { status: 200 });
    }
    return new Response(
      JSON.stringify({ message: "Hello from Bun!" }),
      {
        status: 200,
        headers: { "content-type": "application/json; charset=utf-8" }
      }
    );
  }
});

console.log(`🚀 Server running at http://localhost:${server.port}`);

