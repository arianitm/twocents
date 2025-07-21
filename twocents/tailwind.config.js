module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          keyframes: {
            fadeSlideUp: {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          },
          animation: {
            fadeSlideUp: 'fadeSlideUp 0.5s ease forwards',
          },
        },
      },
    plugins: [],
  }