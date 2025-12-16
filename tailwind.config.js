/** @type {import('tailwindcss').Config} */
export default {
 content: [
  "./index.html",    
  "./src/**/*.{js,jsx}", 
],

  theme: {
    extend: {
      colors: {
        bunny: {
          primary: "#C4B5FD",     // Soft lavender
          light: "#DDD6FE",       // Light pastel purple
          dark: "#A78BFA",        // Darker lavender
          pink: "#F9A8D4",        // Cute pink
          pinkLight: "#FBCFE8",   // Soft blush
          bg: "#FFF7FC",          // Background pastel pink-white
        },
      },
      borderRadius: {
        cute: "1.5rem",
        supercute: "2rem",
      },
      boxShadow: {
        soft: "0 8px 20px rgba(0,0,0,0.05)", // Soft bunny shadow
      },
    },
  },
  plugins: [],
};
