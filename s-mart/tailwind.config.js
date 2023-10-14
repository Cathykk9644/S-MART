/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titleFont: "Poppins",
        bodyFont: "Nunito Sans",
      },
      screens: {
        sm: "478px",
        md: "820px",
        lg: "1028px",
      },
    },
  },
  plugins: [],
};
