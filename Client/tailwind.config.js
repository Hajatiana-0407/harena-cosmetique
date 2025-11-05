/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // @ts-ignore
    (await import("daisyui")).default
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
