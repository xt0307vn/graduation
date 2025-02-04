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
import { APIPost, APIUser, APIUserDelete } from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import AdminSearch from "@/Components/Admin/Search";

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const queryClient = useQueryClient()
    
    const [user, setUser] = useState({})
    const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1)
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    
    
    const {mutate: mutateDelete} = useMutation({
        mutationFn: (id) => request({
            url: `${APIUserDelete}/${id}`,
            method: "DELETE",
        }),
        onSuccess: (data) => {
            if(data?.data?.status) {
                queryClient.invalidateQueries([{ queryKey: [APIUser]}])
                CustomSwal.fire({
                    title: 'Xoá dữ liệu thành công',
                    icon: "success"
                })
            }
        },
        onError: () => {
            console.log("Delete error")
        }
    })
    
    const {data, isLoading, isSuccess} = useQuery({
        queryKey: [APIUser, page, searchQuery],
        queryFn: () => request({
            url: APIUser,
            method: "GET",
            params: {
                page: page,
                limit: 8,
                search: searchQuery
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
        queryClient.invalidateQueries({ queryKey: [APIUser, page, searchQuery]})
    }
    
    const handleOnChangePage = (event, page) => {
        setPage(page)
        const params = new URLSearchParams(searchParams)
        params.set('page', page);
        router.push(`${pathname}?${params.toString()}`)
        queryClient.invalidateQueries({ queryKey: [APIUser, page, searchQuery]})
    }
    
    const handleClearSearch = () => {
        setSearchQuery("");
        setSearch("")
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('search', '');
        router.push(`${pathname}?${params.toString()}`)
        queryClient.invalidateQueries({ queryKey: [APIUser, page, searchQuery]})
    }
    
    const handleDelete = (id) => {
        CustomSwal.fire({
            title: 'Bạn chắc chắn muốn xoá?',
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true
        }).then(result => {
            if(result.isConfirmed) {
                mutateDelete(id)
            }
        })
    }
    
    useEffect(() => {
        if(data) {
            setUser(data?.data?.data)
        }
    }, [isSuccess, page, searchQuery]);
    
    return (
        <div>
            <div className="mb-4 flex justify-between sticky top-5 bg-white rounded-md p-4 shadow z-50">
                <h1 className="text-large font-bold">Danh sách tài khoản</h1>
            </div>
            <div className="p-5 bg-white rounded-lg shadow">
                <AdminSearch value={search} onSetSearch={setSearch} onClearSearch={handleClearSearch} onSearch={handleSearch} />
                <table className="border-collapse table-auto w-full text-sm t-table">
                    <thead>
                        <tr className="pb-">
                            <th className="w-1/6 text-left">Tên</th>
                            <th className="text-left">Số điện thoại</th>
                            <th className="text-left">Trạng thái</th>
                            <th className="text-left w-1/5">Thêm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (user?.data?.length != 0) && user?.data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-left line-clamp-1">{item.name}</td>
                                        <td className="text-left ">{item.phone_number}</td>
                                        <td className="text-left ">{item.status == 1 ? 'Đang hoạt động' : 'Ngừng hoạt động'}</td>
                                        <td className="text-left ">
                                            <nav className="flex gap-5">
                                                <Link href={`#`}>
                                                    <Tooltip title={"Chỉnh tài khoản"} arrow>
                                                        <FontAwesomeIcon icon={faPenToSquare} className="text-large text-orange-400 px-5 py-1 border-2 rounded-md border-orange-400" />
                                                    </Tooltip> </Link> <Tooltip title={"Xoá tài khoản"} arrow>
                                                <FontAwesomeIcon icon={faTrash} className="text-large text-red-600 px-5 py-1 border-2 rounded-md border-red-600" onClick={() => { handleDelete(item.id) }} />
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
                    <Pagination count={Math.ceil(user?.total / user?.limit)} variant="outlined" color="primary" shape="rounded" className="t-navigation-right pt-5" onChange={handleOnChangePage} />
                </Stack>
            </div>
        </div>
    );
}