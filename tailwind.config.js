/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#154A22",
        secondary: "#F4F6F1",
        tertiary: "#B4E5BC",
        neutral: "#E8EFEA",
      },
      fontFamily: {
        quickLight: ["quickLight"],
        quickRegular: ["quickRegular"],
        quickMedium: ["quickMedium"],
        quickSemiBold: ["quickSemiBold"],
        quickBold: ["quickBold"],
      },
    },
  },
  plugins: [],
};
