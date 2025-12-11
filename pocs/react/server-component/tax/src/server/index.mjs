import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToPipeableStream } from 'react-server-dom-webpack/server'
import App from './rsc-app.mjs'
import { upsertRate } from './taxStore.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use('/static', express.static(path.join(__dirname, '../../public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// HTML shell – client bootstraps and fetches RSC payload
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(`<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Tax RSC Demo</title>
      <link rel="stylesheet" href="/static/styles.css" />
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/static/client.js"></script>
    </body>
  </html>`)
})

// RSC stream endpoint
app.get('/rsc', async (req, res) => {
  res.setHeader('Content-Type', 'text/x-component')
  try {
    const element = React.createElement(App, { searchParams: req.query })
    // No client boundaries => empty module map is fine
    const stream = renderToPipeableStream(element, {})
    stream.pipe(res)
  } catch (err) {
    console.error(err)
    res.status(500).end('RSC render error')
  }
})

// Admin action: add/update a rate
app.post('/action/add-rate', async (req, res) => {
  try {
    const { year, state, product, rate } = req.body
    if (!year || !state || !product || rate === undefined) {
      return res.status(400).send('Missing fields')
    }
    await upsertRate({ year: String(year), state: String(state), product: String(product), rate: Number(rate) })
    const qs = new URLSearchParams({ year: String(year), state: String(state), product: String(product) })
    res.redirect(303, `/${qs.size ? '?' + qs.toString() : ''}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Failed to update rate')
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

