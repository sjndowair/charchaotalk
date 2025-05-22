"use client";

import Logo from "@/atoms/logo"
import Naigation from "@/atoms/navigation"

const Header = () => {
    return (
        <header className={`flex space-y-4 justify-between items-center p-4 sticky top-0 z-50 
         bg-opacity-80 backdrop-blur-md bg-gray-100
          shadow-lg dark:bg-gray-900 dark:text-gray-100`}>
            <Logo />
            <Naigation />
        </header>
    )
}

export default Header