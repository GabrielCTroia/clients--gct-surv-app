module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
      main: ["Heebo", "sans-serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "7rem",
      "10xl": "8rem",
    },
    extend: {
      colors: {
        primary: {
          100: "#2CD0AD", // green
          200: "#FF96A5", //pink
        },
        gray: {
          100: "#ffffff", // white
          200: "#6D6D6D", // light grey
          300: "#BABABA", // very light grey
        },
        text: {
          100: "#260A49", // black
          200: "#000000", //pure black
          300: "#FFFFFF", //white
          400: "rgba(0, 0, 0, 0)", //invisible
        },
        background: {
          100: "#FFFFFF",
        },
        focus: {
          100: "#FF32A1",
          200: "#E71587",
          300: "#fd879e",
        },
      },
      dropShadow: {
        "6xl": "6px 6px 0px rgba(0, 0, 0, 1)",
        "6xl-pink": "6px 6px 0px #FF96A5",
      },
      backgroundImage: {
        "split-purple": "linear-gradient(to right, #ffffff 50%, #2E0574 50%)",
      },
      lineHeight: {
        hero: "4.5rem",
      },
      height: {
        75: "75vh",
        90: "90vh",
      },
      objectPosition: {
        hero: "50% 0",
        "hero-sm": "65% 0",
        "hero-md": "15% 0",
        "hero-lg": "0 90%",
        "hero-portrait": "100% 100%",
      },
    },
  },
};
