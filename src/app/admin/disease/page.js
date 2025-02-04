"use client"

import {
    Pagination,
    Stack,
    Tooltip
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus, faList, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import request from "@/Utils/Axios";
import { APIDisease, APIDiseaseDelete, APIMedicine, APIMedicineDelete } from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import CustomSwal from "@/Utils/Swal/CustomSwal";
import AdminHeaderList from "@/Components/Admin/HeaderList";
import AdminSearch from "@/Components/Admin/Search";
import useDelete from "@/Utils/hooks/useDelete";

defineElement(lottie.loadAnimation);

export default function Medicine() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const queryClient = useQueryClient()
    
    const [disease, setDisease] = useState([])
    const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1)
    const [search, setSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ? searchParams.get('search') : "")

    const {mutate: mutateDelete, isSuccess: isSuccessDelete} = useDelete({
        url: APIDiseaseDelete,
        queryKeys: [APIDisease, page, search]
    })

    const {data, isLoading, isSuccess} = useQuery({
        queryKey: [APIDisease, {page: page, search: search}],
        queryFn: () => request({
            url: APIDisease,
            method: "GET",
            params: {
                page: page,
                limit: 8,
                search: search
            }
        }),
    })
    
    const handleSearch = () => {
        setSearchQuery(search);
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('search', search);
        params.set('page', page);
        router.push(`${pathname}?${params.toString()}`)
    }
    
    const handleOnChangePage = (event, page) => {
        setPage(page)
        const params = new URLSearchParams(searchParams)
        params.set('page', page);
        router.push(`${pathname}?${params.toString()}`)
    }
    
    const handleClearSearch = () => {
        setSearchQuery("");
        setSearch("")
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('search', '');
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        CustomSwal.fire({
            title: "Bạn có chắc chắn?",
            text: "Dữ liệu sẽ bị xoá!",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                mutateDelete(id)
            }
        });
    }
    
    useEffect(() => {
        if(data?.data) {
            setDisease(data?.data?.data)
        }
    }, [isSuccess, searchQuery, page]);
    return (
        <div>
            <AdminHeaderList nameList="Danh sách bệnh" nameAddList="Thêm bệnh" urlAddList="/admin/disease/create" />
            <div className="p-5 bg-white rounded-lg shadow">
                <AdminSearch value={search} onSetSearch={setSearch} onClearSearch={handleClearSearch} onSearch={handleSearch} placeholder="Tìm kiếm bệnh" />
                <table className="border-collapse table-auto w-full text-sm t-table">
                    <thead>
                        <tr className="pb-">
                            <th className="w-1/6 text-left">Hình ảnh</th>
                            <th className="text-left">Tên bệnh</th>
                            <th className="text-left w-1/5">Thêm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (disease?.data?.length != 0) && disease?.data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-left ">
                                            <div className="image-medium rounded-md">
                                                <img src={item.image ? item.image : '/images/error-image.png'} alt={item.name} />
                                            </div>
                                        </td>
                                        <td className="text-left ">
                                            <Link className="line-clamp-1" href={'disease/' + item.slug}>{item.name}</Link>
                                        </td>
                                        <td className="text-left ">
                                            <nav className="flex gap-5">
                                                <Link href={`/admin/disease/update/${item.id}`}>
                                                    <Tooltip title={"Chỉnh bệnh"} arrow>
                                                        <FontAwesomeIcon icon={faPenToSquare} className="text-large text-orange-400 px-5 py-1 border-2 rounded-md border-orange-400" />
                                                    </Tooltip>
                                                </Link>
                                                <Tooltip title={"Xoá bệnh"} arrow>
                                                    <form action='#' method="POST" onClick={(e) => { handleDelete(e, item.id)}}>
                                                        <FontAwesomeIcon icon={faTrash} className="text-large text-red-600 px-5 py-1 border-2 rounded-md border-red-600" />
                                                    </form>
                                                </Tooltip>
                                            </nav>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Stack spacing={2}>
                    <Pagination count={Math.ceil(disease?.total / disease?.limit)} variant="outlined" color="primary" shape="rounded" className="t-navigation-right pt-5" onChange={handleOnChangePage} />
                </Stack>
            </div>
        </div>
    );
}