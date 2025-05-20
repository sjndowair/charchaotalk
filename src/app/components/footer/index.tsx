import {FOOTER_DATA} from "@/utils/footerData"

const Footer  = () => {
    return (<footer>{
        FOOTER_DATA.map((item, idx) => (<div key={idx}>{item}</div>))}</footer>)
}

export default Footer;
