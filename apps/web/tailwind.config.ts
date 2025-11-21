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
    },
  },
  plugins: [],
};

export default config;
