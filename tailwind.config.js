/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    extend: {
      animation: {
        "fade-out": "fadeOut 350ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards",
        "fade-in": "fadeIn 350ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards",
      },
      keyframes: {
        fadeOut: {
          "100%": { opacity: 1 },
          "0%": { opacity: 0 },
        },
        fadeIn: {
          0: { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
