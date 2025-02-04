import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function AdminHeaderList({nameList, nameAddList, urlAddList}) {
    return (
        <div className="mb-4 flex justify-between sticky top-0 bg-white rounded-md p-4 shadow z-50">
            <h1 className="text-large font-bold">{nameList}</h1>
            <div className="flex gap-4">
                <Link href={urlAddList} className="bg-primary text-white py-1 px-4 rounded flex gap-2 items-center shadow-md">
                    <FontAwesomeIcon icon={faCirclePlus} /> {nameAddList} </Link>
            </div>
        </div>
    )
}