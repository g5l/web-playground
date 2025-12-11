import { build } from 'esbuild'
import { mkdir, cp } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
  await mkdir('public', { recursive: true })
  await build({
    entryPoints: ['src/client/index.js'],
    outfile: 'public/client.js',
    bundle: true,
    minify: false,
    sourcemap: true,
    platform: 'browser',
    target: 'es2020',
    format: 'esm',
    define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }
  })
  // Copy styles if present
  try {
    await cp('public/styles.css', 'public/styles.css')
  } catch {}
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

