import { ImageResponse } from 'next/og'
import { courses } from '@/lib/data/courses'
import { ENDOGAL_WHITE_B64 } from '@/lib/endogal-b64'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = courses.find((c) => c.id === id)
  if (!course) return new Response('Not found', { status: 404 })

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: 'linear-gradient(160deg, #1c2a3a 0%, #243040 50%, #2a3a50 100%)',
          fontFamily: 'system-ui, -apple-system, Helvetica, Arial, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(90deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 60px),' +
              'repeating-linear-gradient(0deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 60px)',
            display: 'flex',
          }}
        />

        {/* Teal radial glow — top right */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '580px',
            height: '580px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(43,181,160,0.22) 0%, rgba(43,181,160,0.10) 40%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Teal glow — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-80px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(43,181,160,0.14) 0%, transparent 65%)',
            display: 'flex',
          }}
        />

        {/* Decorative ring top-left */}
        <div
          style={{
            position: 'absolute',
            top: '38px',
            left: '50px',
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.10)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '52px',
            left: '64px',
            width: '82px',
            height: '82px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
          }}
        />

        {/* Tooth silhouette — right side */}
        <div
          style={{
            position: 'absolute',
            right: '90px',
            top: '40px',
            width: '320px',
            height: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.12,
          }}
        >
          <svg width="300" height="460" viewBox="0 0 300 460" fill="none">
            {/* Crown */}
            <path
              d="M50 200 L30 130 L20 60 L55 25 L90 55 L110 20 L150 5 L190 20 L210 55 L245 25 L280 60 L270 130 L250 200 L210 230 L150 240 L90 230 Z"
              fill="rgba(43,181,160,0.6)"
              stroke="rgba(43,181,160,0.9)"
              strokeWidth="3"
            />
            {/* Left root */}
            <path
              d="M90 230 L75 300 L80 370 L100 400 L120 390 L110 230 Z"
              fill="rgba(43,181,160,0.5)"
              stroke="rgba(43,181,160,0.8)"
              strokeWidth="2"
            />
            {/* Right root */}
            <path
              d="M190 230 L210 390 L230 400 L250 370 L255 300 L240 230 Z"
              fill="rgba(43,181,160,0.5)"
              stroke="rgba(43,181,160,0.8)"
              strokeWidth="2"
            />
            {/* Left canal */}
            <path
              d="M100 232 L92 340 L100 390"
              stroke="rgba(43,181,160,0.9)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right canal */}
            <path
              d="M200 232 L208 340 L200 390"
              stroke="rgba(43,181,160,0.9)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #2BB5A0 0%, rgba(43,181,160,0.3) 60%, transparent 100%)',
            display: 'flex',
          }}
        />

        {/* Academy name — top right */}
        <div
          style={{
            position: 'absolute',
            top: '36px',
            right: '52px',
            color: 'rgba(255,255,255,0.40)',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          DENTAL ACADEMY VERA
        </div>

        {/* Main content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            padding: '130px 80px 60px',
            flex: 1,
          }}
        >
          {/* Category row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
            <div style={{ width: '32px', height: '3px', background: '#2BB5A0', display: 'flex' }} />
            <span
              style={{
                color: '#2BB5A0',
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              {course.categoryLabel}
            </span>
            {course.includesPractice && (
              <div
                style={{
                  background: 'rgba(43,181,160,0.18)',
                  border: '1px solid rgba(43,181,160,0.45)',
                  borderRadius: '100px',
                  padding: '4px 16px',
                  color: '#2BB5A0',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
              >
                INCLUYE PRACTICA
              </div>
            )}
          </div>

          {/* Title */}
          <div
            style={{
              color: 'white',
              fontSize: '68px',
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: '720px',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ display: 'flex' }}>{course.title.split(' en ')[0] + ' en'}</span>
            <span style={{ color: '#2BB5A0', display: 'flex' }}>
              {course.title.includes(' en ') ? course.title.split(' en ')[1] : ''}
            </span>
          </div>

          {/* Subtitle */}
          {course.subtitle && (
            <div
              style={{
                color: 'rgba(255,255,255,0.60)',
                fontSize: '22px',
                maxWidth: '620px',
                lineHeight: 1.45,
                marginBottom: '32px',
                display: 'flex',
              }}
            >
              {course.subtitle}
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              width: '400px',
              height: '1px',
              background: 'rgba(255,255,255,0.12)',
              marginBottom: '28px',
              display: 'flex',
            }}
          />

          {/* Meta + price row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0', justifyContent: 'space-between', maxWidth: '720px' }}>
            <div style={{ display: 'flex', gap: '36px' }}>
              {[
                { label: 'FECHA', value: course.date },
                { label: 'DURACIÓN', value: course.duration },
                { label: 'PLAZAS', value: `${course.spots} máx.` },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ color: '#2BB5A0', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', display: 'flex' }}>
                    {label}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: '19px', fontWeight: 500, display: 'flex' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Price badge */}
            <div
              style={{
                background: '#2BB5A0',
                borderRadius: '12px',
                padding: '10px 22px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ color: 'white', fontSize: '28px', fontWeight: 800, lineHeight: 1.1, display: 'flex' }}>
                {course.price} €
              </span>
            </div>
          </div>

          {/* URL watermark */}
          <div
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '80px',
              color: 'rgba(255,255,255,0.30)',
              fontSize: '14px',
              letterSpacing: '0.04em',
              display: 'flex',
            }}
          >
            dentalacademyvera.com
          </div>

          {/* Collaborator logo */}
          <div
            style={{
              position: 'absolute',
              bottom: '22px',
              right: '52px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.28)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                display: 'flex',
              }}
            >
              COLABORA
            </span>
            <div
              style={{
                background: 'white',
                borderRadius: '6px',
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ENDOGAL_WHITE_B64}
                alt="Endogal"
                width={90}
                height={60}
                style={{ objectFit: 'contain', display: 'flex' }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
