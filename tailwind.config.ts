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
          // Paleta oficial del brand book (lámina "Paleta de color")
          coral: '#FF5E36', // Coral Atardecer · Pantone 171 C — alta energía, color de acción
          amber: '#FF9100', // Ámbar Solar · Pantone 130 C — calidez, optimismo y luz ("Gold")
          mint: '#30D5C8',  // Verde Menta · Pantone 3262 C — frescura, acento digital
          navy: '#0B2545',  // Marino Eléctrico · Pantone 294 C — autoridad y profundidad
          sand: '#F5E6D3',  // Sunset Sand · Pantone 468 C — fondo corporativo orgánico
          cream: '#FBF0E0', // Alabaster — fondo claro del isotipo (lámina "Isotipo")
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'], // títulos (brand book)
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],  // citas y énfasis
        sans: ['var(--font-montserrat)', 'sans-serif'],        // texto e interfaz
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,37,69,0.04), 0 12px 32px -16px rgba(11,37,69,0.18)',
        'card-hover': '0 2px 4px rgba(11,37,69,0.05), 0 28px 56px -24px rgba(11,37,69,0.28)',
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
