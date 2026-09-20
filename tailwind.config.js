/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        canvas: '#faf8fc',
        primary: {
          DEFAULT: '#172b65',
          hover: '#0f1d45',
          light: '#eef2ff'
        },
        accent: {
          DEFAULT: '#5269dd',
          light: '#7684d6'
        },
        body: '#2d1f3f',
        muted: '#6f6782',
        border: '#e2e0ec'
      },
      animation: {
        'float-note': 'float-note 4.5s ease-in-out infinite',
        'breathe': 'breathe 5s ease-in-out infinite',
        'reveal-up': 'reveal-up 0.8s ease-out both'
      },
      keyframes: {
        'float-note': {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--note-rotate, 0deg))' },
          '50%': { transform: 'translateY(-6px) rotate(var(--note-rotate, 0deg))' }
        },
        'breathe': {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
