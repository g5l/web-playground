import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.join(__dirname, '../../data')
const DATA_FILE = path.join(DATA_DIR, 'tax-rates.json')

async function readRates() {
  try {
    const buf = await readFile(DATA_FILE, 'utf-8')
    const json = JSON.parse(buf)
    return normalizeStore(json)
  } catch (err) {
    if (err.code === 'ENOENT') {
      const seed = seedData()
      await mkdir(DATA_DIR, { recursive: true })
      await writeFile(DATA_FILE, JSON.stringify(seed, null, 2))
      return normalizeStore(seed)
    }
    throw err
  }
}

function normalizeStore(raw) {
  const out = {}
  for (const [year, states] of Object.entries(raw || {})) {
    out[year] = {}
    for (const [state, products] of Object.entries(states || {})) {
      out[year][state] = {}
      for (const [product, rate] of Object.entries(products || {})) {
        out[year][state][product] = Number(rate)
      }
    }
  }
  return out
}

export async function getTaxRate(state, product, year) {
  const store = await readRates()
  return Number(store?.[year]?.[state]?.[product] ?? 0)
}

export async function getRatesFor(state, year) {
  const store = await readRates()
  return { ...(store?.[year]?.[state] || {}) }
}

export async function upsertRate({ year, state, product, rate }) {
  const store = await readRates()
  if (!store[year]) store[year] = {}
  if (!store[year][state]) store[year][state] = {}
  store[year][state][product] = Number(rate)
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2))
}

export async function getCatalog() {
  const store = await readRates()
  const years = Object.keys(store).sort()
  const states = new Set()
  const products = new Set()
  for (const y of years) {
    for (const s of Object.keys(store[y])) states.add(s)
    for (const s of Object.values(store[y])) for (const p of Object.keys(s)) products.add(p)
  }
  return {
    years: years.length ? years : [String(new Date().getFullYear())],
    states: Array.from(states).sort(),
    products: Array.from(products).sort()
  }
}

export function formatPercent(rate) {
  const n = Number(rate || 0)
  return `${n.toFixed(2)}%`
}

function seedData() {
  return {
    "2024": {
      "CA": { "electronics": 9.5, "grocery": 0.0, "clothing": 7.25 },
      "NY": { "electronics": 8.875, "grocery": 0.0, "clothing": 4.0 },
      "TX": { "electronics": 8.25, "grocery": 0.0, "clothing": 6.25 }
    },
    "2025": {
      "CA": { "electronics": 9.0, "grocery": 0.0, "clothing": 7.25 },
      "NY": { "electronics": 9.125, "grocery": 0.0, "clothing": 4.5 },
      "TX": { "electronics": 8.25, "grocery": 0.0, "clothing": 6.25 }
    }
  }
}

