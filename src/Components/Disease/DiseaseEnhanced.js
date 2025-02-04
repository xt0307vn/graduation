import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function DiseaseEnhanced({props}) {
    return (
        <div className="flex relative shadow-lg px-3 py-5 overflow-hidden rounded-lg">
            <div className="w-1/3 shrink-0 absolute left-3 bottom-3">
                <img className="ml-[-15px]" src={props.imgUrl} alt="SUBJECT_ALT"/>
            </div>
            <div className="flex-1 ml-[33%] mr-[2.5rem]">
                <h3 className="text-medium font-bold">{props.title}</h3>
                <ul className="list-disc">
                    {
                        props.diseases.map((item, index) => {
                            return (
                                <li className="list-disc list-inside color-primary font-medium" key={index}>
                                    <Link href={item.url}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <Link href={`disease/type`}>
                <button className="shrink-0 w-[2.25rem] h-[2.25rem] bg-primary rounded-md absolute right-3 bottom-3 text-white">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </Link>
        </div>
    )
}