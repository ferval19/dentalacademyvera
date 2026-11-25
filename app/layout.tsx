import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import { CONTACT } from '@/lib/contact'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, versionedAsset } from '@/lib/site'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/images/logo-icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  title: {
    default: `${SITE_NAME} — Formación dental de excelencia`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Cursos presenciales para dentistas en Vera (Almería): endodoncia, ortodoncia con alineadores y más, en grupos reducidos y con ponentes de referencia.',
  keywords: [
    'formación dental Vera Almería',
    'cursos odontología',
    'curso endodoncia clínica',
    'dental academy vera',
    'formación odontológica presencial',
    'cursos dentistas Almería',
    'endodoncia microscópica',
    'Dr Rafael Ibáñez endodoncia',
    'curso alineadores transparentes',
    'alineadores en pacientes en crecimiento',
    'ortodoncia interceptiva alineadores',
    'Dr Juan Manuel Bailón Rivera',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Formación dental de excelencia`,
    description:
      'Cursos presenciales para dentistas en Vera (Almería), en grupos reducidos y con ponentes de referencia.',
    images: [{ ...DEFAULT_OG_IMAGE, url: versionedAsset(DEFAULT_OG_IMAGE.url), type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Formación dental de excelencia`,
    description: 'Cursos presenciales para dentistas en Vera (Almería), en grupos reducidos y con ponentes de referencia.',
    images: [versionedAsset(DEFAULT_OG_IMAGE.url)],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-icon.png`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: `+34${CONTACT.phone}`,
  email: CONTACT.email,
  priceRange: '€€',
  description:
    'Academia de formación dental especializada en Vera, Almería. Cursos presenciales impartidos por referentes del sector.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vera',
    addressRegion: 'Almería',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.2497,
    longitude: -1.8605,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 37.2497, longitude: -1.8605 },
    geoRadius: '150000',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={dmSans.variable}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-apple text-ink bg-white leading-[1.5] antialiased">
        {children}
      </body>
    </html>
  )
}
