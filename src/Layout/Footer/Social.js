import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGithub, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Social() {
    const data = [
        {
            url: 'https://www.facebook.com',
            element: faFacebookF
        },
        {
            url: 'https://www.facebook.com',
            element: faGithub
        },
        {
            url: 'https://www.facebook.com',
            element: faInstagram
        },
        {
            url: 'https://www.facebook.com',
            element: faTwitter
        }
    ]
    return (
        <ul className="flex gap-5">
            {
                data.map((item, index) => {
                    return (
                        <li key={index}>
                            <div className="icon-large rounded-xl bg-zinc-300">
                                <a href={item.url}>
                                    <FontAwesomeIcon icon={item.element} className="text-large"/>
                                </a>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}