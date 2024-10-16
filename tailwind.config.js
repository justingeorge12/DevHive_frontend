import { nextui } from "@nextui-org/theme";


/** @type {import('tailwindcss').Config} */
// const { nextui } = require("@nextui-org/theme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-050': 'rgb(15, 15, 15)'
      },
    },
  },
  plugins: [
    // nextui(),
  ],
}