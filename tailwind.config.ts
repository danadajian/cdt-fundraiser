import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: "#e8d8b7",
        "light-tan": "#cebb9a",
        "dark-tan": "#b89c7a",
      },
    },
  },
  plugins: [],
} satisfies Config;
