/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-green': '#0A2F1F',
        'darker-green': '#051A11',
        'darkest-green': '#010D08',
        'dash-purple': '#5941F7',
        'dash-purple-light': '#7B66FF',
        'dash-black': '#171717',
        'dash-beige': '#F6F5F0',
        'dash-beige-dark': '#E9E8E0',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        'dash': ['Open Sans', 'system-ui', 'sans-serif'],
        'dash-display': ['Open Sans', 'system-ui', 'sans-serif'],
        'heading': ['Raleway', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'flutter': 'flutter 1.5s ease-in-out infinite',
        'flutter-slow': 'flutter 3s ease-in-out infinite',
        'wing-flap': 'wingFlap 200ms ease-in-out infinite alternate',
        'wing-flap-slow': 'wingFlap 400ms ease-in-out infinite alternate',
        'wing-flutter': 'wingFlutter 120ms ease-in-out infinite alternate',
        'wing-flutter-slow': 'wingFlutter 240ms ease-in-out infinite alternate',
        'trail-1': 'trail 1.5s ease-out infinite',
        'trail-2': 'trail 1.5s ease-out 0.2s infinite',
        'trail-3': 'trail 1.5s ease-out 0.4s infinite',
        'trail-slow-1': 'trailSlow 3s ease-out infinite',
        'trail-slow-2': 'trailSlow 3s ease-out 0.4s infinite',
        'trail-slow-3': 'trailSlow 3s ease-out 0.8s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        flutter: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-2px) translateX(1px)' },
          '50%': { transform: 'translateY(0) translateX(-1px)' },
          '75%': { transform: 'translateY(2px) translateX(1px)' },
        },
        wingFlap: {
          '0%': { opacity: '0.7', transform: 'scaleX(1.1) scaleY(0.9)' },
          '100%': { opacity: '0.9', transform: 'scaleX(0.9) scaleY(1.1)' },
        },
        wingFlutter: {
          '0%': { opacity: '0.8', transform: 'scaleX(1.2) scaleY(0.8)' },
          '100%': { opacity: '1', transform: 'scaleX(0.8) scaleY(1.2)' },
        },
        trail: {
          '0%': { transform: 'translateX(0)', opacity: '0.8' },
          '100%': { transform: 'translateX(-20px)', opacity: '0' },
        },
        trailSlow: {
          '0%': { transform: 'translateX(0)', opacity: '0.8' },
          '100%': { transform: 'translateX(-20px)', opacity: '0' },
        }
      },
    },
  },
  plugins: [],
};