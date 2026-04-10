import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#2D3E50',
          deep: '#1E2D3D',
          light: '#3A5068',
        },
        teal: {
          DEFAULT: '#2BB5A0',
          dark: '#239E8B',
          light: '#E6F7F4',
          50: '#F0FAF8',
        },
        mint: '#A8E6D8',
        'off-white': '#F5F8FA',
        gray: {
          100: '#F1F3F5',
          200: '#E2E7EC',
          300: '#D1D8E0',
          400: '#A4B0BD',
          500: '#6C7A89',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', '-apple-system', 'sans-serif'],
        label: ['var(--font-outfit)', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 3px rgba(45,62,80,0.06)',
        md: '0 4px 16px rgba(45,62,80,0.08)',
        lg: '0 12px 40px rgba(45,62,80,0.10)',
        xl: '0 24px 60px rgba(45,62,80,0.13)',
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '20px',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
        blink: 'blink 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config
