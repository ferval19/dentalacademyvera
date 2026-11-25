import { ImageResponse } from 'next/og'
import { courses, splitTitle, formatShortDate } from '@/lib/data/courses'
import { professors } from '@/lib/data/professors'
import { publicDataUri, ogFonts, OG } from '@/lib/og/assets'

// Node (no edge) para leer fotos y logos de /public. Se prerenderiza en el build.
export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }))
}

// Tarjeta del retrato
const CARD = { top: 40, right: 40, width: 380, height: 550, radius: 32 }

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = courses.find((c) => c.id === id)
  if (!course) return new Response('Not found', { status: 404 })

  const professor = professors.find((p) => p.id === course.professorId)
  const photo = professor?.imageUrl ? await publicDataUri(professor.imageUrl) : null
  const logos = await Promise.all(
    (course.collaborators ?? []).map(async (c) => ({ name: c.name, src: await publicDataUri(c.logoUrl) })),
  )

  // Título en una o dos líneas; tamaño según la línea más larga para no invadir el retrato
  const [titleA, titleB] = splitTitle(course.title)
  const longest = Math.max(titleA.length, titleB.length)
  const titleSize = Math.min(64, Math.floor(640 / (longest * 0.5)))

  const facts = [
    { value: formatShortDate(course), label: course.dateISO?.slice(0, 4) ?? '' },
    { value: course.duration.replace(/\s*horas?$/, ' h'), label: 'de formación' },
    { value: String(course.spots), label: 'plazas' },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          background: 'white',
          fontFamily: OG.font,
          color: OG.ink,
        }}
      >
        {/* ── Columna de texto ── */}
        <div
          style={{
            position: 'absolute',
            left: '72px',
            top: '56px',
            bottom: '48px',
            width: '660px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Dental Academy&nbsp;<span style={{ color: OG.teal }}>Vera</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: OG.teal, fontSize: '24px', fontWeight: 600, marginBottom: '14px' }}>
              {course.categoryLabel} · {course.date}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: `${titleSize}px`,
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: '-0.035em',
              }}
            >
              <span style={{ display: 'flex' }}>{titleA}</span>
              {titleB && <span style={{ display: 'flex' }}>{titleB}</span>}
            </div>
            {course.subtitle && (
              <div style={{ display: 'flex', color: OG.ink2, fontSize: '28px', fontWeight: 400, marginTop: '16px', letterSpacing: '-0.015em' }}>
                {course.subtitle}
              </div>
            )}

            <div style={{ display: 'flex', gap: '56px', marginTop: '44px' }}>
              {facts.map((f) => (
                <div key={f.label} style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ display: 'flex', fontSize: '40px', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {f.value}
                  </span>
                  <span style={{ display: 'flex', fontSize: '18px', color: OG.ink2, marginTop: '8px' }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pie: web + colaboradores */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <span style={{ display: 'flex', fontSize: '17px', color: OG.ink2 }}>dentalacademyvera.com</span>
            {logos.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingLeft: '28px', borderLeft: '1px solid #d2d2d7' }}>
                {logos.map((logo) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    width={logos.length > 1 ? 110 : 96}
                    height={logos.length > 1 ? 36 : 44}
                    style={{ objectFit: 'contain' }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Retrato ── */}
        <div
          style={{
            position: 'absolute',
            top: `${CARD.top}px`,
            right: `${CARD.right}px`,
            width: `${CARD.width}px`,
            height: `${CARD.height}px`,
            borderRadius: `${CARD.radius}px`,
            overflow: 'hidden',
            display: 'flex',
            background: OG.surface,
          }}
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt=""
              width={CARD.width}
              height={CARD.height}
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: OG.teal,
                fontSize: '110px',
                fontWeight: 700,
              }}
            >
              {professor?.initials ?? 'DAV'}
            </div>
          )}
          {professor && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '120px 28px 28px',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.85) 100%)',
                color: 'white',
              }}
            >
              <span style={{ display: 'flex', fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginBottom: '4px' }}>Ponente</span>
              <span style={{ display: 'flex', fontSize: '26px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                {professor.name}
              </span>
              {professor.tagline && (
                <span style={{ display: 'flex', fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>
                  {professor.tagline}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  )
}
