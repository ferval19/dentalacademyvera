import type { MetadataRoute } from 'next'
import { courses } from '@/lib/data/courses'

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://dentalacademyvera.com')

export default function sitemap(): MetadataRoute.Sitemap {
  const courseUrls: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${BASE}/cursos/${course.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...courseUrls,
  ]
}
