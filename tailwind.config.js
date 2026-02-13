module.exports = {   
  theme: {
    extend: {
      fontFamily: {
        raleway: ['var(--font-raleway)'],
        dmsans: ['var(--font-dm-sans)'],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      animation: {
        slowspin: 'slowspin 10s linear infinite',
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'slide-in-left': 'slideInLeft 0.25s ease-out',
      },
      keyframes: {
        slowspin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
};
