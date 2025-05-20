import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect } from 'react';

// 다크모드 상태 인터페이스 정의
interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

// 사용자 시스템 색상 설정 확인 함수 (클라이언트 사이드에서만 실행)
const getSystemThemePreference = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

// localStorage에 대한 안전한 접근
const safeLocalStorage = {
  getItem: (name: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(name);
    }
    return null;
  },
  setItem: (name: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name);
    }
  }
};

// Zustand persist 미들웨어를 사용해 로컬 스토리지에 상태 저장
export const useDarkMode = create<DarkModeState>()(
  persist(
    (set) => ({
      // 초기값은 기본적으로 false로 설정 (SSR 고려)
      isDarkMode: false,
      
      // 다크모드 토글 함수
      toggleDarkMode: () => set((state) => {
        const newValue = !state.isDarkMode;
        // 토글 시 HTML 클래스 직접 조작
        if (typeof window !== 'undefined') {
          if (newValue) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return { isDarkMode: newValue };
      }),
      
      // 다크모드 직접 설정 함수
      setDarkMode: (isDark: boolean) => {
        // 설정 시 HTML 클래스 직접 조작
        if (typeof window !== 'undefined') {
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        set({ isDarkMode: isDark });
      },
    }),
    {
      name: 'dark-mode-storage', // 로컬 스토리지 키
      storage: createJSONStorage(() => safeLocalStorage),
    }
  )
);

// 별도의 초기화 훅 - 사용자 시스템 설정과 클래스 초기화를 처리
export function useDarkModeInit() {
  const { isDarkMode, setDarkMode } = useDarkMode();
  
  // 시스템 다크모드 설정 감지 및 초기화
  useEffect(() => {
    // 페이지 로드 시 HTML 클래스 초기화
    if (typeof window !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // 시스템 테마 설정 확인 및 적용 (사용자 설정이 없는 경우)
      const systemPrefersDark = getSystemThemePreference();
      const storedPreference = safeLocalStorage.getItem('dark-mode-storage');
      
      if (!storedPreference && systemPrefersDark) {
        setDarkMode(true);
      }
      
      // 시스템 설정 변경 감지 이벤트 리스너
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        // 사용자가 직접 설정한 적이 없는 경우에만 시스템 설정 따르기
        const userPreferenceExists = safeLocalStorage.getItem('dark-mode-storage') !== null;
        if (!userPreferenceExists) {
          setDarkMode(e.matches);
        }
      };
      
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // 이전 브라우저 지원을 위한 폴백
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [isDarkMode, setDarkMode]);
  
  return null; // 렌더링 없음
}