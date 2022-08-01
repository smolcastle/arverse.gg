/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter']
      },
      colors: {
        light: {
          DEFAULT: '#F2F1F3'
        },
        green: {
          light: '#E8FCE8',
          DEFAULT: '#40E840'
        },
        red: {
          light: '#FCE8E8',
          DEFAULT: '#E84142'
        },
        accent: {
          DEFAULT: '#8B5CF6'
        }
      },
      boxShadow: {
        md: '0 0 4px rgb(0 0 0 / 0.1)'
      },
      screens: {
        xs: '600px',
        sm: '800px',
        md: '1100px',
        lg: '1380px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
