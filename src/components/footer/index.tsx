import {FOOTER_DATA} from "@/utils/footerData"

const Footer  = () => {
    return (<footer className="flex flex-col gap-4 justify-center items-center p-4 text-gray-600">{
        FOOTER_DATA.map((item, idx) => (<div key={idx}>{item}</div>))}</footer>)
}

export default Footer;
