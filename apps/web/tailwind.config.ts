module.exports = {
  content: [
    "../../packages/ui-components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,css}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '6rem': '6rem',
      },
      borderRadius: {
        custom: '12px',
      },
      maxWidth: {
        custom: '1100px',
      },
      fontFamily: {
        mono: [
          'ui-monospace', 'Menlo', 'Monaco', 'Cascadia Mono', 'Segoe UI Mono',
          'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
          'Fira Mono', 'Droid Sans Mono', 'Courier New', 'monospace'
        ]
      },
      colors: {
        foreground: 'rgb(255, 255, 255)',
        background: {
          start: 'rgb(0, 0, 0)',
          end: 'rgb(0, 0, 0)'
        },
        callout: {
          DEFAULT: 'rgb(20, 20, 20)',
          border: 'rgb(108, 108, 108)'
        },
        card: {
          DEFAULT: 'rgb(100, 100, 100)',
          border: 'rgb(200, 200, 200)'
        }
      },
    },
  },
  plugins: [],
};
