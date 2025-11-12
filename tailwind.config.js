/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#F6EDDC",
        greige: "#E3E5D7",
        mint: "#BDD6D2",
        slate: "#A5C8CA",
        charcoal: "#586875",
      },
    },
  },
  plugins: [],
};
