import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'temp': 'linear-gradient(45deg, orange, red)'
      },
      colors: {
        'main': '#39a7ff',
        'second': '#FFEED9',
        'third': '#87C4FF',
        'blueBg': '#E0F4FF'
      },
      fontFamily: {
        'poppin': 'Poppins, sans-serif'
      },
      boxShadow: {
        'one': 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
        'two': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }
    },
  },
  plugins: [],
  // important: true
};
export default config;
