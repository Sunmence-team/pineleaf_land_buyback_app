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
        fadedGreen: '#E8EFEA',
        offerText: '#025FD6',
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
    container:{
      center: true,
      padding: '2rem',
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        '2xl': "1496px",
      },
    }
  },
  plugins: [],
};
