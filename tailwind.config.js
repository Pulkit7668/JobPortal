/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "300px",        // Mobile - Small screens
        sm: "640px",        // Mobile - Large screens (default Tailwind)
        md: "768px",        // Tablet
        lg: "1024px",       // Laptop
        xl: "1280px",       // Desktop
        "2xl": "1536px",    // Large Desktop

      },
      colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
      },
    },
  },
  plugins: [],
}
