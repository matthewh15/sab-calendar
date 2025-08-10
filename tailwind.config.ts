import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: "#62984D",
        brandBg: "#C7D7E4",
        brandBlue: "#053F6F",
      },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [],
};
export default config;
