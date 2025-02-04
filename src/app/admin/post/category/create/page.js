"use client"

import { useState, useEffect } from "react";
import TextEditor from "@/Components/Common/TextEditor";
import {
    APICategory,
    APICategoryCreate,
    APICategoryUploadFile,
} from "@/Utils/Axios/APIs";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import { useRouter } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import AdminHeaderCreate from "@/Components/Admin/HeaderCreate";
import useCreate from "@/Utils/hooks/useCreate";

export default function CategoryCreatePage() {
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState([])
    
    const router = useRouter()
    
    const {mutate, isSuccess: isSuccessCreate} = useCreate({
        url: APICategoryCreate,
        queryKeys: [APICategory],
        setMessage: setMessage
    })

    const handleSubmit = () => {
        mutate({
            name: name,
            content: content,
        });
    }
    
    const handleCancel = () => {
        CustomSwal.fire({
            title: "Bạn chắc chắn muốn huỷ?",
            text: "Dữ liệu sẽ bị mất hết!",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/admin/post/category')
            }
        })
    }
    
    useEffect(() => {
        if(isSuccessCreate) {
            setName('')
            setContent('')
        }
    }, [isSuccessCreate])

    return (
        <div>
            <AdminHeaderCreate nameAddPage="Thêm danh mục" nameListPage="Danh sách danh mục" onCancel={handleCancel} onCreate={handleSubmit} urlListPage="/admin/post/categrory" />
            <div className="bg-white p-5 rounded-lg shadow">
                <div className="mb-4 flex">
                    <h1 className="text-large font-bold">
                        Thông tin danh mục
                    </h1>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-5">
                        <InputFieldCustom name="Danh mục" placeholder="Nhập tên danh  mục" value={name} onSetValue={(value) => setName(value)} error={message && message?.find(item => item.property == "name")?.message} />
                    </div>
                    <div className="col-start-1 col-end-3">
                        <TextEditor name="Nội dung" value={content} onSetValue={setContent} url={APICategoryUploadFile} />
                    </div>
                </div>
            </div>
        </div>
    )
}