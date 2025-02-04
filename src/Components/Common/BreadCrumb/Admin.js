import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";

export default function BreadCrumbAdmin({props}) {
    return (
        <nav className="breadcrumb text-large py-2 text-black   ">
            <ul className="flex gap-2">
                <li className="hover:text-gray-800">
                    <Link href={"/admin"} className="flex items-center gap-2"> <FontAwesomeIcon icon={faHome}/>
                        <span>Trang chủ</span>
                    </Link>
                </li>
                {
                    props.map((item, index) => {
                        return (
                            <li className="hover:text-gray-800" key={'breadcrumbs' + index}>
                                <Link href={item.url} className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faChevronRight} className="text-medium"/>
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