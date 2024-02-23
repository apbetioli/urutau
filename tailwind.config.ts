import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-600': '#6C47FF',
        'primary-700': '#5639CC',
        'success-600': '#0D8050',
        'success-700': '#027A48',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class',
}
export default config
