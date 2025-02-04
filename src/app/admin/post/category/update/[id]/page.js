"use client"

import { useState, useEffect, use, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList, faPenNib,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import request from "@/Utils/Axios";
import {
    APICategory,
    APICategoryCreate,
    APICategoryUpdate, APICategoryUploadFile,
    APIMedicineCreate, APIMedicineUploadFile,
    APIPostCreate, APIPostUploadFile
} from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import { useRouter } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import ReactQuill from "react-quill-new";
import TextEditor from "@/Components/Common/TextEditor";
import useUpate from "@/Utils/hooks/useUpate";
import { hanldleScrollTopAdmin } from "@/Utils/CustomFunction/FunctionsAdmin";
import AdminHeaderUpdate from "@/Components/Admin/HeaderUpdate";

export default function CategoryUpdatePage({params}) {
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState([])
    
    const {id} =use(params)
    
    const { data, isSuccess } = useQuery({
        queryKey: ["CategoryDetail"],
        queryFn: () => request({
            url: `${APICategory}/${id}`,
            method: "GET"
        }),
    })
    
    const {mutate: mutateUpdate, isSuccess: isSuccessUpdate} = useUpate({
        url: APICategoryUpdate,
        queryKeys: [APICategory, "CategoryDetail"],
        setMessage: setMessage
    })

    const handleSubmit = () => {
        CustomSwal.fire({
            title: 'Bạn có chắn chắn muốn cập nhật?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        }).then((resule) => {
            if (resule.isConfirmed) {
                mutateUpdate({
                    id,
                    data: {
                        name: name,
                        content: content,
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
            setContent(data?.data?.data.content)
        }
    }, [isSuccess])
    
    return (
        <div>
            <AdminHeaderUpdate onCancel={handleCancel} onUpdate={handleSubmit} nameListPage="Danh sách danh mục" nameUpdatePage="Cập nhật danh mục" urlListPage="/admin/post/category" />
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