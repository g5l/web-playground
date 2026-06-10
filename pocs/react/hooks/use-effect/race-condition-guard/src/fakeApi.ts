export interface SearchResult {
  id: number
  label: string
  query: string
  delayMs: number
}

const FRUIT_DB: Record<string, string[]> = {
  a: ['Apple', 'Apricot', 'Avocado', 'Acai', 'Ackee'],
  b: ['Banana', 'Blueberry', 'Blackberry', 'Boysenberry'],
  c: ['Cherry', 'Cranberry', 'Cantaloupe', 'Coconut', 'Clementine'],
  d: ['Durian', 'Dragonfruit', 'Date', 'Dewberry'],
  e: ['Elderberry', 'Entawak'],
  f: ['Fig', 'Feijoa', 'Finger lime'],
  g: ['Grape', 'Guava', 'Gooseberry', 'Grapefruit'],
  h: ['Honeydew', 'Hackberry', 'Huckleberry'],
  i: ['Ilama', 'Imbe', 'Indian fig'],
  j: ['Jackfruit', 'Jujube', 'Jabuticaba'],
  k: ['Kiwi', 'Kumquat', 'Kaffir lime'],
  l: ['Lemon', 'Lime', 'Lychee', 'Longan'],
  m: ['Mango', 'Melon', 'Mulberry', 'Mandarin'],
  n: ['Nectarine', 'Noni'],
  o: ['Orange', 'Olive', 'Osage orange'],
  p: ['Peach', 'Pear', 'Pineapple', 'Plum', 'Papaya', 'Pomegranate', 'Passion fruit'],
  q: ['Quince', 'Quandong'],
  r: ['Raspberry', 'Rambutan', 'Redcurrant'],
  s: ['Strawberry', 'Star fruit', 'Soursop', 'Sapodilla'],
  t: ['Tangerine', 'Tamarind', 'Tomato'],
  u: ['Ugli fruit', 'Uvaia'],
  v: ['Vanilla bean', 'Voavanga'],
  w: ['Watermelon', 'Wampee'],
  x: ['Ximenia'],
  y: ['Yuzu', 'Yellow passion fruit'],
  z: ['Ziziphus', 'Zucchini'],
}

export function fakeSearch(
  query: string,
  signal?: AbortSignal,
): Promise<SearchResult[]> {
  const baseDelay = query.length <= 1 ? 1800 : query.length <= 2 ? 900 : 300
  const jitter = Math.random() * 400
  const delay = baseDelay + jitter

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(new DOMException('Aborted', 'AbortError'))
        return
      }
      const firstChar = query[0]?.toLowerCase() ?? ''
      const matches = (FRUIT_DB[firstChar] ?? []).filter((f) =>
        f.toLowerCase().includes(query.toLowerCase()),
      )
      resolve(
        matches.map((label, i) => ({
          id: i,
          label,
          query,
          delayMs: Math.round(delay),
        })),
      )
    }, delay)

    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}
