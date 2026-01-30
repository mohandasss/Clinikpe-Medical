/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        primary: "#0D52AF",
        secondary: "#828A94",
        muted: "#D9D9D9",
        accent: "#16A34A",
        success: "#16A34A",
        error: "#DC2626",
        gold: "#D4AF37",
      },
      maxWidth: {
        'mobile': '420px',
      },
      minHeight: {
        'touch': '44px',
      },
      animation: {
        'float-slow': 'float 20s ease-in-out infinite',
        'float-slower': 'float 25s ease-in-out infinite',
        'float-reverse': 'float-reverse 22s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) scale(1)',
          },
          '50%': {
            transform: 'translateY(-20px) scale(1.05)',
          },
        },
        'float-reverse': {
          '0%, 100%': {
            transform: 'translateY(-20px) scale(1.05)',
          },
          '50%': {
            transform: 'translateY(0px) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};

