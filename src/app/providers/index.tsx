"use client";

import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

const Providers = ({children}: {
    children: React.ReactNode
}) =>  {
    const [mounted, setMounted] = useState(false);
    
    // 클라이언트 사이드에서만 마운팅
    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
            themes={['light', 'dark']}
        >
            {children}
        </ThemeProvider>
    );
};

export default Providers