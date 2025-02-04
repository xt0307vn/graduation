"use client"

import Medicine from "@/Components/Medicine";
import BreadCrumb from "@/Components/Common/BreadCrumb";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { APIPublicMedicine } from "@/Utils/Axios/APIs";
import request from "@/Utils/Axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Stack } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MedicinePage({props}) {
    
    const [medicine, setMedicine] = useState({})
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const queryClient = useQueryClient()
    
    const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1)
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ? searchParams.get('search') : "")

    const breadcrumb = [
        {
            url: "#",
            title: "Thuốc"
        }
    ]
    
    const {data: dataMedicine, isLoading: isLoadingMedicine, isSuccess: isSuccessMedicine, refetch} = useQuery({
        queryKey: ["MainMedicne"],
        queryFn: () => request({
            url: APIPublicMedicine,
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
            <div className="flex justify-between items-center bg-white py-5 px-4 rounded-md">
                <h3 className="text-2xlarge font-medium mr-14">Tra cứu thuốc & biệt dược</h3>
                <div className="flex-1 bg-white flex gap-2 border-gray-500 border-[0.0625rem] border-solid rounded-full pl-3 py-1 pr-1 relative">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Nhập tên thuốc" className="bg-transparent flex-1" />
                    <div className={`w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer invisible ${search && '!visible'}`} onClick={handleClearSearch}>
                        <FontAwesomeIcon icon={faXmark} className="" />
                    </div>
                    <div className="w-16 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
                    </div>
                </div>
            </div>
            <div className="medicine__list grid grid-cols-5 gap-5 py-10">
                {
                    medicine?.data?.length != 0 && medicine?.data?.map((item, index) => {
                        return (
                            <Medicine key={index} data={item}/>
                        )
                    })
                }
                {
                    (medicine?.data?.length == 0 && !!search) && (
                        <div className="col-start-1 col-end-6">
                            <h2 className="text-xlarge font-medium">Không tìm thấy kết quả với từ khoá: {search}</h2>
                        </div>
                    )
                }
            </div>
            {
                medicine?.data?.length != 0 && (
                    <div>
                        <Stack spacing={2}>
                            <Pagination count={Math.ceil(medicine?.total / medicine?.limit)} variant="outlined" color="primary" shape="rounded" className="t-navigation-center pb-5" onChange={handleOnChangePage} />
                        </Stack>
                    </div>
                )
            }
        </div>
    )
}