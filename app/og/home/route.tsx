import { ImageResponse } from 'next/og'
import { publicDataUri, ogFonts, OG } from '@/lib/og/assets'

/*
 * Imagen general para compartir (portada, /cursos, /profesores).
 * Sin fechas para que no caduque. `npm run og` la guarda como public/og-image.jpg,
 * que es la que usan los metadatos.
 */
export const dynamic = 'force-static'
export const runtime = 'nodejs'

export async function GET() {
  const logo = await publicDataUri('/images/logo-icon.png')

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          fontFamily: OG.font,
          color: OG.ink,
          textAlign: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={84} height={84} style={{ objectFit: 'contain', marginBottom: '28px' }} />
        <div style={{ display: 'flex', color: OG.teal, fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>
          Dental Academy Vera
        </div>
        <div style={{ display: 'flex', fontSize: '84px', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.02 }}>
          Formación dental en Vera.
        </div>
        <div style={{ display: 'flex', fontSize: '32px', color: OG.ink2, fontWeight: 400, marginTop: '20px', letterSpacing: '-0.015em' }}>
          Cursos presenciales para dentistas, en grupos reducidos.
        </div>
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '56px',
            padding: '18px 36px',
            borderRadius: '999px',
            background: OG.surface,
            fontSize: '22px',
            color: OG.ink,
          }}
        >
          <span style={{ display: 'flex' }}>Endodoncia</span>
          <span style={{ display: 'flex', color: '#c7c7cc' }}>·</span>
          <span style={{ display: 'flex' }}>Ortodoncia con alineadores</span>
          <span style={{ display: 'flex', color: '#c7c7cc' }}>·</span>
          <span style={{ display: 'flex' }}>Vera, Almería</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await ogFonts() },
  )
}
