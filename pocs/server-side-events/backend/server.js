import express from "express";

const app = express();
const PORT = 3000;

app.use(express.static("../frontend"));

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let counter = 0;

  const interval = setInterval(() => {
    counter++;
    res.write(`data: ${JSON.stringify({ message: `Hello #${counter}` })}\n\n`);
  }, 2000);

  req.on("close", () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`SSE server running at http://localhost:${PORT}`);
});
