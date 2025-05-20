/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 'class' 방식으로 다크모드 활성화
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 기본 색상 정의 (라이트 모드)
        primary: {
          DEFAULT: '#3b82f6', // 파란색
          light: '#93c5fd',
          dark: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#8b5cf6', // 보라색
          light: '#c4b5fd',
          dark: '#5b21b6',
        },
        accent: {
          DEFAULT: '#f59e0b', // 주황색
          light: '#fcd34d',
          dark: '#b45309',
        },
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f3f4f6',
        },
        text: {
          DEFAULT: '#111827',
          secondary: '#4b5563',
          muted: '#6b7280',
        },
        border: {
          DEFAULT: '#e5e7eb',
          focus: '#3b82f6',
        },
        
        // 다크모드 색상 정의
        'primary-dark': {
          DEFAULT: '#60a5fa', // 밝은 파란색
          light: '#bfdbfe',
          dark: '#2563eb',
        },
        'secondary-dark': {
          DEFAULT: '#a78bfa', // 밝은 보라색
          light: '#ddd6fe',
          dark: '#7c3aed',
        },
        'accent-dark': {
          DEFAULT: '#fbbf24', // 밝은 주황색
          light: '#fde68a',
          dark: '#d97706',
        },
        'background-dark': {
          DEFAULT: '#111827',
          secondary: '#1f2937',
        },
        'text-dark': {
          DEFAULT: '#f9fafb',
          secondary: '#e5e7eb',
          muted: '#9ca3af',
        },
        'border-dark': {
          DEFAULT: '#374151',
          focus: '#60a5fa',
        },
      },
      // 그림자 효과도 다크모드에 맞게 조정
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.24)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}