module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      order: {
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10'
      },
      colors: {
        light: {
          background: '#fff',
          text: '#000',
          primary: '#3366ff',
          secondary: '#f0f0f0',
        },
        dark: {
          background: '#111',
          text: '#fff',
          primary: '#00ccff',
          secondary: '#333',
        },
      },
      extend: {
        width: {
          'screen-40': 'calc(100% - 160px)',      
          'screen-60': 'calc(100% - 240px)',      
        },
        height: {
          'screen-16': 'calc(100% - 4rem) !important'         
        },
      },
    },
    screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1200px',
    },
  },
  plugins: [],
};
