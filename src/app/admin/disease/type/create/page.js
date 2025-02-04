"use client"

import { useState, useEffect, useCallback, useRef } from "react";
import { Alert, Box, Button, Grid2 as Grid, InputBase, Slide, TextField, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faHome, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import request from "@/Utils/Axios";
import {
    APIType,
    APITypeCreate
} from "@/Utils/Axios/APIs";
import { useMutation } from "@tanstack/react-query";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import { useRouter } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import AdminHeaderCreate from "@/Components/Admin/HeaderCreate";
import useCreate from "@/Utils/hooks/useCreate";

export default function UserCreatePage() {
    
    const [name, setName] = useState('')
    const [message, setMessage] = useState([])
    
    const router = useRouter()
    
    const {mutate, isSuccess: isSuccessCreate} = useCreate({
        url: APITypeCreate,
        queryKeys: [APIType],
        setMessage: setMessage
    })
    
    const handleCancel = () => {
        CustomSwal.fire({
            title: "Bạn chắc chắn muốn huỷ?",
            text: "Dữ liệu sẽ bị mất hết!",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/admin/disease/type')
            }
        })
    }
    
    const handleSubmit = () => {
        mutate({
            name: name
        });
    }
    
    useEffect(() => {
        if(isSuccessCreate) {
            setName("")
        }
    }, [isSuccessCreate])
    
    return (
        <div>
            <AdminHeaderCreate nameAddPage="Thêm loại bệnh" nameListPage="Danh sách loại bệnh" onCancel={handleCancel} onCreate={handleSubmit} urlListPage="/admin/disease/type" />
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