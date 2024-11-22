/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,css}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: {
          main: "#808080",
          sub: "#D3D3D3",
        },
      },
    },
  },
  plugins: [],
};
