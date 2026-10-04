/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        india: {
          saffron: "#FF9933",
          deepOrange: "#FF5722",
          white: "#FFFFFF",
          green: "#138808",
          darkGreen: "#0d5c05",
          navy: "#000080",
          royalBlue: "#0B192C",
          midnight: "#050B14",
          gold: "#D4AF37",
          amber: "#F59E0B"
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Cinzel Decorative"', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
        body: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif']
      },
      animation: {
        'kenburns': 'kenburns 20s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marqueeRev 35s linear infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1.0) translate(0, 0)' },
          '100%': { transform: 'scale(1.15) translate(-1%, -1.5%)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        marqueeRev: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    },
  },
  plugins: [],
}
