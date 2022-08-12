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
          DEFAULT: '#40E840',
          dark: '#2CC099'
        },
        red: {
          light: '#FCE8E8',
          DEFAULT: '#E84142'
        },
        blue: {
          light: '#E8E8FD',
          DEFAULT: '#6D6DF2'
        },
        gray: {
          light: '#828282',
          DEFAULT: '#4F4F4F'
        },
        accent: {
          light: '#CBB7FB',
          DEFAULT: '#8B5CF6'
        }
      },
      boxShadow: {
        md: '0 0 4px rgb(0 0 0 / 0.1)'
      },
      screens: {
        xs: '600px',
        sm: '750px',
        md: '1200px',
        lg: '1350px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
