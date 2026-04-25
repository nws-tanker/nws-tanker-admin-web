import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          25: '#F3F8F9',
          50: '#E8F2F3',
          600: '#1A8F9A',
          700: '#117680',
          800: '#0A5E66',
          900: '#02474E',
        },
        ink: {
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#0B1220',
        },
        brand: {
          DEFAULT: '#02474E',
          500: '#1A8F9A',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'card-sm': '6px',
        card: '8px',
        'card-lg': '12px',
        'card-xl': '16px',
      },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(16, 24, 40, 0.04)',
        card: '0 1px 3px rgba(16, 24, 40, 0.08), 0 1px 2px rgba(16, 24, 40, 0.04)',
        'card-md': '0 4px 8px -2px rgba(16, 24, 40, 0.06), 0 2px 4px -2px rgba(16, 24, 40, 0.04)',
        'card-lg': '0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)',
        dropdown: '0 8px 24px -6px rgba(11,18,32,0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
