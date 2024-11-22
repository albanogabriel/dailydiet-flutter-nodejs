import type { Config } from "tailwindcss"

// Function to remove spaces between numbers in rgba()
const removeRgbaSpaces = (rgba: string): string => {
  const parts = rgba.split(",") // Split the string by commas
  return parts.map((part) => part.trim()).join(",") // Trim each part and join them back with commas
}

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        nunitoSans: ["var(--font-nunito-sans)", "sans-serif"],
        geistSans: ["var(--font-geist-sans)", "sans-serif"],
        geistMono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: removeRgbaSpaces("rgba(var(--background))"),
        foreground: removeRgbaSpaces("rgba(var(--foreground))"),
        base900: removeRgbaSpaces("rgba(var(--base900))"),
        base800: removeRgbaSpaces("rgba(var(--base800))"),
        base700: removeRgbaSpaces("rgba(var(--base700))"),
        base300: removeRgbaSpaces("rgba(var(--base300))"),
        base200: removeRgbaSpaces("rgba(var(--base200))"),
        base150: removeRgbaSpaces("rgba(var(--base150))"),
        base100: removeRgbaSpaces("rgba(var(--base100))"),
        hyperlink: removeRgbaSpaces("rgba(var(--hyperlink))"),
        greenLight: removeRgbaSpaces("rgba(var(--greenLight))"),
        greenMid: removeRgbaSpaces("rgba(var(--greenMid))"),
        greenDark: removeRgbaSpaces("rgba(var(--greenDark))"),
      },
    },
  },
  plugins: [],
}

export default config
