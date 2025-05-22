"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeBackgroundProps {
  children: React.ReactNode;
}

const ThemeBackground: React.FC<ThemeBackgroundProps> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // 클라이언트 사이드에서만 렌더링되도록 마운트 상태 관리
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 마운트 전에는 빈 배경만 표시 (hydration 불일치 방지)
  if (!mounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  // resolvedTheme을 직접 사용하여 조건부 클래스 적용 (올바른 색상 적용)
  const backgroundClasses = resolvedTheme === 'dark' 
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white"
    : "bg-gradient-to-br from-white via-purple-200 to-purple-300 text-gray-900";

  return (
    <div className={`min-h-screen transition-colors duration-500 ${backgroundClasses}`}>
      {children}
    </div>
  );
};

export default ThemeBackground;