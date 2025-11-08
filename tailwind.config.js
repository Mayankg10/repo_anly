/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#1e293b',
            maxWidth: 'none',
            '--tw-prose-headings': '#0f172a',
            '--tw-prose-links': '#4f46e5',
            '--tw-prose-bold': '#0f172a',
            '--tw-prose-code': '#1e293b',
            '--tw-prose-pre-code': '#e2e8f0',
            '--tw-prose-pre-bg': '#1e293b',
            '--tw-prose-inline-code': '#1e293b',
            '--tw-prose-inline-code-bg': '#f1f5f9',
            h1: {
              color: '#0f172a',
              fontWeight: '700',
            },
            h2: {
              color: '#0f172a',
              fontWeight: '600',
            },
            h3: {
              color: '#0f172a',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

