/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#191817',
          olive: '#646044',
          chocolate: '#4B2B1D',
          sand: '#D2BE9D',
          terracotta: '#AA7A63',
          linen: '#F3EBDD',
        },
        espresso: {
          DEFAULT: '#191817',
          dark: '#191817',
          deep: '#4B2B1D',
          card: '#191817',
          surface: '#4B2B1D',
          border: '#4B2B1D',
        },
        cream: {
          DEFAULT: '#F3EBDD',
          light: '#F3EBDD',
          muted: '#D2BE9D',
          dark: '#D2BE9D',
        },
        olive: {
          DEFAULT: '#646044',
          soft: '#646044',
        },
        linen: '#F3EBDD',
        terracotta: '#AA7A63',
        sand: {
          DEFAULT: '#D2BE9D',
          light: '#D2BE9D',
        },
        gold: {
          DEFAULT: '#D2BE9D',
          light: '#D2BE9D',
          dark: '#D2BE9D',
          glow: 'rgba(210, 190, 157, 0.25)',
          border: 'rgba(210, 190, 157, 0.35)',
        },
        coffee: {
          brown: '#4B2B1D',
          accent: '#4B2B1D',
        }
      },
      fontFamily: {
        sans: ['Almarai', 'sans-serif'],
        arabic: ['Almarai', 'sans-serif'],
        kufi: ['Almarai', 'sans-serif'],
        brand: ['Almarai', 'sans-serif'],
        mono: ['Almarai', 'sans-serif'],
      },
      backgroundImage: {
        'brand-stripes': 'var(--color-brand-stripes)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(210, 190, 157, 0.15)',
        'gold-glow-lg': '0 0 45px rgba(210, 190, 157, 0.28)',
        'luxury-card': '0 20px 40px -15px rgba(25, 24, 23, 0.7)',
        'soft-inner': 'inset 0 1px 1px 0 rgba(210, 190, 157, 0.2)',
      },
      animation: {
        'steam': 'steam 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '25%': { opacity: '0.6' },
          '75%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-60px) scaleX(1.8)', opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
