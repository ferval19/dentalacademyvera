import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { courses, splitTitle } from '@/lib/data/courses'
import { professors } from '@/lib/data/professors'

// Node (no edge) para poder leer fotos y logos de /public. Se prerenderiza en el
// build (generateStaticParams), así que en producción es un archivo estático.
export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }))
}

const NAVY = '#1c2a3a'
const TEAL = '#2BB5A0'

// Retrato en arco
const ARCH_W = 340
const ARCH_H = 640 // sobresale por abajo: el arco "sale" del encuadre
const ARCH_TOP = 58
const ARCH_RIGHT = 84
const ARCH_RADIUS = `${ARCH_W / 2}px ${ARCH_W / 2}px 0 0`

async function publicDataUri(url: string) {
  const file = await readFile(path.join(process.cwd(), 'public', url))
  const ext = path.extname(url).slice(1).toLowerCase()
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`
  return `data:${mime};base64,${file.toString('base64')}`
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = courses.find((c) => c.id === id)
  if (!course) return new Response('Not found', { status: 404 })

  const professor = professors.find((p) => p.id === course.professorId)
  const photo = professor?.imageUrl ? await publicDataUri(professor.imageUrl) : null
  const logos = await Promise.all(
    (course.collaborators ?? []).map(async (c) => ({ name: c.name, src: await publicDataUri(c.logoUrl) })),
  )

  // Título en dos líneas; el tamaño se ajusta a la línea más larga para no invadir el retrato
  const [titleA, titleB] = splitTitle(course.title)
  const longest = Math.max(titleA.length, titleB.length)
  const titleSize = Math.min(66, Math.floor(650 / (longest * 0.5)))

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          background: `linear-gradient(160deg, ${NAVY} 0%, #243040 55%, #2a3a50 100%)`,
          fontFamily: 'system-ui, -apple-system, Helvetica, Arial, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Retícula sutil */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'repeating-linear-gradient(90deg,rgba(255,255,255,0.035) 0px,rgba(255,255,255,0.035) 1px,transparent 1px,transparent 60px),' +
              'repeating-linear-gradient(0deg,rgba(255,255,255,0.035) 0px,rgba(255,255,255,0.035) 1px,transparent 1px,transparent 60px)',
          }}
        />

        {/* Halo detrás del retrato */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-40px',
            width: '640px',
            height: '640px',
            borderRadius: '50%',
            display: 'flex',
            background: 'radial-gradient(circle, rgba(43,181,160,0.24) 0%, rgba(43,181,160,0.08) 45%, transparent 70%)',
          }}
        />

        {/* Barra de acento superior */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            display: 'flex',
            background: `linear-gradient(90deg, ${TEAL} 0%, rgba(43,181,160,0.35) 60%, transparent 100%)`,
          }}
        />

        {/* ── Retrato ─────────────────────────────────────────── */}
        {/* Arco fino desplazado: da profundidad */}
        <div
          style={{
            position: 'absolute',
            top: `${ARCH_TOP - 18}px`,
            right: `${ARCH_RIGHT - 18}px`,
            width: `${ARCH_W}px`,
            height: `${ARCH_H}px`,
            borderRadius: ARCH_RADIUS,
            border: '1.5px solid rgba(43,181,160,0.55)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: `${ARCH_TOP}px`,
            right: `${ARCH_RIGHT}px`,
            width: `${ARCH_W}px`,
            height: `${ARCH_H}px`,
            borderRadius: ARCH_RADIUS,
            overflow: 'hidden',
            display: 'flex',
            background: 'linear-gradient(180deg, #e9eef0 0%, #cfdadc 100%)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.35)',
          }}
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt=""
              width={ARCH_W}
              height={ARCH_H}
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '70%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: TEAL,
                fontSize: '96px',
                fontWeight: 700,
              }}
            >
              {professor?.initials ?? 'DAV'}
            </div>
          )}

          {/* Degradado para el rótulo del ponente */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '360px',
              display: 'flex',
              background: 'linear-gradient(180deg, rgba(20,30,42,0) 0%, rgba(20,30,42,0.55) 30%, rgba(20,30,42,0.9) 58%, rgba(20,30,42,0.97) 100%)',
            }}
          />

          {professor && (
            <div
              style={{
                position: 'absolute',
                left: '28px',
                right: '24px',
                bottom: `${ARCH_H - (630 - ARCH_TOP) + 34}px`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: TEAL, fontSize: '13px', fontWeight: 700, letterSpacing: '0.16em', display: 'flex', marginBottom: '6px' }}>
                PONENTE
              </span>
              <span style={{ color: 'white', fontSize: '25px', fontWeight: 700, lineHeight: 1.15, display: 'flex' }}>
                {professor.name}
              </span>
              {professor.tagline && (
                <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: '15px', marginTop: '6px', display: 'flex' }}>
                  {professor.tagline}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Columna de texto ────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            left: '80px',
            top: '44px',
            bottom: '40px',
            width: '660px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Marca */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.55)', fontSize: '15px', fontWeight: 600, letterSpacing: '0.16em' }}>
            DENTAL ACADEMY <span style={{ color: TEAL, display: 'flex' }}>VERA</span>
          </div>

          {/* Bloque principal centrado en vertical */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '3px', background: TEAL, display: 'flex' }} />
              <span style={{ color: TEAL, fontSize: '16px', fontWeight: 700, letterSpacing: '0.14em', display: 'flex' }}>
                {course.categoryLabel.toUpperCase()}
              </span>
              {course.includesPractice && (
                <span
                  style={{
                    border: '1px solid rgba(43,181,160,0.5)',
                    background: 'rgba(43,181,160,0.15)',
                    borderRadius: '100px',
                    padding: '4px 14px',
                    color: TEAL,
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    display: 'flex',
                  }}
                >
                  INCLUYE PRÁCTICA
                </span>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
                fontSize: `${titleSize}px`,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                marginBottom: '22px',
              }}
            >
              <span style={{ display: 'flex' }}>{titleA}</span>
              {titleB && <span style={{ display: 'flex', color: TEAL }}>{titleB}</span>}
            </div>

            {course.subtitle && (
              <div style={{ display: 'flex', color: 'rgba(255,255,255,0.62)', fontSize: '23px', marginBottom: '34px' }}>
                {course.subtitle}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                gap: '44px',
                paddingTop: '22px',
                borderTop: '1px solid rgba(255,255,255,0.14)',
                width: '600px',
              }}
            >
              {[
                { label: 'FECHA', value: course.date },
                { label: 'DURACIÓN', value: course.duration },
                { label: 'PLAZAS', value: `${course.spots} máx.` },
                { label: 'LUGAR', value: 'Vera, Almería' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ color: TEAL, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', display: 'flex' }}>{label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '20px', fontWeight: 500, display: 'flex' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pie: web + colaboradores */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', letterSpacing: '0.03em', display: 'flex' }}>
              dentalacademyvera.com
            </span>
            {logos.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', display: 'flex' }}>
                  {logos.length > 1 ? 'COLABORAN' : 'COLABORA'}
                </span>
                <div
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '7px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                  }}
                >
                  {logos.map((logo) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={logo.name}
                      src={logo.src}
                      alt={logo.name}
                      width={logos.length > 1 ? 104 : 84}
                      height={logos.length > 1 ? 36 : 44}
                      style={{ objectFit: 'contain' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
