/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        electric: "#3B82F6",
        amber: "#F59E0B",
        success: "#10B981",
        riderbg: "#FAFAF9"
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1rem"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(15, 23, 42, 0.08)",
        glow: "0 0 0 1px rgba(59,130,246,0.2), 0 10px 35px rgba(59,130,246,0.15)"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseSoft: "pulseSoft 2s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 }
        }
      }
    }
  },
  plugins: []
};
