/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      black: "#000",
      white: "#fff",
      gray: "rgb(215, 215, 215)",
      transparent: {
        30: "rgba(0, 0, 0, 0.3)",
        white: "rgba(255, 255, 255, 0.25)"
      },
      green: "#4cd137",
      yellow: "#fbc531",
      red: "#e84118",
      blue: "#00a8ff"
    }
  },
  plugins: [],
}