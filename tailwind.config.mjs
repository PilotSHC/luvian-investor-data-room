/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Match landing-site palette (luvian.io)
        ink: {
          900: '#0b0f1a',
          800: '#11182a',
          700: '#1a2237',
          600: '#2a3147',
          500: '#3b4360',
          400: '#5b6485',
          300: '#7e88a9',
          200: '#a8b1cd',
          100: '#d3d8e8',
          50: '#eef0f7',
        },
        accent: {
          DEFAULT: '#5b8def',
          dark: '#3a6cd6',
          light: '#88a9f5',
        },
        warn: '#f5a524',
        success: '#16a34a',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink[800]'),
            '--tw-prose-headings': theme('colors.ink[900]'),
            '--tw-prose-lead': theme('colors.ink[700]'),
            '--tw-prose-links': theme('colors.accent.dark'),
            '--tw-prose-bold': theme('colors.ink[900]'),
            '--tw-prose-counters': theme('colors.ink[500]'),
            '--tw-prose-bullets': theme('colors.ink[400]'),
            '--tw-prose-hr': theme('colors.ink[200]'),
            '--tw-prose-quotes': theme('colors.ink[800]'),
            '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
            '--tw-prose-captions': theme('colors.ink[500]'),
            '--tw-prose-code': theme('colors.ink[900]'),
            '--tw-prose-pre-code': theme('colors.ink[100]'),
            '--tw-prose-pre-bg': theme('colors.ink[800]'),
            '--tw-prose-th-borders': theme('colors.ink[300]'),
            '--tw-prose-td-borders': theme('colors.ink[200]'),
            maxWidth: 'none',
            a: { textDecoration: 'underline', textUnderlineOffset: '3px' },
            'h1, h2, h3, h4': { letterSpacing: '-0.02em' },
            table: { fontSize: '0.92em' },
            'th, td': { paddingTop: '0.5em', paddingBottom: '0.5em' },
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '3px',
              backgroundColor: theme('colors.ink[50]'),
              padding: '0.5em 1em',
              borderRadius: '0.25rem',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
