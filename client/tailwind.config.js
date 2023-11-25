/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      "title": [
        "54px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        }
      ],
      "title-sm": [
        "36px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        }
      ],
      "heading": [
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ],
      "body": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        },
      ],
      "paragraph": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        },
      ]
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "overlay": "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"
      },
      colors: {
        "primary": "#1991fe",
        "accent1": "#E6EBF0",
        "accent2": "#13161a",
        "accent3": "#0671cb",
        "dark": "#070f16",
        "logout-btn": "#FF5A5A",
        "navbar-menu": "rgba(240, 245, 255, 0.6)",
        glassmorphism: "rgba(240, 245, 255, 0.60)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};