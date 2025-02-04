import {faFacebookF, faGithub, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLocationDot, faMailReply, faPhone} from "@fortawesome/free-solid-svg-icons";
import Social from "@/Layout/Footer/Social";
import Infomation from "@/Layout/Footer/Infomation";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer--inner screen flex py-5">
                <div className="footer--left flex-1">
                    <Infomation />
                </div>
                <div className="footer--right flex-1">
                    <h3 className="text-large font-bold mb-3">Về website</h3>
                    <p className="mb-4">Với NXTRWG, sức khỏe không còn là điều xa vời. Hãy để trí tuệ nhân tạo và đội ngũ chuyên gia của chúng tôi giúp bạn xây dựng một cuộc sống khỏe mạnh, an toàn và hạnh phúc hơn mỗi ngày!</p>
                    <Social />
                </div>
            </div>
        </footer>
    )
}