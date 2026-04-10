/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./splash.html",
    "./widget.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        foreground: '#fafafa',
        card: '#18181b',
        border: 'rgba(255, 255, 255, 0.06)',
        accent: {
          DEFAULT: '#3b82f6',
          muted: 'rgba(59, 130, 246, 0.2)',
        },
        graphite: {
          light: '#27272a',
          DEFAULT: '#18181b',
          dark: '#09090b',
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'SF Pro Display', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
