"use client"

import { useState, useEffect, useCallback, useRef, use } from "react";
import { Alert, Slide, TextField, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCirclePlus,
    faCircleXmark,
    faCloudArrowUp,
    faHome,
    faList, faPenNib,
    faTrash, faXmark
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import request from "@/Utils/Axios";
import {
    APICategory, APICategoryUploadFile,
    APIMedicineCreate,
    APIPost,
    APIPostCreate,
    APIPostUpdate,
    APIPostUploadFile
} from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import ReactQuill from "react-quill-new";
import axios from "axios";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import SelectMultiple from "@/Components/Common/SelectMultiple";
import Select from "@/Components/Common/Select";
import { useRouter } from "next/navigation";
import TextEditor from "@/Components/Common/TextEditor";
import AdminHeaderUpdate from "@/Components/Admin/HeaderUpdate";
import { hanldleScrollTopAdmin } from "@/Utils/CustomFunction/FunctionsAdmin";
import useUpate from "@/Utils/hooks/useUpate";
import { useAppContext } from "@/Helpers/AppContext/AppProvider";

export default function PostUpdatePage({params}) {
    
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState(null)
    const [image, setImage] = useState()
    const [content, setContent] = useState('')
    const [imagePreview, setImagePreview] = useState()
    const [message, setMessage] = useState([])
    
    const {id} = use(params)
    const {account} = useAppContext()
    
    const {data: dataPost, isSuccess} = useQuery({
        queryKey: ["PostDetail"],
        queryFn: () => request({
            url: `${APIPost}/${id}`,
            method: "GET"
        })
    })
    
    const {mutate: mutateUpdate, isSuccess: isSuccessUpdate} = useUpate({
        url: APIPostUpdate,
        queryKeys: [APIPost, "PostDetail"],
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
        CustomSwal.fire({
            showCancelButton: true,
            showConfirmButton: true,
            title: "Bạn chắc chắn muốn cập nhật",
            icon: "question"
        }).then(result => {
            if (result.isConfirmed) {
                mutateUpdate({
                    id,
                    data: {
                        title: title,
                        content: content,
                        image: image,
                        user_id: account.id,
                        category_id: category
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
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file))
        setImage(e.target.files[0])
    };
    
    useEffect(() => {
        if(dataPost) {
            setImage(dataPost?.data?.data.image)
            setTitle(dataPost?.data?.data.title)
            setCategory(dataPost?.data?.data.category_id?.id)
            setContent(dataPost?.data?.data.content)
        }
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview)
        }
    }, [isSuccess, imagePreview])
    
    return (
        <div>
            <AdminHeaderUpdate onCancel={handleCancel} onUpdate={handleSubmit} nameListPage="Danh sách bài viết" nameUpdatePage="Cập nhật bài viết" urlListPage="/admin/post" />
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
                                    <div className="image-full cursor-pointer">
                                        <img src={imagePreview ? imagePreview : (image ? image : "/images/image-upload.png")} alt="Preview Image" className="object-contain" />
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