/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // changed keys (remove duplicate "text-" prefix)
        'text-strong': 'rgb(var(--color-text-strong) / <alpha-value>)',
        'text-weak': 'rgb(var(--color-text-weak) / <alpha-value>)',
        'accent': '#bb1f8c',
      },
      fontFamily: {
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}