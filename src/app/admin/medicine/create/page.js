"use client"

import { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import {
    APICategoryUploadFile,
    APIMedicine,
    APIMedicineCreate,
    APIMedicineUploadFile,
    APIPostUploadFile
} from "@/Utils/Axios/APIs";
import { useQueryClient } from "@tanstack/react-query";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import { useRouter } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import TextEditor from "@/Components/Common/TextEditor";
import AdminHeaderCreate from "@/Components/Admin/HeaderCreate";
import useCreate from "@/Utils/hooks/useCreate";

export default function UserCreatePage() {

    const [name, setName] = useState('')
    const [image, setImage] = useState()
    const [imagePreview, setImagePreview] = useState()
    const [indication, setIndication] = useState('')
    const [tags, setTags] = useState('')
    const [dosageForm, setDosageForm] = useState('')
    const [activeIngredient, setActiveIngredient] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState([])
    
    const router = useRouter()
    
    const {mutate, isSuccess: isSuccessCreate} = useCreate({
        url: APIMedicineCreate,
        queryKeys: [APIMedicine],
        setMessage: setMessage
    })

    const handleSubmit = () => {
        mutate({
            name: name,
            indication: indication,
            content: content,
            image: image,
            dosage_form: dosageForm,
            active_ingredient: activeIngredient,
            tags: tags
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
                router.push('/admin/medicine')
            }
        })
    }
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagePreview(URL.createObjectURL(file))
        setImage(e.target.files[0])
    };
    
    useEffect(() => {
        if(isSuccessCreate) {
            setName('')
            setImage('')
            setImagePreview('')
            setIndication('')
            setDosageForm('')
            setActiveIngredient('')
            setContent('')
            setTags('')
        }
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview)
        }
    }, [isSuccessCreate])
    
    return (
        <div>
            <AdminHeaderCreate nameAddPage="Thêm thuốc" nameListPage="Danh sách thuốc" onCancel={handleCancel} onCreate={handleSubmit} urlListPage="/admin/medicine" />
            <div className="bg-white p-5 rounded-lg shadow">
                <div className="mb-4 flex">
                    <h1 className="text-large font-bold">
                        Thông tin thuốc
                    </h1>
                </div>
                <div className="">
                    <div className="grid grid-cols-2 gap-5 mb-4">
                        <div className="">
                            <h3>Hình ảnh</h3>
                            <Tooltip title='Tải hình ảnh lên' arrow placement="top">
                                <div>
                                    <label htmlFor="upload-image">
                                        <div className="w-full h-[25rem] cursor-pointer overflow-hidden">
                                            <img src={imagePreview ? imagePreview : "/images/image-upload.png"} alt="Preview Image" className="w-full h-full object-contain overflow-hidden" />
                                        </div>
                                        <input type="file" id="upload-image" name="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                                
                                </div>
                            </Tooltip>
                        </div>
                        <div className="flex flex-col gap-4">
                            <InputFieldCustom name="Thuốc" value={name} onSetValue={(value) => setName(value)} error={message.length != 0 && message?.find(item => item.property == "name")?.message} />
                            <InputFieldCustom name="Tags" value={tags} onSetValue={(value) => setTags(value)} error={message.length != 0 && message?.find(item => item.property == "tags")?.message} />
                            <InputFieldCustom name="Hoạt chất" value={activeIngredient} onSetValue={(value) => setActiveIngredient(value)} error={message.length != 0 && message?.find(item => item.property == "active_ingredient")?.message} />
                            <InputFieldCustom name="Dạng bào chế" value={dosageForm} onSetValue={(value) => setDosageForm(value)} error={message.length != 0 && message?.find(item => item.property == "dosage_form")?.message} />
                            <InputFieldCustom name="Chỉ định" value={indication} onSetValue={(value) => setIndication(value)} error={message.length != 0 && message?.find(item => item.property == "indication")?.message} />
                        </div>
                    </div>
                    <div>
                        <TextEditor name="Nội dung" value={content} onSetValue={setContent} url={APIMedicineUploadFile} />
                    </div>
                </div>
            </div>
        </div>
    )
}