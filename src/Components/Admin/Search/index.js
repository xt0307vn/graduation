import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function AdminSearch({value, onSetSearch, onClearSearch, onSearch, placeholder=""}) {
    const handleChangeValue = (e) => onSetSearch(e.target.value)
    return (
        <div className="mb-5 flex gap-4 w-full lg:w-1/2">
            <div className="flex flex-1 items-center gap-1 border-current border-[0.0625rem] border-solid rounded-md">
                <input value={value} onChange={handleChangeValue} type="text" placeholder={placeholder} className="px-3 py-2 flex-1 bg-transparent" />
                <div className={`shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full mr-1 invisible ${value && '!visible'}`}>
                    <FontAwesomeIcon icon={faXmark} onClick={onClearSearch} />
                </div>
            </div>
            <button className="bg-primary text-white rounded-md px-4 shrink-0" onClick={onSearch}>Tìm kiếm</button>
        </div>
    )
}