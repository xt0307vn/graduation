"use client"

import {
    Pagination,
    Stack,
    Tooltip
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus, faPenToSquare, faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import request from "@/Utils/Axios";
import { APIMedicine, APIMedicineDelete } from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import AdminSearch from "@/Components/Admin/Search";
import AdminHeaderList from "@/Components/Admin/HeaderList";
import useDelete from "@/Utils/hooks/useDelete";

export default function Medicine(ctx) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const queryClient = useQueryClient()
    
    const [medicine, setMedicine] = useState([])
    const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1)
    const [search, setSearch] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    
    const {mutate: mutateDelete, isSuccess: isSuccessDelete} = useDelete({
        url: APIMedicineDelete,
        queryKeys: [APIMedicine, page, search]
    })
    
    const {data, isSuccess} = useQuery({
        queryKey: [APIMedicine, {page, search}],
        queryFn: () => request({
            url: APIMedicine,
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
        queryClient.invalidateQueries([{ queryKey: [APIMedicine, searchQuery, page]}])
    }

    const handleOnChangePage = (event, page) => {
        setPage(page)
        const params = new URLSearchParams(searchParams)
        params.set('page', page);
        router.push(`${pathname}?${params.toString()}`)
        queryClient.invalidateQueries([{ queryKey: [APIMedicine, searchQuery, page]}])
    }

    const handleClearSearch = () => {
        setSearchQuery("");
        setSearch("")
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('search', '');
        router.push(`${pathname}?${params.toString()}`)
        queryClient.invalidateQueries([{ queryKey: [APIMedicine, searchQuery, page]}])
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
        if(data?.data) {
            setMedicine(data?.data?.data)
        }
    }, [searchQuery, page, isSuccess, search]);

    return (
        <div>
            <AdminHeaderList nameList="Danh sách thuốc" nameAddList="Thêm thuốc" urlAddList="/admin/medicine/create" />
            <div className="p-5 bg-white rounded-lg shadow">
                <AdminSearch value={search} onSetSearch={setSearch} onClearSearch={handleClearSearch} onSearch={handleSearch} />
                <table className="border-collapse table-auto w-full text-sm t-table">
                    <thead>
                        <tr className="pb-">
                        <th className="w-1/6 text-left">Hình ảnh</th>
                            <th className="text-left">Tên thuốc</th>
                            <th className="text-left">Hoạt chất</th>
                            <th className="text-left w-1/5">Thêm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (medicine?.data?.length != 0) && medicine?.data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-left ">
                                            <div className="image-medium rounded-md">
                                                <img src={item.image ? item.image : '/images/error-image.png'} />
                                            </div>
                                        </td>
                                        <td className="text-left ">
                                            <Link className="line-clamp-1" href={'medicine/' + item.slug}>{item.name}</Link>
                                        </td>
                                        <td className="text-left ">{item.active_ingredient}</td>
                                        <td className="text-left ">
                                            <nav className="flex gap-5">
                                                <Link href={`/admin/medicine/update/${item.id}`}>
                                                    <Tooltip title={"Chỉnh thuốc"} arrow>
                                                        <FontAwesomeIcon icon={faPenToSquare} className="text-large text-orange-400 px-5 py-1 border-2 rounded-md border-orange-400" />
                                                    </Tooltip> </Link> <Tooltip title={"Xoá thuốc"} arrow>
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
                    <Pagination count={Math.ceil(medicine?.total /medicine?.limit)} variant="outlined" color="primary" shape="rounded" className="t-navigation-right pt-5" onChange={handleOnChangePage} />
                </Stack>
            </div>
        </div>
    );
}