/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 'class' 방식으로 다크모드 활성화
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/atoms/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 기본 색상 정의
      },
    },
  },
  plugins: [],
}