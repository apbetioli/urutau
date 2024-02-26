import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class',
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
}
export default config
