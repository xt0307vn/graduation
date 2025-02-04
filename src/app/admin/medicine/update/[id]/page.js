"use client"

import { useState, useEffect, use, useCallback, useRef } from "react";
import { Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faHome, faList, faPenNib, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import request from "@/Utils/Axios";
import {
    APICategory,
    APIMedicine,
    APIMedicineCreate,
    APIMedicineUpdate,
    APIMedicineUploadFile
} from "@/Utils/Axios/APIs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import TextEditor from "@/Components/Common/TextEditor";
import { hanldleScrollTopAdmin } from "@/Utils/CustomFunction/FunctionsAdmin";
import AdminHeaderUpdate from "@/Components/Admin/HeaderUpdate";
import useUpate from "@/Utils/hooks/useUpate";

export default function MedicineUpdatePage({ params }) {
    const [name, setName] = useState('')
    const [tags, setTags] = useState('')
    const [image, setImage] = useState()
    const [imagePreview, setImagePreview] = useState()
    const [indication, setIndication] = useState('')
    const [dosageForm, setDosageForm] = useState('')
    const [activeIngredient, setActiveIngredient] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState([])

    const { id } = use(params);

    const {data, isSuccess} = useQuery({
        queryKey: [APIMedicine, "MedicineDetail"],
        queryFn: () => request({
            url: `${APIMedicine}/${id}`,
            method: "GET",
        }),
    })
    
    const {mutate: mutateUpdate, isSuccess: isSuccessUpdate} = useUpate({
        url: APIMedicineUpdate,
        queryKeys: [APIMedicine, "MedicineDetail"],
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
                        indication: indication,
                        content: content,
                        image: image,
                        dosage_form: dosageForm,
                        active_ingredient: activeIngredient,
                        tags: tags
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
        if(data?.data) {
            setName(data?.data?.data.name)
            setTags(data?.data?.data.tags)
            setIndication(data?.data?.data.indication)
            setDosageForm(data?.data?.data.dosage_form)
            setActiveIngredient(data?.data?.data.active_ingredient)
            setContent(data?.data?.data.content)
            setImage(data?.data?.data.image)
        }
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview)
        }
    }, [isSuccess, imagePreview])
    
    return (
        <div>
            <AdminHeaderUpdate onCancel={handleCancel} onUpdate={handleSubmit} nameListPage="Danh sách thuốc" nameUpdatePage="Cập nhật thuốc" urlListPage="/admin/medicine" />
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
                                        <div className="w-full max-h-[25rem] cursor-pointer overflow-hidden">
                                            <img src={imagePreview ? imagePreview : (image ? image : "/images/image-upload.png")} alt="Preview Image" className="w-full h-full object-cover overflow-hidden" />
                                        </div>
                                        <input type="file" id="upload-image" name="image" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                                
                                </div>
                            </Tooltip>
                        </div>
                        <div className="flex flex-col gap-4">
                            <InputFieldCustom name="Thuốc" value={name} onSetValue={(value) => setName(value)} error={message && message?.find(item => item.property == "name")?.message} />
                            <InputFieldCustom name="Tags" value={tags} onSetValue={(value) => setTags(value)} error={message && message?.find(item => item.property == "tags")?.message} />
                            <InputFieldCustom name="Hoạt chất" value={activeIngredient} onSetValue={(value) => setActiveIngredient(value)} error={message && message?.find(item => item.property == "active_ingredient")?.message} />
                            <InputFieldCustom name="Dạng bào chế" value={dosageForm} onSetValue={(value) => setDosageForm(value)} error={message && message?.find(item => item.property == "dosage_form")?.message} />
                            <InputFieldCustom name="Chỉ định" value={indication} onSetValue={(value) => setIndication(value)} error={message && message?.find(item => item.property == "indication")?.message} />
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