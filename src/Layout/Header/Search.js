"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMicrophone, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import request from "@/Utils/Axios";
import { APIDisease, APIMedicine } from "@/Utils/Axios/APIs";
import Link from "next/link";

export default function Search() {
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [medicine, setMedicine] = useState([])
    const [disease, setDisease] = useState([])
    const searchBoxRef = useRef(null)
    const searchResultRef = useRef(null)
    const queryClient = useQueryClient()
    
    const {data: dataMedicine, isSuccess: isSuccessMedicine} = useQuery({
        queryKey: ["MedicineSearch", search],
        queryFn: () => request({
            url: APIMedicine,
            method: "GET",
            params: {
                search: search,
                limit: 6
            }
        }),
    })
    
    const {data: dataDisease, isSuccess: isSuccessDisease} = useQuery({
        queryKey: ["DiseaseSearch", search],
        queryFn: () => request({
            url: APIDisease,
            method: "GET",
            params: {
                search: search,
                limit: 9
            }
        }),
    })
    
    useEffect(() => {
        
        window.addEventListener('click', function(e) {
            if(searchBoxRef.current && !searchBoxRef.current.contains(e.target) && searchResultRef.current && !searchResultRef.current.contains(e.target)) {
                setShowSearch(false)
            }
        })
        
        if(isSuccessMedicine) {
            setMedicine(dataMedicine?.data?.data?.data)
        }
        
        if(isSuccessDisease) {
            setDisease(dataDisease?.data?.data?.data)
        }
        
    }, [isSuccessMedicine, isSuccessDisease, search])
    return (
        <div className="header__search w-full mx-10 relative">
            <div className="search__box flex items-center bg-white rounded-md" ref={searchBoxRef}>
                <button className="search__input text-base text-neutral-950 h-10 p-3 flex items-center justify-center ">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input type="text" className="search__input text-black h-10 flex-1 bg-transparent" placeholder="Tên thuốc, triệu chứng..." value={search} onChange={e => setSearch(e.target.value)} onClick={() => setShowSearch(true)} />
                <button className={`search__input text-base text-neutral-500 h-8 w-8 mr-1 rounded-full flex items-center justify-center hover:bg-gray-200 ${search ? 'visible' : 'invisible'}`} onClick={() => setSearch('')}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <button className={`search__input text-base text-neutral-600 h-8 w-8 mr-1 rounded-full flex items-center justify-center hover:bg-gray-200`}>
                    <FontAwesomeIcon icon={faMicrophone} />
                </button>
            </div>
            {
                showSearch && (
                    <div className="absolute py-4 top-full left-0 min-h-[50vh] w-full rounded-md shadow-md bg-white z-50 text-black mt-2" ref={searchResultRef}>
                        {
                            search ? (
                                <>
                                    {
                                        medicine.length != 0 && (
                                            <div className={`px-4 text-black pb-4 ${disease.length != 0 && 'border-solid mb-2 border-b-2 border-b-gray-200'}`}>
                                                <p className="text-small font-bold mb-2">Thuốc</p>
                                                <div className="grid grid-cols-6 gap-4 h-full">
                                                    {
                                                        medicine?.map((item, index) => (
                                                            <Link href={`/medicine/${item.slug}`} key={`medicine-search-${index}`}>
                                                                <div className="flex flex-col border-gray-200 border-solid border-[0.0625rem] overflow-hidden rounded-md h-full">
                                                                    <div className="rounded shrink-0 h-32 p-2">
                                                                        <img className="h-full w-full object-cover" src={item.image} alt={item.name} />
                                                                    </div>
                                                                    <div className="px-2 mb-2 flex-1 pt-2">
                                                                        <h6 className="flex-1 text-small text-black line-clamp-2">{item.name}</h6>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    } {disease.length != 0 && (
                                    <div className="px-4">
                                        <p className="text-small font-bold mb-2">Bệnh</p>
                                        <div className="grid grid-cols-3 gap-4">
                                            {
                                                disease && disease?.map((item, index) => (
                                                    <Link href={`/disease/${item.slug}`} key={`disease-search-${index}`}>
                                                        <div className="flex rounded-md border-gray-200 border-solid border-[0.0625rem] overflow-hidden">
                                                            <div className="h-20 w-20 shrink-0">
                                                                <img className="h-full w-full object-cover" src={item.image} alt={item.name} />
                                                            </div>
                                                            <div className="py-3 px-3">
                                                                <h6 className="line-clamp-1 text-small">{item.name}</h6>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                                }
                                </>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-black flex-col">
                                    <div className="w-1/3 h-1/3">
                                        <img src="/images/search-cute.png" alt="Search Icon " />
                                    </div>
                                    <h5>Tìm kiếm mọi thứ bạn cần 🫣🫣</h5>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}