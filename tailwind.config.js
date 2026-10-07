/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      colors: {
        // Acento principal — azul (tech-minimalist)
        primary: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1D4ED8",
        },

        // Blanco suave / negro suave (contraste tipográfico)
        contrast: {
          light: "#FAFAFA",
          dark: "#0A0A0B",
        },

        // Acento secundario (badges, ofertas)
        accent: {
          DEFAULT: "#FF6F61",
          light: "#FF8A80",
          dark: "#E65C51",
        },

        // Neutros / grises (blanco → gris claro → negro)
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },

        // Texto
        textColor: {
          light: {
            DEFAULT: "#0A0A0B",
            secondary: "#525252",
            hover: "#2563EB",
          },
          dark: {
            DEFAULT: "#FAFAFA",
            secondary: "#A3A3A3",
            hover: "#3B82F6",
          },
        },

        // Fondos
        background: {
          light: {
            DEFAULT: "#FAFAFA",
            secondary: "#FFFFFF",
            hover: "#F5F5F5",
          },
          dark: {
            DEFAULT: "#0A0A0B",
            secondary: "#141416",
            hover: "#1F1F23",
          },
        },

        // Bordes
        border: {
          light: {
            DEFAULT: "#E5E5E5",
            hover: "#A3A3A3",
          },
          dark: {
            DEFAULT: "#27272A",
            hover: "#3F3F46",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
