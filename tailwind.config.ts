import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          1: 'rgb(var(--color-accent1) / <alpha-value>)',
          2: 'rgb(var(--color-accent2) / <alpha-value>)',
          3: 'rgb(var(--color-accent3) / <alpha-value>)',
          4: 'rgb(var(--color-accent4) / <alpha-value>)',
          5: 'rgb(var(--color-accent5) / <alpha-value>)'
        },
        bkg: 'rgb(var(--color-bkg) / <alpha-value>)',
        content: 'rgb(var(--color-content) / <alpha-value>)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
}
export default config
