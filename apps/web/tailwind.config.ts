import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bubrolinguo brand colors
        brand: {
          primary: '#FF6B35', // Beaver orange
          secondary: '#004E89', // Polish blue
          accent: '#F7931E', // Energetic orange
          success: '#06D6A0', // Success green
          warning: '#FFD23F', // Warning yellow
          error: '#EF476F', // Error red
        },
        beaver: {
          50: '#FFF5F0',
          100: '#FFE6D5',
          200: '#FFCCA7',
          300: '#FFB380',
          400: '#FF9A5A',
          500: '#FF6B35', // Main beaver color
          600: '#E65420',
          700: '#B33D15',
          800: '#80270C',
          900: '#4D1205',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.9',
          },
        },
        flicker: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(0.98)',
          },
        },
        bounceGentle: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
