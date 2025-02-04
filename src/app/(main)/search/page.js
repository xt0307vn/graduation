"use client"

import Medicine from "@/Components/Medicine";
import BreadCrumb from "@/Components/Common/BreadCrumb";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { APIMedicine } from "@/Utils/Axios/APIs";
import request from "@/Utils/Axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Stack } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircle as faCircleSolid } from "@fortawesome/free-solid-svg-icons";

export default function MedicinePage({props}) {
    
    const [medicine, setMedicine] = useState([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const queryClient = useQueryClient()
    
    const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1)
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    const [tabs, setTabs] = useState(0)
    
    const breadcrumb = [
        {
            url: "",
            title: "Tìm kiếm"
        }
    ]
    
    const {data: dataMedicine, isLoading: isLoadingMedicine, isSuccess: isSuccessMedicine, refetch} = useQuery({
        queryKey: ["MainMedicne"],
        queryFn: () => request({
            url: APIMedicine,
            method: "GET",
            params: {
                page: page,
                limit: 10,
                search: searchQuery
            }
        })
    })
    
    const handleSearch = () => {
        setSearchQuery(search);
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('search', search);
        params.set('page', page);
        router.push(`${pathname}?${params.toString()}`)
        queryClient.removeQueries()
        queryClient.invalidateQueries({ queryKey: ["MainMedicne"]})
    }
    
    const handleOnChangePage = (event, page) => {
        setPage(page)
        const params = new URLSearchParams(searchParams)
        params.set('page', page);
        router.push(`${pathname}?${params.toString()}`)
        queryClient.removeQueries()
        queryClient.invalidateQueries({ queryKey: ["MainMedicne"]})
    }
    
    const handleClearSearch = () => {
        setSearchQuery("");
        setSearch("")
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('search', '');
        router.push(`${pathname}?${params.toString()}`)
        queryClient.removeQueries()
        queryClient.invalidateQueries({ queryKey: ["MainMedicne"]})
    }
    
    useEffect(() => {
        if(dataMedicine) {
            setMedicine(dataMedicine?.data?.data)
        }
    }, [isSuccessMedicine, searchQuery, page, search]);
    
    return (
        <div className="screen">
            <BreadCrumb props={breadcrumb} />
            <div className="flex gap-6 items-center bg-white py-5 px-4 rounded-md">
                <div className={`flex items-center gap-2 cursor-pointer text-xlarge font-medium ${tabs == 0 && 'text-primary'}`} onClick={() => setTabs(0)}>
                    <FontAwesomeIcon icon={tabs == 0 ? faCircleSolid : faCircle} />
                    <h3 className={`${tabs == 0 && 'font-bold text-primary'}`}>Thuốc</h3>
                </div>
                <div className={`flex items-center gap-2 cursor-pointer text-xlarge font-medium ${tabs == 1 && 'text-primary'}`} onClick={() => setTabs(1)}>
                    <FontAwesomeIcon icon={tabs == 1 ? faCircleSolid : faCircle} />
                    <h3 className={`${tabs == 1 && 'font-bold text-primary'}`}>Bài viết</h3>
                </div>
            </div>
            
        </div>
    )
}