"use client"

import { useState, useEffect, useCallback, useRef, use } from "react";
import { Alert, Box, Button, Grid2 as Grid, InputBase, Slide, TextField, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faHome, faList, faPenNib, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import request from "@/Utils/Axios";
import {
    APIType,
    APITypeCreate, APITypeUpdate
} from "@/Utils/Axios/APIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import ReactQuill from "react-quill-new";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import useUpate from "@/Utils/hooks/useUpate";
import { hanldleScrollTopAdmin } from "@/Utils/CustomFunction/FunctionsAdmin";
import AdminHeaderUpdate from "@/Components/Admin/HeaderUpdate";

export default function TypeUpdatePage({params}) {
    
    const [name, setName] = useState('')
    const [message, setMessage] = useState([])
    
    const {id} = use(params)
    
    const {data, isSuccess} =useQuery({
        queryKey: [APIType, "TypeDetail"],
        queryFn: () => request({
            url: `${APIType}/${id}`,
            method: "GET",
        })
    })
    
    const {mutate: mutateUpdate, isSuccess: isSuccessUpdate} = useUpate({
        url: APITypeUpdate,
        queryKeys: [APIType, "TypeDetail"],
        setMessage: setMessage
    })
    
    const handleSubmit = () => {
        CustomSwal.fire({
            title: 'Bạn chắc chắn cập nhật?',
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true
        }).then(result => {
            if (result.isConfirmed) {
                mutateUpdate({
                    id,
                    data: {
                        name: name,
                    }
                });
            }
        })
    }
    
    const handleCancel = () => {
        CustomSwal.fire({
            title: 'Bạn chắc chắn muốn huỷ?',
            text: 'Dữ liệu sẽ không cập nhật',
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true
        }).then(result => {
            if (result.isConfirmed) {
                hanldleScrollTopAdmin()
            }
        })
    }
    
    useEffect(() => {
        if(data) {
            setName(data?.data?.data.name)
        }
    }, [isSuccess]);
    
    return (
        <div>
            <AdminHeaderUpdate onCancel={handleCancel} onUpdate={handleSubmit} nameListPage="Danh sách loại bệnh" nameUpdatePage="Cập nhật loại bệnh" urlListPage="/admin/disease/type" />
            <div className="bg-white p-5 rounded-lg shadow">
                <div className="mb-4 flex">
                    <h1 className="text-large font-bold">
                        Thông tin loại bệnh
                    </h1>
                </div>
                <div className="">
                    <div className="grid grid-cols-2 gap-5 mb-8">
                        <div className="flex flex-col gap-4">
                            <InputFieldCustom name="Tên loại bệnh" value={name} onSetValue={(value) => setName(value)} error={message && message?.find(item => item.property == "name")?.message} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}