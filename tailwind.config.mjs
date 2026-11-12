/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        kaolin: {
          DEFAULT: '#FAF8F4',
          50: '#FFFFFF',
          100: '#FAF8F4',
          200: '#F3EFE7',
        },
        charbon: {
          DEFAULT: '#161412',
          light: '#2A2623',
          muted: '#524C46',
        },
        ocre: {
          DEFAULT: '#8C3B22',
          light: '#A84E33',
          dark: '#6F2E1B',
          soft: '#F4ECE8',
        },
        vert: {
          DEFAULT: '#234738',
          light: '#315F4C',
          dark: '#183327',
          soft: '#EAF0EC',
        },
        sable: {
          DEFAULT: '#EFECE6',
          light: '#F7F5F1',
          dark: '#D9D3C7',
          border: '#E2DCD3',
        },
      },
      fontFamily: {
        heading: ['Newsreader', 'Georgia', 'serif'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
        ui: ['"Public Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      lineHeight: {
        editorial: '1.75',
      },
    },
  },
  plugins: [],
};
