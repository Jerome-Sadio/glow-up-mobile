/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000103',
        primary: '#00C2FF', // Shadow Monarch Blue
        secondary: '#9D00FF', // Level Up Purple
        accent: '#FF0055',    // Warning/Danger Red
        surface: 'rgba(255, 255, 255, 0.05)',
        'surface-border': 'rgba(255, 255, 255, 0.1)',
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00C2FF, 0 0 20px rgba(0, 194, 255, 0.4)',
        'neon-purple': '0 0 10px #9D00FF, 0 0 20px rgba(157, 0, 255, 0.4)',
        'neon-accent': '0 0 10px #FF0055, 0 0 20px rgba(255, 0, 85, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hunter-gradient': 'linear-gradient(135deg, #00C2FF 0%, #9D00FF 100%)',
      }
    },
  },
  plugins: [],
}
