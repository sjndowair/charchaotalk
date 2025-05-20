import Logo from "@/atoms/logo"
import Naigation from "@/atoms/navigation"


const Header = () => {
    return (<header className={`flex space-y-4 justify-between relative p-5`}><Logo /><Naigation /></header>)
}

export default Header