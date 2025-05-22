"use client";

import { NAVIGATION_DATA } from "@/utils/headerData"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Navigation = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    // useEffect는 클라이언트 사이드에서만 실행됩니다
    useEffect(() => {
        setMounted(true);
        console.log("Navigation mounted, current theme:", theme);
        console.log("Resolved theme:", resolvedTheme);
    }, []); // 의존성 배열을 빈 배열로 수정하여 마운트 시 한 번만 실행되도록 함

    // 라이트/다크 모드 토글 핸들러 - resolvedTheme 사용
    const toggleTheme = () => {
        console.log("Toggling theme. Current theme:", theme);
        console.log("Current resolved theme:", resolvedTheme);
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        console.log("Setting new theme to:", newTheme);
        setTheme(newTheme);
    };
    
    // 현재 테마가 다크모드인지 확인 (resolvedTheme 사용)
    const isDarkMode = mounted && (resolvedTheme === 'dark');
    
    return (<div>
        <nav className={`relative`}>
            <ul className={`flex gap-4 items-center`}>
                {NAVIGATION_DATA.map((item, idx) => {
                   return  <li key={idx}>{item.icon}</li>
                })}
                {/* 테마 토글 버튼 */}
                <li>
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
                    >
                        {mounted && (isDarkMode ? 
                           
                            <Moon className="h-5 w-5" />:  <Sun className="h-5 w-5" /> 
                        )}
                    </button>
                </li>
            </ul>
        </nav>
    </div>)
}

export default Navigation
