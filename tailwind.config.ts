const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "mainprimary":"#D83A4E",
        "mainprimaryhover":"#e84b57",
        "mainsecondary":"#F7C809",                  
        "mainblue":"#2A54E3",
        "heading":"#333333",
        "headingchild":"#747A88",
        "lightgraycolor":"#F7F7F7",

        'secondary': '#2A54E3',
        'secondaryHover':"#093deb",
        'primary' : '#F7C809' ,
        'lightgray':"#27272A80",
        'safe':"#15803D",
        "safehover":"#16a34b",
        'danger':'#DC2626',
        'dangerhover':'#ef4444'
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        scroll:"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),addVariablesForColors],
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config