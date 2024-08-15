import type { Config } from "tailwindcss";

const config: Config = {
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
      colors: {
        "moderate-blue": "hsl(238, 40%, 52%)",
        "dark-blue": "hsl(212, 24%, 26%)",
        "grayish-blue": "hsl(211, 10%, 45%)",
        "light-grayish-blue": "hsl(239, 57%, 85%)",
        "light-gray-100": "hsl(223, 19%, 93%)",
        "light-gray-200": "hsl(228, 33%, 97%)",
        "soft-red": "hsl(358, 79%, 66%)",
        "pale-red": " hsl(357, 100%, 86%)",
      },
    },
  },
  plugins: [],
};
export default config;
