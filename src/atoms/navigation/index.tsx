import { NAVIGATION_DATA } from "@/utils/headerData"

const Navigation = () => {
    
    return (<div>
        <nav className={`relative`}>
            <ul className={`flex gap-4`}>
                {NAVIGATION_DATA.map((item, idx) => {
                   return  <li key={idx}>{item.icon}</li>
                })}
            </ul>
        </nav>
    </div>)

}

export default Navigation
