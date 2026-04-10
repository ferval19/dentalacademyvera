import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Outfit } from 'next/font/google'
import { CONTACT } from '@/lib/contact'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

const SITE_URL = 'https://dentalacademyvera.com'
const SITE_NAME = 'Dental Academy Vera'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Formación dental de excelencia`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Formación dental de excelencia en Vera, Almería. Cursos presenciales y online impartidos por profesionales referentes del sector. Endodoncia, estética, implantología y más.',
  keywords: [
    'formación dental',
    'cursos odontología',
    'endodoncia',
    'dental academy',
    'vera almería',
    'formación odontológica',
    'cursos dentistas',
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
      'Cursos presenciales y online para dentistas e higienistas. Vera, Almería.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Formación dental de excelencia`,
    description: 'Cursos presenciales y online para dentistas e higienistas. Vera, Almería.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE_NAME,
  url: SITE_URL,
  telephone: `+34${CONTACT.phone}`,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vera',
    addressRegion: 'Almería',
    addressCountry: 'ES',
  },
  sameAs: [SITE_URL],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dmSans.variable} ${outfit.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-body text-gray-600 bg-white leading-[1.7]">
        {children}
      </body>
    </html>
  )
}
