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
          coral: '#FF5E36', // High energy, primary action
          amber: '#FF9100', // Warmth, optimism, light
          mint: '#30D5C8',  // Modern freshness, digital accent
          navy: '#0B2545',  // Authority, corporate heritage
          sand: '#F5E6D3',  // Smooth, organic background texture
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'brand-warm': 'linear-gradient(135deg, #FF5E36 0%, #FF9100 100%)',
        'golden-hour': 'radial-gradient(circle at top right, rgba(255, 145, 0, 0.15), transparent 60%)',
      },
    },
  },
  plugins: [],
};
export default config;
