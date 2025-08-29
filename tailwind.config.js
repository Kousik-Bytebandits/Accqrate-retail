module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#FFFFFF",
        primary: "#C2185B",
        soft: "#F2F2F2",
        card: "#8A8A8A",
        black: "#000000",
      },
    fontSize: {
  "fluid-h1": "clamp(2.5rem, 6vw, 4rem)",     
  // 2.5rem = 40px (min)
  // 6vw → 86px @1440px, 115px @1920px
  // 4rem = 64px (max)

  "fluid-h2": "clamp(1.5rem, 4vw, 2.25rem)", 
  // 1.5rem = 24px (min)
  // 4vw → 57px @1440px, 76px @1920px
  // 2.25rem = 36px (max)

  "fluid-h3": "clamp(1.25rem, 3vw, 1.5rem)", 
  // 1.25rem = 20px (min)
  // 3vw → 43px @1440px, 58px @1920px
  // 1.5rem = 24px (max)

  "fluid-body": "clamp(1rem, 2.5vw, 1.25rem)", 
  // 1rem = 16px (min)
  // 2.5vw → 36px @1440px, 48px @1920px
  // 1.25rem = 20px (max)

  "fluid-caption": "clamp(0.875rem, 2vw, 1rem)", 
  // 0.875rem = 14px (min)
  // 2vw → 29px @1440px, 38px @1920px
  // 1rem = 16px (max)

  "fluid-small": "clamp(0.75rem, 1.5vw, 0.875rem)", 
  // 0.75rem = 12px (min)
  // 1.5vw → 22px @1440px, 29px @1920px
  // 0.875rem = 14px (max)
},

spacing: {
  "fluid-section": "clamp(2rem, 5vw, 4rem)", 
  // 2rem = 32px (min)
  // 5vw → 72px @1440px, 96px @1920px
  // 4rem = 64px (max)
},

      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1240px",
        },
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        'skeleton-loading': {
          '0%': { 'background-position': '100% 0' },
          '100%': { 'background-position': '0 0' },
        },
      },
      animation: {
        shimmer: "shimmer 1.25s infinite",
        'skeleton-loading': 'skeleton-loading 1.2s ease-in-out infinite',
      },
      backgroundSize: {
        '400': '400% 100%',
      },
    },
  },
  plugins: [],
};
