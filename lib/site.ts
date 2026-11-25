export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.dentalacademyvera.com')

export const SITE_NAME = 'Dental Academy Vera'
