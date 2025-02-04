import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Select({name, data, valueSelect, onSelectValue, placeholder= '', field='name', size=null, error}) {
    const dropdownRef = useRef(null);
    const selectRef = useRef(null);
    const [dropdown, setDropdown] = useState(false);
    const [textOfSelect, setTextOfSelect] = useState('')
    
    const handleSelect = (e) => {
        if(dropdown) {
            let index = parseInt(e.target.dataset.value)
            onSelectValue(index)
            const selected = data.filter(item => item.id == index)
                .map(item => item[field])
                .join(', ')
            setTextOfSelect(selected)
        }
    }
    
    window.addEventListener('click', function(e) {
        if(dropdownRef.current && !dropdownRef.current.contains(e.target) && selectRef.current && !selectRef.current.contains(e.target)) {
            setDropdown(false)
        }
    })
    
    useEffect(() => {
        if(valueSelect) {
            const selected = data.filter(item => valueSelect == item.id)
                .map(item => item[field])
                .join(', ')
            setTextOfSelect(selected)
        }
    }, [valueSelect, textOfSelect]);
    
    return (
        <div className="dropdown relative">
            <h3 className={`text-small ${error && 'text-red-600'} mb-1`}>{name}</h3>
            <div ref={dropdownRef} className={`dropdown__select flex justify-between  p-1 border-current border-gray-500 border-[0.0625rem] rounded cursor-pointer ${dropdown && "!border-primary !border-2"} ${error && 'focus:border-red-600 !border-red-600 !text-red-600'} ${size == 'large' && '!px-3 !py-2'}`} onClick={() => setDropdown(!dropdown)}>
                <span className="select-none line-clamp-1">{textOfSelect ? textOfSelect : placeholder}</span>
                <div className={`transition-all ${dropdown && 'rotate-180'}`}><FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
            <p className="text-red-600 text-xsmall mt-1">{error && error}</p>
            <ul ref={selectRef} className={`dropdown__menu bg-white max-h-64 overflow-x-hidden absolute w-full rounded shadow-md transition-all scale-90 z-[-1] ${dropdown ? "!scale-100 translate-y-[0px] !z-10" : "opacity-0"}`}>
                {
                    data?.map((item) => (
                        <li key={item.id + item[field]} className={`px-1 py-2 cursor-pointer hover:bg-blue-100 ${valueSelect == item.id && 'bg-primary-200'} ${size == 'large' && '!px-3'}`} data-value={item.id} onClick={handleSelect}>{item[field]}</li>
                    ))
                }
            </ul>
        </div>
    )
}