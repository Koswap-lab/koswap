/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        bone: '#FAF7F2',
        graphite: '#1C1B19',
        volt: '#086933',
        'volt-hover': '#06572A',
        citrine: '#F5B118',
        slate: '#6B6A66',
        white: '#FFFFFF',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      boxShadow: {
        'card': '0 24px 64px rgba(28, 27, 25, 0.06), 0 1px 2px rgba(28, 27, 25, 0.04)',
        'card-hover': '0 32px 80px rgba(28, 27, 25, 0.08)',
        'waitlist': '0 32px 80px rgba(28, 27, 25, 0.06)',
        'btn-hover': '0 4px 12px rgba(8, 105, 51, 0.25)',
      },
      maxWidth: {
        'content': '1200px',
      },
      borderRadius: {
        'card': '20px',
        'step': '24px',
        'waitlist': '32px',
      }
    },
  },
  plugins: [],
}
