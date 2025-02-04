"use client"

import { useState, useEffect, useCallback, useRef, use } from "react";
import { Alert, Box, Button, Grid2 as Grid, InputBase, Slide, TextField, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faHome, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import request from "@/Utils/Axios";
import {
    APIDisease,
    APIDiseaseCreate, APIDiseaseUpdate,
    APIDiseaseUploadFile, APIMedicineCreate,
    APIMedicineUploadFile,
    APIPostUploadFile,
    APIType
} from "@/Utils/Axios/APIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import InputFieldCustom from "@/Components/Common/InputFieldCustom";
import ReactQuill from "react-quill-new";
import SelectMultiple from "@/Components/Common/SelectMultiple";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomSwal from "@/Utils/Swal/CustomSwal";
import TextEditor from "@/Components/Common/TextEditor";
import useCreate from "@/Utils/hooks/useCreate";
import AdminHeaderCreate from "@/Components/Admin/HeaderCreate";

export default function DiseaseCreatePage({params}) {
    const [name, setName] = useState('')
    const [image, setImage] = useState()
    const [imagePreview, setImagePreview] = useState()
    const [title, setTitle] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [causes, setCauses] = useState('');
    const [treatment_methods, setTreatmentMethods] = useState('');
    const [disease_prevention, setDiseasePrevention] = useState('');
    const [risk_factors, setRiskFactors] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [overview, setOverview] = useState('');
    const [types, setTypes] = useState([]);
    const [message, setMessage] = useState([])
    
    const router = useRouter()
    
    const {mutate, isSuccess: isSuccessCreate} = useCreate({
        url: APIDiseaseCreate,
        queryKeys: [APIDisease],
        setMessage: setMessage
    })
    
    const handleSubmit = () => {
        mutate({
            name: name,
            image: image,
            title: title,
            symptoms: symptoms,
            causes: causes,
            treatment_methods: treatment_methods,
            disease_prevention: disease_prevention,
            risk_factors: risk_factors,
            diagnosis: diagnosis,
            types: JSON.stringify(types),
            overview: overview,
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
                router.push('/admin/disease')
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
            setTitle('')
            setSymptoms('')
            setCauses('')
            setTreatmentMethods('')
            setDiseasePrevention('')
            setRiskFactors('')
            setDiagnosis('')
            setOverview('')
            setTypes([])
            setImage('')
            setImagePreview('')
        }
        return () => {
            imagePreview && URL.revokeObjectURL(imagePreview)
        }
    }, [isSuccessCreate])
    
    const {data} = useQuery({
        queryKey: [APIType],
        queryFn: () => request({
            method: "GET",
            url: APIType
        })
    })
    
    return (
        <div>
            <AdminHeaderCreate nameAddPage="Thêm bệnh" nameListPage="Danh sách bệnh" onCancel={handleCancel} onCreate={handleSubmit} urlListPage="/admin/disease" />
            <div className="bg-white p-5 rounded-lg shadow">
                <div className="mb-4 flex">
                    <h1 className="text-large font-bold">
                        Thông tin bệnh
                    </h1>
                </div>
                <div className="">
                    <div className="grid grid-cols-2 gap-5 mb-8">
                        <div className="">
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
                        <div className="flex flex-col gap-4">
                            <InputFieldCustom name="Tên bệnh" value={name} onSetValue={(value) => setName(value)} error={message && message?.find(item => item.property == "name")?.message} />
                            <InputFieldCustom name="Tiêu đề" value={title} onSetValue={(value) => setTitle(value)} error={message && message?.find(item => item.property == "title")?.message} />
                            <SelectMultiple name="Loại bệnh" data={data?.data?.data?.data} onSelectValue={(value) => setTypes(value)} valueSelect={types} placeholder="Chọn loại bệnh" field="name" />
                        </div>
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Tổng quát" value={overview} onSetValue={setOverview} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "overview")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Triệu chứng" value={symptoms} onSetValue={setSymptoms} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "symptoms")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Nguyên nhân" value={causes} onSetValue={setCauses} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "causes")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Đối tượng nguy cơ" value={risk_factors} onSetValue={setRiskFactors} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "risk_factors")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Chuẩn đoán" value={diagnosis} onSetValue={setDiagnosis} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "diagnosis")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Phòng ngừa" value={disease_prevention} onSetValue={setDiseasePrevention} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "disease_prevention")?.message} />
                    </div>
                    <div className="mb-8">
                        <TextEditor name="Điều trị" value={treatment_methods} onSetValue={setTreatmentMethods} url={APIDiseaseUploadFile} error={message && message?.find(item => item.property == "treatment_methods")?.message} />
                    </div>
                </div>
            </div>
        </div>
    )
}