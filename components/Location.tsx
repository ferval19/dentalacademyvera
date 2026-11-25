import { MapPin, Car, Plane } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { getNextCourse, courses } from '@/lib/data/courses'
import { Section, Eyebrow, Title, Lead, ChevronLink } from './ui'

/** Cómo llegar: para quien viene de fuera de Almería. */
export default function Location() {
  const course = getNextCourse() ?? courses[0]
  const venue = course?.location ?? 'Vera, Almería'
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue}, Vera, Almería`)}`

  const tiles = [
    {
      icon: MapPin,
      title: 'El espacio',
      body: `Los cursos se celebran en ${venue}, un espacio de trabajo preparado para formación en grupos reducidos.`,
      link: course?.locationUrl ? { href: course.locationUrl, label: 'Conocer el espacio' } : undefined,
    },
    {
      icon: Car,
      title: 'En coche',
      body: 'Vera está junto a la autovía A-7, que la conecta con Almería, Murcia y el resto de la costa mediterránea.',
      link: { href: mapsUrl, label: 'Abrir en Google Maps' },
    },
    {
      icon: Plane,
      title: 'En avión',
      body: 'Los aeropuertos más cercanos son el de Almería, a una hora aproximadamente, y el de la Región de Murcia, a algo más.',
    },
  ]

  return (
    <Section id="como-llegar" tone="white" labelledBy="como-llegar-heading">
      <AnimateOnScroll className="mb-14">
        <Eyebrow>Cómo llegar</Eyebrow>
        <Title id="como-llegar-heading">Vera, Almería.</Title>
        <Lead className="mt-4 max-w-[40ch]">En la costa mediterránea y bien comunicada, para que vengas desde donde estés.</Lead>
      </AnimateOnScroll>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiles.map(({ icon: Icon, title, body, link }, i) => (
          <li key={title}>
            <AnimateOnScroll delay={i * 60} className="h-full">
              <div className="h-full rounded-[28px] bg-surface p-8 md:p-10 flex flex-col">
                <Icon aria-hidden className="w-7 h-7 text-teal-deep stroke-[1.75] mb-8" />
                <h3 className="text-[21px] font-semibold tracking-[-0.015em] text-ink mb-2">{title}</h3>
                <p className="text-[17px] leading-[1.47] text-ink-2">{body}</p>
                {link && (
                  <ChevronLink href={link.href} className="mt-6 text-[15px]">{link.label}</ChevronLink>
                )}
              </div>
            </AnimateOnScroll>
          </li>
        ))}
      </ul>
    </Section>
  )
}
