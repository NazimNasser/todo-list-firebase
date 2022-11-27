/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      lg: { max: "1024px" },
      // => @media (max-width: 991px) { ... }
      md: { max: "769px" },
      // => @media (max-width: 767px) { ... }
      sm: { max: "479px" },
      // => @media (max-width: 479px) { ... }
      xs: { max: "320px" },
      // => @media (max-width: 320px) { ... }
    },
    extend: {},
  },
  plugins: [],
}
