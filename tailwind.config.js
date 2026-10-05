/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#160D08',
          dark: '#090604',
          deep: '#24150E',
          card: '#1F130C',
          surface: '#2A1A12',
          border: '#3D281C',
        },
        cream: {
          DEFAULT: '#F3EBDD',
          light: '#F8F4EC',
          muted: '#D8CEBF',
          dark: '#C8BAA6',
        },
        gold: {
          DEFAULT: '#C8A46A',
          light: '#E3C994',
          dark: '#A68249',
          glow: 'rgba(200, 164, 106, 0.25)',
          border: 'rgba(200, 164, 106, 0.35)',
        },
        coffee: {
          brown: '#4A2B1C',
          accent: '#82543A',
        }
      },
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'Tajawal', 'sans-serif'],
        kufi: ['"Noto Kufi Arabic"', '"IBM Plex Arabic"', 'sans-serif'],
        brand: ['"Cormorant Garamond"', 'Playfair Display', 'Cinzel', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(200, 164, 106, 0.15)',
        'gold-glow-lg': '0 0 45px rgba(200, 164, 106, 0.28)',
        'luxury-card': '0 20px 40px -15px rgba(9, 6, 4, 0.7)',
        'soft-inner': 'inset 0 1px 1px 0 rgba(227, 201, 148, 0.2)',
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
