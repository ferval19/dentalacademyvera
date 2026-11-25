import type { MetadataRoute } from 'next'
import { courses, isPastCourse } from '@/lib/data/courses'
import { SITE_URL as BASE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const courseUrls: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${BASE}/cursos/${course.id}`,
    lastModified: new Date(),
    changeFrequency: isPastCourse(course) ? 'yearly' : 'weekly',
    priority: isPastCourse(course) ? 0.5 : 0.9,
  }))

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    { url: `${BASE}/cursos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/profesores`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...courseUrls,
  ]
}
