#!/usr/bin/env node
/**
 * Genera las imágenes para compartir (WhatsApp, LinkedIn, Facebook…) como JPG
 * estáticos: la general (app/og/home/route.tsx → public/og-image.jpg) y la de
 * cada curso (app/cursos/[id]/opengraph-image.tsx → ogImage del curso).
 *
 * Por qué JPG estático: WhatsApp no muestra bien las imágenes servidas por una
 * función edge ni las PNG pesadas (límite práctico ~300 KB).
 *
 * Uso:
 *   npm run build && npm run start      # en otra terminal
 *   npm run og                          # o: node scripts/generate-og.mjs http://localhost:3000
 *
 * Escribe cada imagen en la ruta indicada en `ogImage` del curso (lib/data/courses.ts).
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const MAX_BYTES = 300 * 1024

// Lee pares id → ogImage del fichero de datos (cada curso empieza por `id: '…'`)
const source = await readFile(path.join(root, 'lib/data/courses.ts'), 'utf8')
const blocks = source.split(/\n\s{4}id: '/).slice(1)
const courses = blocks.map((b) => ({
  id: b.slice(0, b.indexOf("'")),
  ogImage: b.match(/\n\s{4}ogImage: '([^']+)'/)?.[1],
}))

// Imagen general (portada, /cursos, /profesores) + una por curso
const jobs = [
  { label: 'general', url: `${base}/og/home`, out: '/og-image.jpg' },
  ...courses.map(({ id, ogImage }) => ({ label: id, url: `${base}/cursos/${id}/opengraph-image`, out: ogImage })),
]

let failed = false
for (const { label: id, url, out: ogImage } of jobs) {
  if (!ogImage) {
    console.warn(`⚠ ${id}: sin ogImage en courses.ts, se usará la imagen dinámica`)
    continue
  }
  const res = await fetch(url)
  if (!res.ok) {
    console.error(`✗ ${id}: ${res.status} al pedir la imagen (¿está arrancado el servidor en ${base}?)`)
    failed = true
    continue
  }
  const png = Buffer.from(await res.arrayBuffer())
  let quality = 86
  let jpg = await sharp(png).jpeg({ quality, mozjpeg: true }).toBuffer()
  while (jpg.length > MAX_BYTES && quality > 60) {
    quality -= 6
    jpg = await sharp(png).jpeg({ quality, mozjpeg: true }).toBuffer()
  }
  const out = path.join(root, 'public', ogImage)
  await writeFile(out, jpg)
  console.log(`✓ ${id} → public${ogImage} (${Math.round(jpg.length / 1024)} KB, q${quality})`)
}
process.exit(failed ? 1 : 0)
