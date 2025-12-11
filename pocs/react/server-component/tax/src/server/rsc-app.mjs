import React from 'react'
import { getCatalog, getTaxRate, getRatesFor, formatPercent } from './taxStore.mjs'

const h = React.createElement

export default async function App({ searchParams }) {
  const catalog = await getCatalog()
  const current = normalizeSelection(searchParams, catalog)
  const rate = await getTaxRate(current.state, current.product, current.year)
  const price = Number(current.price || 0) || 0
  const tax = (price * rate) / 100
  const total = price + tax
  const table = await getRatesFor(current.state, current.year)

  return h(
    'div',
    { className: 'page' },
    h('h1', null, 'Tax Calculator (React Server Components)'),
    h('div', { className: 'layout' },
      h('section', { className: 'card' },
        h('h2', null, 'Calculate Tax'),
        h(FilterForm, { catalog, current }),
        h('div', { className: 'result' },
          h('div', null, labelRow('Price', price.toFixed(2))),
          h('div', null, labelRow('Rate', formatPercent(rate))),
          h('div', null, labelRow('Tax', tax.toFixed(2))),
          h('div', null, labelRow('Total', total.toFixed(2)))
        )
      ),
      h('section', { className: 'card' },
        h('h2', null, `Rates: ${current.state} · ${current.year}`),
        h(RatesTable, { table })
      ),
      h('section', { className: 'card' },
        h('h2', null, 'Add/Update Rate'),
        h(AddRateForm, { catalog, current, rate })
      )
    )
  )
}

function FilterForm({ catalog, current }) {
  const h = React.createElement
  return h(
    'form',
    { method: 'GET', action: '/' },
    h('div', { className: 'grid' },
      field('State', h(
        'select', { name: 'state', defaultValue: current.state },
        catalog.states.map((s) => h('option', { key: s, value: s }, s))
      )),
      field('Product', h(
        'select', { name: 'product', defaultValue: current.product },
        catalog.products.map((p) => h('option', { key: p, value: p }, capitalize(p)))
      )),
      field('Year', h(
        'select', { name: 'year', defaultValue: current.year },
        catalog.years.map((y) => h('option', { key: y, value: y }, y))
      )),
      field('Price', h('input', { type: 'number', min: '0', step: '0.01', name: 'price', defaultValue: current.price || '' }))
    ),
    h('div', { className: 'actions' }, h('button', { type: 'submit' }, 'Calculate'))
  )
}

function RatesTable({ table }) {
  const h = React.createElement
  return h(
    'table', { className: 'rates' },
    h('thead', null, h('tr', null, h('th', null, 'Product'), h('th', null, 'Rate'))),
    h('tbody', null,
      Object.entries(table).map(([product, rate]) =>
        h('tr', { key: product }, h('td', null, capitalize(product)), h('td', null, formatPercent(rate)))
      )
    )
  )
}

function AddRateForm({ catalog, current, rate }) {
  const h = React.createElement
  return h(
    'form', { method: 'POST', action: '/action/add-rate', className: 'add-rate' },
    h('div', { className: 'grid' },
      field('State', h(
        'select', { name: 'state', defaultValue: current.state },
        catalog.states.map((s) => h('option', { key: s, value: s }, s))
      )),
      field('Product', h(
        'select', { name: 'product', defaultValue: current.product },
        catalog.products.map((p) => h('option', { key: p, value: p }, capitalize(p)))
      )),
      field('Year', h(
        'select', { name: 'year', defaultValue: current.year },
        catalog.years.map((y) => h('option', { key: y, value: y }, y))
      )),
      field('Rate (%)', h('input', { type: 'number', step: '0.01', min: '0', name: 'rate', defaultValue: String(rate ?? '') }))
    ),
    h('div', { className: 'actions' }, h('button', { type: 'submit' }, 'Save Rate'))
  )
}

function field(label, control) {
  return React.createElement('label', { className: 'field' }, React.createElement('span', null, label), control)
}

function labelRow(label, value) {
  return React.createElement('div', { className: 'row' }, React.createElement('span', { className: 'k' }, label), React.createElement('span', { className: 'v' }, value))
}

function normalizeSelection(searchParams, catalog) {
  const params = Object.fromEntries(Object.entries(searchParams || {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]))
  const year = String(params.year || catalog.years[0])
  const state = String(params.state || catalog.states[0])
  const product = String(params.product || catalog.products[0])
  const price = params.price ? String(params.price) : ''
  return { year, state, product, price }
}

function capitalize(s) {
  return String(s || '').slice(0, 1).toUpperCase() + String(s || '').slice(1)
}

