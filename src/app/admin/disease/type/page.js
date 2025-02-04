"use client"

import {
    Button,
    Pagination,
    Stack,
    TextField, Tooltip
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import request from "@/Utils/Axios";
import { APIType, APITypeDelete } from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import useDelete from "@/Utils/hooks/useDelete";
import AdminHeaderList from "@/Components/Admin/HeaderList";
import AdminSearch from "@/Components/Admin/Search";


export default function Medicine() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const queryClient = useQueryClient()
    
    const [type, setType] = useState([])
    const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1)
    const [search, setSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    
    const {mutate: mutateDelete, isSuccess: isSuccessDelete} = useDelete({
        url: APITypeDelete,
        queryKeys: [APIType, page, search]
    })
    
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: [APIType, {page: page, search: search}],
        queryFn: () => request({
            url: APIType,
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

    const handleDelete = (id) => {
        CustomSwal.fire({
            title: "Bạn có chắc chắn muốn xoá?",
            text: "Dữ liệu sẽ bị xoá",
            icon: "question",
            showConfirmButton: true,
            showCancelButton: true
        }).then((result) => {
            if(result.isConfirmed) {
                mutateDelete(id)
            }
        })
    }
    
    useEffect(() => {
        if(data?.data) {
            setType(data?.data?.data)
        }
    }, [isSuccess, searchQuery, page]);

    return (
        <div>
            <AdminHeaderList nameList="Danh sách loại bệnh" nameAddList=" Thêm loại bệnh" urlAddList="/admin/disease/type/create" />
            <div className="p-5 bg-white rounded-lg shadow">
                <AdminSearch value={search} onSetSearch={setSearch} onClearSearch={handleClearSearch} onSearch={handleSearch} placeholder="Tìm kiếm loại bệnh" />
                <table className="border-collapse table-auto w-full text-sm t-table">
                    <thead>
                        <tr className="pb-">
                            <th className="text-left">Tên loại bệnh</th>
                            <th className="text-left w-1/5">Thêm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (type?.data?.length != 0) && type?.data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-left ">
                                            <Link href={'disease/' + item.slug}>{item.name}</Link>
                                        </td>
                                        <td className="text-left ">
                                            <nav className="flex gap-5">
                                                <Link href={`/admin/disease/type/update/${item.id}`}>
                                                    <Tooltip title={"Chỉnh loại bệnh"} arrow>
                                                        <FontAwesomeIcon icon={faPenToSquare} className="text-large text-orange-400 px-5 py-1 border-2 rounded-md border-orange-400" />
                                                    </Tooltip>
                                                </Link>
                                                <Tooltip title={"Xoá loại bệnh"} arrow>
                                                    <FontAwesomeIcon icon={faTrash} className="text-large text-red-600 px-5 py-1 border-2 rounded-md border-red-600" onClick={() => {handleDelete(item.id)}} />
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
                    <Pagination count={Math.ceil(type?.total / type?.limit)} variant="outlined" color="primary" shape="rounded" className="t-navigation-right pt-5" onChange={handleOnChangePage} />
                </Stack>
            </div>
        </div>
    );
}