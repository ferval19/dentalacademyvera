import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import nodePath from 'node:path'
import type { Metadata } from 'next'

// Dominio canónico. En producción lo fija NEXT_PUBLIC_SITE_URL; sin ella se usa
// siempre el dominio real (nunca la URL temporal de cada despliegue de Vercel).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.dentalacademyvera.com').replace(/\/$/, '')

export const SITE_NAME = 'Dental Academy Vera'

export const DEFAULT_OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — Formación dental en Vera, Almería`,
}

/**
 * Añade ?v=<huella del contenido> a una imagen de /public. WhatsApp, Facebook o
 * LinkedIn guardan en caché la vista previa por URL de imagen: si la imagen
 * cambia, cambia la URL y la vuelven a descargar. Se calcula en el build.
 */
export function versionedAsset(url: string) {
  if (!url.startsWith('/') || url.includes('?')) return url
  try {
    const file = readFileSync(nodePath.join(process.cwd(), 'public', url))
    return `${url}?v=${createHash('md5').update(file).digest('hex').slice(0, 8)}`
  } catch {
    return url // no está en /public (p. ej. imagen generada al vuelo)
  }
}

/**
 * Metadatos completos de una página (canonical + Open Graph + Twitter).
 * Next sustituye el objeto openGraph del layout entero en cada página, así que
 * hay que repetir siteName, locale e imagen aquí para no perderlos.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  socialTitle,
}: {
  title: string
  description: string
  path: string
  image?: { url: string; width: number; height: number; alt: string }
  socialTitle?: string
}): Metadata {
  const url = `${SITE_URL}${path}`
  const ogTitle = socialTitle ?? `${title} — ${SITE_NAME}`
  const imageUrl = versionedAsset(image.url)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      siteName: SITE_NAME,
      url,
      title: ogTitle,
      description,
      images: [{ ...image, url: imageUrl, type: image.url.endsWith('.png') ? 'image/png' : 'image/jpeg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [imageUrl],
    },
  }
}
