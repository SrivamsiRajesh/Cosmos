/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'glow-indigo': '0 0 15px rgba(99, 102, 241, 0.5)',
        'glow-purple': '0 0 15px rgba(168, 85, 247, 0.5)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.5)',
        'glow-yellow': '0 0 15px rgba(250, 204, 21, 0.5)',
      }
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover', 'focus'],
    },
  },
  plugins: [],
};
