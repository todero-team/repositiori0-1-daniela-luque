import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1877F2',
          dark: '#0f1117',
          card: '#1a1d2e',
          border: '#2a2d3e',
        },
      },
    },
  },
  plugins: [],
};

export default config;
