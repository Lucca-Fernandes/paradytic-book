/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Isso garante que o Tailwind olhe dentro da pasta components
  ],
  theme: {
    extend: {
      colors: {
        paradytic: {
          blue: '#2563eb',
          dark: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}