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
          0: 'hsl(var(--color-accent0) / <alpha-value>)',
          1: 'hsl(var(--color-accent1) / <alpha-value>)',
          2: 'hsl(var(--color-accent2) / <alpha-value>)',
          3: 'hsl(var(--color-accent3) / <alpha-value>)',
          4: 'hsl(var(--color-accent4) / <alpha-value>)',
          5: 'hsl(var(--color-accent5) / <alpha-value>)',
          6: 'hsl(var(--color-accent6) / <alpha-value>)',
          7: 'hsl(var(--color-accent7) / <alpha-value>)',
          8: 'hsl(var(--color-accent8) / <alpha-value>)'
        },
        base: 'hsl(var(--color-base) / <alpha-value>)',
        bkg: 'hsl(var(--color-bkg) / <alpha-value>)',
        content: 'hsl(var(--color-content) / <alpha-value>)',
        delete: {
          default: 'hsl(var(--color-delete) / <alpha-value>)',
          hover: 'hsl(var(--color-delete-hover) / <alpha-value>)',
          active: 'hsl(var(--color-delete-active) / <alpha-value>)',
          disabled: 'hsl(var(--color-delete-disabled) / <alpha-value>)'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      borderRadius: {
        cool: 'var(--rounded-default)'
      },
      padding: {
        large: 'var(--padding-large)',
        small: 'var(--padding-small)'
      },
      gap: {
        large: 'var(--padding-large)',
        small: 'var(--padding-small)'
      }
    }
  },
  plugins: []
}
export default config
