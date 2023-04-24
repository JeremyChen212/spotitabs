/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom6': 'repeat(3, 1fr)'
      },
      colors: {
        // background1: '#032A22',
        // background2: '#499081',
        // background3: '#0F3B33',
        // spotifygreen: '#1BB954',
        bg1: '#1E1E1E',
        bg2: '#262626',
        bg3: '#A4FDD3',
        textbg: '#393737',
        textmain: '#FFFFFF',
        textsec: "#A7A9B2",
      },
      backgroundImage: {
        'leafyshoe': "url('/public/images/shoebg.jpeg')",
      },
      screens: {
        'xsm': '539px',
        'xlg': '1234px'
      },
    }
  },
  plugins: [],
}

