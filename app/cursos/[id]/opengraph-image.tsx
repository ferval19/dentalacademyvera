import { ImageResponse } from 'next/og'
import { courses } from '@/lib/data/courses'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = courses.find((c) => c.id === id)
  if (!course) return new Response('Not found', { status: 404 })

  return new ImageResponse(
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: 'linear-gradient(165deg, #1e2d3d 0%, #2d3e50 45%, #3a5068 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Radial teal glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 80% 30%, rgba(43,181,160,0.18) 0%, transparent 60%)',
        }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, #2BB5A0, #A8E6D8)',
        }}
      />

      {/* Academy name — top right */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          right: '60px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255,255,255,0.45)',
          fontSize: '16px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        DENTAL ACADEMY VERA
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
        }}
      >
        {/* Category label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{ width: '36px', height: '3px', background: '#2BB5A0' }}
          />
          <span
            style={{
              color: '#2BB5A0',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {course.categoryLabel}
          </span>
          {course.includesPractice && (
            <span
              style={{
                background: 'rgba(43,181,160,0.2)',
                border: '1px solid rgba(43,181,160,0.4)',
                color: '#2BB5A0',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '4px 14px',
                borderRadius: '100px',
              }}
            >
              ✓ Incluye práctica
            </span>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            color: 'white',
            fontSize: '62px',
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: '800px',
            marginBottom: '28px',
          }}
        >
          {course.title}
        </div>

        {/* Subtitle */}
        {course.subtitle && (
          <div
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '24px',
              marginBottom: '36px',
              maxWidth: '680px',
              lineHeight: 1.4,
            }}
          >
            {course.subtitle}
          </div>
        )}

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            color: 'rgba(255,255,255,0.75)',
            fontSize: '20px',
          }}
        >
          <span>📅 {course.date}</span>
          <span>📍 {course.location}</span>
          <span>⏱ {course.duration}</span>
          <span
            style={{
              background: '#2BB5A0',
              color: 'white',
              padding: '4px 16px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '20px',
            }}
          >
            {course.price} €
          </span>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
