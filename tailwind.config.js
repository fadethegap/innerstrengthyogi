/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackwater: "hsl(204,86%,8%)",
        sunshinewater: "hsl(41,82%,45%)",
        fossilOcean: "hsl(190,28%,48%)",
        fossilOceanHover: "hsl(182,26%,23%)",
        fossilDisabled: "hsl(52,28%,74%)",
        logoTreeDarkGreen: "hsl(183,24%,64%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
