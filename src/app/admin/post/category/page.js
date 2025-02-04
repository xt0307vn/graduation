"use client"

import {
    Alert,
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControlLabel,
    Pagination,
    Paper,
    Slide,
    Stack,
    Switch,
    TextField, Tooltip
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCirclePlus, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import request from "@/Utils/Axios";
import { APICategory, APICategoryDelete, APIMedicine, APIMedicineDelete } from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import CustomSwal from "@/Utils/Swal/CustomSwal";
import AdminHeaderList from "@/Components/Admin/HeaderList";
import AdminSearch from "@/Components/Admin/Search";
import useDelete from "@/Utils/hooks/useDelete";

export default function Medicine() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const queryClient = useQueryClient()
    
    const [category, setCategory] = useState([])
    const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1)
    const [search, setSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    
    const {mutate: mutateDelete, isSuccess: isSuccessDelete} = useDelete({
        url: APICategoryDelete,
        queryKeys: [APICategory, page, search]
    })
    
    const {data, isSuccess} = useQuery({
        queryKey: [APICategory, {page, search}],
        queryFn: () => request({
            url: APICategory,
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
        queryClient.invalidateQueries([{ queryKey: [APICategory, searchQuery, page]}])
    }
    
    const handleOnChangePage = (event, page) => {
        setPage(page)
        const params = new URLSearchParams(searchParams)
        params.set('page', page);
        router.push(`${pathname}?${params.toString()}`)
        queryClient.invalidateQueries([{ queryKey: [APICategory, searchQuery, page]}])
    }
    
    const handleClearSearch = () => {
        setSearchQuery("");
        setSearch("")
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('search', '');
        router.push(`${pathname}?${params.toString()}`)
        queryClient.invalidateQueries([{ queryKey: [APICategory, searchQuery, page]}])
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
            setCategory(data?.data?.data)
        }
    }, [searchQuery, page, isSuccess]);
    
    return (
        <div>
            <AdminHeaderList nameList="Danh sách danh mục" nameAddList="Thêm danh mục" urlAddList="/admin/post/category/create" />
            <div className="p-5 bg-white rounded-lg shadow">
                <AdminSearch value={search} onSetSearch={setSearch} onClearSearch={handleClearSearch} onSearch={handleSearch} placeholder="Tìm kiếm danh mục" />
                <table className="border-collapse table-auto w-full text-sm t-table">
                    <thead>
                        <tr className="pb-">
                            <th className="w-1/6 text-left">Tên</th>
                            <th className="text-left w-1/5">Thêm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (category?.data?.length != 0) && category?.data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-left ">
                                            <Link href={'medicine/' + item.slug}>{item.name}</Link>
                                        </td>
                                        <td className="text-left ">
                                            <nav className="flex gap-5">
                                                <Link href={`/admin/post/category/update/${item.id}`}>
                                                    <Tooltip title={"Chỉnh danh mục"} arrow>
                                                        <FontAwesomeIcon icon={faPenToSquare} className="text-large text-orange-400 px-5 py-1 border-2 rounded-md border-orange-400" />
                                                    </Tooltip>
                                                </Link>
                                                <Tooltip title={"Xoá danh mục"} arrow>
                                                    <FontAwesomeIcon icon={faTrash} className="text-large text-red-600 px-5 py-1 border-2 rounded-md border-red-600" onClick={() => handleDelete(item.id)} />
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
                    <Pagination count={Math.ceil(category?.total / category?.limit)} variant="outlined" color="primary" shape="rounded" className="t-navigation-right pt-5" onChange={handleOnChangePage} />
                </Stack>
            </div>
        </div>
    );
}