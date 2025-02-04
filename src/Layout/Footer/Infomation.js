import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";

export default function Infomation() {
    return (
        <ul className="flex flex-col gap-5">
            <li>
                <h2 className="text-2xlarge font-bold">NXTRWG</h2>
            </li>
            <li className="flex gap-4 items-center">
                <div className="icon-large rounded-full bg-zinc-300">
                    <FontAwesomeIcon icon={faLocationDot} className="text-large"/>
                </div>
                <div className="text-medium">
                    Thon 7A, Tien Canh <br/>
                    <strong>Tien Phuoc, Quang Nam</strong>
                </div>
            </li>
            <li className="flex gap-4 items-center">
                <div className="icon-large rounded-full bg-zinc-300">
                    <FontAwesomeIcon icon={faPhone} className="text-large"/>
                </div>
                <div className="text-medium">
                    <strong>+84 372 210 237</strong>
                </div>
            </li>
            <li className="flex gap-4 items-center">
                <div className="icon-large rounded-full bg-zinc-300">
                    <FontAwesomeIcon icon={faEnvelope} className="text-large"/>
                </div>
                <div className="text-medium">
                    <strong>nxtrwg@gmail.com</strong>
                </div>
            </li>
        </ul>
    )
}