import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";

export default function BreadCrumb({props}) {
    return (
        <nav className="breadcrumb text-xsmall py-2 text-gray-500 bg-white mb-5">
            <ul className="flex justify-center gap-2">
                <li className="hover:text-gray-800">
                    <Link href={"/home"} className="flex items-center gap-2"> <FontAwesomeIcon icon={faHome}/>
                        <span>Trang chủ</span>
                    </Link>
                </li>
                {
                    props.map((item, index) => {
                        return (
                            <li className="hover:text-gray-800" key={'breadcrumbs' + index}>
                                <Link href={item.url} className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}