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
          black: '#40372D',
          espresso: '#40372D',
          olive: '#555A40',
          sage: '#77795F',
          chocolate: '#785B40',
          coffee: '#785B40',
          sand: '#C8BCA7',
          taupe: '#C8BCA7',
          beige: '#E9E1D3',
          terracotta: '#785B40',
          linen: '#F5F1E7',
          ivory: '#F5F1E7',
          white: '#FFFFFF',
        },
        espresso: {
          DEFAULT: '#40372D',
          dark: '#40372D',
          deep: '#785B40',
          card: '#40372D',
          surface: '#785B40',
          border: '#785B40',
        },
        cream: {
          DEFAULT: '#F5F1E7',
          light: '#F5F1E7',
          muted: '#E9E1D3',
          dark: '#C8BCA7',
        },
        olive: {
          DEFAULT: '#555A40',
          soft: '#77795F',
        },
        linen: '#F5F1E7',
        terracotta: '#785B40',
        sand: {
          DEFAULT: '#C8BCA7',
          light: '#C8BCA7',
        },
        gold: {
          DEFAULT: '#C8BCA7',
          light: '#C8BCA7',
          dark: '#C8BCA7',
          glow: 'rgba(200, 188, 167, 0.25)',
          border: 'rgba(200, 188, 167, 0.35)',
        },
        coffee: {
          brown: '#785B40',
          accent: '#785B40',
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
