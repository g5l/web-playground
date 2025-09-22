const express = require('express');
const etag = require('etag');

const app = express();
const PORT = 3000;

// It's the same thing of add this line
// app.set('etag', true);

function getResource() {
  const bucket = Math.floor(Date.now() / 15000); // new version every 15s
  return `Resource version bucket=${bucket}`;
}

app.get('/resource', (req, res) => {
  const body = getResource();
  const tag = etag(body);

  res.setHeader('ETag', tag);
  res.setHeader('Cache-Control', 'public, max-age=0'); // force revalidation

  if (req.headers['if-none-match'] === tag) {
    res.status(304).end(); // Not Modified
    return;
  }

  res.send(body);
});

app.listen(PORT, () => {
  console.log(`ETag POC running at http://localhost:${PORT}/resource`);
});
