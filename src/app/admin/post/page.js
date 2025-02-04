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
import { APIPostDelete, APIPost, APIPostUpdate } from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import CustomSwal from "@/Utils/Swal/CustomSwal";
import useDelete from "@/Utils/hooks/useDelete";
import AdminHeaderList from "@/Components/Admin/HeaderList";
import AdminSearch from "@/Components/Admin/Search";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export default function Medicine() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const queryClient = useQueryClient()
    
    const [post, setPost] = useState([])
    const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1)
    const [search, setSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ? searchParams.get('search') : "")
    
    const {mutate: mutateDelete, isSuccess: isSuccessDelete} = useDelete({
        url: APIPostDelete,
        queryKeys: [APIPost, page, search]
    })
    
    const {data, isSuccess} = useQuery({
        queryKey: [APIPost, {page, search}],
        queryFn: () => request({
            url: APIPost,
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
        queryClient.invalidateQueries([{ queryKey: [APIPost, searchQuery, page]}])
    }
    
    const handleOnChangePage = (event, page) => {
        setPage(page)
        const params = new URLSearchParams(searchParams)
        params.set('page', page);
        router.push(`${pathname}?${params.toString()}`)
        queryClient.invalidateQueries([{ queryKey: [APIPost, searchQuery, page]}])
    }
    
    const handleClearSearch = () => {
        setSearchQuery("");
        setSearch("")
        setPage(1)
        const params = new URLSearchParams(searchParams)
        params.set('search', '');
        router.push(`${pathname}?${params.toString()}`)
        queryClient.invalidateQueries([{ queryKey: [APIPost, searchQuery, page]}])
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
            setPost(data?.data?.data)
        }
    }, [searchQuery, page, isSuccess]);

    return (
        <div>
            <AdminHeaderList nameList="Danh sách bài viết" nameAddList="Thêm bài viết" urlAddList="/admin/post/create" />
            <div className="p-5 bg-white rounded-lg shadow">
                <AdminSearch value={search} onSetSearch={setSearch} onClearSearch={handleClearSearch} onSearch={handleSearch} />
                <table className="border-collapse table-auto w-full text-sm t-table">
                    <thead>
                        <tr className="pb-">
                            <th className="w-1/6 text-left">Hình ảnh</th>
                            <th className="text-left">Tiêu đề</th>
                            <th className="text-left w-1/5">Ngày tạo</th>
                            <th className="text-left w-1/5">Thêm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (post?.data?.length != 0) && post?.data?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-left ">
                                            <div className="image-medium rounded-md">
                                                <img src={item.image ? item.image : '/images/error-image.png'} alt={item.title} />
                                            </div>
                                        </td>
                                        <td className="text-left ">
                                            <Link className="line-clamp-1" href={'medicine/' + item.slug}>{item.title}</Link>
                                        </td>
                                        <td className="text-left ">{item.created_at}</td>
                                        <td className="text-left ">
                                            <nav className="flex gap-5">
                                                <Link href={`/admin/post/update/${item.id}`}>
                                                    <Tooltip title={"Chỉnh bài viết"} arrow>
                                                        <FontAwesomeIcon icon={faPenToSquare} className="text-large text-orange-400 px-5 py-1 border-2 rounded-md border-orange-400" />
                                                    </Tooltip> </Link> <Tooltip title={"Xoá bài viết"} arrow>
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
                    <Pagination count={Math.ceil(post?.total / post?.limit)} variant="outlined" color="primary" shape="rounded" className="t-navigation-right pt-5" onChange={handleOnChangePage} />
                </Stack>
            </div>
        </div>
    );
}