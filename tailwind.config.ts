import type { Config } from "tailwindcss"

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          850: "#2b2f36"
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
} satisfies Config
