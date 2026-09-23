/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      colors: {
        // Colores Primarios
        primary: {
          DEFAULT: "#7345D6", // El color primario base
          light: "#8C6CDA", // Una versión más clara del primario
          dark: "#5B37A8", // Una versión más oscura del primario
        },

        // Colores de Contraste (para texto, iconos, etc.)
        contrast: {
          light: "#F8F8F8", // Blanco suave para texto en fondos oscuros (light mode)
          dark: "#1A1A1A", // Negro suave para texto en fondos claros (dark mode)
        },

        // Colores de Acento (para botones, enlaces, etc. que necesitan destacar)
        accent: {
          DEFAULT: "#FF6F61", // Un rojo anaranjado que contrasta bien con el primario
          light: "#FF8A80",
          dark: "#E65C51",
        },

        // Colores Neutros/Grises (para fondos, bordes, texto secundario)
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280", // Gris medio
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },

        // Variables para el texto
        textColor: {
          // Modo claro (Light Mode)
          light: {
            DEFAULT: "#1a1a1a", // Texto principal en modo claro
            secondary: "#4b5563", // Texto secundario en modo claro
            hover: "#7345d6", // Hover de texto en modo claro
          },
          // Modo oscuro (Dark Mode)
          dark: {
            DEFAULT: "#f8f8f8", // Texto principal en modo oscuro
            secondary: "#9ca3af", // Texto secundario en modo oscuro
            hover: "#8c6cda", // Hover de texto en modo oscuro
          },
        },

        // Variables para fondos
        background: {
          // Modo claro (Light Mode)
          light: {
            DEFAULT: "#f9fafb", // Fondo principal en modo claro
            secondary: "#ffffff", // Fondo secundario (cards, secciones)
            hover: "#f3f4f6", // Hover de fondos
          },
          // Modo oscuro (Dark Mode)
          dark: {
            DEFAULT: "#111827", // Fondo principal en modo oscuro
            secondary: "#1f2937", // Fondo secundario (cards, secciones)
            hover: "#374151", // Hover de fondos
          },
        },

        // Variables para bordes
        border: {
          // Modo claro (Light Mode)
          light: {
            DEFAULT: "#d1d5db",
            hover: "#9ca3af",
          },
          // Modo oscuro (Dark Mode)
          dark: {
            DEFAULT: "#4b5563",
            hover: "#6b7280",
          },
        },
      },
    },
  },
  plugins: [],
};
