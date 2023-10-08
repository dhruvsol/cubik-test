module.exports = {
    content: [
      "../../packages/ui-components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx,css}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        spacing: {
          '6rem': '6rem',
        },
        borderRadius: {
          custom: 'var(--border-radius)',
        },
        maxWidth: {
          custom: 'var(--max-width)',
        },
        colors: {
          callout: {
            DEFAULT: 'var(--callout-rgb)',
            border: 'var(--callout-border-rgb)',
          },
          card: {
            DEFAULT: 'var(--card-rgb)',
            border: 'var(--card-border-rgb)',
          },
          backgroundStart: 'var(--background-start-rgb)',
          backgroundEnd: 'var(--background-end-rgb)',
        },
      },
    },
    plugins: [],
  };