import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPenNib, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AdminHeaderUpdate({nameUpdatePage, nameListPage, onCancel, onUpdate, urlListPage}) {
    return (
        <div className="mb-4 flex justify-between sticky top-0 bg-white rounded-md p-4 shadow z-50">
            <h1 className="text-large font-bold">
                {nameUpdatePage}
            </h1>
            <div className="flex gap-4">
                <button onClick={onCancel} className="bg-orange-600 py-1 px-4 text-white font-medium rounded shadow flex gap-2 items-center">
                    <FontAwesomeIcon icon={faXmark} />Huỷ</button>
                <button className="bg-green-700 py-1 px-4 text-white font-medium rounded shadow flex gap-2 items-center" onClick={onUpdate}>
                    <FontAwesomeIcon icon={faPenNib} />Cập nhật</button>
                <Link href={urlListPage} className="bg-primary text-white py-1 px-4 rounded flex gap-2 items-center shadow-md">
                    <FontAwesomeIcon icon={faList} />{nameListPage}</Link>
            </div>
        </div>
    )
}