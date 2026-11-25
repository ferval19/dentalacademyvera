import { readFile } from 'node:fs/promises'
import path from 'node:path'

/** Lee un archivo de /public y lo devuelve como data URI (para ImageResponse). */
export async function publicDataUri(url: string) {
  const file = await readFile(path.join(process.cwd(), 'public', url))
  const ext = path.extname(url).slice(1).toLowerCase()
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`
  return `data:${mime};base64,${file.toString('base64')}`
}

/** Inter (OFL) en assets/fonts: el generador por defecto solo trae peso normal. */
export async function ogFonts() {
  const load = (file: string) => readFile(path.join(process.cwd(), 'assets/fonts', file))
  const [regular, semibold, bold] = await Promise.all([
    load('Inter-Regular.ttf'),
    load('Inter-SemiBold.ttf'),
    load('Inter-Bold.ttf'),
  ])
  return [
    { name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: semibold, weight: 600 as const, style: 'normal' as const },
    { name: 'Inter', data: bold, weight: 700 as const, style: 'normal' as const },
  ]
}

// Paleta de las imágenes para compartir (misma que la web)
export const OG = {
  ink: '#1d1d1f',
  ink2: '#6e6e73',
  surface: '#f5f5f7',
  teal: '#168373',
  font: 'Inter',
}
