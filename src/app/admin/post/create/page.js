"use client"

import { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faList,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import request from "@/Utils/Axios";
import {
    APICategory, APIPost,
    APIPostCreate,
    APIPostUploadFile
} from "@/Utils/Axios/APIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import Select from "@/Components/Common/Select";
import { useRouter } from "next/navigation";
import TextEditor from "@/Components/Common/TextEditor";
import { useAppContext } from "@/Helpers/AppContext/AppProvider";
import AdminHeaderCreate from "@/Components/Admin/HeaderCreate";
import useCreate from "@/Utils/hooks/useCreate";

export default function PostCreatePage() {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState(null)
    const [image, setImage] = useState()
    const [imagePreview, setImagePreview] = useState()
    const [content, setContent] = useState('')
    const [message, setMessage] = useState([])
    
    const router = useRouter()
    const {account} = useAppContext()
    
    const {mutate, isSuccess: isSuccessCreate} = useCreate({
        url: APIPostCreate,
        queryKeys: [APIPost],
        setMessage: setMessage
    })
    
    
    const {data: dataCategory, isLoading: isLoadingCategory} = useQuery({
        queryKey: [APICategory],
        queryFn: () => request({
            url: APICategory,
            method: "GET"
        })
    })

    const handleSubmit = () => {
        mutate({
            title,
            content,
            category,
            image,
            user_id: account.id,
            category_id: category
        });
    }
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file))
        setImage(e.target.files[0])
    };
    
    const handleCancel = () => {
        CustomSwal.fire({
            title: "Bạn chắc chắn muốn huỷ?",
            text: "Dữ liệu sẽ bị mất hết!",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/admin/post')
            }
        })
    }
    
    useEffect(() => {
        if(isSuccessCreate) {
            setTitle('')
            setCategory(null)
            setImage('')
            setImagePreview('')
            setContent('')
        }
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview)
        }
    }, [isSuccessCreate])

    return (
        <div>
            <AdminHeaderCreate nameAddPage="Thêm bài viết" nameListPage="Danh sách bài viết" onCancel={handleCancel} onCreate={handleSubmit} urlListPage="/admin/post" />
            <div className="bg-white p-5 rounded-lg shadow">
                <div className="mb-4 flex">
                    <h1 className="text-large font-bold">
                        Thông tin bài viết
                    </h1>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div size={{xs: 6, md: 6}}>
                        <h3>Hình ảnh</h3>
                        <Tooltip title='Tải hình ảnh lên' arrow placement="top">
                            <div>
                                <label htmlFor="upload-image">
                                    <div className="w-full h-[25rem] cursor-pointer overflow-hidden">
                                        <img src={imagePreview ? imagePreview : "/images/image-upload.png"} alt="Preview Image" className={`w-full h-full overflow-hidden ${imagePreview ? 'object-cover' : 'object-contain'}`} />
                                    </div>
                                    <input type="file" id="upload-image" name="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            
                            </div>
                        </Tooltip>
                    
                    </div>
                    <div className="flex flex-col gap-5">
                        <InputFieldCustom name="Tiêu đề" placeholder="Nhập tiêu đề" value={title} onSetValue={(value) => setTitle(value)} error={message && message?.find(item => item.property == "title")?.message} />
                        <Select name="Danh mục" data={dataCategory?.data?.data?.data} valueSelect={category} onSelectValue={setCategory} field="name" placeholder="Chọn danh mục" error={message && message?.find(item => item.property == "category_id")?.message} />
                    </div>
                    <div className="col-start-1 col-end-3">
                        <TextEditor name="Nội dung" value={content} onSetValue={setContent} url={APIPostUploadFile} error={message && message?.find(item => item.property == "content")?.message} />
                    </div>
                </div>
            </div>
        </div>
    )
}