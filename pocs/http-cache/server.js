const express = require('express');
const path = require('path');
const crypto = require('crypto');
const etagLib = require('etag'); // optional helper lib for ETag formatting
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/public', express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.webp')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return;
    }
    if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
      return;
    }
    res.setHeader('Cache-Control', 'public, max-age=60');
  }
}));

// returns dynamic resource with Last-Modified & ETag
app.get('/resource', (req, res) => {
  const now = Date.now();
  const timeBucket = Math.floor(now / 10000) * 10000; // changes every 10s
  const body = `This is a cacheable resource. timeBucket=${timeBucket}\n`;

  // Compute a strong ETag from body
  const hash = crypto.createHash('sha256').update(body).digest('hex');
  const etag = etagLib(body);
  const lastModified = new Date(timeBucket).toUTCString();

  res.setHeader('Cache-Control', 'public, max-age=5, stale-while-revalidate=30');
  res.setHeader('ETag', etag);
  res.setHeader('Last-Modified', lastModified);
  res.setHeader('Vary', 'Accept-Encoding');

  // Handle conditional requests
  const ifNoneMatch = req.headers['if-none-match'];
  const ifModifiedSince = req.headers['if-modified-since'];
  
  console.log({ ifNoneMatch, ifModifiedSince })
  
  if (ifNoneMatch && ifNoneMatch === etag) {
    res.status(304).end();
    return;
  }

  if (ifModifiedSince) {
    const ims = new Date(ifModifiedSince).getTime();
    if (!isNaN(ims) && ims >= timeBucket) {
      res.status(304).end();
      return;
    }
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(body);
});

app.get('/no-cache', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.send(`This resource is not cacheable. time=${new Date().toISOString()}\n`);
});

app.get('/expires', (req, res) => {
  const expires = new Date(Date.now() + 30 * 1000).toUTCString(); // 30s in future
  res.setHeader('Cache-Control', 'public, max-age=30');
  res.setHeader('Expires', expires);
  res.send(`This resource uses Expires: ${expires}\n`);
});

app.get('/resource/:id', (req, res) => {
  const id = req.params.id;
  const body = `resource ${id} content at ${new Date().toISOString()}\n`;
  const etag = etagLib(body);
  
  res.setHeader('Cache-Control', 'public, max-age=10');
  res.setHeader('ETag', etag);
  
  if (req.headers['if-none-match'] === etag) {
    res.status(304).end();
    return;
  }
  res.send(body);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`HTTP Cache POC server listening on http://localhost:${PORT}`);
});